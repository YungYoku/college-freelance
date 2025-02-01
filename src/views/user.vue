<template>
	<Grid
		:columns="1"
		vertical
		class="user"
	>
		<Grid
			:columns-xl="['160px', 1, '48px']"
			:columns-m="1"
			gap="l"
		>
			<Grid
				vertical
				:columns="1"
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
					Рейтинг: {{ $format('number', averageRating, 2) }}
				</Text>
			</Grid>

			<Grid
				:columns="1"
				vertical
			>
				<Text
					:loading="loading"
					size="m"
				>
					{{ user?.name }} {{ user?.surname }} | {{ user?.username }}
				</Text>

				<Grid :columns="['100px', '200px']">
					<Text
						:loading="loading"
						loading-width="100px"
						size="xs"
					>
						Отзывы: {{ user?.rating.length }}
					</Text>

					<Text
						:loading="loading"
						loading-width="200px"
						size="xs"
					>
						Завершенных заданий: {{ user?.rating.length ?? 0 }}
					</Text>
				</Grid>

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

			<Button
				v-if="isItMyProfile"
				:disabled="loading"
				@click="router.push(`/profile`)"
			>
				<Icon
					:colors="['dark', 'light']"
					name="pencil"
				/>
			</Button>
		</Grid>

		<Text
			class="user__about-me"
			size="m"
		>
			Обо мне
		</Text>
		<Text
			:loading="loading"
			loading-width="600px"
			size="xs"
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
import Icon from '@/components/elements/icon.vue'

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
	return 0
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

<style scoped lang="scss">
.user {
	max-width: 768px;

	&__about-me {
		margin-top: 32px;
	}
}
</style>