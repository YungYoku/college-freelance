<template>
	<div
		class="rating-start-editable"
		@mouseleave="hover(null)"
	>
		<Icon
			v-for="(icon, index) in icons"
			:key="index"
			:name="icon"
			size="m"
			@mouseenter="hover(index + 1)"
			@click="value = index + 1"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

import { Icon } from '@/components/elements'

const value = defineModel({
	type: Number,
	default: 0
})

const icons = computed(() => {
	const max = hoverIndex.value ?? value.value

	const result = []


	for (let i = 0; i < 5; i++) {
		if (i < max) {
			result.push('star-active')
		} else {
			result.push('star')
		}
	}
	return result
})

const hoverIndex = ref<number | null>(null)
const hover = (index: number | null) => hoverIndex.value = index
</script>

<style lang="scss" scoped>
.rating-start-editable {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 8px;

	margin-left: auto;
	margin-right: auto;
}
</style>