<template>
	<Skeleton
		v-if="loading"
		class="h-5 w-[132px] ml-auto mr-auto"
	/>
	<div
		v-else
		class="flex flex-wrap items-center gap-2 ml-auto mr-auto"
		@mouseleave="hover(null)"
	>
		<Icon
			v-for="(icon, index) in icons"
			:key="index"
			:name="icon"
			size="s"
			@mouseenter="hover(index + 1)"
			@click="update(index + 1)"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { Icon } from '@/components/elements'
import { Skeleton } from '@/components/ui/skeleton'

const props = defineProps({
	modelValue: {
		type: Number,
		default: 0
	},
	loading: {
		type: Boolean,
		default: false
	}
})

const icons = computed(() => {
	const result = []

	for (let i = 0; i < 5; i++) {
		if (hoverIndex.value !== null) {
			if (i < hoverIndex.value) {
				result.push('star-active')
			} else {
				result.push('star')
			}
		} else {
			if (i < props.modelValue) {
				result.push('star-active')
			} else {
				result.push('star')
			}
		}
	}

	return result
})

const hoverIndex = ref<number | null>(null)
const hover = (index: number | null) => hoverIndex.value = index

const emit = defineEmits(['update:modelValue'])
const update = (value: number) => emit('update:modelValue', value)
</script>