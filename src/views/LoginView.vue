<template>
    <default-layout>
        <modal>
            <GridComp>
                <h2 style="color:black">
                    Вход
                </h2>
                <TInput
                    v-model.trim="username"
                    placeholder="Имя пользователя"
                    type="text"
                />
                <TInput
                    v-model.trim="password"
                    placeholder="Пароль"
                    type="password"
                />
                <TButton
                    type="submit"
                    @click="login"
                >
                    Отправить
                </TButton>
            </GridComp>
        </modal>
    </default-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import http from '@/plugins/http/index'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useRouter } from 'vue-router'
import { UserLogin } from '@/interfaces/UserLogin.ts'
import modal from '@/components/structures/Modal.vue'
import TInput from '@/components/structures/TInput.vue'
import TButton from '@/components/structures/TButton.vue'
import GridComp from '@/components/structures/GridComp.vue'

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
                auth.setUser(res.record)
                router.push('/')
            })
    }
}
</script>
