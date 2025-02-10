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
	max-width: 40px;

	display: flex;
	align-items: center;
	justify-content: center;

	padding: 2px 4px;

	border-radius: 6px;
	background-color: rgb(255 255 255 / 1);

	&__image {
		width: 32px;
		min-width: 32px;
		max-width: 32px;
	}
}
</style>