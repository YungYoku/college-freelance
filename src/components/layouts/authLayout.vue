<template>
	<div class="auth-layout">
		<Page>
			<Header/>

			<slot/>
		</Page>

		<Footer/>
	</div>
</template>

<script lang="ts" setup>
import { Page } from '@/components/structures'
import { Header, Footer } from '@/components/sections'
</script>

<style scoped lang="scss">
.auth-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

	min-height: 100vh;
}
</style>