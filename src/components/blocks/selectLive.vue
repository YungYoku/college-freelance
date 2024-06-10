<template>
	<Popover v-model:open="open">
		<PopoverTrigger as-child>
			<div class="relative">
				<Label
					v-if="filled"
					class="absolute left-3 top-1 text-xs text-muted-foreground font-extralight"
				>
					{{ placeHolder }}
				</Label>

				<Button
					variant="outline"
					role="combobox"
					:aria-expanded="open"
					:class="['w-full', 'justify-between', 'pl-3', {
						'pt-4': filled,
						'text-muted-foreground': !filled
					}]"
				>
					{{ showedResult }}
				</Button>

				<span
					v-if="error"
					class="pl-3 text-xs text-destructive font-extralight"
				>
					{{ error }}
				</span>
			</div>
		</PopoverTrigger>
		<PopoverContent class="w-full p-0">
			<Command v-model="value">
				<CommandInput
					:placeholder="placeHolder"
					@input="handleType"
				/>
				<CommandEmpty>Пусто.</CommandEmpty>
				<CommandList>
					<CommandGroup>
						<CommandItem
							v-for="item in items"
							:key="item.id"
							:value="item.name"
							@select="select(item)"
						>
							<Checkbox
								v-if="multiple"
								:checked="selectedItems.some(i => i.id === item.id)"
								class="mr-1"
							/>

							{{ item.name }}
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
		</PopoverContent>
	</Popover>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { Button } from '@/components/blocks'
import http from '@/plugins/http'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

interface Item {
	id: string
	name: string
	[key: string]: unknown
}

interface Items {
	page: number,
	perPage: number,
	totalPages: number,
	totalItems: number,
	items: Array<Item>
}

interface Props {
	modelValue: Array<Item> | Item
	error?: string | null
	typeKey?: string
	placeHolder?: string,
	api: string,
	filterFields?: Array<string>,
	multiple?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: () => ([]),
	error: null,
	typeKey: 'name',
	placeHolder: 'Значение',
	api: '',
	filterFields: () => (['id', 'name']),
	multiple: false
})

const emit = defineEmits(['update:model-value'])

const showedResult = computed(() => {
	const _val = value.value

	if (Array.isArray(_val)) {
		if (_val.length === 0) return 'Выбрано 0 элементов.'

		const items = _val.length > 7 ? _val.slice(0, 7) : _val
		const result = items.reduce((acc, item) => `${acc}, ${item.name.trim()}`, '').slice(2)
		const extra = _val.length > 7 ? `, ... (${_val.length})` : ` (${_val.length})`
		return `${result}${extra}`
	}

	return _val?.length ? _val : props.placeHolder
})

const filled = computed(() => {
	const _val = value.value
	if (Array.isArray(_val) || typeof _val === 'string') return _val.length > 0

	throw new Error('Invalid type')
})

const open = ref(false)
const items = ref<Array<Item>>([])

const value = computed<Array<Item> | Item | string>({
	get() {
		const selectedValue = props.modelValue
		if (props.multiple && Array.isArray(selectedValue)) {
			// Здесь стоит добавить загрузку элементов по поиску
			loadItems('', selectedValue)
			return selectedValue
		} else if (typeof selectedValue === 'object' && !Array.isArray(selectedValue)) {
			const value: string = selectedValue?.[props.typeKey] as string
			loadItems(value ?? '')
			return value
		}

		throw new Error('Invalid type')
	},
	set(value) {
		if (props.multiple && Array.isArray(props.modelValue) && Array.isArray(value)) {
			emit('update:model-value', [...value])
		} else if (typeof value === 'object') {
			emit('update:model-value', value)
		}
	}
})

const handleType = (e: Event) => {
	const target = e.target as HTMLInputElement
	loadItems(target.value)
}

const getPayload = (entity: string | Array<Item>, isIncluded: boolean = false) => {
	const payload: {
		sort?: string,
		filter?: string
	} = {}

	const sign = isIncluded ? '=' : '~'
	if (typeof entity === 'string' && entity.length) {
		payload.sort = 'name'
		payload.filter = '('

		if (isIncluded) payload.filter += `id='${entity}'`
		else {
			props.filterFields.forEach(field => {
				payload.filter += `${field}${sign}'${entity}' || `
			})
			payload.filter = payload.filter.slice(0, payload.filter.length - 3).trim()
		}

		payload.filter += ')'
	} else if (Array.isArray(entity) && entity.length) {
		payload.sort = 'name'
		payload.filter = '('

		entity.forEach(item => {
			if (isIncluded) payload.filter += `id='${item.id}' || `
			else {
				props.filterFields.forEach((field: string) => {
					const value = item?.[field] ?? null
					if (value) payload.filter += `${field}${sign}'${value}' || `
				})
			}
		})

		payload.filter = payload.filter.slice(0, payload.filter.length - 3).trim()
		payload.filter += ')'
	}

	if (Object.keys(payload).length > 0) return payload
	return null
}

const loadItems = async (item: string | Array<Item>, include?: string | Array<Item>) => {
	let _defaultItems: Array<Item> = []
	let _extraItems: Array<Item> = []

	const loadDefaultItems = async () => {
		await http.get<Items>(`/collections/${props.api}/records`, {
			...getPayload(item)
		})
			.then(response => {
				_defaultItems = response.items
			})
	}
	const loadExtraItems = async () => {
		if (include && include.length) {
			await http.get<Items>(`/collections/${props.api}/records`, {
				...getPayload(include, true)
			})
				.then(response => {
					_extraItems = response.items
					_extraItems.forEach(item => {
						selectedItems.value.push(item)
					})
				})
		}
	}

	await Promise.all([loadDefaultItems(), loadExtraItems()])

	_defaultItems = _defaultItems.filter(defaultItem => !_extraItems.some(extraItem => extraItem.id === defaultItem.id))
	items.value = [..._extraItems, ..._defaultItems]
}

const selectedItems = ref<Array<Item>>([])

const select = (item: Item) => {
	if (props.multiple && Array.isArray(value.value)) {
		if (value.value.some(i => i.id === item.id)) {
			value.value = value.value.filter(i => i.id !== item.id)
			selectedItems.value = selectedItems.value.filter(i => i.id !== item.id)
		} else {
			value.value = [...value.value, item]
			selectedItems.value.push(item)
		}
	} else {
		value.value = item
		open.value = false
	}
}
</script>
