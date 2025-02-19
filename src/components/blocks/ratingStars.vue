<template>
	<div class="rating-stars">
		<Icon
			v-for="i in 5"
			:key="i"
			:name="i <= stars ? 'star-active' : 'star'"
			size="s"
			:pointer="false"
		/>
	</div>
</template>

<script setup lang="ts">
import { Icon } from '@/components/elements'

defineProps({
	stars: {
		type: Number,
		default: 0
	}
})
</script>

<style lang="scss" scoped>
.rating-stars {
	display: flex;
	flex-wrap: wrap;
	align-items: center;

	margin-right: auto;
	margin-left: auto;
	gap: 8px;
}
</style>