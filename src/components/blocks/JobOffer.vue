<template>
    <div class="job-offer">
        <div>
            Заголовок: {{ jobOffer.title }}
        </div>

        <div>
            Описание: {{ jobOffer.description }}
        </div>

        <div class="job-offer__price">
            Цена: {{ jobOffer.price }} ₽
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { JobOffer } from '@/interfaces/JobOffer'

defineProps({
    jobOffer: {
        type: Object as PropType<JobOffer>,
        required: true
    }
})
</script>

<style scoped lang="sass">
.job-offer
    width: 440px
    max-width: 100%
    height: 200px

    display: flex
    flex-direction: column
    gap: 5px

    padding: 10px

    background: #1a1a1a
    border-radius: 5px

    &__price
        margin: auto 0 0 auto
</style>