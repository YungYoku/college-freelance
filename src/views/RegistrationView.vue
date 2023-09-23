<template>
    <default-layout>
        Registration

        <form @submit.prevent="register">
            <input
                v-model.trim="username"
                placeholder="Username"
                type="text"
            />

            <input
                v-model.trim="password"
                placeholder="Password"
                type="password"
            />

            <input
                v-model.trim="passwordConfirm"
                placeholder="Repeat password"
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
const passwordConfirm = ref('')

const register = () => {
    if (password.value.length >= 8 && passwordConfirm.value === password.value && username.value.length) {
        http
            .post('/collections/users/records', {
                username: username.value,
                password: password.value,
                passwordConfirm: passwordConfirm.value
            })
            .then((res: any) => {
                console.log(res)
            })
    }
}
</script>
