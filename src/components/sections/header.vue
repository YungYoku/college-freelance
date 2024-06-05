<template>
	<header class="header">
		<Grid
			:columns="[1, 2, 1]"
		>
			<Logo class="header__logo"/>

			<JobSearch class="header__search"/>

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
		</Grid>
	</header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

import { ThemeColorToggle, UserDropdown, JobSearch, Button } from '@/components/blocks'
import { Logo, Icon } from '@/components/elements'
import Grid from '@/components/structures/grid.vue'

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
    width: 100%;
    min-height: 48px;

	padding: 5px 0;

	&__search {
		margin: 0 auto;
	}

	&__nav {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		width: 240px;

		gap: 10px;
		margin: 0 0 0 auto;
	}
}
</style>