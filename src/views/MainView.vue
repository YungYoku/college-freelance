<template>
    <default-layout>
        Главная

        <job-offer
            v-for="offer in offers"
            :key="offer.id"
            :job-offer="offer"
        />
    </default-layout>
</template>

<script lang="ts" setup>
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import { ref } from 'vue'
import JobOffer from '@/components/blocks/JobOffer.vue'
import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer.ts'
import http from '@/plugins/http'

const offers = ref<Array<IJobOffer>>([])

http
    .get<JobOffers>('/collections/jobOffers/records')
    .then(res => {
        offers.value = res.items
    })
</script>