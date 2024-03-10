<template>
	<div class="grid items-center w-full gap-4">
		<PageTitle size="l">
			{{ offer.title }}
		</PageTitle>

		<div class="offer__description">
			Описание: {{ offer.description }}
		</div>

		<div class="offer__price">
			Цена: {{ offer.price }} ₽
		</div>

		<div class="offer__rating">
			Рейтинг: {{ offer.rating }}
		</div>

		<Button
			v-if="!loading"
			:disabled="isResponseButtonDisabled"
			class="ml-auto"
			@click="leaveResponse"
		>
			Откликнуться
		</Button>
	</div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

import http from '@/plugins/http'
import { JobOffer } from '@/interfaces/JobOffer.ts'
import { Button } from '@/components/ui/button'
import PageTitle from '@/components/elements/PageTitle.vue'

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
	rating: 0,
	status: 0,
	title: '',
	university: '',
	updated: '',
	type: '',
	executor: '',
	responses: []
})

const route = useRoute()
const { id } = route.params

const loading = ref(true)
const loadOffer = async () => {
	if (!id) return

	await http
		.get<JobOffer>(`/collections/job_offers/records/${id}`)
		.then(response => {
			offer.value = response
		})

	loading.value = false
}
loadOffer()

const authStore = useAuthStore()
const leaveResponse = async () => {
	if (isResponseButtonDisabled.value) return

	await http
		.patch<JobOffer>(`/collections/job_offers/records/${id}`, {
			responses: [...offer.value.responses, authStore.user.id]
		})
}

const isResponseButtonDisabled = computed(() => {
	const isAlreadyResponded = !offer.value.responses.includes(authStore.user.id)
	const isItMyOffer = offer.value.creator === authStore.user.id
	return isAlreadyResponded || isItMyOffer || loading.value
})
</script>
