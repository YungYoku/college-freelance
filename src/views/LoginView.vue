<template>
    <default-layout>
        <Modal>
            <Grid>
                <Title>Вход</Title>

                <Input
                    v-model.trim="form.identity"
                    placeholder="Имя пользователя"
                    type="text"
                />

                <Input
                    v-model.trim="form.password"
                    placeholder="Пароль"
                    type="password"
                />

                <Button
                    type="submit"
                    @click="login"
                >
                    Отправить
                </Button>
            </Grid>
        </Modal>
    </default-layout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import http from '@/plugins/http/index'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import { useAuthStore } from '@/stores/auth.ts'
import { UserLogin } from '@/interfaces/User.ts'
import Modal from '@/components/structures/Modal.vue'
import Grid from '@/components/structures/Grid.vue'
import Input from '@/components/elements/Input.vue'
import Button from '@/components/elements/Button.vue'
import Title from '@/components/elements/Title.vue'

const auth = useAuthStore()

const router = useRouter()

const form = reactive({
    identity: '',
    password: ''
})

const login = () => {
    if (form.password.length >= 8 && form.identity.length) {
        http
            .post<UserLogin>('/collections/users/auth-with-password', form)
            .then((res) => {
                auth.setToken(res.token)
                auth.setUser(res.record)
                router.push('/')
            })
    }
}
</script>
