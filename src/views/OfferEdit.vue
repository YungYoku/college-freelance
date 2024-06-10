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
					Дисциплина: {{ form.discipline.value ?? 'Не указана' }}
				</Text>
				<Text
					size="xs"
					:loading="loading"
				>
					Университет: {{ form.university.value ??'Не указан' }}
				</Text>

				<Text
					size="xs"
					:loading="loading"
				>
					Срок сдачи: {{ form.deadline.value }}
				</Text>
			</div>
			<div
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

import http from '@/plugins/http'
import { JobOffer } from '@/interfaces/JobOffer.ts'
import { Grid, Island } from '@/components/structures'
import { Button, Input, Textarea, User as UserCard } from '@/components/blocks'
import { PageTitle, Text } from '@/components/elements'
import Form from '@/plugins/form'

const form = Form({
	title: '',
	price: '',
	discipline: '',
	university: '',
	deadline: '',
	creator: '',
	executor: '',
	description: ''
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

// const paymentMethods = [
// 	{
// 		id: '1',
// 		name: 'Карта',
// 	},
// 	{
// 		id: '2',
// 		name: 'Крипта',
// 	},
// 	{
// 		id: '3',
// 		name: 'СБП',
// 	},
// ]
const loading = ref(true)
const loadOffer = async () => {
	if (!id) return

	await http
		.get<JobOffer>(`/collections/job_offers/records/${id}`, {
			expand: ['creator', 'executor', 'proposals', 'discipline']
		})
		.then(response => {
			offer.value = response

			console.log(offer.value)
			console.log(form)
		})

	loading.value = false
}
loadOffer()

</script>
