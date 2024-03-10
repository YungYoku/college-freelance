<template>
	<Card class="new-offer">
		<CardHeader>
			<CardTitle>
				Создание объявления
			</CardTitle>
		</CardHeader>

		<CardContent>
			<div class="grid items-center w-full gap-2">
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
			<Button @click="createOffer">
				Создать объявление
			</Button>
		</CardFooter>
	</Card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
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

const auth = useAuthStore()

const newOffer = reactive({
	title: '',
	description: '',
	price: '',
	deadline: new Date()
})

const router = useRouter()

const createOffer = async () => {
	await http
		.post('/collections/job_offers/records/', {
			...newOffer,
			creator: auth.user.id
		})
		.then(response => {
			router.push(`/offer/${response.id}`)
		})
		.catch(error => {
			console.error(error)
		})
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


