<template>
	<Grid
		:columns-xl="[1, '119px', '126px']"
		:columns-m="[1, 1]"
		:columns-s="1"
	>
		<PageTitle :loading="loading">
			{{ offer.title }}
		</PageTitle>

		<template v-if="!loading && offer.status === 'created'">
			<Button
				v-if="(authStore.isAdmin || isItMyOffer)"
				:disabled="loading"
				@click="remove"
			>
				Удалить
			</Button>

			<router-link
				v-if="isItMyOffer"
				:to="`/offer-edit/${offer.id}`"
			>
				<Button
					:disabled="loading"
					class="ml-auto"
				>
					Редактировать
				</Button>
			</router-link>

			<template v-else-if="authStore.isExecutor">
				<span/>
				<Button
					:disabled="loading || isAlreadyProposed"
					class="ml-auto"
					@click="makeProposal"
				>
					Откликнуться
				</Button>
			</template>
		</template>
	</Grid>

	<Grid
		:columns-xl="2"
		:columns-l="1"
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
					class="mt-4"
				>
					Дисциплина: {{ offer.expand?.discipline?.name ?? 'Не указана' }}
				</Text>
				<Text
					size="xs"
					:loading="loading"
				>
					Тип работы: {{ offer.expand?.type?.name ?? 'Не указан' }}
				</Text>
				<Text
					size="xs"
					:loading="loading"
				>
					Университет: {{ offer.expand?.university?.name ?? 'Не указан' }}
				</Text>

				<Text
					size="xs"
					:loading="loading"
					class="mt-4"
				>
					Создано: {{ $date(created) }}
				</Text>
				<Text
					size="xs"
					:loading="loading"
				>
					Срок сдачи: {{ $date(deadline) }}
				</Text>
			</div>
			<div class="flex justify-between">
				<UserCard
					class="mt-4 max-w-10"
					link
					:user="offer.expand?.creator"
					:loading="loading"
				/>

				<div v-if="offer.executor">
					Исполнитель
					<UserCard
						class="mt-4"
						link
						:user="offer.expand?.executor"
						:loading="loading"
					/>
				</div>
			</div>
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

import { Http } from '@/plugins'
import { IJobOffer } from '@/interfaces/JobOffer.ts'
import { Grid, Island } from '@/components/structures'
import { Button, User as UserCard } from '@/components/blocks'
import { PageTitle, Text } from '@/components/elements'
import { useToast } from '@/components/ui/toast'

const router = useRouter()

const offer = ref<IJobOffer>({
	collectionId: '',
	collectionName: '',
	created: '',
	creator: '',
	deadline: new Date(),
	description: '',
	discipline: '',
	id: '',
	price: 0,
	ratingCreator: '',
	ratingExecutor: '',
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

	await Http
		.get<IJobOffer>(`/collections/job_offers/records/${id}`, {
			expand: ['creator', 'executor', 'proposals', 'discipline', 'type', 'university']
		})
		.then(response => {
			offer.value = response
		})

	loading.value = false
}
loadOffer()

const remove = async () => {
	if (loading.value) return

	await Http
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

	await Http
		.post<IJobOffer>(`/make-proposal/${offer.value.id}`)
		.then((response) => {
			offer.value = response

			authStore.setEnergy(authStore.user.energy - 1)

			toast({
				title: 'Вы успешно откликнулись'
			})
		})

	loading.value = false
}

const isItMyOffer = computed(() => offer.value.creator === authStore.user.id)
const isAlreadyProposed = computed(() => {
	const proposals = offer.value.expand?.proposals ?? []
	const proposal = proposals.find(proposal => proposal.user === authStore.user.id)

	return proposal !== undefined
})

const created = computed(() => new Date(offer.value.created))
const deadline = computed(() => new Date(offer.value.deadline))
</script>
