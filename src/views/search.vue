<template>
	<Grid
		:columns-l="4"
		:columns-m="3"
		:columns-s="2"
		:columns-xs="1"
	>
		<SelectLive
			v-model="university"
			place-holder="Университет"
			api="universities"
		/>

		<SelectLive
			v-model="offerType"
			place-holder="Тип работы"
			api="offer_types"
		/>

		<SelectLive
			v-model="offerDisciplines"
			place-holder="Дисциплина"
			api="disciplines"
		/>

		<Button
			:disabled="loading"
			@click="loadOffers"
		>
			Поиск
		</Button>
	</Grid>

	<Grid
		v-if="offers.length || loading"
		:columns-l="4"
		:columns-m="3"
		:columns-s="2"
		:columns-xs="1"
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
				:loading="loading"
			/>
		</template>
	</Grid>

	<span v-else>Нет доступных объявлений.</span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useSearchStore } from '@/stores/search.ts'

import http from '@/plugins/http'

import { Grid } from '@/components/structures'
import { EmptyJobOffer, JobOffer, SelectLive, Button } from '@/components/blocks'
import { University } from '@/interfaces/University.ts'
import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer.ts'

const offers = ref<Array<IJobOffer>>([])

const authStore = useAuthStore()
const searchStore = useSearchStore()

const university = ref<University>({
	collectionId: '',
	collectionName: '',
	created: new Date(),
	id: '',
	updated: new Date(),
	name: ''
})
const offerType = ref({
	id: '',
	name: ''
})
const offerDisciplines = ref({
	id: '',
	name: ''
})

const loading = ref(true)
const loadOffers = async () => {
	loading.value = true
	searchStore.setLoading(true)

	const filters = []
	let filter = ''
	let encodedFilter = ''

	const year = new Date().getFullYear()
	const month = new Date().getMonth() + 1
	const getFormattedMonth = (month: number) => month < 10 ? '0' + month : month
	const day = new Date().getDate()
	const getFormattedDay = (day: number) => day < 10 ? '0' + day : day
	const today = `${year}-${getFormattedMonth(month)}-${getFormattedDay(day)}`

	if (!authStore.isAdmin) filters.push(`status='created' && deadline>='${today}'`)
	if (searchStore.search) filters.push(`title~'${searchStore.search}'`)
	if (university.value.id) filters.push(`university='${university.value.id}'`)
	if (offerType.value.id) filters.push(`type='${offerType.value.id}'`)
	if (offerDisciplines.value.id) filters.push(`discipline='${offerDisciplines.value.id}'`)
	if (filters.length) {
		filter = filters.reduce((acc, filter) => filter ? `${acc} && ${filter}` : acc, '')
		filter = filter.slice(4)

		encodedFilter = encodeURIComponent(filter)
	}

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
	searchStore.setLoading(false)
}
loadOffers()
</script>