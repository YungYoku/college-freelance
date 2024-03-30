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

		<template v-if="!isItMyOffer">
			<Skeleton
				v-if="loading"
				class="h-9 w-[119px] ml-auto"
			/>

			<Button
				v-else
				:disabled="isAlreadyProposed"
				class="ml-auto"
				@click="makeProposal"
			>
				Откликнуться
			</Button>
		</template>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

import http from '@/plugins/http'
import { JobOffer, JobOfferProposal } from '@/interfaces/JobOffer.ts'
import { Chat } from '@/interfaces/Chat.ts'
import { User } from '@/interfaces/User.ts'
import { Button } from '@/components/ui/button'
import PageTitle from '@/components/elements/PageTitle.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/toast'

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
const { toast } = useToast()

const makeProposal = async () => {
	if (isAlreadyProposed.value) return

	if (authStore.user.energy < 1) {
		toast({
			title: 'Недостаточно энергии для отклика'
		})
		return
	}

	loading.value = true

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
		.patch<JobOffer>(`/collections/job_offers/records/${offer.value.id}?expand=proposals`, {
			proposals: [...offer.value.proposals, proposalId]
		})
		.then(response => {
			offer.value = response
		})

	await http
		.patch<User>(`/collections/users/records/${authStore.user.id}`, {
			energy: authStore.user.energy - 1
		})
		.then((user) => authStore.setUser(user))

	loading.value = false
}

const isItMyOffer = computed(() => offer.value.creator === authStore.user.id)
const isAlreadyProposed = computed(() => {
	const proposals = offer.value.expand?.proposals ?? []
	const proposal = proposals.find(proposal => proposal.user === authStore.user.id)

	return proposal ?? null
})
</script>
