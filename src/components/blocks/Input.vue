<template>
	<div class="relative">
		<Label
			v-if="!placeholder"
			class="absolute left-3 top-1 text-xs text-muted-foreground font-extralight"
		>
			{{ label }}
		</Label>

		<Input
			v-model="value"
			:class="['h-12', {
				'pt-4': !placeholder,
			}]"
			:placeholder="placeholder"
			:disabled="disabled"
			:type="type"
			@input="onInput"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const props = defineProps({
	modelValue: {
		type: [String, Number],
		default: ''
	},
	label: {
		type: String,
		default: ''
	},
	disabled: {
		type: Boolean,
		default: false
	},
	type: {
		type: String,
		default: 'text'
	}
})

const emit = defineEmits(['update:model-value', 'input'])
const onInput = (event: InputEvent) => emit('input', event)

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
</script>
