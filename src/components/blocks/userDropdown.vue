<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="outline">
				<Icon
					name="user"
				/>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-56">
			<DropdownMenuGroup>
				<router-link :to="`/users/${auth.user.id}`">
					<DropdownMenuItem class="cursor-pointer">
						Профиль
					</DropdownMenuItem>
				</router-link>
				<router-link to="/profile">
					<DropdownMenuItem class="cursor-pointer">
						Настройки
					</DropdownMenuItem>
				</router-link>
				<DropdownMenuSeparator/>

				<router-link
					v-if="auth.isLoggedIn && auth.isCustomer"
					to="/made-offers"
				>
					<DropdownMenuItem class="cursor-pointer">
						Мои объявления
					</DropdownMenuItem>
				</router-link>
				<router-link
					v-if="auth.isLoggedIn && auth.isCustomer"
					to="/new-offer"
				>
					<DropdownMenuItem class="cursor-pointer">
						Создать объявление
					</DropdownMenuItem>
				</router-link>
				<router-link
					v-if="auth.isLoggedIn && auth.isExecutor"
					to="/executing-offers"
				>
					<DropdownMenuItem class="cursor-pointer">
						Выполняемые объявления
					</DropdownMenuItem>
				</router-link>
				<router-link
					v-if="auth.isLoggedIn"
					to="/chats"
				>
					<DropdownMenuItem class="cursor-pointer">
						Мои чаты
					</DropdownMenuItem>
				</router-link>
				<router-link
					v-if="auth.isLoggedIn && auth.isExecutor"
					to="/favorite"
				>
					<DropdownMenuItem class="cursor-pointer">
						Избранное
					</DropdownMenuItem>
				</router-link>
				<router-link
					v-if="auth.isLoggedIn && auth.isAdmin"
					to="/unverified-entities"
				>
					<DropdownMenuItem class="cursor-pointer">
						Новые сущности
					</DropdownMenuItem>
				</router-link>
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
								Ссылкка
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
</script>
