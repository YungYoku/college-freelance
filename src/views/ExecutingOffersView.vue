<template>
	<Grid :columns="1">
		<PageTitle size="l">
			Выполняемые объявления
		</PageTitle>
	</Grid>

	<Grid
		class="mt-4"
		:columns-l="4"
		:columns-m="3"
		:columns-s="2"
		:columns-xs="1"
	>
		<template v-if="loading">
			<EmptyJobOffer
				v-for="i in 8"
				:key="i"
			/>
		</template>
		<template v-else>
			<JobOffer
				v-for="offer in offers"
				:key="offer.id"
				:job-offer="offer"
				:loading="loading"
				show-chat
				show-status
				@show-chat="openChat"
			/>
		</template>
	</Grid>

	<Modal
		v-if="openedChat"
		:width="600"
		@close="closeChat"
	>
		<Chat
			:id="openedChat.chat"
			:status="openedChat.status"
			:rating="openedChat.ratingCreator"
			:chat-member="openedChat.expand?.creator"
			@send-to-review="sendToReview"
			@send-rating="sendRating"
		/>
	</Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

import http from '@/plugins/http'
import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer.ts'
import { Grid, Modal } from '@/components/structures'
import { Chat } from '@/components/sections'
import { EmptyJobOffer, JobOffer } from '@/components/blocks'
import { PageTitle } from '@/components/elements'


const auth = useAuthStore()

const offers = ref<Array<IJobOffer>>([])

const loading = ref(true)
const getUserOffers = async () => {
	if (auth.user.id === '') return

	loading.value = true

	await http
		.get<JobOffers>('/collections/job_offers/records', {
			filter: `(executor='${auth.user.id}')`,
			expand: ['type', 'discipline', 'creator']
		})
		.then(response => {
			offers.value = response.items
		})

	loading.value = false
}

watch(() => auth.user.id, getUserOffers, { immediate: true })

const openedChat = ref<IJobOffer | null>(null)
const openChat = (offer: IJobOffer) => {
	openedChat.value = offer
}

const closeChat = () => openedChat.value = null

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

const sendRating = async (rating: number) => {
	if (!openedChat.value) return

	await http
		.patch<IJobOffer>(`/collections/job_offers/records/${openedChat.value.id}`, {
			...openedChat.value,
			ratingCreator: rating
		})
		.then((response) => {
			if (openedChat.value) {
				openedChat.value.ratingCreator = response.ratingCreator
			}
		})
}
</script>

<style scoped lang="scss">
.offer-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 20px;

    border: 1px solid grey;
    border-radius: 10px;
    gap: 20px;
}
</style>