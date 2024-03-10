<template>
	<Card class="new-offer">
		<CardHeader>
			<CardTitle>
				Создание объявления
			</CardTitle>
		</CardHeader>

		<CardContent>
			<div class="grid items-center w-full gap-4">
				<Input
					v-model.trim="jobForm.title"
					placeholder="Введите название объявления"
					type="text"
				/>

				<Textarea
					v-model.trim="jobForm.description"
					class="new-offer__description"
					placeholder="Описание"
				/>

				<Input
					v-model.trim="jobForm.price"
					placeholder="Предложите цену, ₽"
				/>
			</div>
		</CardContent>

		<CardFooter>
			<Button @click="postOffer">
				Создать объявление
			</Button>
		</CardFooter>
	</Card>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

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

const auth = useAuthStore()

const jobForm = reactive({
	title: '',
	description: '',
	price: '',
})

const postOffer = async () => {
	await http
		.post('/collections/job_offers/records/', {
			...jobForm,
			creator: auth.user.id
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

        resize: none;
    }
}
</style>


