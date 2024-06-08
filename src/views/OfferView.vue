<template>
	<Grid :columns="[1, '140px', '140px']">
		<PageTitle :loading="loading">
			{{ offer.title }}
		</PageTitle>

		<Button
			v-if="(authStore.isAdmin || isItMyOffer) && !loading && offer.status === 'created'"
			:disabled="loading"
			@click="remove"
		>
			Удалить
		</Button>
		<span v-else/>

		<Button
			v-if="!isItMyOffer && authStore.isExecutor"
			:disabled="loading || isAlreadyProposed"
			class="ml-auto"
			@click="makeProposal"
		>
			Откликнуться
		</Button>
		<span v-else/>
	</Grid>

	<Grid
		:columns-l="2"
		:columns-m="1"
		:columns-s="1"
		class="mt-4"
	>
		<Island class="overflow-hidden">
			<Text
				size="s"
				:loading="loading"
				class="mb-2"
			>
				Информация о заказе
			</Text>

			<div class="grid items-center w-full gap-2">
				<Text
					size="xs"
					:loading="loading"
				>
					Цена: {{ offer.price }}₽
				</Text>
				<Text
					size="xs"
					:loading="loading"
				>
					Варианты оплаты:
				</Text>

				<Text
					size="xs"
					:loading="loading"
					class="mt-4"
				>
					Дисциплина: {{ offer.expand?.discipline?.name ?? 'Не указана' }}
				</Text>
				<Text
					size="xs"
					:loading="loading"
				>
					Университет: {{ offer.university ? offer.university : 'Не указан' }}
				</Text>

				<Text
					size="xs"
					:loading="loading"
					class="mt-4"
				>
					Создано: {{ created }}
				</Text>
				<Text
					size="xs"
					:loading="loading"
				>
					Срок сдачи: {{ deadline }}
				</Text>
			</div>

			<UserCard
				class="mt-4"
				link
				:user="offer.expand?.creator"
				:loading="loading"
			/>
		</Island>

		<Island class="overflow-hidden">
			<Text
				size="s"
				class="mb-2"
				:loading="loading"
			>
				Описание
			</Text>

			<Text
				size="xs"
				:loading="loading"
			>
				{{ offer.description }}
			</Text>
		</Island>
	</Grid>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

import http from '@/plugins/http'
import { JobOffer, JobOfferProposal } from '@/interfaces/JobOffer.ts'
import { Chat } from '@/interfaces/Chat.ts'
import { User } from '@/interfaces/User.ts'
import { Grid, Island } from '@/components/structures'
import { Button, User as UserCard } from '@/components/blocks'
import { PageTitle, Text } from '@/components/elements'
import { useToast } from '@/components/ui/toast'

const router = useRouter()

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
	ratingCreator: 0,
	ratingExecutor: 0,
	status: 'created',
	title: '',
	university: '',
	updated: '',
	type: '',
	executor: '',
	chat: '',
	proposals: [],
	file: null,
	expand: {
		proposals: [],
	}
})
const route = useRoute()
const { id } = route.params

const loading = ref(true)
const loadOffer = async () => {
	if (!id) return

	await http
		.get<JobOffer>(`/collections/job_offers/records/${id}`, {
			expand: ['creator', 'proposals', 'discipline']
		})
		.then(response => {
			offer.value = response
		})

	loading.value = false
}
loadOffer()

const remove = async () => {
	if (loading.value) return

	await http
		.delete(`/collections/job_offers/records/${offer.value.id}`)
		.then(() => {
			router.push('/')
		})
}

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

	http
		.patch<User>(`/collections/users/records/${authStore.user.id}`, {
			energy: authStore.user.energy - 1
		})
		.then((user) => authStore.setUser(user))

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
		}, {
			expand: ['creator', 'proposals', 'discipline'],
		})
		.then(response => {
			offer.value = response
		})

	loading.value = false
}

const isItMyOffer = computed(() => offer.value.creator === authStore.user.id)
const isAlreadyProposed = computed(() => {
	const proposals = offer.value.expand?.proposals ?? []
	const proposal = proposals.find(proposal => proposal.user === authStore.user.id)

	return proposal !== undefined
})

const created = computed(() => new Date(offer.value.created).toLocaleString())
const deadline = computed(() => new Date(offer.value.deadline).toLocaleString())
</script>
