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
				variant="destructive"
				@click="showDeleteConfirmation"
			>
				Удалить
			</Button>

			<router-link
				v-if="isItMyOffer"
				:to="`/offer/${offer.id}/edit`"
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
					@click="showMakeProposal"
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

				<Text
					size="xs"
					:loading="loading"
					class="mt-4"
				>
					Репетиторство: {{ offer.tutoring ? 'да' : 'нет' }}
				</Text>
			</div>

			<div class="flex justify-between">
				<UserCard
					v-if="offer.expand?.creator"
					class="mt-4 max-w-10"
					link
					:user="offer.expand.creator"
					:loading="loading"
				/>

				<div v-if="offer.expand?.executor">
					Исполнитель
					<UserCard
						class="mt-4"
						link
						:user="offer.expand.executor"
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

	<ModalDeleteConfirmation
		v-if="deleteConfirmationModal.show"
		@remove="remove"
		@close="hideDeleteConfirmation"
	>
		Вы уверены, что хотите удалить объявление?
	</ModalDeleteConfirmation>

	<ModalMakeProposal
		v-if="makeProposalModal.show"
		:loading
		:default-price="offer.price"
		@make-proposal="makeProposal"
		@close="hideMakeProposal"
	/>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

import { Grid, Island } from '@/components/structures'
import { ModalDeleteConfirmation, ModalMakeProposal } from '@/components/sections'
import { Button, User as UserCard } from '@/components/blocks'
import { PageTitle, Text } from '@/components/elements'
import { useToast } from '@/components/ui/toast'
import { Http } from '@/plugins'
import { IJobOffer, emptyOffer, IJobOfferProposal } from '@/interfaces/JobOffer.ts'

const router = useRouter()

const offer = ref<IJobOffer>({ ...emptyOffer })
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


const makeProposalModal = reactive<{
	show: boolean
}>({
	show: false,
})
const showMakeProposal = () => {
	if (isAlreadyProposed.value) return
	if (authStore.user.energy < 1) {
		toast({
			title: 'Недостаточно энергии для отклика'
		})
		return
	}
	if (authStore.isPersonalInfoIncomplete) {
		toast({
			title: 'Для отклика на объявление требуется заполнить свои имя и фамилию!'
		})
		return
	}

	makeProposalModal.show = true
}
const hideMakeProposal = () => makeProposalModal.show = false
const makeProposal = async (proposal: IJobOfferProposal) => {
	loading.value = true

	await Http
		.post<IJobOffer>(`/make-proposal/${offer.value.id}`, {
			price: proposal.price,
			text: proposal.text
		})
		.then((response) => {
			offer.value = response

			authStore.setEnergy(authStore.user.energy - 1)

			toast({
				title: 'Вы успешно откликнулись'
			})
		})

	loading.value = false

	hideMakeProposal()
}

const isItMyOffer = computed(() => offer.value.creator === authStore.user.id)
const isAlreadyProposed = computed(() => {
	const proposals = offer.value.expand?.proposals ?? []
	const proposal = proposals.find(proposal => proposal.user === authStore.user.id)

	return proposal !== undefined
})

const created = computed(() => new Date(offer.value.created))
const deadline = computed(() => new Date(offer.value.deadline))

const deleteConfirmationModal = reactive<{
	show: boolean
}>({
	show: false,
})
const showDeleteConfirmation = () => deleteConfirmationModal.show = true
const hideDeleteConfirmation = () => deleteConfirmationModal.show = false
</script>
