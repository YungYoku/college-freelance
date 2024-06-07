<template>
	<div class="flex relative max-w-screen-lg w-full gap-2 align-center flex-col">
		<Button
			v-if="auth.isAdmin || isItMyProfile"
			class="absolute right-0 top-0"
			@click="router.push(`/profile`)"
		>
			Изменить
		</Button>

		<div class="flex gap-4 items-center">
			<Avatar
				size="l"
				:image="`${user?.id}/${user?.avatar}`"
			/>

			<div class="flex flex-col align-center gap-4">
				<Skeleton
					v-if="loading"
					class="h-10 w-[340px]"
				/>
				<div
					v-else
					class="flex items-end text-4xl"
				>
					{{ user?.name }} {{ user?.surname }}
				</div>
				<div class="flex justify-between gap-4">
					<Skeleton
						v-if="loading"
						class="h-6 w-[100px]"
					/>
					<div v-else>
						Рейтинг: {{ user?.rating }}
					</div>

					<Skeleton
						v-if="loading"
						class="h-6 w-[100px]"
					/>
					<div v-else>
						Отзывы:
					</div>

					<Skeleton
						v-if="loading"
						class="h-6 w-[100px]"
					/>
					<div v-else>
						Выполненных заданий:
					</div>
				</div>

				<Skeleton
					v-if="loading"
					class="h-6"
				/>
				<div v-else>
					{{ universityName }}
				</div>

				<Skeleton
					v-if="loading"
					class="h-6"
				/>
				<div v-else>
					Дисциплины: {{ disciplineNames }}
				</div>
			</div>
		</div>

		<Text
			:loading="loading"
			size="m"
			class="mt-8"
		>
			Обо мне
		</Text>
		<Skeleton
			v-if="loading"
			class="h-6"
		/>
		<div
			v-else
			class="text-base"
		>
			{{ user?.description }}
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

import http from '@/plugins/http'
import { Avatar, Button } from '@/components/blocks'
import { Text } from '@/components/elements'
import { User } from '@/interfaces/User.ts'
import { Skeleton } from '@/components/ui/skeleton'

const route = useRoute()
const router = useRouter()
const disciplineNames = ref()
const universityName = ref()

const loading = ref(true)
const user = ref<User | null>(null)
const isItMyProfile = ref(false)
const auth = useAuthStore()

const loadUser = async () => {
	loading.value = true

	await http
		.get<User>(`/collections/users/records/${route.params.id}`, {
			expand: ['university', 'disciplines']
		})
		.then(res => {
			user.value = res
			disciplineNames.value = res.expand?.disciplines?.map(d => d.name).join(', ')
			universityName.value = res.expand?.university?.name
			isItMyProfile.value = user.value.id === auth.user.id
		})

	loading.value = false
}
loadUser()
</script>
