<template>
	<Dropdown :items>
		<Avatar
			class="cursor-pointer"
			self
		/>
	</Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useColorMode } from '@vueuse/core'
import { useToast } from '@/stores/toast'

import { Dropdown } from '@/components/structures'
import { Avatar } from '@/components/blocks'
import { useAuthStore } from '@/stores/auth.ts'
import { Http, LocalStorage } from '@/plugins'
import { IReferralCode } from '@/interfaces/ReferralCode.ts'
import { IUser } from '@/interfaces/User.ts'

const auth = useAuthStore()
const router = useRouter()
const toast = useToast()

const mode = useColorMode({ selector: 'body' })
const currentTheme = computed(() => mode.state.value)
const isLight = computed(() => currentTheme.value === 'light')
const toggle = () => {
	if (currentTheme.value === 'light') {
		mode.value = 'dark'
	} else {
		mode.value = 'light'
	}
}

const generateRefCode = async () => {
	let referral_code = ''
	await Http
		.post<IReferralCode>('/collections/referral_codes/records')
		.then((res) => {
			referral_code = res.id
		})

	await Http
		.patch<IUser>(`/collections/users/records/${auth.user.id}`, {
			referral_code
		})
		.then((res) => {
			auth.setUser(res)
		})
}

const copyRefLink = async () => {
	if (auth.user.referral_code?.length === 0) {
		await generateRefCode()
	}

	await navigator.clipboard.writeText(`${window.location.origin}/registration?ref=${auth.user.referral_code}`)
	toast.set('Ссылка скопирована!')
}

const logout = () => {
	LocalStorage.clear()
	auth.$reset()
	router.push('/login')
}

const items = computed(() => [
	[
		{
			text: 'Профиль',
			to: `/users/${auth.user.id}`
		},
		{
			text: 'Настройки',
			to: '/profile'
		},
	],
	[
		{
			text: 'Мои объявления',
			to: '/made-offers',
			can: auth.isCustomer
		},
		{
			text: 'Создать объявление',
			to: '/new-offer',
			can: auth.isCustomer
		},
		{
			text: 'Выполняемые объявления',
			to: '/executing-offers',
			can: auth.isExecutor
		},
		{
			text: 'Мои чаты',
			to: '/chats'
		},
		{
			text: 'Избранное',
			to: '/favorite',
			can: auth.isExecutor
		},
		{
			text: 'Новые сущности',
			to: '/unverified-entities',
			can: auth.isAdmin
		}
	],
	[
		{
			text: 'Тема: ' + (isLight.value ? 'светлая' : 'темная'),
			action: toggle
		},
		{
			text: 'Пригласить друзей',
			action: copyRefLink
		}
	],
	[
		{
			text: 'Выйти',
			action: logout
		}
	]
])
</script>
