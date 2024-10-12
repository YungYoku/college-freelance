<script lang="ts" setup>
import { type HTMLAttributes, computed } from 'vue'
import { CalendarHeading, type CalendarHeadingProps, useForwardProps } from 'radix-vue'
import { cn } from '@/lib/utils'

const props = defineProps<CalendarHeadingProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
	// eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
	const { class: _, ...delegated } = props

	return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
	<CalendarHeading
		v-slot="{ headingValue }"
		:class="cn('text-sm font-medium', props.class)"
		v-bind="forwardedProps"
	>
		<slot :heading-value>
			{{ headingValue }}
		</slot>
	</CalendarHeading>
</template>
