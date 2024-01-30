<template>
    <DefaultLayout>
        <Modal>
            <Grid>
                <Title>Регистрация</Title>

                <Input
                    v-model.trim="form.username"
                    placeholder="Имя пользователя"
                    type="text"
                />

                <Input
                    v-model.trim="form.password"
                    placeholder="Пароль"
                    type="password"
                />

                <Input
                    v-model.trim="form.passwordConfirm"
                    placeholder="Повторите пароль"
                    type="password"
                />

                <Checkbox
                    v-model="form.permission"
                    label="Решала"
                />

                <Button 
                    type="submit"
                    @click="register"
                >
                    Отправить
                </Button>
            </Grid>
        </Modal>
    </DefaultLayout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import http from '@/plugins/http/index'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import Modal from '@/components/structures/Modal.vue'
import Grid from '@/components/structures/Grid.vue'
import Input from '@/components/elements/Input.vue'
import Checkbox from '@/components/elements/Checkbox.vue'
import Button from '@/components/elements/Button.vue'
import Title from '@/components/elements/Title.vue'


const router = useRouter()

const form = reactive({
    username: '',
    password: '',
    passwordConfirm: '',
    permission: false
})

const register = () => {
    if (form.password.length >= 8 && form.passwordConfirm === form.password && form.username.length) {
        http
            .post('/collections/users/records', {
                ...form,
                permission: Number(form.permission)
            })
            .then(() => {
                router.push('/')
            })
    }
}
</script>
