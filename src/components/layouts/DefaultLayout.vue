<template>
	<div class="default-layout">
		<Page>
			<PageHeader/>

			<router-view/>
		</Page>

		<PageFooter/>
	</div>
</template>

<script lang="ts" setup>
import Page from '@/components/structures/Page.vue'
import PageHeader from '@/components/blocks/PageHeader.vue'
import PageFooter from '@/components/blocks/PageFooter.vue'
</script>

<style scoped lang="scss">
.default-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

	min-height: 100vh;
}
</style>