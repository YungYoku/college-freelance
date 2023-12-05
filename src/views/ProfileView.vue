<template>
    <default-layout>
        <div>Имя: {{ auth.user.name }}</div>
        <div>Рейтинг</div>
        <div>Мои объявления</div>
        <div>Резюме</div>
        <div>Выполненные заказы</div>
    </default-layout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>