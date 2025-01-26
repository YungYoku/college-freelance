<template>
	<Popover class="select">
		<template #trigger>
			<div class="select__trigger py-2 px-3">
				<Label v-if="showedValue">
					{{ label }}
				</Label>

				<div
					class="w-[100%] h-[100%] font-medium flex items-center justify-start font-light text-sm"
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
		</template>

		<Input
			v-if="searchable"
			v-model="search"
			:label="label"
			:clearable="false"
			variant="plain"
		/>

		<div class="w-full h-[1px] min-h-[1px] bg-accent"/>

		<div class="p-1 flex flex-col gap-1 overflow-auto">
			<div
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
			</div>
		</div>
	</Popover>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

import { Popover } from '@/components/structures'
import { Input, Checkbox } from '@/components/blocks'
import { Label, Icon } from '@/components/elements'

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
		const items = _value.length > 7 ? _value.slice(0, 7) : _value

		if (items.length === 0) return null

		const getItemName = (id: string) => {
			return props.items.find((item) => item.id === id)?.name ?? ''
		}

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

<style scoped lang="scss">
.select {
	&__trigger {
		width: 100%;
		height: 48px;

		position: relative;

		transition: all 0.2s;
		border-radius: 14px;
		background: hsl(var(--background));
		border: 1px solid hsl(var(--input));

		&:focus-visible {
			--tw-border-opacity: 1;
			border-color: rgb(245 245 244 / var(--tw-border-opacity, 1));
		}

		&:hover {
			background: hsl(var(--accent));
		}

		&:disabled {
			opacity: 0.5;
		}
	}
}
</style>