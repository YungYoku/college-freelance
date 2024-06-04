<template>
	<Grid
		v-if="loading || offers.length"
		:columns-l="4"
		:columns-m="4"
	>
		<template v-if="loading">
			<EmptyJobOffer
				v-for="i in 8"
				:key="i"
			/>
		</template>
		<template v-else-if="offers.length">
			<JobOffer
				v-for="offer in offers"
				:key="offer.id"
				:job-offer="offer"
				:loading="loading"
				show-remove
				show-status
				@remove="remove"
			/>
		</template>
	</Grid>
	<span
		v-else
		class="mr-auto ml-auto"
	>
		Пусто
	</span>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

import http from '@/plugins/http'
import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer.ts'
import { Grid } from '@/components/structures'
import { EmptyJobOffer, JobOffer } from '@/components/blocks'


const auth = useAuthStore()

const offers = ref<Array<IJobOffer>>([])

const loading = ref(true)
const getUserOffers = async () => {
	if (auth.user.id === '') return

	loading.value = true

	if (auth.user.favorite.length === 0) {
		loading.value = false
		return
	}

	await http
		.get<JobOffers>('/collections/job_offers/records', {
			filter: `(${auth.user.favorite.reduce((result, id) => result + `id='${id}' || `, '').slice(0, -3)})`,
			expand: ['proposals', 'type', 'discipline']
		})
		.then(response => {
			offers.value = response.items
		})

	loading.value = false
}

watch(() => auth.user.id, getUserOffers, { immediate: true })

const remove = async (offer: IJobOffer) => {
	await http
		.delete(`/collections/job_offers/records/${offer.id}`)
		.then(() => {
			offers.value = offers.value.filter((item) => item.id !== offer.id)
		})
}
</script>


<style scoped lang="scss">
.offer-wrapper {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	padding: 20px;

	border: 1px solid grey;
	border-radius: 10px;
	gap: 20px;
}
</style>