<template>
	<Popover class="select">
		<template #trigger>
			<div class="select__trigger">
				<Label v-if="showedValue">
					{{ label }}
				</Label>

				<Text
					class="select__showed-value"
					:class="{
						'_empty': !showedValue
					}"
					size="xs"
				>
					{{ showedValue ?? label }}
				</Text>

				<Icon
					v-if="clearable && value.length > 0"
					class="select__clear"
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

		<Separator/>

		<div class="select__content">
			<div
				v-for="item in items"
				:key="item.id"
				class="select__item"
				:class="{
					'_active': value === item.id && !multiple
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
					<Text size="xs">
						{{ item.name }}
					</Text>

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
import { Label, Icon, Separator, Text } from '@/components/elements'

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

		display: flex;
		align-items: center;
		justify-content: flex-start;

		padding: 8px 12px;

		transition: all 0.2s;
		border-radius: 14px;
		background: hsl(var(--background));
		border: 1px solid hsl(var(--input));

		&:focus-visible {
			border-color: rgb(245 245 244 / 1);
		}

		&:hover {
			background: hsl(var(--accent));
		}

		&:disabled {
			opacity: 0.5;
		}
	}

	&__showed-value {
		width: 100%;
		height: 100%;

		display: flex;
		align-items: center;
		justify-content: flex-start;

		padding-top: 12px;

		&._empty {
			padding-top: initial;

			color: hsl(var(--muted-foreground));
		}
	}

	&__clear {
		position: absolute;
		top: 14px;
		right: 12px;

		cursor: pointer;
	}

	&__content {
		display: flex;
		flex-direction: column;
		gap: 4px;

		padding: 4px;

		overflow: auto;
	}

	&__item {
		width: 100%;
		height: 32px;
		min-height: 32px;

		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 8px;

		background-color: hsl(var(--background));
		white-space: nowrap;
		border-radius: 4px;
		cursor: pointer;
		overflow: hidden;

		&:hover {
			background-color: hsl(var(--accent));
		}

		&._active {
			background-color: hsl(var(--accent));
		}
	}
}
</style>