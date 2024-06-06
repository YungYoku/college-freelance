<template>
	<JobOffer
		:job-offer="emptyOffer"
		loading
	/>
</template>

<script setup lang="ts">
import JobOffer from './jobOffer.vue'
import { JobOffer as IJobOffer } from '@/interfaces/JobOffer.ts'

const emptyOffer: IJobOffer = {
	chat: '',
	collectionId: '',
	collectionName: '',
	created: '',
	creator: '',
	deadline: new Date(),
	discipline: '',
	executor: '',
	id: '',
	proposals: [],
	ratingCreator: 0,
	ratingExecutor: 0,
	status: 'created',
	type: '',
	university: '',
	updated: '',
	title: '',
	description: '',
	file: null,
	price: 0
}
</script>
