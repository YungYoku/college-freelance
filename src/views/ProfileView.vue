<template>
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

    <Textarea
        v-model="description"
        label="Описание"
    />

    <Button @click="save">
        Сохранить
    </Button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

import http from '@/plugins/http'
import Avatar from '@/components/blocks/Avatar.vue'
import Button from '@/components/elements/Button.vue'
import Textarea from '@/components/elements/Textarea.vue'

const auth = useAuthStore()
const description = ref('')

watch(() => auth.user.description, () => {
    description.value = auth.user.description
}, { immediate: true })

const save = async () => {
    await http.patch(`/collections/users/records/${auth.user.id}`, { description: description.value })
}
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
        gap: 15px</style>