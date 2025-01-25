<template>
	<div class="label">
		<slot/>
	</div>
</template>

<style scoped lang="scss">
.label {
	position: absolute;
	top: 4px;
	left: 12px;

	font-size: 12px;
	font-weight: 200;
	color: hsl(var(--muted-foreground));
}
</style>