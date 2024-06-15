<template>
	<Grid :columns="1">
		<PageTitle>
			Мои объявления
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
				show-responses
				show-chat
				show-remove
				show-status
				@show-responses="openResponses"
				@show-chat="openChat"
				@remove="remove"
			/>
		</template>
	</Grid>

	<Modal
		v-if="openedOffer"
		@close="closeResponses"
	>
		<Grid :columns="1">
			<Text
				class="absolute top-2 left-3"
				size="xs"
			>
				Отклики
			</Text>
			<div
				v-for="(user) in responsesUsers"
				:key="user.id"
				class="flex w-full items-center gap-2 pt-10"
			>
				<UserCard
					:loading="loading"
					:user="user"
					link
				/>

				<Icon
					v-if="!loading"
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
			:rating="openedChat.expand?.ratingExecutor"
			:chat-member="openedChat.expand?.executor"
			@approve-review="approveReview"
			@decline-review="declineReview"
			@send-rating="sendRating"
		/>
	</Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

import http from '@/plugins/http'
import { Users, User } from '@/interfaces/User.ts'
import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer.ts'
import { Grid, Modal } from '@/components/structures'
import { Chat } from '@/components/sections'
import { EmptyJobOffer, JobOffer, User as UserCard } from '@/components/blocks'
import { Icon, PageTitle, Text } from '@/components/elements'
import { Rating } from '@/interfaces/Rating.ts'


const auth = useAuthStore()

const offers = ref<Array<IJobOffer>>([])

const loading = ref(true)
const getUserOffers = async () => {
	if (auth.user.id === '') return

	loading.value = true

	await http
		.get<JobOffers>('/collections/job_offers/records', {
			filter: `(creator='${auth.user.id}')`,
			expand: ['proposals', 'type', 'discipline', 'executor', 'ratingExecutor']
		})
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
		.get<Users>('/collections/users/records', {
			filter: `(${ids})`
		})
		.then(response => {
			responsesUsers.value = response.items
		})
}

const closeResponses = () => {
	openedOffer.value = null
	responsesUsers.value = []
}

const pickExecutor = async (user: User) => {
	if (!openedOffer.value || loading.value) return
	const executorChat = openedOffer.value.expand?.proposals?.find(proposal => proposal.user === user.id)?.chat

	loading.value = true

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
		.delete(`/collections/job_offers/records/${offer.id}`)
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

const sendRating = async (value: { stars: number, review: string } = { stars: 1, review: '' }) => {
	if (!openedChat.value) return
	const { stars, review } = value

	await http.post<Rating>(`/send-review/${openedChat.value.id}`, {
		stars,
		review
	})
		.then((response) => {
			if (openedChat.value && openedChat.value.expand) {
				openedChat.value.ratingExecutor = response.id
				openedChat.value.expand.ratingExecutor = response
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
