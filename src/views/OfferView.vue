<template>
    <div class="offer">
        <div class="offer__title">
            {{ offer.title }}
        </div>

        <div class="offer__description">
            {{ offer.description }}
        </div>

        <div class="offer__price">
            {{ offer.price }}
        </div>

        <div class="offer__rating">
            {{ offer.rating }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

import http from '@/plugins/http'
import { JobOffer } from '@/interfaces/JobOffer.ts'

const route = useRoute()

const { id } = route.params

const offer = ref<JobOffer>({
    collectionId: '',
    collectionName: '',
    created: '',
    creator: '',
    deadline: new Date(),
    description: '',
    discipline: '',
    id: '',
    price: 0,
    rating: 0,
    status: 0,
    title: '',
    university: '',
    updated: ''
})

const loadOffer = async () => {
    if (!id) return

    await http
        .get<JobOffer>(`/collections/job_offers/records/${id}`)
        .then(response => {
            offer.value = response
        })
}
loadOffer()
</script>
