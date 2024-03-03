<template>
    <div class="job-offer">
        <div class="job-offer__actions">
            <div
                v-if="jobOffer.responses && showResponses"
                class="job-offer__responses"
            >
                <Icon
                    name="comment-dots"
                    size="s"
                />
                {{ jobOffer.responses.length }}
            </div>

            <div
                v-if="showRemove"
                class="job-offer__remove"
            >
                <Icon
                    name="trash"
                    size="s"
                />
            </div>
        </div>

        <router-link
            :to="`/offer/${jobOffer.id}`"
            class="job-offer__title"
        >
            Заголовок: {{ jobOffer.title }}
        </router-link>

        <div class="job-offer__description">
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
import Icon from '@/components/elements/Icon.vue'

defineProps({
    jobOffer: {
        type: Object as PropType<JobOffer>,
        required: true
    },
    showResponses: {
        type: Boolean,
        default: false
    },
    showRemove: {
        type: Boolean,
        default: false
    }
})
</script>

<style scoped lang="scss">
.job-offer {
    position: relative;

    display: flex;
    flex-direction: column;

    max-width: 100%;
    height: 200px;
    padding: 10px;

    background: #1a1a1a;
    border-radius: 5px;
    gap: 5px;

    &__actions {
        position: absolute;
        top: 10px;
        right: 10px;

        display: flex;
        flex-direction: column;
        gap: 10px;

        .job-offer__responses {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 5px;

            cursor: pointer;
        }

        .job-offer__responses,
        .job-offer__remove {
            .icon {
                filter: invert(1);
            }
        }
    }

    &__title,
    &__description {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    &__footer {
        display: flex;
        justify-content: space-between;
        align-items: center;

        margin: auto 0 0 0;
    }
}
</style>