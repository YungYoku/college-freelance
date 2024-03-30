<template>
	<SearchTags/>

	<Grid :columns="4">
		<JobOffer
			v-for="offer in offers"
			:key="offer.id"
			:job-offer="offer"
			:loading="loading"
		/>
	</Grid>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import http from '@/plugins/http'
import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer.ts'
import JobOffer from '@/components/blocks/JobOffer.vue'
import SearchTags from '@/components/blocks/SearchTags.vue'
import Grid from '@/components/structures/Grid.vue'

const offers = ref<Array<IJobOffer | {id: number}>>([
	{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }
])

const loading = ref(true)
const loadOffers = async () => {
	loading.value = true

	await http
		.get<JobOffers>('/collections/job_offers/records?expand=creator&perPage=12')
		.then(res => {
			offers.value = res.items
		})

	loading.value = false
}
loadOffers()
</script>