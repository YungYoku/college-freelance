<template>
    <div class="search-tags">
        <div
            v-for="(item, index) in items"
            :key="index"
            class="search-tags__child"
            @click="selectTag(item)"
        >
            {{ item }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { defineEmits } from 'vue'

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

<style scoped lang="sass">
.search-tags
    display: flex
    flex-wrap: wrap
    justify-content: flex-start
    align-items: center
    gap: 5px

    &__child
        padding: 4px
        min-height: 40px
        line-height: 1
        border: 1px solid var(--light-100)
        border-radius: 10px
        display: flex
        align-items: center
</style>