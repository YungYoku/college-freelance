<template>
	<header class="header">
		<Grid
			:columns-xl="[1, 2, 1]"
			:columns-s="[1, 1]"
		>
			<Logo class="header__logo"/>

			<JobSearch v-if="Screen.isLarger('s')"/>

			<nav class="header__nav">
				<JobSearch v-if="Screen.isSize('s')"/>

				<template v-if="!auth.isLoggedIn">
					<router-link
						v-for="link in authLinks"
						:key="link.text"
						:to="link.to"
					>
						{{ link.text }}
					</router-link>
				</template>

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

				<Notifications v-if="auth.isLoggedIn"/>

				<ThemeColorToggle v-if="!auth.isLoggedIn || Screen.isLarger('s')"/>

				<UserDropdown v-if="auth.isLoggedIn"/>
			</nav>
		</Grid>
	</header>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth.ts'

import { Grid } from '@/components/structures'
import { ThemeColorToggle, UserDropdown, JobSearch, Button, Notifications } from '@/components/blocks'
import { Logo, Icon } from '@/components/elements'
import { Screen } from '@/plugins'

const auth = useAuthStore()

const authLinks = [
	{
		text: 'Вход',
		to: '/login',
	},
	{
		text: 'Регистрация',
		to: '/registration',
	},
]
</script>

<style scoped lang="scss">
.header {
    width: 100%;
    min-height: 48px;
	padding: 5px 0;

	&__nav {
		display: flex;
		justify-content: flex-end;
		align-items: center;

		gap: 10px;

		margin: 0 0 0 auto;
	}
}
</style>