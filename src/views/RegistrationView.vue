<template>
    <default-layout>
        <form @submit.prevent="register">
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

            <input
                v-model.trim="passwordConfirm"
                placeholder="Повторите пароль"
                type="password"
            />

            <label>
                <input
                    v-model="permission"
                    type="checkbox"
                    value="1"
                />
                Решала
            </label>

            <button type="submit">
                Отправить
            </button>
        </form>
    </default-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/plugins/http/index'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

const router = useRouter()

const username = ref('')
const password = ref('')
const passwordConfirm = ref('')
const permission = ref(0)

const register = () => {
    if (password.value.length >= 8 && passwordConfirm.value === password.value && username.value.length) {
        http
            .post('/collections/users/records', {
                username: username.value,
                password: password.value,
                passwordConfirm: passwordConfirm.value,
                permission: Number(permission.value)
            })
            .then(() => {
                router.push('/')
            })
    }
}
</script>
