<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
	>
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

				<Button
					v-if="isItMyOffer"
					:to="`/offer/${offer.id}/edit`"
					:disabled="loading"
				>
					Редактировать
				</Button>

				<template v-else-if="authStore.isExecutor">
					<span/>
					<span v-if="isAlreadyProposed"/>
					<Button
						v-else
						:disabled="loading"
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
		>
			<Island>
				<Grid
					vertical
					:columns="1"
				>
					<Text
						size="m"
						:loading="loading"
					>
						Информация о заказе
					</Text>

					<Text
						size="s"
						:loading="loading"
					>
						Цена: {{ offer.price }}₽
					</Text>

					<span/>

					<Text
						size="s"
						:loading="loading"
					>
						Дисциплина: {{ offer.expand?.discipline?.name ?? 'Не указана' }}
					</Text>
					<Text
						size="s"
						:loading="loading"
					>
						Тип работы: {{ offer.expand?.type?.name ?? 'Не указан' }}
					</Text>
					<Text
						size="s"
						:loading="loading"
					>
						Университет: {{ offer.expand?.university?.name ?? 'Не указан' }}
					</Text>

					<span/>

					<Text
						size="s"
						:loading="loading"
					>
						Создано: {{ $date(created) }}
					</Text>
					<Text
						size="s"
						:loading="loading"
					>
						Срок сдачи: {{ $date(deadline) }}
					</Text>

					<span/>

					<Text
						size="s"
						:loading="loading"
					>
						Репетиторство: {{ offer.tutoring ? 'да' : 'нет' }}
					</Text>

					<Grid
						v-if="offer.expand?.creator"
						:columns="[0, 0]"
						ver-align="center"
					>
						<Text
							size="s"
							:loading="loading"
						>
							Заказчик:
						</Text>

						<UserCard
							link
							:user="offer.expand.creator"
							:loading="loading"
						/>
					</Grid>

					<Grid
						v-if="offer.expand?.executor"
						:columns="[0, 0]"
						ver-align="center"
					>
						<Text
							size="s"
							:loading="loading"
						>
							Исполнитель:
						</Text>

						<UserCard
							link
							:user="offer.expand.executor"
							:loading="loading"
						/>
					</Grid>
				</Grid>
			</Island>

			<Island>
				<Grid
					vertical
					:columns="1"
				>
					<Text
						size="m"
						:loading="loading"
					>
						Описание
					</Text>

					<Text
						size="s"
						:loading="loading"
					>
						{{ offer.description }}
					</Text>
				</Grid>
			</Island>
		</Grid>
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
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/stores/toast'

import { Grid, Island } from '@/components/structures'
import { ModalDeleteConfirmation, ModalMakeProposal } from '@/components/sections'
import { Button, User as UserCard } from '@/components/blocks'
import { PageTitle, Text } from '@/components/elements'
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
const toast = useToast()


const makeProposalModal = reactive<{
	show: boolean
}>({
	show: false,
})
const showMakeProposal = () => {
	if (isAlreadyProposed.value) return
	if (authStore.user.energy < 1) {
		toast.set('Недостаточно энергии для отклика')
		return
	}
	if (authStore.isPersonalInfoIncomplete) {
		toast.set('Для отклика на объявление требуется заполнить свои имя и фамилию!')
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

			toast.set('Вы успешно откликнулись')
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
