<template>
	<AuthLayout>
		<Card
			width="300px"
			title="Регистрация"
			class="mb-auto mt-auto"
			@keyup.enter="register"
		>
			<Input
				v-model.trim="form.email.value"
				:error="form.email.error"
				label="Почта"
				type="text"
			/>

			<Input
				v-model.trim="form.name.value"
				:error="form.name.error"
				label="Имя"
				type="text"
			/>

			<Input
				v-model.trim="form.username.value"
				:error="form.username.error"
				label="Имя пользователя"
				type="text"
			/>

			<Input
				v-model.trim="form.password.value"
				:error="form.password.error"
				label="Пароль"
				type="password"
				autocomplete="new-password"
			/>

			<Input
				v-model.trim="form.passwordConfirm.value"
				:error="form.passwordConfirm.error"
				label="Повторите пароль"
				type="password"
				autocomplete="new-password"
			/>

			<Input
				v-model.trim="refCode"
				label="Реферальный код"
			/>

			<Select
				v-model="form.role.value"
				:error="form.role.error"
				:items="roleItems"
				label="Роль"
			/>

			<Button
				:disabled="loading"
				type="submit"
				@click="register"
			>
				Зарегистрироваться
			</Button>

			<div class="mt-2 text-center text-sm">
				Есть аккаунт?
				<router-link
					to="/login"
					class="underline"
				>
					Войти
				</router-link>
			</div>
		</Card>
	</AuthLayout>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from '@/stores/toast'

import { Http, Form } from '@/plugins'
import { AuthLayout } from '@/components/layouts'
import { Card } from '@/components/structures'
import { Select, Input, Button } from '@/components/blocks'
import { IUser } from '@/interfaces/User.ts'

interface RegistrationForm {
	email: string
	name: string
	username: string
	password: string
	passwordConfirm: string
	role: string
	energy: number
	checked_at: Date
}

const form = Form<RegistrationForm>({
	email: '',
	name: '',
	username: '',
	password: '',
	passwordConfirm: '',
	role: 'customer',
	energy: 100,
	checked_at: new Date()
})

const router = useRouter()
const toast = useToast()

const loading = ref(false)

const roleItems = [
	{ value: 'customer', text: 'Заказчик' },
	{ value: 'executor', text: 'Исполнитель' }
]

const refCode = ref('')
refCode.value = router.currentRoute.value.query.ref as string

const register = async () => {
	if (isRegistrationPossible.value) {
		loading.value = true
		form.clearErrors()

		await Http
			.post<IUser>('/collections/users/records', form.get())
			.then(() => {
				router.push('/login')
			})
			.catch(({ data }) => {
				form.setErrors(data)

				toast.set('Ошибка авторизации')

				loading.value = false
			})
	}
}

const isRegistrationPossible = computed(() => {
	const password = form.password.value
	const passwordConfirm = form.passwordConfirm.value
	const username = form.username.value

	return password.length > 0 && passwordConfirm.length > 0 && username.length > 0
})
</script>
