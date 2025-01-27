<template>
	<router-link
		to="/"
		class="logo"
	>
		<img
			class="logo__image"
			src="@/assets/img/onyx.webp"
			alt=""
		>
	</router-link>
</template>

<style scoped lang="scss">
.logo {
	max-width: 40px;

	padding: 2px 4px;

	border-radius: 6px;
	--tw-bg-opacity: 1;
	background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));

	&__image {
		width: 32px;
		min-width: 32px;
		max-width: 32px;
	}
}
</style>