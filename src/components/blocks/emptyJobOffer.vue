<template>
	<JobOffer
		:job-offer="emptyOffer"
		loading
	/>
</template>

<script setup lang="ts">
import JobOffer from './jobOffer.vue'
import { emptyOffer } from '@/interfaces/JobOffer.ts'
</script>
