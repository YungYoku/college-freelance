<template>
	<Grid :columns="4">
		<SelectLive
			v-model="university"
			place-holder="Выберите университет..."
			api="universities"
		/>

		<Skeleton
			v-if="loading"
			class="h-9"
		/>
		<Button
			v-else
			@click="loadOffers"
		>
			Поиск
		</Button>
	</Grid>

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
				:loading="loading"
			/>
		</template>
	</Grid>

	<span v-else>Нет доступных объявлений.</span>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useSearchStore } from '@/stores/search.ts'

import http from '@/plugins/http'

import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer.ts'
import EmptyJobOffer from '@/components/blocks/EmptyJobOffer.vue'
import JobOffer from '@/components/blocks/JobOffer.vue'
import Grid from '@/components/structures/Grid.vue'
import SelectLive from '@/components/blocks/SelectLive.vue'
import { University } from '@/interfaces/University.ts'
import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'


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

const loading = ref(true)
const loadOffers = async () => {
	loading.value = true

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
	if (filters.length) {
		if (filters.length === 1) {
			filter = filters[0]
		} else {
			filter = filters.reduce((acc, filter) => filter ? `${acc} && ${filter}` : acc, '')
		}

		encodedFilter = encodeURIComponent(filter)
		encodedFilter = `filter=(${encodedFilter})&`
	}

	await http
		.get<JobOffers>(`/collections/job_offers/records?${encodedFilter}expand=creator,type&perPage=12`)
		.then(res => {
			offers.value = res.items
		})

	loading.value = false
	searchStore.setLoading(false)
}
watch(() => authStore.isLoaded, () => {
	if (authStore.isLoaded) loadOffers()
}, { immediate: true })
</script>