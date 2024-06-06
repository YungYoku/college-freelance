<template>
	<AuthLayout>
		<Card
			width="300px"
			title="Вход"
			@keyup.enter="login"
		>
			<Input
				v-model.trim="form.identity.value"
				:error="form.identity.error"
				label="Логин или почта"
				type="text"
			/>

			<Input
				v-model.trim="form.password.value"
				:error="form.password.error"
				label="Пароль"
				type="password"
			/>

			<Button
				:loading="loading"
				type="submit"
				@click="login"
			>
				Войти
			</Button>

			<div class="mt-2 text-center text-sm">
				Нет аккаунта?
				<router-link
					to="/registration"
					class="underline"
				>
					Зарегистрироваться
				</router-link>
			</div>

			<router-link
				class="text-center text-sm underline"
				to="/login"
			>
				Забыли пароль?
			</router-link>
		</Card>
	</AuthLayout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth.ts'
import { UserLogin } from '@/interfaces/User.ts'
import { AuthLayout } from '@/components/layouts'
import { Card } from '@/components/structures'
import { Input, Button } from '@/components/blocks'
import { useToast } from '@/components/ui/toast'
import http from '@/plugins/http'
import Form from '@/plugins/form'

interface LoginForm {
	identity: string
	password: string
}

const form = Form<LoginForm>({
	identity: '',
	password: ''
})

const auth = useAuthStore()
const router = useRouter()
const { toast } = useToast()

const loading = ref(false)
const login = async () => {
	if (isLoginPossible.value) {
		loading.value = true
		form.clearErrors()

		await http
			.post<UserLogin>('/collections/users/auth-with-password', form.get())
			.then((res) => {
				auth.setToken(res.token)
				auth.setUser(res.record)
				router.push('/')
			})
			.catch(({ data }) => {
				form.setErrors(data)

				toast({
					title: 'Ошибка авторизации'
				})

				loading.value = false
			})
	}
}

const isLoginPossible = computed(() => {
	const password = form.password.value
	const identity = form.identity.value

	return password.length >= 0 && identity.length > 0
})
</script>
