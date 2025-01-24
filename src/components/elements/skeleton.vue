<template>
	<div class="skeleton"/>
</template>

<style scoped lang="scss">
.skeleton {
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