<template>
	<div class="relative">
		<Skeleton
			v-if="loading"
			class="h-12"
		/>

		<template v-else>
			<Label v-if="!placeholder && label">
				{{ label }}
			</Label>

			<Input
				v-model="value"
				:class="['h-12', 'bg-background', 'hover:bg-accent', 'pr-10', ` cursor-${cursor}`, {
					'pt-4': !placeholder
				}]"
				:placeholder="placeholder"
				:disabled="disabled"
				:type="type"
				autocomplete=""
				@input="onInput"
			/>

			<span
				v-if="error"
				class="pl-3 text-xs text-destructive font-extralight"
			>
				{{ error }}
			</span>

			<Icon
				v-if="icon"
				class="absolute right-3 top-3.5 cursor-pointer"
				:name="icon"
				@click="action"
			/>

			<Icon
				v-else-if="filled"
				class="absolute right-3 top-3.5 cursor-pointer"
				name="close"
				size="s"
				@click.prevent.stop="clear"
			/>
		</template>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Icon, Label } from '@/components/elements'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
	modelValue?: string | number | undefined
	error?: string | null
	loading?: boolean
	label?: string
	disabled?: boolean
	type?: string
	icon?: string | null
	autocomplete?: 'off' | 'on' | 'new-password' | 'username',
	cursor?: 'text' | 'pointer'
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: undefined,
	error: null,
	loading: false,
	label: '',
	disabled: false,
	type: 'text',
	icon: null,
	autocomplete: 'off',
	cursor: 'text'
})

const emit = defineEmits(['update:model-value', 'input', 'action'])
const onInput = (event: InputEvent) => emit('input', event)
const action = () => emit('action')

const value = computed({
	get: () => props.modelValue,
	set: (val) => emit('update:model-value', val)
})

const placeholder = computed(() => {
	let hasValue = false
	if (typeof props.modelValue === 'number') {
		hasValue = true
	} else if (typeof props.modelValue === 'string') {
		hasValue = props.modelValue.length > 0
	}

	if (props.label && !hasValue) {
		return props.label
	}

	return null
})

const filled = computed(() => {
	if (typeof value.value === 'number') return true
	if (typeof value.value === 'string') return value.value.length > 0
	return false
})

const clear = () => {
	value.value = undefined
}
</script>
