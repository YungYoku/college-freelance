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
							<DropdownMenuItem disabled>
								Сообщение
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


const auth = useAuthStore()
const router = useRouter()

const logout = () => {
	localStorage.clear()
	auth.$reset()
	router.push('/login')
}
</script>
