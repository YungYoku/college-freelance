<template>
	<div class="grid items-center w-full gap-4 offer-view">
		<Grid
			:columns="2"
			class="offer__header"
		>
			<PageTitle size="l">
				{{ offer.title }}
			</PageTitle>

			<PageTitle
				size="m"
				class="offer__price"
			>
				Цена: {{ offer.price }}
			</PageTitle>
		</Grid>

		<Grid
			class="offer__data"
			:columns="2"
		>
			<div class="offer__description">
				Описание: {{ offer.description }}
			</div>

			<div class="offer__info">
				<div class="offer__info-header">
					Информация о заказе
				</div>
				<div class="grid items-center w-full gap-10">
					<div>
						Создано: {{ offer.created }}
					</div>
					<div>
						Дедлайн: {{ offer.deadline }}
					</div>
					<div>
						Дисциплина: {{ offer.discipline ? offer.discipline : 'Не указана' }}
					</div>
					<div>
						Университет: {{ offer.university ? offer.university : 'Не указан' }}
					</div>
				</div>
			</div>
		</Grid>
		<template v-if="!isItMyOffer && authStore.isExecutor">
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
import Grid from '@/components/structures/Grid.vue'


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
	expand: {
		proposals: []
	}
})
console.log(offer)
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

<style lang="scss" scoped>
.offer {
    &__header {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__info {
        min-width: 300px;
        width: 100%;
        padding: 15px;
        box-shadow: 0 3px 5px 0 rgba(209, 209, 209, 0.5);
    }

    &__data {
        justify-items: center;
    }

    &__description {
        min-width: 300px;
        width: 100%;
        padding: 15px;
        box-shadow: 0 3px 5px 0 rgba(209, 209, 209, 0.5);
    }

    &__info-header {
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;

    }


}
</style>