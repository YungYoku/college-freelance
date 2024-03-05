<template>
	<Grid :columns="4">
		<JobOffer
			v-for="offer in offers"
			:key="offer.id"
			:job-offer="offer"
			show-responses
			show-remove
		/>
	</Grid>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

import http from '@/plugins/http'
import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer.ts'
import JobOffer from '@/components/blocks/JobOffer.vue'
import Grid from '@/components/structures/Grid.vue'

const auth = useAuthStore()

const offers = ref<Array<IJobOffer>>([])

const getUserOffers = async () => {
	if (auth.user.id === '') return

	await http
		.get<JobOffers>(`/collections/job_offers/records?filter=(creator='${auth.user.id}')`)
		.then(response => {
			offers.value = response.items
		})
}

watch(() => auth.user.id, getUserOffers, { immediate: true })
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