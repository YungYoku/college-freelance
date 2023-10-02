<template>
    <div class="job-offer">
        <div>
            {{ jobOffer.id }}
        </div>
        <div>
            Заголовок: {{ jobOffer.title }}
        </div>
        <div>
            Описание: {{ jobOffer.description }}
        </div>
        <div>
            Цена: {{ jobOffer.price }}
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import { JobOffer } from '@/interfaces/JobOffer.ts'

defineProps({
    jobOffer: {
        type: Object as PropType<JobOffer>,
        required: true
    }
})
</script>

<style scoped>
.job-offer {
    max-width: 200px;

    background: #1a1a1a;
}
</style>