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
					:class="['w-full', 'justify-between', 'pl-3', 'overflow-hidden', {
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
			<Command v-model="search">
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
							@select="select(item.id)"
						>
							<Checkbox
								v-if="multiple"
								:checked="selectedItems.some(i => i === item.id)"
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
import { ref, computed, watch } from 'vue'

import { Button } from '@/components/blocks'
import { Http } from '@/plugins'
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
	modelValue: Array<string> | string
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
	const _val = expandedValue.value

	if (Array.isArray(_val)) {
		if (_val.length === 0) return 'Выбрано 0 элементов.'

		const items = _val.length > 7 ? _val.slice(0, 7) : _val
		const result = items.reduce((acc, item) => `${acc}, ${item.name.trim()}`, '').slice(2)
		const extra = _val.length > 7 ? `, ... (${_val.length})` : ` (${_val.length})`
		return `${result}${extra}`
	}

	return _val?.[props.typeKey] ? _val?.[props.typeKey] : props.placeHolder
})

const filled = computed(() => value.value.length > 0)

const open = ref(false)
const items = ref<Array<Item>>([])

const value = computed<Array<string>| string>({
	get: () => props.modelValue,
	set(value) {
		if (props.multiple && Array.isArray(props.modelValue) && Array.isArray(value)) {
			emit('update:model-value', [...value])
		} else if (typeof value === 'string') {
			emit('update:model-value', value)
		}
	}
})

const expandedValue = computed<Array<Item>| Item>(() => {
	const _value = value.value
	if (Array.isArray(_value)) {
		return items.value.filter(item => _value.some(i => i === item.id)) ?? []
	}
	return items.value.find(item => _value === item.id) ?? {
		id: '',
		name: ''
	} as Item
})

const getPayload = (entity: string | Array<string>, isIncluded: boolean = false) => {
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
			if (isIncluded) payload.filter += `id='${item}' || `
			else {
				props.filterFields.forEach((field: string) => {
					const value = item ?? null
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

const loadItems = async (include?: string | Array<string>) => {
	let _defaultItems: Array<Item> = []
	let _searchItems: Array<Item> = []
	let _extraItems: Array<Item> = []

	const loadDefaultItems = async () => {
		if (search.value.length === 0) {
			await Http.get<Items>(`/collections/${props.api}/records`)
				.then(response => {
					_defaultItems = response.items
				})
		}
	}
	const loadSearchItems = async () => {
		if (search.value.length > 0) {
			await Http.get<Items>(`/collections/${props.api}/records`, getPayload(search.value))
				.then(response => {
					_searchItems = response.items
				})
		}
	}
	const loadExtraItems = async () => {
		if (include && include.length) {
			await Http.get<Items>(`/collections/${props.api}/records`, getPayload(include, true))
				.then(response => {
					_extraItems = response.items
					_extraItems.forEach(item => {
						selectedItems.value.push(item.id)
					})
				})
		}
	}

	await Promise.all([loadDefaultItems(), loadSearchItems(), loadExtraItems()])

	_defaultItems = _defaultItems.filter(defaultItem => !_extraItems.some(extraItem => extraItem.id === defaultItem.id))
	_searchItems = _searchItems.filter(searchItem => !_extraItems.some(extraItem => extraItem.id === searchItem.id))
	items.value = [..._extraItems, ..._searchItems, ..._defaultItems]
}

const search = ref('')

const handleContextChange = () => {
	const selectedValue = value.value
	if (props.multiple && Array.isArray(selectedValue)) {
		loadItems(selectedValue)
	} else if (typeof selectedValue === 'string' && !Array.isArray(selectedValue)) {
		loadItems(selectedValue)
	}
}

watch(value, handleContextChange, { immediate: true })

const handleType = (e: Event) => {
	const target = e.target as HTMLInputElement
	search.value = target.value
	handleContextChange()
}

const selectedItems = ref<Array<string>>([])

const select = (id: string) => {
	if (props.multiple && Array.isArray(value.value)) {
		if (value.value.some(i => i === id)) {
			value.value = value.value.filter(i => i !== id)
			selectedItems.value = selectedItems.value.filter(i => i !== id)
		} else {
			value.value = [...value.value, id]
			selectedItems.value.push(id)
		}
	} else {
		value.value = id
		open.value = false
	}
}
</script>
