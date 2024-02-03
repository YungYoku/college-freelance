<template>
    <default-layout>
        <Avatar
            size="l"
            editable
        />

        <div>Имя: {{ auth.user.name }}</div>

        <div>Фамилия: {{ auth.user.surname }}</div>
        
        <div>Рейтинг:  {{ auth.user.rating }}</div>
    </default-layout>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import Avatar from '@/components/blocks/Avatar.vue'

const auth = useAuthStore()
</script>