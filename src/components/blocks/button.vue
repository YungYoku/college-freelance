<template>
	<Skeleton
		v-if="loading"
		:class="classList"
	/>

	<Button
		v-else
		:class="classList"
		:type="type"
		:disabled="disabled"
		:variant="variant"
		:role="role"
		:aria-expanded="ariaExpanded"
	>
		<slot/>
	</Button>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null | undefined

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
		type: String,
		default: null
	},
	disabled: {
		type: Boolean,
		default: false
	},
	variant: {
		type: String as PropType<Variant>,
		default: 'default'
	},
	role: {
		type: String,
		default: null
	},
	ariaExpanded: {
		type: Boolean,
		default: false
	}
})

const classList = computed(() => {
	let result = 'h-12'
	if (props.class) {
		result += ` ${props.class}`
	}
	return result
})
</script>
