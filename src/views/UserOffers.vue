<template>
    <default-layout>
        <p
            v-if="isOfferExist"
        >У вас пока нет объявлений.</p>
        <p
            v-else
        >Ваши объявления:</p>
        <JobOffer
            v-for="offer in offers"
            :key="offer.id"
            :job-offer="offer"
        />
    </default-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
// import { reactive } from 'vue'
import http from '@/plugins/http'
import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer.ts'
import JobOffer from '@/components/blocks/JobOffer.vue'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'

const auth = useAuthStore()
let isOfferExist = false


const offers = ref<Array<IJobOffer>>([])

const getUserOffers = async () => {
    await http
        .get<JobOffers>('/collections/job_offers/records')
        .then(response => {
            const userOffers = response.items.filter(offer => offer.creator === auth.user.id)
            if (userOffers.length === 0)
                isOfferExist = true
            offers.value = userOffers
        })
        .catch(error => {
            console.log(error)
        })
}
getUserOffers()
</script>


<style scoped lang="sass">
.offer-wrapper
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center

  padding: 20px

  border: 1px solid grey
  border-radius: 10px
  gap: 20px
</style>