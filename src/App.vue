<template>
    <router-view />
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import http from './plugins/http'
import LocalStorage from '@/plugins/localStorage'
import { User } from '@/interfaces/UserLogin'

const auth = useAuthStore()

const loadUserInfo = async () => {
    if (auth.isLoggedIn) {
        const userId = LocalStorage.load('user')?.id ?? ''
        if (!userId) return

        http
            .get<User>('/collections/users/records/' + userId)
            .then((data) => {
                auth.setUser(data)
            })
    }
}
loadUserInfo()

</script>
