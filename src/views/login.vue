<template>
	<AuthLayout class="login">
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
				:disabled="loading"
				type="submit"
				@click="login"
			>
				Войти
			</Button>

			<template #footer>
				<Text
					size="xs"
					class="login__no-account"
				>
					Нет аккаунта?
					<router-link
						to="/registration"
						class="login__link"
					>
						Зарегистрироваться
					</router-link>
				</Text>

				<router-link
					class="login__link"
					to="/login"
				>
					<Text size="xs">
						Забыли пароль?
					</Text>
				</router-link>
			</template>
		</Card>
	</AuthLayout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'
import { useToast } from '@/stores/toast'

import { AuthLayout } from '@/components/layouts'
import { Card } from '@/components/structures'
import { Input, Button } from '@/components/blocks'
import { Text } from '@/components/elements'
import { Http, Form } from '@/plugins'
import { IUserLogin } from '@/interfaces/User.ts'

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
const toast = useToast()

const loading = ref(false)
const login = async () => {
	if (isLoginPossible.value) {
		loading.value = true
		form.clearErrors()

		await Http
			.post<IUserLogin>('/collections/users/auth-with-password', form.get())
			.then((res) => {
				auth.setToken(res.token)
				auth.setUser(res.record)
				router.push('/')
			})
			.catch(({ data }) => {
				form.setErrors(data)

				toast.set('Ошибка авторизации')

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

<style scoped lang="scss">
.login {
	&__no-account {
		text-align: center;
	}

	&__link {
		text-align: center;
		text-decoration: underline;
	}
}
</style>