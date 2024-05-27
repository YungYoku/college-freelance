<template>
	<Card
		width="400px"
		title="Создание объявления"
	>
		<SelectLive
			v-model="offerType"
			place-holder="Выберите тип работы..."
			api="offer_types"
		/>

		<SelectLive
			v-model="offerDisciplines"
			place-holder="Выберите дисциплину..."
			api="disciplines"
		/>

		<Input
			v-model.trim="newOffer.title"
			label="Введите название объявления"
			type="text"
		/>

		<Textarea
			v-model.trim="newOffer.description"
			class="h-[200px]"
			placeholder="Описание"
		/>

		<Input
			v-model.trim="newOffer.price"
			label="Предложите цену, ₽"
		/>

		<DatePicker
			v-model="newOffer.deadline"
		/>

		<template #footer>
			<Skeleton
				v-if="loading"
				class="h-9 w-[180px]"
			/>
			<Button
				v-else
				class="w-[180px]"
				@click="createOffer"
			>
				Создать объявление
			</Button>
		</template>
	</Card>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import http from '@/plugins/http'
import Input from '@/components/blocks/Input.vue'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import Card from '@/components/structures/Card.vue'
import DatePicker from '@/components/blocks/DatePicker.vue'
import { JobOffer } from '@/interfaces/JobOffer'
import SelectLive from '@/components/blocks/SelectLive.vue'
import { Skeleton } from '@/components/ui/skeleton'
import { useToast } from '@/components/ui/toast'

const auth = useAuthStore()

const offerType = ref({
	id: null,
	name: null
})
const offerDisciplines = ref({
	id: null,
	name: null
})

const newOffer = reactive<JobOffer>({
	chat: '',
	collectionId: '',
	collectionName: '',
	created: '',
	creator: '',
	discipline: '',
	executor: '',
	id: '',
	ratingCreator: 0,
	ratingExecutor: 0,
	proposals: [],
	status: 'created',
	university: '',
	updated: '',
	title: '',
	description: '',
	type: '',
	price: 0,
	deadline: new Date()
})

const router = useRouter()
const { toast } = useToast()

watch(() => auth.user.id, () => newOffer.creator = auth.user.id, { immediate: true })

const loading = ref(false)
const createOffer = async () => {
	loading.value = true

	await http
		.post<JobOffer>('/collections/job_offers/records/', {
			...newOffer,
			type: offerType.value?.id,
			discipline: offerDisciplines.value?.id
		})
		.then(response => {
			router.push(`/offer/${response.id}`)
		})
		.catch(() => {
			toast({
				title: 'Ошибка при создании объявления',
			})
		})

	loading.value = false
}
</script>