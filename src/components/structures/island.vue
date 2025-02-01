<template>
	<div class="island">
		<slot/>
	</div>
</template>

<style scoped lang="scss">
.island {
	padding: 12px;

	border-radius: 12px;
	background-color: hsl(var(--primary-foreground));
	--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
	box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>