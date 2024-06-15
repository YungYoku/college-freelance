<template>
	<Grid :columns="1">
		<PageTitle>
			Мои чаты
		</PageTitle>
	</Grid>
	<Grid :columns="[1,4]">
		<Island>
			<Grid>
				<Grid
					v-for="chat in chats"
					:key="chat"
					gap="xs"
					class="cursor-pointer rounded-md p-2 hover:bg-card"
					:class="{
						'bg-card': openedChat?.chat === chat.chat
					}"
					@click="loadChat(chat)"
				>
					<Text size="s">
						{{ chat.title }}
					</Text>
					<UserCard
						:loading="loading"
						:user="auth.isCustomer ? chat.expand?.executor : chat.expand?.executor"
					/>
				</Grid>
			</Grid>
		</Island>
		
		<Island class="relative">
			<Text v-if="openedChat === null">
				Выберите чат
			</Text>
			<Chat
				v-else
				:id="openedChat.chat"
				:status="openedChat.status"
				:rating="openedChat.expand?.ratingExecutor"
				:chat-member="openedChat.expand?.executor"
				@approve-review="approveReview"
				@decline-review="declineReview"
				@send-to-review="sendToReview"
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
import { onMounted, ref, watch } from 'vue'
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
			chats.value = response.items.filter(item => item.status !== 'created')
		})

	loading.value = false
}
watch(() => auth.user.id, getChats, { immediate: true })

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
		review: review
	})
		.then((response) => {
			if (openedChat.value && openedChat.value.expand) {
				openedChat.value.ratingExecutor = response.id
				openedChat.value.expand.ratingExecutor = response
			}
		})
}

const sendToReview = async () => {
	if (!openedChat.value) return

	await http
		.patch<IJobOffer>(`/collections/job_offers/records/${openedChat.value.id}`, {
			...openedChat.value,
			status: 'on_review'
		})
		.then((response) => {
			if (openedChat.value) {
				openedChat.value.status = response.status
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
