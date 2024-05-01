<template>
	<Grid :columns="4">
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
			@send-to-review="sendToReview"
			@approve-paying="approvePaying"
		/>
	</Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

import http from '@/plugins/http'
import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer.ts'
import EmptyJobOffer from '@/components/blocks/EmptyJobOffer.vue'
import JobOffer from '@/components/blocks/JobOffer.vue'
import Grid from '@/components/structures/Grid.vue'
import Modal from '@/components/structures/Modal.vue'
import Chat from '@/components/sections/Chat.vue'


const auth = useAuthStore()

const offers = ref<Array<IJobOffer>>([])

const loading = ref(true)
const getUserOffers = async () => {
	if (auth.user.id === '') return

	loading.value = true

	await http
		.get<JobOffers>(`/collections/job_offers/records?filter=(executor='${auth.user.id}')`)
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

const approvePaying = async () => {
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