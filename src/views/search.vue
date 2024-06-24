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

		<SelectLive
			v-model="form.university.value"
			:error="form.university.error"
			place-holder="Университет"
			api="universities"
		/>

		<SelectLive
			v-model="form.type.value"
			:error="form.type.error"
			place-holder="Тип работы"
			api="offer_types"
		/>

		<SelectLive
			v-model="form.discipline.value"
			:error="form.discipline.error"
			place-holder="Дисциплина"
			api="disciplines"
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

	<template v-else>
		<Grid
			v-if="executors.length || loading"
			:columns-xl="4"
			:columns-l="3"
			:columns-m="2"
			:columns-s="1"
		>
			<template v-if="loading">
				<UserCard
					v-for="i in 8"
					:key="i"
					loading
					link
				/>
			</template>
			<template v-else>
				<UserCard
					v-for="executor in executors"
					:key="executor.id"
					:user="executor"
					link
				/>
			</template>
		</Grid>
		<span v-else>Нет доступных исполнителей.</span>
	</template>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'
import { useSearchStore } from '@/stores/search.ts'

import { Grid } from '@/components/structures'
import { EmptyJobOffer, JobOffer, SelectLive, Button, Input, Select, UserCard } from '@/components/blocks'
import { IJobOffer, IJobOffers } from '@/interfaces/JobOffer.ts'
import { Datetime, Form, Http, Screen } from '@/plugins'
import { IUser, IUsers } from '@/interfaces/User.ts'

interface SearchForm {
	entity: 'offer' | 'executor',
	university: string
	type: string
	discipline: string
}

const offers = ref<Array<IJobOffer>>([])
const executors = ref<Array<IUser>>([])

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

const form = Form<SearchForm>({
	entity: 'offer',
	university: '',
	type: '',
	discipline: ''
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

	if (!authStore.isAdmin) filters.push(`status='created' && deadline>='${Datetime.get(new Date())}'`)
	if (search.value) filters.push(`title~'${search.value}'`)
	if (form.university.value) filters.push(`university='${form.university.value}'`)
	if (form.type.value) filters.push(`type='${form.type.value}'`)
	if (form.discipline.value) filters.push(`discipline='${form.discipline.value}'`)
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

const loadUsers = async () => {
	await Http
		.get<IUsers>('/collections/users/records', {
			filter: '(role=\'executor\')',
			expand: ['university', 'rating', 'disciplines'],
			perPage: 12
		})
		.then(res => {
			executors.value = res.items
		})
}

const loadData = async () => {
	loading.value = true
	searchStore.setLoading(true)

	if (form.entity.value === 'offer') {
		await loadOffers()
	} else {
		await loadUsers()
	}

	loading.value = false
	searchStore.setLoading(false)
}
loadData()
</script>