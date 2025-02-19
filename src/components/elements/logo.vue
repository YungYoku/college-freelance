<template>
	<router-link
		to="/"
		class="logo"
	>
		<img
			width="32px"
			height="46px"
			class="logo__image"
			src="@/assets/img/onyx.webp"
			alt=""
			aria-label="Logo"
		>
	</router-link>
</template>

<style scoped lang="scss">
.logo {
	display: flex;
	justify-content: center;
	align-items: center;

	max-width: 40px;
	padding: 2px 4px;

	background-color: rgb(255 255 255 / 1);
	border-radius: 6px;

	&__image {
		width: 32px;
		min-width: 32px;
		max-width: 32px;
	}
}
</style>