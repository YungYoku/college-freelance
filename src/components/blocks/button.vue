<template>
	<Skeleton
		v-if="loading"
		:class="classList"
	/>

	<button
		class="h-12 rounded-xl flex items-center justify-center text-sm font-medium transition-colors p-3"
		:class="classList"
		:type="type"
		:disabled="disabled"
	>
		<slot/>
	</button>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

import { Skeleton } from '@/components/elements'

type Type = 'button' | 'submit' | 'reset'
type Variant = 'default' | 'positive' | 'destructive' | 'outline'

const props = defineProps({
	class: {
		type: [String, Array, Object],
		default: ''
	},
	loading: {
		type: Boolean,
		default: false
	},
	type: {
		type: String as PropType<Type>,
		default: 'button'
	},
	disabled: {
		type: Boolean,
		default: false
	},
	variant: {
		type: String as PropType<Variant>,
		default: 'default'
	}
})

const classList = computed(() => {
	let result = ''

	if (props.variant === 'default') {
		result += ' bg-primary hover:bg-primary/90 text-primary-foreground'
	}
	if (props.variant === 'positive') {
		result += ' bg-green-600 hover:bg-green-600/90'
	}
	if (props.variant === 'destructive') {
		result += ' bg-destructive hover:bg-destructive/90'
	}
	if (props.variant === 'outline') {
		result += ' border border-input bg-background hover:bg-accent'
	}
	if (props.class) {
		result += ` ${props.class}`
	}
	return result
})
</script>
