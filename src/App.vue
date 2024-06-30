<template>
	<router-view/>
	<Toaster/>
</template>

<script lang="ts" setup>
import { watch } from 'vue'

import { useAuthStore } from '@/stores/auth'
import { Http, LocalStorage } from '@/plugins'
import { IUser } from '@/interfaces/User'
import Toaster from '@/components/ui/toast/Toaster.vue'

const auth = useAuthStore()

const loadUserInfo = async () => {
	if (auth.isLoggedIn) {
		const userId = LocalStorage.load('user')?.id ?? ''
		if (!userId) return

		Http
			.get<IUser>(`/collections/users/records/${userId}`, {
				expand: ['notifications']
			})
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
