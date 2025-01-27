<template>
	<Island class="job-offer">
		<div class="job-offer__actions">
			<template v-if="jobOffer.executor && showingChat">
				<Skeleton
					v-if="loading"
					width="24px"
					height="24px"
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

			<template v-else-if="jobOffer.proposals && showingProposals">
				<Skeleton
					v-if="loading"
					width="24px"
					height="24px"
				/>
				<div
					v-else
					class="job-offer__proposals"
					@click="showProposals"
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
					width="24px"
					height="24px"
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
			<template v-if="showingRemove && jobOffer.status === 'created'">
				<Skeleton
					v-if="loading"
					width="24px"
					height="24px"
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
			width="200px"
			height="32px"
		/>
		<router-link
			v-else
			:to="`/offer/${jobOffer.id}`"
			class="job-offer__title"
		>
			<Text
				size="m"
				:title="jobOffer.title"
			>
				{{ jobOffer.title }}
			</Text>
		</router-link>

		<div
			v-if="!loading"
			class="job-offer__info"
		>
			<Badge
				class="bg-purple-600"
				variant="secondary"
			>
				{{ jobOffer.price }} ₽
			</Badge>
			<Badge v-if="jobOffer.expand?.type?.name">
				{{ jobOffer.expand.type.name }}
			</Badge>
			<Badge v-if="jobOffer.expand?.discipline?.name">
				{{ jobOffer.expand.discipline.name }}
			</Badge>
			<Badge v-if="showingStatus && status">
				{{ status }}
			</Badge>
		</div>

		<Text
			class="job-offer__description"
			size="xs"
			:loading
			loading-width="140px"
		>
			{{ jobOffer.description }}
		</Text>

		<div class="job-offer__footer">
			<User
				v-if="jobOffer?.expand?.creator"
				:loading
				class="job-offer__user"
				link
				:user="jobOffer.expand.creator"
			/>

			<Text
				size="xs"
				:loading
				loading-width="100px"
			>
				Дедлайн: {{ $date(deadline) }}
			</Text>
		</div>
	</Island>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'

import { Island } from '@/components/structures'
import { Icon, Badge, Skeleton, Text } from '@/components/elements'
import User from './user.vue'
import { Http } from '@/plugins'
import { useAuthStore } from '@/stores/auth.ts'
import { IJobOffer } from '@/interfaces/JobOffer'

const props = defineProps({
	jobOffer: {
		type: Object as PropType<IJobOffer>,
		required: true
	},
	showingProposals: {
		type: Boolean,
		default: false
	},
	showingChat: {
		type: Boolean,
		default: false
	},
	showingRemove: {
		type: Boolean,
		default: false
	},
	showingStatus: {
		type: Boolean,
		default: false
	},
	loading: {
		type: Boolean,
		default: false
	}
})

const authStore = useAuthStore()

const emit = defineEmits(['show-proposals', 'show-chat', 'add-to-favorite', 'remove'])

const showProposals = () => emit('show-proposals', props.jobOffer)
const openChat = () => emit('show-chat', props.jobOffer)
const addToFavorite = async () => {
	const newFavorite = authStore.user.favorite.includes(props.jobOffer.id)
		? authStore.user.favorite.filter(id => id !== props.jobOffer.id)
		: [...authStore.user.favorite, props.jobOffer.id]

	await Http
		.patch(`/collections/users/records/${authStore.user.id}`, {
			favorite: newFavorite
		})
		.then(() => authStore.setUser({ ...authStore.user, favorite: newFavorite }))
}
const remove = () => emit('remove', props.jobOffer)

const status = computed(() => {
	switch (props.jobOffer?.status) {
	case 'created':
		return 'Создано'
	case 'in_progress':
		return 'В работе'
	case 'on_review':
		return 'На проверке'
	case 'ended':
		return 'Завершено'
	default:
		return null
	}
})

const deadline = computed(() => new Date(props.jobOffer?.deadline))
</script>

<style scoped lang="scss">
.job-offer {
	max-width: 100%;
	height: 240px;

	position: relative;

	display: flex;
	flex-direction: column;
	align-items: flex-start;
	gap: 10px;

	background-color: hsl(var(--primary-foreground));
	overflow: hidden;

	&__actions {
		position: absolute;
		top: 10px;
		right: 10px;

		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	&__proposals {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 5px;

		cursor: pointer;
	}

	&__title {
		max-width: 100%;
		max-height: 32px;

		padding-right: 48px;
	}

	&__title,
	&__description {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
	}

	&__description {
		max-height: 64px;

		overflow: hidden;
		text-overflow: ellipsis;
	}

	&__info {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;

		padding-right: 48px;
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
