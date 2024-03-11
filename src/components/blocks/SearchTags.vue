<template>
	<div class="search-tags">
		<Badge
			v-for="(item, index) in items"
			:key="index"
			class="search-tags__child cursor-pointer"
			@click="selectTag(item)"
		>
			{{ item }}
		</Badge>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Badge } from '@/components/ui/badge'

const emit = defineEmits(['select-tag'])

const items = ref([
	'тригонометрия',
	'сочинение ОГЭ',
	'преобразование тригонометрических выражений',
	'метод вспомогательного угла', 
	'перпендикуляр в простанстве',
	'биохимические формулы',
	'17 задача по математике ЕГЭ'
])

const selectedItem = ref('')

const selectTag = (item: string) => {
	selectedItem.value = item    
	emit('select-tag', selectedItem.value)
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