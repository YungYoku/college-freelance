<template>
    <div class="job-offer">
        <router-link :to="`/offer/${jobOffer.id}`">
            Заголовок: {{ jobOffer.title }}
        </router-link>

        <div>
            Описание: {{ jobOffer.description }}
        </div>

        <div class="job-offer__footer">
            <User
                v-if="jobOffer?.expand?.creator"
                class="job-offer__user"
                :user="jobOffer.expand.creator"
            />

            <div class="job-offer__price">
                Цена: {{ jobOffer.price }} ₽
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { JobOffer } from '@/interfaces/JobOffer'
import User from '@/components/blocks/User.vue'

defineProps({
    jobOffer: {
        type: Object as PropType<JobOffer>,
        required: true
    }
})
</script>

<style scoped lang="scss">
.job-offer {
    display: flex;
    flex-direction: column;

    max-width: 100%;
    height: 200px;
    padding: 10px;

    background: #1a1a1a;
    border-radius: 5px;
    gap: 5px;

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin: auto 0 0 0;
    }
}
</style>