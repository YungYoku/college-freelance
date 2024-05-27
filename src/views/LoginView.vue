<template>
	<AuthLayout>
		<Card
			width="300px"
			title="Вход"
		>
			<Input
				v-model.trim="form.identity"
				label="Логин или почта"
				type="text"
			/>

			<Input
				v-model.trim="form.password"
				label="Пароль"
				type="password"
			/>

			<Skeleton
				v-if="loading"
				class="h-9"
			/>

			<Button
				v-else
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
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

import http from '@/plugins/http/index'
import { useAuthStore } from '@/stores/auth.ts'
import { UserLogin } from '@/interfaces/User.ts'
import AuthLayout from '@/components/layouts/AuthLayout.vue'

import Input from '@/components/blocks/Input.vue'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import Card from '@/components/structures/Card.vue'
import { useToast } from '@/components/ui/toast'

const auth = useAuthStore()

const router = useRouter()

const form = reactive({
	identity: '',
	password: ''
})

const { toast } = useToast()

const loading = ref(false)
const login = async () => {
	if (isLoginPossible.value) {
		loading.value = true

		await http
			.post<UserLogin>('/collections/users/auth-with-password', form)
			.then((res) => {
				auth.setToken(res.token)
				auth.setUser(res.record)
				router.push('/')
			})
			.catch(() => {
				toast({
					title: 'Ошибка авторизации'
				})
				loading.value = false
			})
	}
}

const isLoginPossible = computed(() => form.password.length >= 8 && form.identity.length)
</script>
