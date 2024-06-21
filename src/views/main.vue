<template>
	<SearchTags/>

	<Grid
		v-if="offers.length || loading"
		:columns-xl="4"
		:columns-l="3"
		:columns-m="2"
		:columns-s="1"
	>
		<template v-if="loading">
			<EmptyJobOffer
				v-for="i in 8"
				:key="i"
			/>
		</template>
		<template v-else>
			<JobOffer
				v-for="offer in offers"
				:key="offer.id"
				:job-offer="offer"
			/>
		</template>
	</Grid>

	<span v-else>Нет доступных объявлений.</span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { IJobOffer, IJobOffers } from '@/interfaces/JobOffer.ts'
import { Grid } from '@/components/structures'
import { EmptyJobOffer, JobOffer, SearchTags } from '@/components/blocks'
import { Http, Datetime } from '@/plugins'


const offers = ref<Array<IJobOffer>>([])

const loading = ref(true)
const loadOffers = async () => {
	loading.value = true

	const filter = `(status='created' && deadline>='${Datetime.get(new Date())}')`
	const encodedFilter = encodeURIComponent(filter)

	await Http
		.get<IJobOffers>('/collections/job_offers/records', {
			filter: encodedFilter,
			expand: ['creator', 'type', 'discipline'],
			perPage: 12
		})
		.then(res => {
			offers.value = res.items
		})

	loading.value = false
}
loadOffers()
</script>