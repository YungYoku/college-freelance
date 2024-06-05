<template>
	<Grid
		class="job-search"
		:columns="columns"
		@keyup.enter="search"
	>
		<Input
			v-model="value"
			:disabled="searchStore.loading"
			label="Поиск"
			@update:model-value="updateSearch"
		/>

		<template v-if="value && !isSearchPage">
			<Button
				:loading="searchStore.loading"
				@click="search"
			>
				Поиск
			</Button>
		</template>
	</Grid>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search.ts'

import { Grid } from '@/components/structures'
import { Button, Input } from '@/components/blocks'

const searchStore = useSearchStore()

const value = ref(searchStore.search)
watch(() => searchStore.search, () => value.value = searchStore.search)

const updateSearch = (value: string | number) => searchStore.update(value.toString())

const router = useRouter()
const isSearchPage = computed(() => router.currentRoute.value.path === '/search')

const columns = computed(() => {
	if (value.value.length && !isSearchPage.value) return [4, 1]
	return 1
})

const search = () => {
	searchStore.update(value.value)
	searchStore.setLoading(true)
	router.push('/search')
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
		width: 400px;
	}
}</style>
