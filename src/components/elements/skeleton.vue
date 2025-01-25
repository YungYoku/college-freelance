<template>
	<div
		class="skeleton"
		:style="{
			width,
			height
		}"
	/>
</template>

<script setup lang="ts">
defineProps({
	width: {
		type: String,
		default: '100%'
	},
	height: {
		type: String,
		default: '100%'
	},
})
</script>

<style scoped lang="scss">
.skeleton {
	max-width: 100%;

	background-color: hsl(var(--primary) / 0.1);

	border-radius: 8px;

	animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;

	@keyframes pulse {
		50% {
			opacity: 0.5;
		}
	}
}
</style>