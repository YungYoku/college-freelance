<template>
	<Popover v-model:open="open">
		<PopoverTrigger as-child>
			<Button
				variant="outline"
				role="combobox"
				:aria-expanded="open"
				class="w-full justify-between"
			>
				{{ value?.[typeKey].length ? value?.[typeKey] : placeHolder }}
			</Button>
		</PopoverTrigger>
		<PopoverContent class="w-full p-0">
			<Command v-model="value[typeKey]">
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
		type: Object,
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
	}
})

const emit = defineEmits(['update:model-value'])

const value = computed({
	get() {
		loadItems(props.modelValue?.[props.typeKey])
		return props.modelValue
	},
	set(value) {
		emit('update:model-value', value)
	}
})

const open = ref(false)
const items = ref<Array<Item>>([])

const handleType = (e: Event) => {
	const target = e.target as HTMLInputElement
	loadItems(target.value)
}

const loadItems = async (university: string) => {
	let query = '?sort=name'
	if (university) {
		query += '&filter=('
		props.filterFields.forEach(field => {
			query += `${field}~'${university}' ||`
		})
		query = query.slice(0, query.length - 2)
		query += ')'
	}

	await http.get<Items>(`/collections/${props.api}/records${query}`)
		.then(response => {
			items.value = response.items
		})
}

const select = (item: Item) => {
	value.value = item
	open.value = false
}
</script>
