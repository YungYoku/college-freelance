<template>
	<Grid :columns="[1, '140px']">
		<PageTitle :loading="loading">
			<Input
				v-model.trim="form.title.value"
				:disabled="loading"
				label="Имя"
			/>
		</PageTitle>

		<Button
			:disabled="loading"
			class="ml-auto"
			@click="save"
		>
			Сохранить
		</Button>
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
				<Input
					v-model="form.price.value"
					:disabled="loading"
					label="Цена"
				/>

				<SelectLive
					v-model="offerDisciplines"
					place-holder="Дисциплина"
					api="disciplines"
				/>

				<SelectLive
					v-model="offerType"
					place-holder="Тип работы"
					api="offer_types"
				/>

				<!--				<Text-->
				<!--					size="xs"-->
				<!--					:loading="loading"-->
				<!--				>-->
				<!--					Университет: {{ form.university.value ??'Не указан' }}-->
				<!--				</Text>-->

				<DatePicker
					v-model="form.deadline.value"
					label="Срок сдачи"
				/>
			</div>
			<Grid
				:columns="2"
				class="flex justify-between"
			>
				<UserCard
					class="mt-4 max-w-10"
					link
					:user="offer.expand?.creator"
					:loading="loading"
				/>

				<div v-if="form.executor.value">
					Исполнитель
					<UserCard
						class="mt-4"
						link
						:user="offer.expand?.executor"
						:loading="loading"
					/>
				</div>
			</Grid>
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
				v-model.trim="form.description.value"
				height="200px"
				label="Описание"
			/>
		</Island>
	</Grid>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useToast } from '@/components/ui/toast'

import http from '@/plugins/http'
import { JobOffer } from '@/interfaces/JobOffer.ts'
import { Grid, Island } from '@/components/structures'
import { Button, DatePicker, Input, SelectLive, Textarea, User as UserCard } from '@/components/blocks'
import { PageTitle, Text } from '@/components/elements'
import Form from '@/plugins/form'
import { User } from '@/interfaces/User.ts'

const { toast } = useToast()

const form = Form({
	title: '',
	price: 0,
	discipline: '',
	type: '',
	university: '',
	deadline: new Date(),
	creator: '',
	executor: '',
	description: ''
})

const offerDisciplines = ref({
	id: '',
	name: ''
})

const offerType = ref({
	id: '',
	name: ''
})


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
	loading.value = true

	await http
		.get<JobOffer>(`/collections/job_offers/records/${id}`, {
			expand: ['creator', 'executor', 'discipline', 'type', 'university']
		})
		.then(response => {
			offer.value = response

			form.title.value = offer.value.title
			form.price.value = offer.value.price
			form.university.value = offer.value.university
			form.description.value = offer.value.description
			form.deadline.value = new Date(offer.value.deadline)

			offerDisciplines.value = offer.value?.expand?.discipline ?? {
				id: '',
				name: ''
			}
			offerType.value = offer.value?.expand?.type ?? {
				id: '',
				name: ''
			}
		})

	loading.value = false
}
loadOffer()
const save = async () => {
	loading.value = true
	form.clearErrors()

	await http
		.patch<User>(`/collections/job_offers/records/${offer.value.id}`, {
			...form.get(),
			discipline: offerDisciplines.value?.id,
			type: offerType.value?.id
		})
		.then(() => {
			toast({
				title: 'Сохранено успешно!'
			})
		})
		.catch(({ data }) => {
			form.setErrors(data)

			toast({
				title: 'Ошибка сохранения'
			})
		})

	loading.value = false
}
</script>
