<template>
	<header class="header">
		<router-link
			to="/"
			class="header__logo"
		>
			<img
				src="@/assets/img/onyx.png"
				alt=""
			>
		</router-link>

		<nav class="header__nav">
			<router-link
				v-for="link in filteredMenu"
				:key="link.text"
				:to="link.to"
			>
				{{ link.text }}
			</router-link>
		</nav>

		<Button
			v-if="auth.isLoggedIn"
			@click="logout"
		>
			Выйти
		</Button>
	</header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import { Button } from '@/components/ui/button'

const auth = useAuthStore()

const router = useRouter()

const menu = [
	{
		text: 'Поиск',
		to: '/offers',
		can: auth.isLoggedIn
	},
	{
		text: 'Мои объявления',
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
		can: auth.isLoggedIn && (auth.isCustomer || auth.isAdmin)
	},
	{
		text: 'Профиль',
		to: '/profile',
		can: auth.isLoggedIn
	},
	{
		text: 'Вход',
		to: '/login',
		can: !auth.isLoggedIn
	},
	{
		text: 'Регистрация',
		to: '/registration',
		can: !auth.isLoggedIn
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
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    min-height: 48px;
    gap: 10px;

	padding: 5px 10px;

	&__logo {
		max-width: 40px;
		margin-right: 32px;
		padding: 2px 4px;

		background: #ffffff;
		border-radius: 5px;
		
		img {
			max-width: 100%;
		}
	}

	&__nav {
		display: flex;
		justify-content: center;
		align-items: center;

		gap: 10px;
	}
}
</style>