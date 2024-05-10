<template>
	<Card class="new-offer">
		<CardHeader>
			<CardTitle>
				Создание объявления
			</CardTitle>
		</CardHeader>

		<CardContent>
			<div class="grid items-center w-full gap-2">
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
					placeholder="Введите название объявления"
					type="text"
				/>

				<Textarea
					v-model.trim="newOffer.description"
					class="new-offer__description"
					placeholder="Описание"
				/>

				<Input
					v-model.trim="newOffer.price"
					placeholder="Предложите цену, ₽"
				/>

				<DatePicker
					v-model="newOffer.deadline"
				/>
			</div>
		</CardContent>

		<CardFooter>
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
		</CardFooter>
	</Card>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import http from '@/plugins/http'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import DatePicker from '@/components/blocks/DatePicker.vue'
import { JobOffer } from '@/interfaces/JobOffer'
import SelectLive from '@/components/blocks/SelectLive.vue'
import { Skeleton } from '@/components/ui/skeleton'

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

watch(() => auth.user.id, () => newOffer.creator = auth.user.id, { immediate: true })

const loading = ref(false)
const createOffer = async () => {
	if (!offerType.value?.id) return
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
		.catch(error => {
			console.error(error)
		})

	loading.value = false
}
</script>

<style scoped lang="scss">
.new-offer {
    min-width: 320px;

    &__description {
        height: 200px;
    }
}
</style>


