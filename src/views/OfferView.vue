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

        <Button
            v-if="leaveResponseButtonShow"
            @click="leaveResponse"
        >
            Откликнуться
        </Button>
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth.ts'

import http from '@/plugins/http'
import { JobOffer } from '@/interfaces/JobOffer.ts'
import { Button } from '@/components/ui/button/index.ts'

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
    updated: '',
    executor: '',
    responses: []
})

const route = useRoute()
const { id } = route.params
const loadOffer = async () => {
    if (!id) return

    await http
        .get<JobOffer>(`/collections/job_offers/records/${id}`)
        .then(response => {
            offer.value = response
        })
}
loadOffer()

const authStore = useAuthStore()
const leaveResponse = async () => {
    await http
        .patch<JobOffer>(`/collections/job_offers/records/${id}`, {
            responses: [...offer.value.responses, authStore.user.id]
        })
}

const leaveResponseButtonShow = computed(() => {
    const isAlreadyResponded = !offer.value.responses.includes(authStore.user.id)
    const isItMyOffer = offer.value.creator === authStore.user.id
    return isAlreadyResponded && !isItMyOffer
})
</script>
