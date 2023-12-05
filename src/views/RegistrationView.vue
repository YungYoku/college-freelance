<template>
    <default-layout>
        <modal>
            <GridComp>
                <h2>
                    Регистрация
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

                <TInput
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

                <TButton 
                    type="submit"
                    @click="register"
                >
                    Отправить
                </TButton>
            </GridComp>
        </modal>
    </default-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import http from '@/plugins/http/index'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import Modal from '@/components/structures/Modal.vue'
import TInput from '@/components/structures/TInput.vue'
import TButton from '@/components/structures/TButton.vue'
import GridComp from '@/components/structures/GridComp.vue'


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

<style>

label, h2{
    color: black;
}

</style>
