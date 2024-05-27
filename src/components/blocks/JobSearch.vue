<template>
	<Grid
		class="job-search"
		:columns="columns"
	>
		<Input
			v-model="value"
			label="Поиск"
			@update:model-value="updateSearch"
		/>

		<template v-if="value && !isSearchPage">
			<Skeleton
				v-if="searchStore.loading"
				class="h-9"
			/>

			<Button
				v-else
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

import Grid from '@/components/structures/Grid.vue'
import Input from '@/components/blocks/Input.vue'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'

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
}</style>
