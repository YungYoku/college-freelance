<template>
	<SearchTags/>

	<Grid
		v-if="offers.length || loading"
		:columns="4"
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
import http from '@/plugins/http'
import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer.ts'
import EmptyJobOffer from '@/components/blocks/EmptyJobOffer.vue'
import JobOffer from '@/components/blocks/JobOffer.vue'
import SearchTags from '@/components/blocks/SearchTags.vue'
import Grid from '@/components/structures/Grid.vue'


const offers = ref<Array<IJobOffer>>([])

const loading = ref(true)
const loadOffers = async () => {
	loading.value = true

	const year = new Date().getFullYear()
	const month = new Date().getMonth() + 1
	const getFormattedMonth = (month: number) => month < 10 ? '0' + month : month
	const day = new Date().getDate()
	const getFormattedDay = (day: number) => day < 10 ? '0' + day : day
	const today = `${year}-${getFormattedMonth(month)}-${getFormattedDay(day)}`

	const filter = `(status='created' && deadline>='${today}')`
	const encodedFilter = encodeURIComponent(filter)

	await http
		.get<JobOffers>('/collections/job_offers/records', {
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