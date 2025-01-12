<template>
	<Popover>
		<PopoverTrigger>
			<div class="relative w-[100%] h-12 py-2 px-3 bg-background hover:bg-accent rounded-lg border border-input font-light text-sm focus-visible:border-stone-100 outline-none disabled:opacity-50">
				<Label v-if="showedValue">
					{{ label }}
				</Label>

				<div
					class="w-[100%] h-[100%] text-sm font-medium flex items-center justify-start"
					:class="{
						'pt-3': showedValue,
						'text-muted-foreground': !showedValue
					}"
				>
					{{ showedValue ?? label }}
				</div>

				<Icon
					v-if="clearable && value.length > 0"
					class="absolute right-3 top-3.5 cursor-pointer"
					name="close"
					size="s"
					@click.prevent.stop="clear"
				/>
			</div>
		</PopoverTrigger>

		<PopoverContent class="max-h-[400px] p-1 flex flex-col gap-1 overflow-auto">
			<Input
				v-if="searchable"
				v-model="search"
				:label="label"
				:clearable="false"
			/>

			<component
				:is="multiple ? 'div' : PopoverClose"
				v-for="item in items"
				:key="item.id"
				class="w-full min-h-8 h-8 flex items-center justify-between cursor-pointer rounded-sm p-2 text-sm hover:bg-accent whitespace-nowrap overflow-hidden"
				:class="{
					'bg-background': value !== item.id,
					'bg-accent': value === item.id && !multiple
				}"
				@click="chooseValue(item)"
			>
				<Checkbox
					v-if="multiple"
					:checked="value.includes(item.id)"
					disabled
					:label="item.name"
				/>

				<template v-else>
					{{ item.name }}

					<Icon
						v-if="value === item.id"
						name="check"
						size="xs"
					/>
				</template>
			</component>
		</PopoverContent>
	</Popover>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { PopoverClose } from 'radix-vue'

import { Input, Checkbox } from '@/components/blocks'
import { Label, Icon } from '@/components/elements'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface Item {
	id: string
	name: string
}

const value = defineModel<string | Array<string>>({
	type: [String, Array],
	default: ''
})

const search = defineModel<string>('search', {
	type: String,
	default: ''
})

const props = defineProps({
	label: {
		type: String,
		default: ''
	},
	items: {
		type: Array as PropType<Array<Item>>,
		default: () => ([])
	},
	multiple: {
		type: Boolean,
		default: false
	},
	clearable: {
		type: Boolean,
		default: true
	},
	searchable: {
		type: Boolean,
		default: false
	}
})

const validationError = new Error('Select multiple, but value is not an array')

const showedValue = computed(() => {
	const _value = value.value

	if (props.multiple) {
		if (Array.isArray(_value) === false) throw validationError

		const getItemName = (id: string) => {
			return props.items.find((item) => item.id === id)?.name ?? ''
		}

		const items = _value.length > 7 ? _value.slice(0, 7) : _value
		const result = items.reduce((acc, item) => `${acc}, ${getItemName(item).trim()}`, '').slice(2)
		const extra = _value.length > 7 ? `, ... (${_value.length})` : ` (${_value.length})`
		return `${result}${extra}`
	}
	return props.items.find(item => item.id === _value)?.name ?? null
})

const chooseValue = (item: Item) => {
	if (props.multiple) {
		if (Array.isArray(value.value) === false) throw validationError

		if (value.value.includes(item.id)) {
			value.value = value.value.filter(val => val !== item.id)
		} else {
			value.value.push(item.id)
		}
	} else {
		value.value = item.id
	}
}

const clear = () => {
	if (props.multiple && Array.isArray(value.value)) {
		value.value = []
	} else {
		value.value = ''
	}
}
</script>
