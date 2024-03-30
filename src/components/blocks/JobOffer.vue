<template>
	<div class="job-offer bg-primary-foreground">
		<div class="job-offer__actions">
			<div
				v-if="jobOffer.executor && showResponses"
				@click="openChat"
			>
				<Icon
					name="comment-dots"
					size="s"
				/>
			</div>

			<div
				v-else-if="jobOffer.proposals && showResponses"
				class="job-offer__responses"
				@click="openResponse"
			>
				<Icon
					name="user"
					size="s"
				/>
				{{ jobOffer.proposals.length }}
			</div>

			<div
				v-if="showRemove"
				@click="remove"
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
			{{ jobOffer.title }}
		</router-link>

		<div class="job-offer__description">
			{{ jobOffer.description }}
		</div>

		<div class="job-offer__price">
			Доход: {{ jobOffer.price }} ₽
		</div>

		<div class="job-offer__footer">
			<User
				v-if="jobOffer?.expand?.creator"
				class="job-offer__user"
				:user="jobOffer.expand.creator"
			/>

			<div class="job-offer__deadline">
				Дедлайн: {{ deadline }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { JobOffer } from '@/interfaces/JobOffer'
import User from '@/components/blocks/User.vue'
import Icon from '@/components/elements/Icon.vue'

const props = defineProps({
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

const emit = defineEmits(['show-responses', 'show-chat', 'remove'])

const openResponse = () => emit('show-responses', props.jobOffer)
const openChat = () => emit('show-chat', props.jobOffer)
const remove = () => emit('remove', props.jobOffer)

const deadline = computed(() => {
	return new Date(props.jobOffer?.deadline).toLocaleString()
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
    }

	&__title {
		font-size: 20px;
	}

	&__description,
	&__price,
	&__deadline {
		font-size: 14px;
	}

    &__title,
	&__description {
		display: flex;
		justify-content: flex-start;
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