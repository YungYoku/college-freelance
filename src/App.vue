<template>
	<router-view/>
	<Toaster/>
</template>

<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth'
import http from './plugins/http'
import LocalStorage from '@/plugins/localStorage'
import { IUser } from '@/interfaces/User'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { watch } from 'vue'

const auth = useAuthStore()

const loadUserInfo = async () => {
	if (auth.isLoggedIn) {
		const userId = LocalStorage.load('user')?.id ?? ''
		if (!userId) return

		http
			.get<IUser>(`/collections/users/records/${userId}`)
			.then((user) => {
				auth.setUser(user)
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
