<template>
	<div
		class="flex flex-wrap items-center gap-2 ml-auto mr-auto"
		@mouseleave="hover(0)"
	>
		<Icon
			v-for="(icon, index) in icons"
			:key="index"
			:name="icon"
			size="m"
			@mouseenter="hover(index + 1)"
			@click="update(index + 1)"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import Icon from '@/components/elements/Icon.vue'

const props = defineProps({
	modelValue: {
		type: Number,
		default: 0
	}
})

const icons = computed(() => {
	const result = []

	for (let i = 0; i < 5; i++) {
		if (i < props.modelValue || i < hoverIndex.value) {
			result.push('star-active')
		} else {
			result.push('star')
		}
	}

	return result
})

const hoverIndex = ref(0)
const hover = (index: number) => hoverIndex.value = index

const emit = defineEmits(['update:modelValue'])
const update = (value: number) => emit('update:modelValue', value)
</script>