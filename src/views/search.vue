<template>
	<Grid
		:columns-xl="4"
		:columns-l="3"
		:columns-m="2"
		:columns-s="1"
	>
		<Input
			v-if="Screen.isSize('s')"
			v-model="search"
			label="Поиск"
		/>

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
			v-model="offerDiscipline"
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
				:loading="loading"
			/>
		</template>
	</Grid>

	<span v-else>Нет доступных объявлений.</span>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useSearchStore } from '@/stores/search.ts'

import { Grid } from '@/components/structures'
import { EmptyJobOffer, JobOffer, SelectLive, Button, Input } from '@/components/blocks'
import { IJobOffer, IJobOffers } from '@/interfaces/JobOffer.ts'
import { Http, Screen } from '@/plugins'

const offers = ref<Array<IJobOffer>>([])

const authStore = useAuthStore()
const searchStore = useSearchStore()

const _search = ref('')
const search = computed({
	get: () => _search.value,
	set: (value) => {
		_search.value = value
		searchStore.update(value)
	}
})
watch(() => searchStore.search, (value) => {
	search.value = value
}, { immediate: true })

const university = ref('')
const offerType = ref('')
const offerDiscipline = ref('')

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
	if (search.value) filters.push(`title~'${search.value}'`)
	if (university.value) filters.push(`university='${university.value}'`)
	if (offerType.value) filters.push(`type='${offerType.value}'`)
	if (offerDiscipline.value) filters.push(`discipline='${offerDiscipline.value}'`)
	if (filters.length) {
		filter = filters.reduce((acc, filter) => filter ? `${acc} && ${filter}` : acc, '')
		filter = filter.slice(4)

		encodedFilter = encodeURIComponent(filter)
	}

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
	searchStore.setLoading(false)
}
loadOffers()
</script>