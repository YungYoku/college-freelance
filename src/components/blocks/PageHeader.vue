<template>
	<header class="header">
		<router-link
			to="/"
			class="header__logo"
		>
			<img
				src="@/assets/img/onyx.webp"
				alt=""
			>
		</router-link>

		<JobSearch/>

		<nav class="header__nav">
			<router-link
				v-for="link in filteredMenu"
				:key="link.text"
				:to="link.to"
			>
				{{ link.text }}
			</router-link>


			<Button
				v-if="auth.isLoggedIn"
				variant="outline"
			>
				<Icon
					name="energy"
					class="mr-1"
				/>
				{{ auth.user.energy }}
			</Button>
			
			<ThemeColorToggle/>

			<UserDropdown v-if="auth.isLoggedIn"/>
		</nav>
	</header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

import ThemeColorToggle from '@/components/blocks/ThemeColorToggle.vue'
import UserDropdown from '@/components/blocks/UserDropdown.vue'
import JobSearch from '@/components/blocks/JobSearch.vue'
import { Button } from '@/components/ui/button'
import Icon from '@/components/elements/Icon.vue'

const auth = useAuthStore()

const menu = [
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
</script>

<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    min-height: 48px;
    gap: 10px;

	padding: 5px 0;

	&__logo {
		max-width: 40px;
		margin-right: 200px;
		padding: 2px 4px;

		background: #ffffff;
		border-radius: 5px;
		
		img {
			max-width: 100%;
		}
	}

	&__nav {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		width: 240px;

		gap: 10px;
	}
}
</style>