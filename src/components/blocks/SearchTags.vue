<template>
    <div class="container">
        <div class="search-tags">
            <div
                v-for="(item, index) in items"
                :key="index"
                class="child"
                @click="selectTag(item)"
            >
                {{ item }}
            </div>
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
.container
    margin: 0 auto
    max-width: 80%
.search-tags
    
    display: flex
    flex-flow: row wrap
    align-items: center
    justify-content: start
.child
    border: 1px solid
    border-radius: 10px
    padding: 2px 4px
    margin: 0 2px
    border-color: #aaa
</style>
