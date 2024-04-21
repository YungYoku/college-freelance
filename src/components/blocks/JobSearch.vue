<template>
	<Grid
		class="job-search"
		:columns="columns"
	>
		<Input
			v-model="value"
			placeholder="Поиск"
		/>

		<Button v-if="value">
			Поиск
		</Button>
	</Grid>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useSearchStore } from '@/stores/search.ts'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Grid from '@/components/structures/Grid.vue'

const value = ref('')

const searchStore = useSearchStore()
watch(() => searchStore.search, () => value.value = searchStore.search)

const columns = computed(() => {
	if (value.value.length) return [4, 1]
	return 1
})
</script>

<style scoped lang="scss">
.job-search {
    width: 768px;
    min-width: 320px;
    max-width: 100%;
}</style>
