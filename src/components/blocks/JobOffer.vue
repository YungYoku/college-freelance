<template>
	<Island class="job-offer bg-primary-foreground">
		<div class="job-offer__actions">
			<template v-if="jobOffer.executor && showChat">
				<Skeleton
					v-if="loading"
					class="h-6 w-[24px]"
				/>
				<div
					v-else
					@click="openChat"
				>
					<Icon
						name="comment-dots"
						size="s"
					/>
				</div>
			</template>

			<template v-else-if="jobOffer.proposals && showResponses">
				<Skeleton
					v-if="loading"
					class="h-6 w-[24px]"
				/>
				<div
					v-else
					class="job-offer__responses"
					@click="openResponse"
				>
					<Icon
						name="user"
						size="s"
					/>
					{{ jobOffer.proposals.length }}
				</div>
			</template>

			<template v-if="authStore.isExecutor">
				<Skeleton
					v-if="loading"
					class="h-6 w-[24px]"
				/>
				<div
					v-else
					@click="addToFavorite"
				>
					<Icon
						:name="authStore.user.favorite.includes(jobOffer.id) ? 'heart-active' : 'heart'"
						size="s"
					/>
				</div>
			</template>

			<template v-if="showRemove">
				<Skeleton
					v-if="loading"
					class="h-6 w-[24px]"
				/>
				<div
					v-else
					@click="remove"
				>
					<Icon
						name="trash"
						size="s"
					/>
				</div>
			</template>
		</div>


		<Skeleton
			v-if="loading"
			class="h-8 w-[200px]"
		/>
		<router-link
			v-else
			:to="`/offer/${jobOffer.id}`"
			class="job-offer__title text-2xl"
		>
			{{ jobOffer.title }}
		</router-link>


		<Skeleton
			v-if="loading"
			class="h-4 w-[140px]"
		/>
		<div
			v-else
			class="job-offer__description text-sm"
		>
			{{ jobOffer.description }}
		</div>


		<Skeleton
			v-if="loading"
			class="h-4 w-[100px]"
		/>
		<div
			v-else
			class="job-offer__price text-sm"
		>
			Доход: {{ jobOffer.price }} ₽
		</div>


		<div class="flex flex-wrap gap-2">
			<Badge v-if="!loading && jobOffer.expand?.type?.name">
				{{ jobOffer.expand.type.name }}
			</Badge>
			<Badge v-if="!loading && jobOffer.expand?.discipline?.name">
				{{ jobOffer.expand.discipline.name }}
			</Badge>
		</div>


		<div class="job-offer__footer">
			<Skeleton
				v-if="loading"
				class="h-6 w-[200px]"
			/>
			<User
				v-else-if="jobOffer?.expand?.creator"
				class="job-offer__user"
				link
				:user="jobOffer.expand.creator"
			/>

			<Skeleton
				v-if="loading"
				class="h-6 w-[200px]"
			/>
			<div
				v-else
				class="job-offer__deadline text-xs"
			>
				Дедлайн: {{ deadline }}
			</div>
		</div>
	</Island>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

import { Island } from '@/components/structures'
import User from './User.vue'
import { Icon } from '@/components/elements'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import http from '@/plugins/http'
import { useAuthStore } from '@/stores/auth.ts'
import { JobOffer } from '@/interfaces/JobOffer'

const props = defineProps({
	jobOffer: {
		type: Object as PropType<JobOffer>,
		required: true
	},
	showResponses: {
		type: Boolean,
		default: false
	},
	showChat: {
		type: Boolean,
		default: false
	},
	showRemove: {
		type: Boolean,
		default: false
	},
	loading: {
		type: Boolean,
		default: false
	}
})

const authStore = useAuthStore()

const emit = defineEmits(['show-responses', 'show-chat', 'add-to-favorite', 'remove'])

const openResponse = () => emit('show-responses', props.jobOffer)
const openChat = () => emit('show-chat', props.jobOffer)
const addToFavorite = async () => {
	const newFavorite = authStore.user.favorite.includes(props.jobOffer.id)
		? authStore.user.favorite.filter(id => id !== props.jobOffer.id)
		: [...authStore.user.favorite, props.jobOffer.id]

	await http
		.patch(`/collections/users/records/${authStore.user.id}`, {
			favorite: newFavorite
		})
		.then(() => authStore.setUser({ ...authStore.user, favorite: newFavorite }))
}
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
	align-items: flex-start;

    max-width: 100%;
    height: 200px;

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

		width: 100%;
        margin: auto 0 0 0;
    }
}
</style>