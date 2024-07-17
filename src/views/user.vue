<template>
	<Grid
		vertical
		class="relative max-w-screen-md"
	>
		<Button
			v-if="isItMyProfile"
			:disabled="loading"
			class="absolute right-0 top-0"
			@click="router.push(`/profile`)"
		>
			Изменить
		</Button>

		<Grid
			:columns-xl="['150px', 1]"
			:columns-m="1"
			gap="l"
		>
			<Grid
				vertical
				hor-align="center"
			>
				<Avatar
					size="l"
					:user="user"
				/>

				<Text
					:loading="loading"
					loading-width="100px"
					size="xs"
				>
					Рейтинг: {{ averageRating }}
				</Text>
			</Grid>

			<Grid vertical>
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
						Отзывы: {{ user?.rating.length }}
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
			</Grid>
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

		<template v-if="!loading">
			<CardRating
				v-for="rating in user?.expand?.rating"
				:key="rating.id"
				:rating="rating"
			/>
		</template>
	</Grid>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

import { Http } from '@/plugins'
import { Grid } from '@/components/structures'
import { Avatar, Button } from '@/components/blocks'
import { Text } from '@/components/elements'
import { IUser } from '@/interfaces/User.ts'
import { CardRating } from '@/components/blocks'

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
	return 'нет'
})

const loadUser = async () => {
	loading.value = true

	await Http
		.get<IUser>(`/collections/users/records/${route.params.id}`, {
			expand: ['university', 'disciplines', 'rating', 'rating.by']
		})
		.then(res => {
			user.value = res
			disciplineNames.value = res.expand?.disciplines?.map(d => d.name).join(', ')
			universityName.value = res.expand?.university?.name
			isItMyProfile.value = user.value.id === auth.user.id
		})

	loading.value = false
}
watch(() => route.params.id, loadUser, { immediate: true })
</script>
