<template>
	<AuthLayout>
		<Card
			width="300px"
			title="Регистрация"
		>
			<Input
				v-model.trim="form.email"
				placeholder="Почта"
				type="text"
			/>

			<Input
				v-model.trim="form.username"
				placeholder="Имя пользователя"
				type="text"
			/>

			<Input
				v-model.trim="form.name"
				placeholder="Имя"
				type="text"
			/>

			<Input
				v-model.trim="form.surname"
				placeholder="Фамилия"
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

			<Input
				v-model.trim="refCode"
				placeholder="Реферальный код"
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

			<Skeleton
				v-if="loading"
				class="h-9"
			/>

			<Button
				v-else
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import Input from '@/components/blocks/Input.vue'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
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
