<template>
	<AuthLayout>
		<Card>
			<CardHeader>
				<CardTitle>
					Регистрация
				</CardTitle>
			</CardHeader>

			<CardContent>
				<div class="grid items-center w-full gap-4">
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


					<div class="flex items-center space-x-2">
						<Checkbox
							id="role"
							v-model="form.permission"
						/>
						<Label for="role">Решала</Label>
					</div>
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
} from '@/components/ui/card/index.ts'
import { Input } from '@/components/ui/input/index.ts'
import { Checkbox } from '@/components/ui/checkbox/index.ts'
import { Label } from '@/components/ui/label/index.ts'
import { Button } from '@/components/ui/button/index.ts'

const router = useRouter()

const form = reactive({
	username: '',
	password: '',
	passwordConfirm: '',
	permission: false
})

const register = () => {
	if (form.password.length >= 8 && form.passwordConfirm === form.password && form.username.length) {
		http
			.post('/collections/users/records', {
				...form,
				permission: Number(form.permission)
			})
			.then(() => {
				router.push('/')
			})
	}
}
</script>
