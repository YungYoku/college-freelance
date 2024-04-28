<template>
	<Grid
		class="job-search"
		:columns="columns"
	>
		<Input
			v-model="value"
			placeholder="Поиск"
		/>

		<template v-if="value">
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

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Grid from '@/components/structures/Grid.vue'
import { Skeleton } from '@/components/ui/skeleton'

const value = ref('')

const searchStore = useSearchStore()
watch(() => searchStore.search, () => value.value = searchStore.search)

const columns = computed(() => {
	if (value.value.length) return [4, 1]
	return 1
})

const router = useRouter()
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
