<template>
    <default-layout>
        <form @submit.prevent="login">
            <input
                v-model.trim="username"
                placeholder="Имя пользователя"
                type="text"
            />
            <input
                v-model.trim="password"
                placeholder="Пароль"
                type="password"
            />

            <button type="submit">
                Отправить
            </button>
        </form>
    </default-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import http from '@/plugins/http/index'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useRouter } from 'vue-router'
import { UserLogin } from '@/interfaces/UserLogin.ts'

const auth = useAuthStore()

const router = useRouter()

const username = ref('')
const password = ref('')

const login = () => {
    if (password.value.length >= 8 && username.value.length) {
        http
            .post<UserLogin>('/collections/users/auth-with-password', {
                identity: username.value,
                password: password.value,
            })
            .then((res) => {
                auth.setToken(res.token)
                router.push('/')
            })
    }
}
</script>
