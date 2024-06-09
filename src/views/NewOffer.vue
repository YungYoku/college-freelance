<template>
	<Card
		width="400px"
		title="Создание объявления"
		@keyup.enter="createOffer"
	>
		<Input
			v-model.trim="newOffer.title.value"
			:error="newOffer.title.error"
			label="Название"
			type="text"
		/>

		<Textarea
			v-model.trim="newOffer.description.value"
			:error="newOffer.description.error"
			height="200px"
			label="Описание"
		/>

		<SelectLive
			v-model="offerType"
			:error="newOffer.type.error"
			place-holder="Тип работы"
			api="offer_types"
		/>

		<SelectLive
			v-model="offerDisciplines"
			:error="newOffer.discipline.error"
			place-holder="Дисциплина"
			api="disciplines"
		/>

		<Input
			v-model.number="newOffer.price.value"
			:error="newOffer.price.error"
			label="Цена"
		/>

		<InputFile
			v-model="newOffer.file.value"
			:error="newOffer.file.error"
			:loading="loading"
		/>

		<DatePicker
			v-model="newOffer.deadline.value"
		/>

		<template #footer>
			<Button
				:disabled="loading"
				class="w-[180px]"
				@click="createOffer"
			>
				Создать объявление
			</Button>
		</template>
	</Card>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import { Card } from '@/components/structures'
import { Input, Textarea, Button, DatePicker, SelectLive, InputFile } from '@/components/blocks'
import { useToast } from '@/components/ui/toast'
import { JobOffer } from '@/interfaces/JobOffer'
import http from '@/plugins/http'
import Form from '@/plugins/form'

const auth = useAuthStore()

const offerType = ref({
	id: '',
	name: ''
})
const offerDisciplines = ref({
	id: '',
	name: ''
})

const newOffer = Form<JobOffer>({
	chat: '',
	collectionId: '',
	collectionName: '',
	created: '',
	creator: '',
	discipline: '',
	executor: '',
	id: '',
	ratingCreator: '',
	ratingExecutor: '',
	proposals: [],
	status: 'created',
	university: '',
	updated: '',
	title: '',
	description: '',
	type: '',
	price: 0,
	file: null,
	deadline: new Date()
})

const router = useRouter()
const { toast } = useToast()

watch(() => auth.user.id, () => newOffer.creator.value = auth.user.id, { immediate: true })

const loading = ref(false)
const createOffer = async () => {
	loading.value = true
	newOffer.clearErrors()

	await http
		.post<JobOffer>('/collections/job_offers/records/', {
			...newOffer.get(),
			type: offerType.value?.id,
			discipline: offerDisciplines.value?.id
		})
		.then(response => {
			router.push(`/offer/${response.id}`)
		})
		.catch(({ data }) => {
			newOffer.setErrors(data)

			toast({
				title: 'Ошибка при создании объявления',
			})

			loading.value = false
		})
}
</script>