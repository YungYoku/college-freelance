<template>
	<Select
		v-model="value"
		v-model:search="search"
		:items="items"
		:multiple="multiple"
		:label="placeHolder"
		searchable
		@update:search="handleContextChange"
	/>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

import { Select } from '@/components/blocks'
import { Http } from '@/plugins'

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
	filterFields: () => (['id', 'name_lowercase']),
	multiple: false
})

const items = ref<Array<Item>>([])

const emit = defineEmits(['update:model-value'])
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
				payload.filter += `${field}${sign}'${entity.toLowerCase()}' || `
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
					if (value) payload.filter += `${field}${sign}'${value.toLowerCase()}' || `
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
</script>
