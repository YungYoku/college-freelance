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
		type: [Array<object>, Object],
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
		type: Array,
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

const value = computed({
	get() {
		const selectedValue = props.modelValue
		if (props.multiple && Array.isArray(selectedValue)) {
			// Здесь стоит добавить загрузку элементов по поиску
			loadItems(selectedValue)
			return props.modelValue
		} else if (typeof selectedValue === 'object' && !Array.isArray(selectedValue)) {
			const value = selectedValue?.[props.typeKey] ?? ''
			loadItems(value)
			return value
		}

		return props.modelValue
	},
	set(value) {
		if (props.multiple && Array.isArray(props.modelValue)) {
			emit('update:model-value', [...props.modelValue, value])
		} else {
			if (typeof value === 'object') { // Костыль
				emit('update:model-value', value)
			}
		}
	}
})

const open = ref(false)
const items = ref<Array<Item>>([])

const handleType = (e: Event) => {
	const target = e.target as HTMLInputElement
	loadItems(target.value)
}

const loadItems = async (item: string | Array<object>) => { // Проблема с символами в строке (меняются на что то)
	if (!item) return

	let query = '?sort=name'
	if (typeof item === 'string') {
		query += '&filter=('
		props.filterFields.forEach(field => {
			query += `${field}~'${item}' || `
		})
		query = query.slice(0, query.length - 3)
		query += ')'
	} else if (item.length) {
		query += '&filter=('
		item.forEach(value => {
			props.filterFields.forEach(field => {
				query += `${field}~'${value}' || `
			})
		})
		query = query.slice(0, query.length - 3)
		query += ')'
	}

	await http.get<Items>(`/collections/${props.api}/records${query}`)
		.then(response => {
			items.value = response.items
		})
}

const select = (item: Item) => {
	value.value = item

	if (!props.multiple) open.value = false
}
</script>
