<template>
	<div class="search-tags">
		<Badge
			v-for="(item, index) in tags"
			:key="index"
			class="search-tags__child cursor-pointer"
			@click="selectTag(item)"
		>
			{{ item }}
		</Badge>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSearchStore } from '@/stores/search.ts'

import { Badge } from '@/components/ui/badge'
import { Screen } from '@/plugins'

const items = [
	'тригонометрия',
	'сочинение ОГЭ',
	'преобразование тригонометрических выражений',
	'метод вспомогательного угла', 
	'перпендикуляр в простанстве',
	'биохимические формулы',
	'17 задача по математике ЕГЭ'
]

const tags = computed(() => {
	if (Screen.isSize('s')) return items.slice(0, 3)
	return items.slice(0, items.length)
})

const searchStore = useSearchStore()

const selectTag = (item: string) => searchStore.update(item)
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