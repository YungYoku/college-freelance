<template>
	<router-view/>
	<Toast/>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'

import { useAuthStore } from '@/stores/auth'
import { Http, LocalStorage } from '@/plugins'
import { IUserRefresh } from '@/interfaces/User'
import { Toast } from '@/components/blocks'

const auth = useAuthStore()
const router = useRouter()

const loadUserInfo = async () => {
	if (auth.isLoggedIn) {
		Http
			.post<IUserRefresh>('/collections/users/auth-refresh', {
			}, {
				expand: ['notifications']
			})
			.then(({ token, record }) => {
				auth.setToken(token)
				auth.setUser(record)
			})
			.catch(() => {
				LocalStorage.clear()
				auth.$reset()
				router.push('/login')
			})
	}
}
watch(() => auth.isLoggedIn, loadUserInfo, { immediate: true })
</script>
