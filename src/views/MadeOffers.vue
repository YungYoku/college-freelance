<template>
	<Grid :columns="4">
		<JobOffer
			v-for="offer in offers"
			:key="offer.id"
			:job-offer="offer"
			:loading="loading"
			show-responses
			show-chat
			show-remove
			@show-responses="openResponses"
			@show-chat="openChat"
			@remove="remove"
		/>
	</Grid>

	<Modal
		v-if="openedOffer"
		@close="closeResponses"
	>
		<Grid :columns="1">
			<div
				v-for="(user) in responsesUsers"
				:key="user.id"
				class="flex w-full items-center gap-2"
			>
				<Avatar
					size="m"
					:image="`users/${user.id}/${user.avatar}`"
				/>

				{{ user.name }}

				<Icon
					v-if="!openedOffer.executor"
					class="ml-auto"
					name="check"
					@click="pickExecutor(user)"
				/>
			</div>
		</Grid>
	</Modal>

	<Modal
		v-if="openedChat"
		:width="600"
		@close="closeChat"
	>
		<Chat
			:id="openedChat.chat"
			:status="openedChat.status"
			@approve-review="approveReview"
			@send-paying-to-review="sendPayingToReview"
		/>
	</Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

import http from '@/plugins/http'
import { Users, User } from '@/interfaces/User.ts'
import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer.ts'
import JobOffer from '@/components/blocks/JobOffer.vue'
import Grid from '@/components/structures/Grid.vue'
import Modal from '@/components/structures/Modal.vue'
import Avatar from '@/components/blocks/Avatar.vue'
import Icon from '@/components/elements/Icon.vue'
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
	status: 'created',
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
		.get<JobOffers>(`/collections/job_offers/records?filter=(creator='${auth.user.id}')&expand=proposals`)
		.then(response => {
			offers.value = response.items
		})

	loading.value = false
}

watch(() => auth.user.id, getUserOffers, { immediate: true })

const openedOffer = ref<IJobOffer | null>(null)
const responsesUsers = ref<Array<User>>([])

const openResponses = async (offer: IJobOffer) => {
	if (!offer.expand?.proposals || offer.expand?.proposals?.length === 0) return

	openedOffer.value = offer

	let ids = offer.expand.proposals.reduce((result, proposal) => result + `id='${proposal.user}' || `, '')
	ids = ids.slice(0, ids.length - 3)
	await http
		.get<Users>(`/collections/users/records?filter=(${ids})`)
		.then(response => {
			responsesUsers.value = response.items
		})
}

const closeResponses = () => {
	openedOffer.value = null
	responsesUsers.value = []
}

const pickExecutor = async (user: User) => {
	if (!openedOffer.value) return
	const executorChat = openedOffer.value.expand?.proposals?.find(proposal => proposal.user === user.id)?.chat

	await http
		.patch(`/collections/job_offers/records/${openedOffer.value.id}`, {
			executor: user.id,
			status: 'in_progress',
			chat: executorChat
		})
		.then(() => {
			closeResponses()
			getUserOffers()
		})
}

const remove = async (offer: IJobOffer) => {
	await http
		.delete<IJobOffer>(`/collections/job_offers/records/${offer.id}`)
		.then(() => {
			offers.value = offers.value.filter((item) => item.id !== offer.id)
		})
}

const openedChat = ref<IJobOffer | null>(null)
const openChat = (offer: IJobOffer) => openedChat.value = offer

const closeChat = () => openedChat.value = null


const approveReview = async () => {
	if (!openedChat.value) return

	await http
		.patch<IJobOffer>(`/collections/job_offers/records/${openedChat.value.id}`, {
			...openedChat.value,
			status: 'reviewed'
		})
		.then((response) => {
			if (openedChat.value) {
				openedChat.value.status = response.status
			}
		})
}

const sendPayingToReview = async () => {
	if (!openedChat.value) return

	await http
		.patch<IJobOffer>(`/collections/job_offers/records/${openedChat.value.id}`, {
			...openedChat.value,
			status: 'paid'
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