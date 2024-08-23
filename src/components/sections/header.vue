<template>
	<header class="header">
		<Grid
			:columns-xl="[1, 2, 1]"
			:columns-s="[1, 1]"
		>
			<Logo class="header__logo"/>

			<template v-if="Screen.isLarger('s')">
				<div v-if="isSearchPage"/>
				<JobSearch v-else/>
			</template>

			<nav class="header__nav">
				<JobSearch v-if="Screen.isSize('s') && !isSearchPage"/>

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
					@click="claim"
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

import { Grid } from '@/components/structures'
import { ThemeColorToggle, UserDropdown, JobSearch, Button, Notifications } from '@/components/blocks'
import { Logo, Icon } from '@/components/elements'
import { Datetime, Http, Screen } from '@/plugins'
import { IUser } from '@/interfaces/User.ts'
import { useToast } from '@/components/ui/toast'

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

const { toast } = useToast()
const claim = async () => {
	await Http
		.post<IUser>('/claim-energy')
		.then((res) => {
			auth.setUser(res)
			toast({
				title: 'Было получено 5 энергии!'
			})
		})
		.catch(() => {
			toast({
				title: `Не прошло достаточно времени. Последняя дата получения энергии: ${Datetime.get(auth.user.checked_at)}`
			})
		})
}

const route = useRoute()
const isSearchPage = computed(() => route.path === '/search')
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