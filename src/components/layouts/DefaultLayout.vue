<template>
	<div class="default-layout">
		<page-header/>

		<Page>
			<router-view/>
		</Page>
	</div>
</template>

<script lang="ts" setup>
import PageHeader from '@/components/blocks/PageHeader.vue'
import Page from '@/components/structures/Page.vue'
</script>

<style scoped lang="scss">
.default-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
</style>