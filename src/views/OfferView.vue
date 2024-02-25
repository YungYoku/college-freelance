<template>
    Деталка оффера
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import http from '@/plugins/http'

const route = useRoute()

const { id } = route.params

const loadOffer = async () => {
    if (!id) return

    await http
        .get(`/collections/job_offers/records/${id}`)
        .then(response => {
            console.log(response)
        })
}
loadOffer()
</script>
