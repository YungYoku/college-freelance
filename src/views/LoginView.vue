<template>
	<AuthLayout>
		<Card>
			<CardHeader>
				<CardTitle>
					Вход
				</CardTitle>
			</CardHeader>

			<CardContent>
				<div class="grid items-center w-full gap-4">
					<Input
						v-model.trim="form.identity"
						placeholder="Имя пользователя"
						type="text"
					/>

					<Input
						v-model.trim="form.password"
						placeholder="Пароль"
						type="password"
					/>
				</div>
			</CardContent>

			<CardFooter>
				<Button
					type="submit"
					@click="login"
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
import { useAuthStore } from '@/stores/auth.ts'
import { UserLogin } from '@/interfaces/User.ts'
import AuthLayout from '@/components/layouts/AuthLayout.vue'

import { Input } from '@/components/ui/input/index.ts'
import { Button } from '@/components/ui/button/index.ts'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card/index.ts'

const auth = useAuthStore()

const router = useRouter()

const form = reactive({
	identity: '',
	password: ''
})

const login = () => {
	if (form.password.length >= 8 && form.identity.length) {
		http
			.post<UserLogin>('/collections/users/auth-with-password', form)
			.then((res) => {
				auth.setToken(res.token)
				auth.setUser(res.record)
				router.push('/')
			})
	}
}
</script>
