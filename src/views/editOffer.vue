<template>
	<Grid :columns="[1, '75px', '106px']">
		<Input
			v-model.trim="form.title.value"
			:disabled="loading"
			label="Имя"
		/>

		<router-link :to="`/offer/${form.id.value}`">
			<Button
				:disabled="loading"
				class="ml-auto"
			>
				Назад
			</Button>
		</router-link>

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
					v-model="form.discipline.value"
					place-holder="Дисциплина"
					api="disciplines"
				/>

				<SelectLive
					v-model="form.type.value"
					place-holder="Тип работы"
					api="offer_types"
				/>

				<SelectLive
					v-model="form.university.value"
					place-holder="Университет"
					api="universities"
				/>

				<DatePicker
					v-model="form.deadline.value"
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
import { IJobOffer } from '@/interfaces/JobOffer.ts'
import { Grid, Island } from '@/components/structures'
import { Button, DatePicker, Input, SelectLive, Textarea } from '@/components/blocks'
import { Text } from '@/components/elements'
import Form from '@/plugins/form'
import { IUser } from '@/interfaces/User.ts'

const { toast } = useToast()

const form = Form<IJobOffer>({
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
})

const route = useRoute()
const { id } = route.params

const loading = ref(true)
const loadOffer = async () => {
	if (!id) return
	loading.value = true

	await http
		.get<IJobOffer>(`/collections/job_offers/records/${id}`, {
			expand: ['creator', 'executor', 'discipline', 'type', 'university']
		})
		.then(response => {
			form.set(response)
		})

	loading.value = false
}
loadOffer()

const save = async () => {
	loading.value = true
	form.clearErrors()

	await http
		.patch<IUser>(`/collections/job_offers/records/${form.id.value}`, form.get())
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
