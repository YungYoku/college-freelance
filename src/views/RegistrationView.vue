<template>
	<AuthLayout>
		<Card>
			<CardHeader>
				<CardTitle>
					Регистрация
				</CardTitle>
			</CardHeader>

			<CardContent>
				<div class="grid items-center w-full gap-2">
					<Input
						v-model.trim="form.username"
						placeholder="Имя пользователя"
						type="text"
					/>

					<Input
						v-model.trim="form.password"
						placeholder="Пароль"
						type="password"
					/>

					<Input
						v-model.trim="form.passwordConfirm"
						placeholder="Повторите пароль"
						type="password"
					/>

					<Select v-model="form.role">
						<SelectTrigger>
							<SelectValue placeholder="Выберите роль"/>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Роль</SelectLabel>
								<SelectItem value="customer">
									Заказчик
								</SelectItem>
								<SelectItem value="executor">
									Исполнитель
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</CardContent>

			<CardFooter>
				<Button
					type="submit"
					@click="register"
				>
					Отправить
				</Button>
			</CardFooter>
		</Card>
	</AuthLayout>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

import http from '@/plugins/http/index'
import AuthLayout from '@/components/layouts/AuthLayout.vue'

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const router = useRouter()

const form = reactive({
	username: '',
	password: '',
	passwordConfirm: '',
	role: 'customer'
})

const register = () => {
	if (form.password.length >= 8 && form.passwordConfirm === form.password && form.username.length) {
		http
			.post('/collections/users/records', { ...form })
			.then(() => {
				router.push('/')
			})
	}
}
</script>
