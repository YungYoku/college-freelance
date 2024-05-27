<template>
	<AuthLayout>
		<Card
			width="300px"
			title="Регистрация"
		>
			<Input
				v-model.trim="form.email"
				label="Почта"
				type="text"
			/>

			<Input
				v-model.trim="form.username"
				label="Имя пользователя"
				type="text"
			/>

			<Input
				v-model.trim="form.name"
				label="Имя"
				type="text"
			/>

			<Input
				v-model.trim="form.surname"
				label="Фамилия"
				type="text"
			/>

			<Input
				v-model.trim="form.password"
				label="Пароль"
				type="password"
			/>

			<Input
				v-model.trim="form.passwordConfirm"
				label="Повторите пароль"
				type="password"
			/>

			<Input
				v-model.trim="refCode"
				label="Реферальный код"
			/>

			<Select
				v-model="form.role"
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
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

import http from '@/plugins/http/index'
import AuthLayout from '@/components/layouts/AuthLayout.vue'

import Card from '@/components/structures/Card.vue'
import Select from '@/components/blocks/Select.vue'
import Input from '@/components/blocks/Input.vue'
import Button from '@/components/blocks/Button.vue'
import { User } from '@/interfaces/User.ts'

const router = useRouter()

const loading = ref(false)

const form = reactive({
	email: '',
	username: '',
	name: '',
	surname: '',
	password: '',
	passwordConfirm: '',
	role: 'customer',
	energy: 100
})

const roleItems = [
	{ value: 'customer', text: 'Заказчик' },
	{ value: 'executor', text: 'Исполнитель' }
]

const refCode = ref('')
refCode.value = router.currentRoute.value.query.ref as string

const register = async () => {
	if (isRegistrationPossible.value) {
		loading.value = true

		await http
			.post<User>('/collections/users/records', { ...form })
			.then(() => {
				router.push('/')
			})
			.catch(() => {
				loading.value = false
			})
	}
}

const isRegistrationPossible = computed(() => {
	return form.password.length >= 8 && form.passwordConfirm === form.password && form.username.length
})
</script>
