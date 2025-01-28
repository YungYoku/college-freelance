<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
	>
		<Grid :columns="[1, '80px', '100px']">
			<Input
				v-model.trim="form.title.value"
				:error="form.title.error"
				:disabled="loading"
				label="Название"
			/>

			<Button
				:disabled="loading"
				:to="`/offer/${form.id.value}`"
			>
				Назад
			</Button>

			<Button
				:disabled="loading"
				@click="save"
			>
				Сохранить
			</Button>
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

					<Input
						v-model="form.price.value"
						:error="form.price.error"
						:disabled="loading"
						label="Цена"
					/>

					<InputFile
						v-model="form.file.value"
						:error="form.file.error"
						:loading="loading"
					/>

					<SelectLive
						v-model="form.discipline.value"
						:error="form.discipline.error"
						place-holder="Дисциплина"
						api="disciplines"
					/>

					<SelectLive
						v-model="form.type.value"
						:error="form.type.error"
						place-holder="Тип работы"
						api="offer_types"
					/>

					<SelectLive
						v-model="form.university.value"
						:error="form.university.error"
						place-holder="Университет"
						api="universities"
					/>

					<DatePicker
						v-model="form.deadline.value"
						:error="form.deadline.error"
						label="Срок сдачи"
					/>

					<Checkbox
						v-model="form.tutoring.value"
						:error="form.tutoring.error"
						label="Репетиторство"
					/>
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

					<Textarea
						v-model.trim="form.description.value"
						:error="form.description.error"
						height="200px"
						label="Описание"
					/>
				</Grid>
			</Island>
		</Grid>
	</Grid>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useToast } from '@/stores/toast'

import { Grid, Island } from '@/components/structures'
import { Button, Checkbox, DatePicker, Input, InputFile, SelectLive, Textarea } from '@/components/blocks'
import { Text } from '@/components/elements'
import { IJobOffer, emptyOffer } from '@/interfaces/JobOffer.ts'
import { IUser } from '@/interfaces/User.ts'
import { Http, Form } from '@/plugins'

const form = Form<IJobOffer>({ ...emptyOffer })

const router = useRouter()
const route = useRoute()
const { id } = route.params

const loading = ref(true)
const loadOffer = async () => {
	if (!id) return
	loading.value = true

	await Http
		.get<IJobOffer>(`/collections/job_offers/records/${id}`, {
			expand: ['creator', 'executor', 'discipline', 'type', 'university']
		})
		.then(response => {
			form.set(response)
		})

	loading.value = false
}
loadOffer()

const toast = useToast()
const save = async () => {
	loading.value = true
	form.clearErrors()

	form.title_lowercase.value = form.title.value
	form.description_lowercase.value = form.description.value

	await Http
		.patch<IUser>(`/collections/job_offers/records/${form.id.value}`, form.get())
		.then(() => {
			router.push(`/offer/${id}`)

			toast.set('Сохранено успешно!')
		})
		.catch(({ data }) => {
			form.setErrors(data)

			toast.set('Ошибка сохранения')
		})

	loading.value = false
}
</script>
