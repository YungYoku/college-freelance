<template>
	<JobSearch v-model="search"/>

	<SearchTags @select-tag="updateSearch"/>

	<SubjectsSlider/>

	<Grid :columns="4">
		<JobOffer
			v-for="offer in offers"
			:key="offer.id"
			:job-offer="offer"
		/>
	</Grid>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import http from '@/plugins/http'
import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer.ts'
import JobOffer from '@/components/blocks/JobOffer.vue'
import JobSearch from '@/components/blocks/JobSearch.vue'
import SearchTags from '@/components/blocks/SearchTags.vue'
import SubjectsSlider from '@/components/blocks/SubjectsSlider.vue'
import Grid from '@/components/structures/Grid.vue'

const search = ref('')

const updateSearch = (tag: string) => {
	search.value = tag
}

const offers = ref<Array<IJobOffer>>([])

http
	.get<JobOffers>('/collections/job_offers/records?expand=creator')
	.then(res => {
		offers.value = res.items
	})
</script>