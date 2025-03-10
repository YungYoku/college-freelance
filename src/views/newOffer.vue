<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
	>
		<Grid :columns="[1, '100px']">
			<Input
				v-model.trim="newOffer.title.value"
				:disabled="loading"
				:error="newOffer.title.error"
				label="Название"
			/>

			<Button
				:disabled="loading"
				@click="createOffer"
			>
				Создать
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
						v-model="newOffer.price.value"
						:disabled="loading"
						:error="newOffer.price.error"
						label="Цена"
					/>
					<InputFile
						v-model="newOffer.file.value"
						:error="newOffer.file.error"
						:loading="loading"
					/>
					<SelectLive
						v-model="newOffer.discipline.value"
						:error="newOffer.discipline.error"
						place-holder="Дисциплина"
						api="disciplines"
					/>

					<SelectLive
						v-model="newOffer.type.value"
						:error="newOffer.type.error"
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
						:error="newOffer.deadline.error"
						label="Срок сдачи"
					/>
				
					<Checkbox
						v-model="newOffer.tutoring.value"
						:error="newOffer.tutoring.error"
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
						v-model.trim="newOffer.description.value"
						:error="newOffer.description.error"
						height="200px"
						label="Описание"
					/>
				</Grid>
			</Island>
		</Grid>
	</Grid>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/stores/toast'

import { Grid, Island } from '@/components/structures'
import {
	Input,
	Textarea,
	Button,
	DatePicker,
	SelectLive,
	InputFile,
	Checkbox
} from '@/components/blocks'
import { emptyOffer, IJobOffer } from '@/interfaces/JobOffer'
import { Http, Form } from '@/plugins'
import { Text } from '@/components/elements'

const auth = useAuthStore()

const newOffer = Form<IJobOffer>({ ...emptyOffer })

const router = useRouter()
const toast = useToast()

watch(() => auth.user.id, () => newOffer.creator.value = auth.user.id, { immediate: true })

const loading = ref(false)
const createOffer = async () => {
	if (auth.isPersonalInfoIncomplete) {
		toast.set('Для создания объявления требуется заполнить свои имя и фамилию!')
		return
	}

	loading.value = true
	newOffer.clearErrors()

	newOffer.title_lowercase.value = newOffer.title.value
	newOffer.description_lowercase.value = newOffer.description.value

	await Http
		.post<IJobOffer>('/collections/job_offers/records', newOffer.get())
		.then(response => {
			router.push(`/offer/${response.id}`)
		})
		.catch(({ data }) => {
			newOffer.setErrors(data)

			toast.set('Ошибка при создании объявления')

			loading.value = false
		})
}
</script>
