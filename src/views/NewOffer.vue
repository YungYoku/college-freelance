<template>
    <div class="tab">
        <Input
            v-model.trim="jobForm.title"
            placeholder="Введите название объявления"
            type="text"
        />
            
        <Textarea
            v-model.trim="jobForm.description"
            label="Описание"
        /> 
        <Input
            v-model.trim="jobForm.price"
            placeholder="Предложите цену, ₽"
            type="number"
        />
            
        <Button @click="postOffer">
            Создать объявление
        </Button>
    </div>
</template>

<script setup lang="ts">
import Input from '@/components/elements/Input.vue'
import Textarea from '@/components/elements/Textarea.vue'
import Button from '@/components/elements/Button.vue'
import http from '@/plugins/http'
import { useAuthStore } from '@/stores/auth'
import { reactive } from 'vue'

const auth = useAuthStore()

const jobForm = reactive({
    title: '',
    description: '',
    price: '',
})

const postOffer = async () => {
    console.log(auth.user.id)
    
    await http
        .post('/collections/job_offers/records/', {
            ...jobForm,
            creator: auth.user.id
        })
        .catch(error => {
            console.error(error)
        })
}
</script>

<style scoped lang="sass">

.tab
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center

    padding: 20px

    border: 1px solid grey
    border-radius: 10px
    gap: 20px

select
    padding: 2px 58px
    
    background: none
    border: 1px solid grey
    border-radius: 3px</style>


