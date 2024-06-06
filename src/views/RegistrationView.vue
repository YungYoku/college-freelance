<template>
	<AuthLayout>
		<Card
			width="300px"
			title="Регистрация"
			@keyup.enter="register"
		>
			<Input
				v-model.trim="form.email.value"
				:error="form.email.error"
				label="Почта"
				type="text"
			/>

			<Input
				v-model.trim="form.username.value"
				:error="form.username.error"
				label="Имя пользователя"
				type="text"
			/>

			<Input
				v-model.trim="form.name.value"
				:error="form.name.error"
				label="Имя"
				type="text"
			/>

			<Input
				v-model.trim="form.surname.value"
				:error="form.surname.error"
				label="Фамилия"
				type="text"
			/>

			<Input
				v-model.trim="form.password.value"
				:error="form.password.error"
				label="Пароль"
				type="password"
			/>

			<Input
				v-model.trim="form.passwordConfirm.value"
				:error="form.passwordConfirm.error"
				label="Повторите пароль"
				type="password"
			/>

			<Input
				v-model.trim="refCode"
				label="Реферальный код"
			/>

			<Select
				v-model="form.role.value"
				:error="form.role.error"
				:items="roleItems"
				label="Выберите роль"
			/>

			<Button
				:loading="loading"
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

import http from '@/plugins/http/index'
import { AuthLayout } from '@/components/layouts'
import { Card } from '@/components/structures'
import { Select, Input, Button } from '@/components/blocks'
import { User } from '@/interfaces/User.ts'
import Form from '@/plugins/form'
import { useToast } from '@/components/ui/toast'

interface RegistrationForm {
	email: string
	username: string
	name: string
	surname: string
	password: string
	passwordConfirm: string
	role: string
	energy: number
}

const form = Form<RegistrationForm>({
	email: '',
	username: '',
	name: '',
	surname: '',
	password: '',
	passwordConfirm: '',
	role: 'customer',
	energy: 100
})

const router = useRouter()
const { toast } = useToast()

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

		await http
			.post<User>('/collections/users/records', form.get())
			.then(() => {
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

const isRegistrationPossible = computed(() => {
	const password = form.password.value
	const passwordConfirm = form.passwordConfirm.value
	const username = form.username.value

	return password.length > 0 && passwordConfirm.length > 0 && username.length > 0
})
</script>
