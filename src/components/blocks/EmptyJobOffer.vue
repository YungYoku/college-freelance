<template>
	<JobOffer
		:job-offer="emptyOffer"
		loading
	/>
</template>

<script setup lang="ts">
import JobOffer from '@/components/blocks/JobOffer.vue'
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
	rating: 0,
	status: 'created',
	type: '',
	university: '',
	updated: '',
	title: '',
	description: '',
	price: 0
}
</script>
