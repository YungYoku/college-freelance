<template>
    <default-layout>
        Login

        <form @submit.prevent="login">
            <input
                v-model.trim="username"
                type="text"
            />
            <input
                v-model.trim="password"
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

const username = ref('')
const password = ref('')

const login = () => {
    if (password.value.length >= 8 && username.value.length) {
        http
            .post('/collections/users/auth-with-password', {
                identity: username.value,
                password: password.value,
            })
            .then((res: any) => {
                console.log(res)
            })
    }
}
</script>
