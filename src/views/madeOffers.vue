<template>
	<Grid :columns="1">
		<PageTitle>
			Мои объявления
		</PageTitle>
	</Grid>

	<Grid
		class="mt-2"
		:columns-xl="4"
		:columns-l="3"
		:columns-m="2"
		:columns-s="1"
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
				showing-proposals
				showing-chat
				showing-remove
				showing-status
				@show-proposals="showProposals"
				@show-chat="openChat"
				@remove="showDeleteConfirmation"
			/>
		</template>
	</Grid>

	<ModalProposals
		v-if="openedOffer"
		:offer="openedOffer"
		@chose-proposal="pickExecutor"
		@close="closeResponses"
	/>

	<Modal
		v-if="openedChat"
		:width="600"
		@close="closeChat"
	>
		<Chat
			:offer="openedChat"
			rating-type="ratingExecutor"
			user-type="executor"
			@update:status="updateStatus"
			@update:rating="updateRating"
		/>
	</Modal>

	<ModalDeleteConfirmation
		v-if="deleteConfirmationModal.show"
		@remove="remove"
		@close="hideDeleteConfirmation"
	>
		Вы уверены, что хотите удалить объявление?
	</ModalDeleteConfirmation>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

import { Grid, Modal } from '@/components/structures'
import { Chat, ModalDeleteConfirmation, ModalProposals } from '@/components/sections'
import { EmptyJobOffer, JobOffer } from '@/components/blocks'
import { PageTitle } from '@/components/elements'
import { IRating } from '@/interfaces/Rating.ts'
import { Http } from '@/plugins'
import { IUser } from '@/interfaces/User.ts'
import { IJobOffer, IJobOffers, IJobOfferStatus } from '@/interfaces/JobOffer.ts'

const auth = useAuthStore()

const offers = ref<Array<IJobOffer>>([])

const loading = ref(true)
const getUserOffers = async () => {
	if (auth.user.id === '') return

	loading.value = true

	await Http
		.get<IJobOffers>('/collections/job_offers/records', {
			filter: `(creator='${auth.user.id}')`,
			expand: ['proposals', 'proposals.user', 'type', 'discipline', 'executor', 'ratingExecutor']
		})
		.then(response => {
			offers.value = response.items
		})

	loading.value = false
}

watch(() => auth.user.id, getUserOffers, { immediate: true })

const openedOffer = ref<IJobOffer | null>(null)

const showProposals = async (offer: IJobOffer) => {
	openedOffer.value = offer
}

const closeResponses = () => {
	openedOffer.value = null
}

const pickExecutor = async (user: IUser) => {
	if (!openedOffer.value || loading.value) return
	const executorChat = openedOffer.value.expand?.proposals?.find(proposal => proposal.user === user.id)?.chat

	loading.value = true

	await Http
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

const remove = async () => {
	const offer = deleteConfirmationModal.offer
	if (!offer) return

	await Http
		.delete(`/collections/job_offers/records/${offer.id}`)
		.then(() => {
			offers.value = offers.value.filter((item) => item.id !== offer.id)
		})

	hideDeleteConfirmation()
}

const openedChat = ref<IJobOffer | null>(null)
const openChat = (offer: IJobOffer) => openedChat.value = offer

const closeChat = () => openedChat.value = null

const updateStatus = async (status: IJobOfferStatus) => {
	if (openedChat.value) {
		openedChat.value.status = status
	}
}

const updateRating = async (rating: IRating) => {
	if (openedChat.value && openedChat.value.expand) {
		openedChat.value.ratingExecutor = rating.id
		openedChat.value.expand.ratingExecutor = rating
	}
}

const deleteConfirmationModal = reactive<{
	show: boolean
	offer: IJobOffer | null
}>({
	show: false,
	offer: null
})
const showDeleteConfirmation = (offer: IJobOffer) => {
	deleteConfirmationModal.show = true
	deleteConfirmationModal.offer = offer
}
const hideDeleteConfirmation = () => {
	deleteConfirmationModal.show = false
	deleteConfirmationModal.offer = null
}
</script>
