<template>
    <header>
        <router-link
            v-if="auth.isLoggedIn"
            to="/"
        >
            Main
        </router-link>

        <router-link
            v-if="!auth.isLoggedIn"
            to="/login"
        >
            Login
        </router-link>

        <router-link
            v-if="!auth.isLoggedIn"
            to="/registration"
        >
            Registration
        </router-link>

        <button
            v-if="auth.isLoggedIn"
            @click="logout"
        >
            Logout
        </button>
    </header>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth.ts'
import { useRouter } from 'vue-router'

const auth = useAuthStore()

const router = useRouter()

const logout = () => {
    localStorage.clear()
    auth.$reset()
    router.push('/login')

}
</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  gap: 10px;
}
</style>