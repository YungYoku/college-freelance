<template>
	<Grid :columns="[1, '140px']">
		<Input
			v-model.trim="newOffer.title.value"
			:disabled="loading"
			:error="newOffer.title.error"
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
				:error="newOffer.description.error"
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
import {
	Input,
	Textarea,
	Button,
	DatePicker,
	SelectLive,
	InputFile,
	Checkbox
} from '@/components/blocks'
import { useToast } from '@/components/ui/toast'
import { emptyOffer, IJobOffer } from '@/interfaces/JobOffer'
import { Http, Form } from '@/plugins'
import { Text } from '@/components/elements'

const auth = useAuthStore()

const newOffer = Form<IJobOffer>({ ...emptyOffer })

const router = useRouter()
const { toast } = useToast()

watch(() => auth.user.id, () => newOffer.creator.value = auth.user.id, { immediate: true })

const loading = ref(false)
const createOffer = async () => {
	if (auth.isPersonalInfoIncomplete) {
		toast({
			title: 'Для создания объявления требуется заполнить свои имя и фамилию!'
		})
		return
	}

	loading.value = true
	newOffer.clearErrors()

	await Http
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
