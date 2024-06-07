<template>
	<Input
		v-model="value"
		class="job-search"
		:disabled="searchStore.loading"
		label="Поиск"
		:icon="isSearchPage ? null : 'search'"
		@update:model-value="updateSearch"
		@action="search"
		@keyup.enter="search"
	/>
	<router-link
		class="job-search-link"
		to="/search"
	>
		<Icon name="search"/>
	</router-link>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search.ts'

import { Input } from '@/components/blocks'
import { Icon } from '@/components/elements'

const searchStore = useSearchStore()

const value = ref(searchStore.search)
watch(() => searchStore.search, () => value.value = searchStore.search)

const updateSearch = (value: string | number) => searchStore.update(value.toString())

const router = useRouter()
const isSearchPage = computed(() => router.currentRoute.value.path === '/search')

const search = () => {
	if (value.value.length === 0) return

	if (!isSearchPage.value) {
		router.push('/search')
		searchStore.setLoading(true)
	}
}
</script>

<style scoped lang="scss">
.job-search {
    width: 768px;
    min-width: 320px;
    max-width: 100%;

	@media (max-width: 1280px) {
		width: 480px;
	}
	@media (max-width: 1024px) {
		width: 320px;
	}
	@media (max-width: 768px) {
		display: none;
	}
}
.job-search-link {
	margin: auto 0;
	display: none;

	@media (max-width: 768px) {
		display: block;
	}
}
</style>
