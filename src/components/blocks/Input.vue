<template>
	<Input
		v-model="value"
		:placeholder="placeholder"
		:disabled="disabled"
		:type="type"
		@input="onInput"
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Input } from '@/components/ui/input'

const props = defineProps({
	modelValue: {
		type: String,
		default: ''
	},
	placeholder: {
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

const value = computed({
	get: () => props.modelValue,
	set: (val) => emit('update:model-value', val)
})

const onInput = (event: InputEvent) => {
	emit('input', event)
}
</script>
