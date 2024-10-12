<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { CalendarGridRow, type CalendarGridRowProps, useForwardProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarGridRowProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
	// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
	const { class: _, ...delegated } = props

	return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
	<CalendarGridRow
		:class="cn('flex', props.class)"
		v-bind="forwardedProps"
	>
		<slot/>
	</CalendarGridRow>
</template>
