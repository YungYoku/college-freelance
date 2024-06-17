<template>
	<div class="flex relative max-w-screen-lg w-full gap-2 align-center flex-col">
		<Button
			v-if="auth.isAdmin || isItMyProfile"
			:disabled="loading"
			class="absolute right-0 top-0"
			@click="router.push(`/profile`)"
		>
			Изменить
		</Button>

		<Grid
			:columns-xl="['150px', 1]"
			:columns-m="1"
			class="items-center"
		>
			<Avatar
				size="l"
				:image="`${user?.id}/${user?.avatar}`"
			/>

			<div class="flex flex-col align-center gap-3">
				<Text
					:loading="loading"
					size="m"
				>
					{{ user?.name }} {{ user?.surname }}
				</Text>

				<div class="flex justify-start gap-6">
					<Text
						:loading="loading"
						loading-width="100px"
						size="xs"
					>
						Рейтинг: {{ averageRating }}
					</Text>

					<Text
						:loading="loading"
						loading-width="100px"
						size="xs"
					>
						Отзывы:
					</Text>

					<Text
						:loading="loading"
						loading-width="100px"
						size="xs"
					>
						Завершенных заданий: {{ user?.rating.length ?? 0 }}
					</Text>
				</div>

				<Text
					:loading="loading"
					size="xs"
				>
					{{ universityName }}
				</Text>

				<Text
					:loading="loading"
					size="xs"
				>
					Дисциплины: {{ disciplineNames }}
				</Text>
			</div>
		</Grid>

		<Text
			size="m"
			class="mt-8"
		>
			Обо мне
		</Text>
		<Text
			:loading="loading"
			loading-width="600px"
			size="xs"
			class="text-base"
		>
			{{ user?.description }}
		</Text>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

import http from '@/plugins/http'
import { Grid } from '@/components/structures'
import { Avatar, Button } from '@/components/blocks'
import { Text } from '@/components/elements'
import { IUser } from '@/interfaces/User.ts'

const route = useRoute()
const router = useRouter()
const disciplineNames = ref()
const universityName = ref()

const loading = ref(true)
const user = ref<IUser | null>(null)
const isItMyProfile = ref(false)
const auth = useAuthStore()

const averageRating = computed(() => {
	const rating = user.value?.expand?.rating
	if (rating) {
		return rating.reduce((result, current) => result + current.stars, 0) / rating.length
	}
	return 'Нет выполненных работ'
})

const loadUser = async () => {
	loading.value = true

	await http
		.get<IUser>(`/collections/users/records/${route.params.id}`, {
			expand: ['university', 'disciplines', 'rating']
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
