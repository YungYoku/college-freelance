<template>
	<div class="auth-layout">
		<page-header/>

		<Page>
			<slot/>
		</Page>
	</div>
</template>

<script lang="ts" setup>
import PageHeader from '@/components/blocks/PageHeader.vue'
import Page from '@/components/structures/Page.vue'
</script>

<style scoped lang="scss">
.auth-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
</style>