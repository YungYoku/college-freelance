<template>
    Login

    <form @submit.prevent="login">
        <input 
			type="text"
			v-model.trim="username"
        >
        <input 
			type="password"
			v-model.trim="password"
        >

        <button type="submit">Отправить</button>
    </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import http from '@/plugins/http/index'

const username = ref('')
const password = ref('')

const login = () => {
    if (password.value.length >= 8 && username.value.length) {
        http
            .post('/collections/users/auth-with-password'   , {
                identity:username.value,
                password:password.value,
            })
            .then((res:any) => {
              console.log(res);
            })
    }
}
</script>
