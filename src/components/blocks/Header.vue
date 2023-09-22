<template>
	<header>
		<router-link to="/">Main</router-link>
		<router-link to="/login">Login</router-link>
		<router-link to="/registration">Registration</router-link>
	</header>
</template>

<script setup lang="ts">

</script>

<style scoped>
header {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
}
</style>