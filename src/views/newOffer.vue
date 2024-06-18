<template>
	<Grid :columns="[1, '140px']">
		<Input
			v-model.trim="newOffer.title.value"
			:disabled="loading"
			label="Имя"
		/>

		<Button
			:disabled="loading"
			class="ml-auto"
			@click="createOffer"
		>
			Создать
		</Button>
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
				<Input
					v-model="newOffer.price.value"
					:disabled="loading"
					label="Цена"
				/>
				<InputFile
					v-model="newOffer.file.value"
					:error="newOffer.file.error"
					:loading="loading"
				/>
				<SelectLive
					v-model="newOffer.discipline.value"
					place-holder="Дисциплина"
					api="disciplines"
				/>

				<SelectLive
					v-model="newOffer.type.value"
					place-holder="Тип работы"
					api="offer_types"
				/>

				<SelectLive
					v-model="newOffer.university.value"
					:error="newOffer.university.error"
					place-holder="Университет"
					api="universities"
				/>

				<DatePicker
					v-model="newOffer.deadline.value"
					label="Срок сдачи"
				/>
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

			<Textarea
				v-model.trim="newOffer.description.value"
				height="200px"
				label="Описание"
			/>
		</Island>
	</Grid>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import { Grid, Island } from '@/components/structures'
import { Input, Textarea, Button, DatePicker, SelectLive, InputFile } from '@/components/blocks'
import { useToast } from '@/components/ui/toast'
import { IJobOffer } from '@/interfaces/JobOffer'
import http from '@/plugins/http'
import Form from '@/plugins/form'
import { Text } from '@/components/elements'

const auth = useAuthStore()

const newOffer = Form<IJobOffer>({
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
		.post<IJobOffer>('/collections/job_offers/records/', newOffer.get())
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
