<template>
	<Grid :columns="1">
		<PageTitle>
			Мои чаты
		</PageTitle>
	</Grid>
	<Grid :columns="[1,4]">
		<Island>
			<Grid>
				<div
					v-for="chat in chats"
					:key="chat"
				>
					<div
						v-if="chat.chat.length > 0"
						class="cursor-pointer"
						@click.prevent="loadChat(chat)"
					>
						<Text
							size="s"
						>
							{{ chat.title }}
						</Text>
						<UserCard
							:loading="loading"
							:user="auth.isCustomer ? chat.expand?.executor : chat.expand?.executor"
						/>
					</div>
				</div>
			</Grid>
		</Island>
		<Island class="relative">
			<div v-if="openedChat === null">
				Выберите чат
			</div>
			<Chat
				v-else
				:id="openedChat.chat"
				:status="openedChat.status"
				:rating="openedChat.expand?.ratingExecutor?.stars"
				:chat-member="openedChat.expand?.executor"
				@approve-review="approveReview"
				@decline-review="declineReview"
				@send-rating="sendRating"
			/>
		</Island>
	</Grid>
</template>

<script setup lang="ts">
import { Chat } from '@/components/sections'
import { User as UserCard } from '@/components/blocks'
import { PageTitle } from '@/components/elements'
import { Island, Grid } from '@/components/structures'
import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer'

import http from '@/plugins/http'
import { onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Text from '@/components/elements/text.vue'
import { Rating } from '@/interfaces/Rating.ts'

const auth = useAuthStore()
const openedChat = ref<IJobOffer | null>(null)
const chats = ref()
const loading = ref(true)

const getChats = async () => {
	if (auth.user.id === '') return
	loading.value = true

	await http.get<JobOffers>('/collections/job_offers/records', {
		filter: auth.isCustomer ? `(creator='${auth.user.id}')` : `(executor='${auth.user.id}')`,
		expand: ['proposals', 'type', 'discipline', 'executor', 'ratingExecutor']
	})
		.then(response => {
			chats.value = response.items
		})

	loading.value = false
}

const approveReview = async () => {
	if (!openedChat.value) return

	await http
		.patch<IJobOffer>(`/collections/job_offers/records/${openedChat.value.id}`, {
			...openedChat.value,
			status: 'ended'
		})
		.then((response) => {
			if (openedChat.value) {
				openedChat.value.status = response.status
			}
		})
}

const declineReview = async () => {
	if (!openedChat.value) return

	await http
		.patch<IJobOffer>(`/collections/job_offers/records/${openedChat.value.id}`, {
			...openedChat.value,
			status: 'in_progress'
		})
		.then((response) => {
			if (openedChat.value) {
				openedChat.value.status = response.status
			}
		})
}

const sendRating = async (value: { rating: number, review: string } = { rating: 1, review: '' }) => {
	if (!openedChat.value) return
	const { rating, review } = value

	await http.post<Rating>(`/send-review/${openedChat.value.id}`, {
		stars: rating,
		review
	})
		.then((response) => {
			if (openedChat.value && openedChat.value.expand) {
				openedChat.value.ratingExecutor = response.id
				openedChat.value.expand.ratingExecutor = response
			}
		})
}
const loadChat = (chat: IJobOffer) => {
	openedChat.value = chat
}
onMounted(() => {
	getChats()
})
</script>

<style scoped lang="scss">

</style>
