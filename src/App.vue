<template>
	<router-view/>
	<Toaster/>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import http from './plugins/http'
import LocalStorage from '@/plugins/localStorage'
import { User } from '@/interfaces/User'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { watch } from 'vue'

const auth = useAuthStore()

const loadCustomerRating = async (id: string) => {
	await http
		.get<{user: string, rating: number}>(`/collections/rating_customers/records/${id}`)
		.then(res => {
			auth.setRating(res.rating)
		})
}

const loadExecutorRating = async (id: string) => {
	await http
		.get<{user: string, rating: number}>(`/collections/rating_executors/records/${id}`)
		.then(res => {
			auth.setRating(res.rating)
		})
}

const loadRating = async (user: User) => {
	if (user.role === 'customer') {
		await loadCustomerRating(user.id)
	} else if (user.role === 'executor') {
		await loadExecutorRating(user.id)
	}
}

const loadUserInfo = async () => {
	if (auth.isLoggedIn) {
		const userId = LocalStorage.load('user')?.id ?? ''
		if (!userId) return

		http
			.get<User>(`/collections/users/records/${userId}?expand=university,disciplines`)
			.then((user) => {
				auth.setUser(user)
				loadRating(user)
			})
	}
}
watch(() => auth.isLoggedIn, loadUserInfo, { immediate: true })
</script>

<style lang="scss">
#app {
    min-height: 100vh;
}
</style>
