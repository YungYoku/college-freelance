<template>
	<div class="relative">
		<Label
			v-if="!placeholder"
			class="absolute left-3 top-1 text-xs text-muted-foreground font-extralight"
		>
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
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface Props {
	modelValue: string
	error?: string | null
	label: string
	height?: string
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: '',
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
	const hasValue = props.modelValue.length > 0
	if (props.label && !hasValue) {
		return props.label
	}

	return null
})
</script>
