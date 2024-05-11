<template>
	<div class="flex relative max-w-screen-md w-full gap-2 align-center flex-col">
		<Button
			v-if="auth.isAdmin || isItMyProfile"
			class="absolute right-0 top-10"
			@click="router.push(`/profile`)"
		>
			Изменить
		</Button>
		<div class="flex gap-4 items-center">
			<Avatar
				size="l"
				:image="`users/${user?.id}/${user?.avatar}`"
			/>

			<div class="flex flex-col align-center gap-4">
				<Skeleton
					v-if="loading"
					class="h-9"
				/>
				<div v-else>
					Имя: {{ user?.name }}
				</div>

				<Skeleton
					v-if="loading"
					class="h-9"
				/>
				<div v-else>
					Фамилия: {{ user?.surname }}
				</div>

				<Skeleton
					v-if="loading"
					class="h-9"
				/>
				<div v-else>
					Рейтинг:  {{ user?.rating }}
				</div>
			</div>
		</div>

		<Skeleton
			v-if="loading"
			class="h-9"
		/>
		<div v-else>
			{{ user?.description }}
		</div>

		<Skeleton
			v-if="loading"
			class="h-9"
		/>
		<div v-else>
			{{ user?.university }}
		</div>

		<Skeleton
			v-if="loading"
			class="h-9"
		/>
		<div v-else>
			{{ user?.disciplines }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'
import { useRouter } from 'vue-router'

import http from '@/plugins/http'
import Avatar from '@/components/blocks/Avatar.vue'
import { User } from '@/interfaces/User.ts'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const user = ref<User | null>(null)
const isItMyProfile = ref(false)
const auth = useAuthStore()

//const isItMyProfile = computed(() => offer.value.creator === authStore.user.id)
const loadUser = async () => {
	await http
		.get<User>(`/collections/users/records/${route.params.id}`)
		.then(res => {
			user.value = res
			isItMyProfile.value = user.value.id === auth.user.id
		})

	loading.value = false
}
loadUser()
</script>
