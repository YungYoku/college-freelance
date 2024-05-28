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
			:class="{
				'pt-4': !placeholder,
			}"
			:style="{
				height
			}"
		/>
		<div class="relative"/>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

const props = defineProps({
	modelValue: {
		type: String,
		default: ''
	},
	label: {
		type: String,
		default: ''
	},
	height: {
		type: String,
		default: '200px'
	}
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
