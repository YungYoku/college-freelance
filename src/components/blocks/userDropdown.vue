<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="outline">
				<Icon name="user"/>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-56">
			<DropdownMenuGroup>
				<template
					v-for="link in links"
					:key="link.title"
				>
					<DropdownMenuItem>
						<router-link
							class="block w-full h-full"
							:to="link.to"
						>
							{{ link.title }}
						</router-link>
					</DropdownMenuItem>

					<DropdownMenuSeparator v-if="link.separateAfter"/>
				</template>
			</DropdownMenuGroup>

			<DropdownMenuSeparator/>

			<DropdownMenuGroup>
				<DropdownMenuItem
					class="cursor-pointer"
					@click="toggle"
				>
					Тема: {{ isLight? 'светлая' : 'темная' }}
				</DropdownMenuItem>

				<DropdownMenuSub>
					<DropdownMenuSubTrigger class="cursor-pointer">
						Пригласить пользователей
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent>
							<DropdownMenuItem
								class="cursor-pointer"
								@click="copyRefLink"
							>
								Ссылка
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
			</DropdownMenuGroup>

			<DropdownMenuSeparator/>

			<DropdownMenuItem
				class="cursor-pointer"
				@click="logout"
			>
				Выйти
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useColorMode } from '@vueuse/core'
import { useToast } from '@/components/ui/toast/use-toast'

import { useAuthStore } from '@/stores/auth.ts'
import { Button } from '@/components/blocks'
import { Icon } from '@/components/elements'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Http, LocalStorage } from '@/plugins'
import { IReferralCode } from '@/interfaces/ReferralCode.ts'
import { IUser } from '@/interfaces/User.ts'

const auth = useAuthStore()
const router = useRouter()
const { toast } = useToast()

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
	toast({
		title: 'Ссылка скопирована!'
	})
}

const logout = () => {
	LocalStorage.clear()
	auth.$reset()
	router.push('/login')
}

const links = computed(() => {
	const items = [
		{
			title: 'Профиль',
			to: `/users/${auth.user.id}`,
			can: true
		},
		{
			title: 'Настройки',
			to: '/profile',
			can: true,
			separateAfter: true
		},
		{
			title: 'Мои объявления',
			to: '/made-offers',
			can: auth.isCustomer
		},
		{
			title: 'Создать объявление',
			to: '/new-offer',
			can: auth.isCustomer
		},
		{
			title: 'Выполняемые объявления',
			to: '/executing-offers',
			can: auth.isExecutor
		},
		{
			title: 'Мои чаты',
			to: '/chats'
		},
		{
			title: 'Избранное',
			to: '/favorite',
			can: auth.isExecutor
		},
		{
			title: 'Новые сущности',
			to: '/unverified-entities',
			can: auth.isAdmin
		}
	]

	return items.filter(item => item.can)
})
</script>
