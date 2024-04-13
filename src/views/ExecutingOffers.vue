<template>
	<Grid :columns="4">
		<JobOffer
			v-for="offer in offers"
			:key="offer.id"
			:job-offer="offer"
			:loading="loading"
			show-chat
			@show-chat="openChat"
		/>
	</Grid>

	<Modal
		v-if="openedChat"
		:width="600"
		@close="closeChat"
	>
		<Chat :id="openedChat.chat"/>
	</Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

import http from '@/plugins/http'
import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer.ts'
import JobOffer from '@/components/blocks/JobOffer.vue'
import Grid from '@/components/structures/Grid.vue'
import Modal from '@/components/structures/Modal.vue'
import Chat from '@/components/sections/Chat.vue'

const auth = useAuthStore()

const emptyOffer: IJobOffer = {
	chat: '',
	collectionId: '',
	collectionName: '',
	created: '',
	creator: '',
	deadline: new Date(),
	discipline: '',
	executor: '',
	id: '',
	proposals: [],
	rating: 0,
	status: 0,
	type: '',
	university: '',
	updated: '',
	title: '',
	description: '',
	price: 0
}
const offers = ref<Array<IJobOffer>>([
	emptyOffer, emptyOffer, emptyOffer, emptyOffer
])

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
	console.log(offer)
	openedChat.value = offer
}

const closeChat = () => openedChat.value = null

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