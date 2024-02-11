<template>
    <default-layout>
        <div class="profile main-info">
            <Avatar
                size="l"
                editable
            />
            <div class="profile__name-rate">
                <div>Имя: {{ auth.user.name }}</div>
                <div>Фамилия: {{ auth.user.surname }}</div>
                
                <div>Рейтинг:  {{ auth.user.rating }}</div>
            </div>
        </div>

        <textarea
            id=""
            v-model="text"
            :src="description"
            name="profile-description"
            cols="30"
            rows="10"
        ></textarea>
        <button 
            @click="submit"
        >
            Сохранить
        </button>
    </default-layout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { computed } from 'vue'
import { AxiosResponse } from 'axios'
import { useAuthStore } from '@/stores/auth'

import http from '@/plugins/http'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import Avatar from '@/components/blocks/Avatar.vue'

const auth = useAuthStore()

const text = ref('')

const description = computed(()=>{
    if (auth.user.description) return `users/${auth.user.id}/${auth.user.description}`    
    return ''
})

const loadDescription = async() => {
    try {
        const response: AxiosResponse<{ items: { description: string }[] }> = await http.get(`/collections/users/records/${auth.user.id}`)
        console.log('response', response.items[0])
    
        text.value = response.items[0].description
    } catch (error) {
        console.log('Ошибка:', error)
        
    }
}

const submit = async () => {
    try {
        await http.patch(`/collections/users/records/${auth.user.id}`, { description: text.value })
        console.log('description successfully saved')

    } catch (error) {
        console.error('Ошибка сохранения текста:', error)    
    }
    console.log(text.value)

}

onMounted(loadDescription)
</script>

<style scoped lang="sass">

textarea
    width: 50%
    resize: vertical

.profile
    display: flex
    align-items: center
    gap: 50px

    &__name-rate    
        display: flex
        flex-direction: column
        align-items: flex-start
        gap: 15px
</style>