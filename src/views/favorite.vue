<template>
	<Grid
		vertical
		:columns="1"
		gap="l"
	>
		<Grid :columns="1">
			<PageTitle>
				Избранное
			</PageTitle>
		</Grid>

		<Grid
			v-if="loading || offers.length"
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
			<template v-else-if="offers.length">
				<JobOffer
					v-for="offer in offers"
					:key="offer.id"
					:job-offer="offer"
					:loading="loading"
					showing-remove
					showing-status
					@remove="remove"
				/>
			</template>
		</Grid>

		<Text v-else>
			Пусто
		</Text>
	</Grid>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

import { Grid } from '@/components/structures'
import { EmptyJobOffer, JobOffer } from '@/components/blocks'
import { PageTitle, Text } from '@/components/elements'

import { Http } from '@/plugins'
import { IJobOffer, IJobOffers } from '@/interfaces/JobOffer.ts'
const auth = useAuthStore()

const offers = ref<Array<IJobOffer>>([])

const loading = ref(true)
const getUserOffers = async () => {
	if (auth.user.id === '') return

	loading.value = true

	if (auth.user.favorite.length === 0) {
		loading.value = false
		return
	}

	await Http
		.get<IJobOffers>('/collections/job_offers/records', {
			filter: `(${auth.user.favorite.reduce((result, id) => result + `id='${id}' || `, '').slice(0, -3)})`,
			expand: ['proposals', 'type', 'discipline']
		})
		.then(response => {
			offers.value = response.items
		})

	loading.value = false
}

watch(() => auth.user.id, getUserOffers, { immediate: true })

const remove = async (offer: IJobOffer) => {
	await Http
		.delete(`/collections/job_offers/records/${offer.id}`)
		.then(() => {
			offers.value = offers.value.filter((item) => item.id !== offer.id)
		})
}
</script>
