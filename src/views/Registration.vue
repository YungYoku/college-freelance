<template>
    Registration

    <form @submit.prevent = 'register'>
        <input 
			type="text"
			v-model.trim="username"
        >

        <input 
			type="password"
			v-model.trim="password"
        >

        <input 
			type="password"
			v-model.trim="passwordConfirm"
        >

        <button type="submit">Отправить</button>
    </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import http from '@/plugins/http/index'

const username = ref('')
const password = ref('')
const passwordConfirm = ref('')

const register = () => {
    if (password.value.length >= 8 && passwordConfirm.value === password.value && username.value.length) {
        http
            .post('/collections/users/records', {
                username:username.value,
                password:password.value,
                passwordConfirm: passwordConfirm.value
            })
            .then((res:any) => {
              console.log(res);
            })
    }
}
</script>
