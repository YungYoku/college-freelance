<template>
	<Popover v-model:open="open">
		<PopoverTrigger as-child>
			<Button
				variant="outline"
				role="combobox"
				:aria-expanded="open"
				class="w-full justify-between"
			>
				{{ showedResult }}
			</Button>
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
import { Button } from '@/components/ui/button'
import http from '@/plugins/http'
import { Checkbox } from '@/components/ui/checkbox'

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

	if (Array.isArray(_val)) return `Выбрано ${_val.length} элементов`
	return _val?.length ? _val : props.placeHolder
})

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

const getQuery = (entity: string | Array<Item>, isIncluded: boolean = false) => {
	let query = ''
	const sign = isIncluded ? '=' : '~'
	if (typeof entity === 'string' && entity.length) {
		query += '?sort=name&filter=('

		if (isIncluded) query += `id='${entity}'`
		else {
			props.filterFields.forEach(field => {
				query += `${field}${sign}'${entity}' || `
			})
			query = query.slice(0, query.length - 3)
		}

		query += ')'
	} else if (Array.isArray(entity) && entity.length) {
		query += '?sort=name&filter=('
		
		entity.forEach(item => {
			if (isIncluded) query += `id='${item.id}' || `
			else {
				props.filterFields.forEach((field: string) => {
					const value = item?.[field] ?? null
					if (value) query += `${field}${sign}'${value}' || `
				})
			}
		})

		query = query.slice(0, query.length - 3)
		query += ')'
	}
	return query
}

const loadItems = async (item: string | Array<Item>, include?: string | Array<Item>) => { // Проблема с символами в строке (меняются на что то)
	let _defaultItems: Array<Item> = []
	let _extraItems: Array<Item> = []

	const loadDefaultItems = async () => {
		await http.get<Items>(`/collections/${props.api}/records${getQuery(item)}`)
			.then(response => {
				_defaultItems = response.items
			})
	}
	const loadExtraItems = async () => {
		if (include && include.length) {
			await http.get<Items>(`/collections/${props.api}/records${getQuery(include, true)}`)
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
