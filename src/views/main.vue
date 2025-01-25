<template>
	<Text
		size="l"
		class="mt-2 mr-auto"
	>
		Актуальные заказы
	</Text>
	<Grid
		v-if="offers.length || loadingOffers"
		:columns-xl="4"
		:columns-l="3"
		:columns-m="2"
		:columns-s="1"
	>
		<template v-if="loadingOffers">
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


	<Text
		size="l"
		class="mt-6 mr-auto"
	>
		Актуальные исполнители
	</Text>
	<Grid
		v-if="executors.length || loadingExecutors"
		:columns-xl="4"
		:columns-l="3"
		:columns-m="2"
		:columns-s="1"
	>
		<UserCard
			v-for="executor in executors"
			:key="executor.id"
			:user="executor"
			:loading="loadingExecutors"
			link
		/>
	</Grid>
	<span v-else>Нет доступных исполнителей.</span>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { IJobOffer, IJobOffers } from '@/interfaces/JobOffer.ts'
import { IUsers, IUser, emptyUser } from '@/interfaces/User.ts'
import { Grid } from '@/components/structures'
import { EmptyJobOffer, JobOffer, UserCard } from '@/components/blocks'
import { Text } from '@/components/elements'
import { Http, Datetime } from '@/plugins'

const loadingOffers = ref(true)
const offers = ref<Array<IJobOffer>>([])
const loadOffers = async () => {
	loadingOffers.value = true

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

	loadingOffers.value = false
}
loadOffers()

const loadingExecutors = ref(true)
const executors = ref<Array<IUser>>(Array(8).fill(emptyUser))
const loadExecutors = async () => {
	loadingExecutors.value = true

	await Http
		.get<IUsers>('/collections/users/records', {
			filter: '(role=\'executor\')',
			expand: ['university', 'rating', 'disciplines'],
			perPage: 12
		})
		.then(res => {
			executors.value = res.items
		})

	loadingExecutors.value = false
}
loadExecutors()
</script>