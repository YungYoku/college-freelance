<template>
	<div class="search-tags">
		<Badge
			v-for="item in resultTags"
			:key="item.id"
			class="search-tags__child cursor-pointer"
			@click="selectTag(item.name)"
		>
			{{ item.name }}
		</Badge>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useSearchStore } from '@/stores/search.ts'

import { Badge } from '@/components/ui/badge'
import { Http, Screen } from '@/plugins'
import { IDiscipline, IDisciplines } from '@/interfaces/Discipline.ts'

const tags = ref<Array<IDiscipline>>([])
const resultTags = computed<Array<IDiscipline>>(() => {
	if (Screen.isSize('s')) return tags.value.slice(0, 3)
	return tags.value.slice(0, tags.value.length)
})
const loadTags = async () => {
	Http.get<IDisciplines>('/collections/disciplines/records', {
		perPage: 14
	})
		.then(({ items }) => {
			tags.value = items
		})
}
loadTags()

const router = useRouter()
const searchStore = useSearchStore()
const selectTag = (item: string) => {
	searchStore.update(item)
	router.push('/search')
	searchStore.setLoading(true)
}
</script>

<style scoped lang="scss">
.search-tags {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;

    &__child {
        display: flex;
        align-items: center;

        min-height: 24px;
        padding: 4px;

        font-size: 12px;
        line-height: 1;

        border: 1px solid var(--light-100);
        border-radius: 10px;
    }
}</style>