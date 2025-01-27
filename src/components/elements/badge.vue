<template>
	<div class="badge bg-primary text-primary-foreground">
		<slot/>
	</div>
</template>

<style scoped lang="scss">
.badge {
	padding: 1px 7px;

	font-size: 12px;
	font-weight: 600;

	border-radius: 6px;
}
</style>