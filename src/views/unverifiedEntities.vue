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

		<Select
			v-model="form.entity.value"
			:error="form.entity.error"
			:items="entitiesItems"
			label="Сущность"
		/>

		<Button
			:disabled="loading"
			@click="loadData"
		>
			Поиск
		</Button>
	</Grid>

	<template v-if="form.entity.value === 'offer'">
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
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useSearchStore } from '@/stores/search.ts'

import { Grid } from '@/components/structures'
import {
	EmptyJobOffer,
	JobOffer,
	Button,
	Input,
	Select,
} from '@/components/blocks'
import { IJobOffer, IJobOffers } from '@/interfaces/JobOffer.ts'
import { Form, Http, Screen } from '@/plugins'

interface SearchForm {
	priceFrom: string
	priceTo: string
	entity: 'offer' | 'executor'
	university: string
	type: string
	discipline: string
	tutoring: boolean
}

const offers = ref<Array<IJobOffer>>([])

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

const form = Form<SearchForm>({
	priceFrom: '',
	priceTo: '',
	entity: 'offer',
	university: '',
	type: '',
	discipline: '',
	tutoring: false
})
const entitiesItems = [
	{ value: 'offer', text: 'Объявление' },
	{ value: 'executor', text: 'Исполнитель' }
]

const loading = ref(true)
const loadOffers = async () => {
	const filters = []
	let filter = ''
	let encodedFilter = ''

	if (search.value) filters.push(`title~'${search.value}'`)
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
}

const loadData = async () => {
	loading.value = true
	searchStore.setLoading(true)

	if (form.entity.value === 'offer') {
		await loadOffers()
	}

	loading.value = false
	searchStore.setLoading(false)
}
loadData()
</script>