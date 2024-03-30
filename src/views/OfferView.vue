<template>
	<div class="grid items-center w-full gap-4">
		<PageTitle size="l">
			{{ offer.title }}
		</PageTitle>

		<div class="offer__description">
			Описание: {{ offer.description }}
		</div>

		<div class="offer__price">
			Цена: {{ offer.price }} ₽
		</div>

		<div class="offer__rating">
			Рейтинг: {{ offer.rating }}
		</div>

		<Button
			v-if="!loading && !isItMyOffer"
			:disabled="isAlreadyProposed"
			class="ml-auto"
			@click="makeProposal"
		>
			Откликнуться
		</Button>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

import http from '@/plugins/http'
import { JobOffer, JobOfferProposal } from '@/interfaces/JobOffer.ts'
import { Chat } from '@/interfaces/Chat.ts'
import { Button } from '@/components/ui/button'
import PageTitle from '@/components/elements/PageTitle.vue'

const offer = ref<JobOffer>({
	collectionId: '',
	collectionName: '',
	created: '',
	creator: '',
	deadline: new Date(),
	description: '',
	discipline: '',
	id: '',
	price: 0,
	rating: 0,
	status: 0,
	title: '',
	university: '',
	updated: '',
	type: '',
	executor: '',
	chat: '',
	proposals: [],
	expand: {
		proposals: []
	}
})

const route = useRoute()
const { id } = route.params

const loading = ref(true)
const loadOffer = async () => {
	if (!id) return

	await http
		.get<JobOffer>(`/collections/job_offers/records/${id}?expand=proposals`)
		.then(response => {
			offer.value = response
		})

	loading.value = false
}
loadOffer()

const authStore = useAuthStore()

const makeProposal = async () => {
	if (isAlreadyProposed.value) return

	const chatId = await http
		.post<Chat>('/collections/chats/records')
		.then(({ id }) => id)

	const proposalId = await http
		.post<JobOfferProposal>('/collections/job_offer_proposals/records', {
			chat: chatId,
			user: authStore.user.id
		})
		.then(({ id }) => id)

	await http
		.patch<JobOffer>(`/collections/job_offers/records/${offer.value.id}`, {
			proposals: [...offer.value.proposals, proposalId]
		})
		.then(response => {
			offer.value = response
		})
}

const isItMyOffer = computed(() => offer.value.creator === authStore.user.id)
const isAlreadyProposed = computed(() => {
	const proposals = offer.value.expand?.proposals ?? []
	const proposal = proposals.find(proposal => proposal.user === authStore.user.id)

	return proposal ?? null
})
</script>
