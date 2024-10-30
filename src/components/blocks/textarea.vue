<template>
	<div class="relative">
		<Label v-if="!placeholder">
			{{ label }}
		</Label>

		<Textarea
			v-model="value"
			:placeholder="label"
			:class="['bg-background', 'hover:bg-accent', {
				'pt-4': !placeholder,
			}]"
			:style="{
				height
			}"
			:disabled="disabled"
		/>

		<span
			v-if="error"
			class="pl-3 text-xs text-destructive font-extralight"
		>
			{{ error }}
		</span>

		<Icon
			v-else-if="filled"
			class="absolute right-3 top-3.5 cursor-pointer"
			name="close"
			size="s"
			@click.prevent.stop="clear"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Textarea } from '@/components/ui/textarea'
import { Icon, Label } from '@/components/elements'

interface Props {
	modelValue: string | undefined
	error?: string | null
	label: string
	height?: string
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: undefined,
	error: null,
	label: '',
	height: '200px',
	disabled: false
})

const emit = defineEmits(['update:model-value'])

const value = computed({
	get: () => props.modelValue,
	set: (val) => emit('update:model-value', val)
})

const placeholder = computed(() => {
	const hasValue = typeof value.value === 'string' && value.value.length > 0
	if (props.label && !hasValue) {
		return props.label
	}

	return null
})

const filled = computed(() => {
	if (typeof value.value === 'string') return value.value.length > 0
	return false
})

const clear = () => {
	value.value = undefined
}
</script>
