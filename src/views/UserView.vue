<template>
	<div class="flex max-w-screen-md w-full gap-2 align-center flex-col">
		<div class="flex gap-4 items-center">
			<Avatar size="l"/>

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

import http from '@/plugins/http'
import Avatar from '@/components/blocks/Avatar.vue'
import { User } from '@/interfaces/User.ts'
import { Skeleton } from '@/components/ui/skeleton'

const route = useRoute()

const loading = ref(true)
const user = ref<User | null>(null)

const loadUser = async () => {
	await http
		.get<User>(`/collections/users/records/${route.params.id}`)
		.then(res => {
			user.value = res
		})

	loading.value = false
}
loadUser()
</script>
