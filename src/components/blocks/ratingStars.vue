<template>
	<div
		class="flex flex-wrap items-center gap-2 ml-auto mr-auto"
		@mouseleave="hover(null)"
	>
		<Icon
			v-for="(icon, index) in icons"
			:key="index"
			:name="icon"
			:size="size"
			@mouseenter="hover(index + 1)"
			@click="updateStars(index)"
		/>
	</div>
</template>

<script setup lang="ts">
import { Icon } from '@/components/elements'
import { computed, ref, watch } from 'vue'

const props = defineProps({
	modelValue: {
		type: Number,
		default: 0
	},
	editable: {
		type: Boolean,
		default: false
	},
	size: {
		type: String,
		default: 'm'
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
const hover = (index: number | null) => {
	if (!props.editable) return
	hoverIndex.value = index
}
const emit = defineEmits(['update:modelValue'])

const value = ref({
	stars: 0,
	review: ''
})
const updateStars = (index: number) => {
	if (!props.editable) return
	value.value.stars = index + 1
	emit('update:modelValue', value.value.stars)
}

watch(() => props.modelValue, () => value.value.stars = props.modelValue, { immediate: true })
</script>