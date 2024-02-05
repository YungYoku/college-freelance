<template>
    <DefaultLayout>
        <JobSearch 
            :input-value="tag"
        />
        <SearchTags @selected-tag="updateSearch" />
        <JobOffer
            v-for="offer in offers"
            :key="offer.id"
            :job-offer="offer"
        />
    </DefaultLayout>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import http from '@/plugins/http'
import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer.ts'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import JobOffer from '@/components/blocks/JobOffer.vue'
import JobSearch from '@/components/blocks/JobSearch.vue'
import SearchTags from '@/components/blocks/SearchTags.vue'

const tag = ref('')

const updateSearch = (tag:string) => {
    console.log(tag)
}

const offers = ref<Array<IJobOffer>>([])

http
    .get<JobOffers>('/collections/jobOffers/records')
    .then(res => {
        offers.value = res.items
    })
</script>