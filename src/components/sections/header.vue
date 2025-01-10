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

				<router-link
					v-if="auth.isCustomer"
					to="/new-offer"
				>
					<Button
						variant="positive"
						class="w-[48px]"
					>
						<Icon
							name="plus"
							:colors="['light', 'light']"
						/>
					</Button>
				</router-link>

				<ThemeColorToggle v-if="!auth.isLoggedIn"/>

				<EnergyIndicator/>

				<Notifications v-if="auth.isLoggedIn"/>

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
import { ThemeColorToggle, UserDropdown, JobSearch, Notifications, EnergyIndicator, Button } from '@/components/blocks'
import { Logo } from '@/components/elements'
import { Screen } from '@/plugins'
import Icon from '@/components/elements/icon.vue'

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