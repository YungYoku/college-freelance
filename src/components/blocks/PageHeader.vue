<template>
	<header>
		<router-link
			v-for="link in filteredMenu"
			:key="link.text"
			:to="link.to"
		>
			{{ link.text }}
		</router-link>

		<Button
			v-if="auth.isLoggedIn"
			@click="logout"
		>
			Выйти
		</Button>

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
	</header>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button/index.ts'
import { computed } from 'vue'

const auth = useAuthStore()

const router = useRouter()

const menu = [
	{
		text: 'Главная',
		to: '/',
		can: auth.isLoggedIn
	},
	{
		text: 'Объявления',
		to: '/offers',
		can: auth.isLoggedIn
	},
	{
		text: 'Чат',
		to: '/',
		can: auth.isLoggedIn
	},
	{
		text: 'Созданные объявления',
		to: '/made-offers',
		can: auth.isLoggedIn && (auth.isCustomer || auth.isAdmin)
	},
	{
		text: 'Выполняемые объявления',
		to: '/executing-offers',
		can: auth.isLoggedIn && (auth.isExecutor || auth.isAdmin)
	},
	{
		text: 'Создать объявление',
		to: '/new-offer',
		can: auth.isLoggedIn
	},
	{
		text: 'Профиль',
		to: '/profile',
		can: auth.isLoggedIn
	},
]

const filteredMenu = computed(() => menu.filter(item => item.can))

const logout = () => {
	localStorage.clear()
	auth.$reset()
	router.push('/login')
}
</script>

<style scoped lang="scss">
header {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100%;
    min-height: 48px;
    gap: 10px;
}</style>