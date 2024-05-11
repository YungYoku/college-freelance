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
				<router-link to="/profile">
					<DropdownMenuItem>
						Профиль
					</DropdownMenuItem>
				</router-link>
				<DropdownMenuItem disabled>
					Настройки
				</DropdownMenuItem>

				<DropdownMenuSeparator/>

				<router-link to="/made-offers">
					<DropdownMenuItem v-if="auth.isLoggedIn && (auth.isCustomer || auth.isAdmin)">
						Мои объявления
					</DropdownMenuItem>
				</router-link>
				<router-link to="/new-offer">
					<DropdownMenuItem v-if="auth.isLoggedIn && (auth.isCustomer || auth.isAdmin)">
						Создать объявление
					</DropdownMenuItem>
				</router-link>
				<router-link to="/executing-offers">
					<DropdownMenuItem v-if="auth.isLoggedIn && (auth.isExecutor || auth.isAdmin)">
						Выполняемые объявления
					</DropdownMenuItem>
				</router-link>
			</DropdownMenuGroup>

			<DropdownMenuSeparator/>

			<DropdownMenuGroup>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>
						Пригласить пользователей
					</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent>
							<DropdownMenuItem @click="copyRefLink">
								Ссылкка
							</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
			</DropdownMenuGroup>

			<DropdownMenuSeparator/>

			<DropdownMenuItem disabled>
				Поддержка
			</DropdownMenuItem>

			<DropdownMenuSeparator/>

			<DropdownMenuItem @click="logout">
				Выйти
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useToast } from '@/components/ui/toast/use-toast'

import { useAuthStore } from '@/stores/auth.ts'
import { Button } from '@/components/ui/button'
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
import Icon from '@/components/elements/Icon.vue'
import http from '@/plugins/http'
import { ReferralCode } from '@/interfaces/ReferralCode.ts'
import { User } from '@/interfaces/User.ts'


const auth = useAuthStore()
const router = useRouter()
const { toast } = useToast()

const generateRefCode = async () => {
	let referral_code = ''
	await http
		.post<ReferralCode>('/collections/referral_codes/records')
		.then((res) => {
			referral_code = res.id
		})

	await http
		.patch<User>(`/collections/users/records/${auth.user.id}`, {
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
	localStorage.clear()
	auth.$reset()
	router.push('/login')
}
</script>
