<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import { ToastTitle, type ToastTitleProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<ToastTitleProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
	// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
	const { class: _, ...delegated } = props

	return delegated
})
</script>

<template>
	<ToastTitle
		v-bind="delegatedProps"
		:class="cn('text-sm font-semibold [&+div]:text-xs', props.class)"
	>
		<slot/>
	</ToastTitle>
</template>
