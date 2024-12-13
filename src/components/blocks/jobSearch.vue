<template>
	<router-link
		v-if="Screen.isSize('s')"
		class="job-search-link"
		to="/search"
	>
		<Icon name="search"/>
	</router-link>

	<Input
		v-else
		v-model="value"
		class="job-search"
		:disabled="searchStore.loading"
		label="Поиск"
		:icon="isSearchPage ? null : 'search'"
		@action="search"
		@keyup.enter="search"
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search.ts'

import { Input } from '@/components/blocks'
import { Icon } from '@/components/elements'
import { Screen } from '@/plugins'

const searchStore = useSearchStore()

const value = computed({
	get: () => searchStore.search,
	set: value => searchStore.update(value.toString())
})

const router = useRouter()
const isSearchPage = computed(() => router.currentRoute.value.path === '/search')

const search = () => {
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
	margin: 0 auto;

	@media (max-width: 1280px) {
		width: 480px;
	}
	@media (max-width: 1024px) {
		width: 320px;
	}
}
.job-search-link {
	margin: auto 0;
}
</style>
