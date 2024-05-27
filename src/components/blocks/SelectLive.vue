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
					class="w-full justify-between pl-3"
					:class="{
						'pt-4': filled,
					}"
				>
					{{ showedResult }}
				</Button>
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
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import Button from '@/components/blocks/Button.vue'
import http from '@/plugins/http'
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

const props = defineProps({
	modelValue: {
		type: [Array<Item>, Object],
		default: () => ({})
	},
	typeKey: {
		type: String,
		default: 'name'
	},
	placeHolder: {
		type: String,
		default: 'Выберите значение...'
	},
	api: {
		type: String,
		default: '',
		required: true
	},
	filterFields: {
		type: Array<string>,
		default: () => (['id', 'name'])
	},
	multiple: {
		type: Boolean,
		default: false
	}
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

const filled = computed(() => value.value.length > 0)

const open = ref(false)
const items = ref<Array<Item>>([])

const value = computed({
	get() {
		const selectedValue = props.modelValue
		if (props.multiple && Array.isArray(selectedValue)) {
			// Здесь стоит добавить загрузку элементов по поиску
			loadItems('', selectedValue)
			return props.modelValue
		} else if (typeof selectedValue === 'object' && !Array.isArray(selectedValue)) {
			const value = selectedValue?.[props.typeKey] ?? ''
			loadItems(value)
			return value
		}

		return props.modelValue
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

		payload.filter += payload.filter.slice(0, payload.filter.length - 3).trim()
		payload.filter += ')'
	}

	if (Object.keys(payload).length > 0) return payload
	return null
}

const loadItems = async (item: string | Array<Item>, include?: string | Array<Item>) => { // Проблема с символами в строке (меняются на что то)
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
				...getPayload(item, true)
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
