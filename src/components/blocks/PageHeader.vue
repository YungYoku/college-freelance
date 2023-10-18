<template>
    <header>
        <router-link
            v-if="auth.isLoggedIn"
            to="/"
        >
            Биржа
        </router-link>

        <router-link
            v-if="auth.isLoggedIn"
            to="/"
        >
            Чат
        </router-link>

        <router-link
            v-if="auth.isLoggedIn"
            to="/"
        >
            Мои объявления
        </router-link>

        <router-link
            v-if="!auth.isLoggedIn"
            to="/login"
        >
            Вход
        </router-link>

        <router-link
            v-if="!auth.isLoggedIn"
            to="/registration"
        >
            Регистрация
        </router-link>

        <router-link
            v-if="auth.isLoggedIn"
            to="/profile"
        >
            Профиль
        </router-link>

        <button
            v-if="auth.isLoggedIn"
            @click="logout"
        >
            Выйти
        </button>
    </header>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
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
  min-height: 48px;
  gap: 10px;
}
</style>