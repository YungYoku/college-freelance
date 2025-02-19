<template>
	<Island class="user-card">
		<Grid
			:columns="1"
			vertical
		>
			<User
				showing-surname
				:user
				:loading
				:link
			/>

			<Skeleton
				v-if="loading"
				width="120px"
				height="20px"
			/>
			<div
				v-else-if="university || averageRating || disciplines.length"
				class="user-card__info"
			>
				<Badge v-if="university">
					{{ university }}
				</Badge>

				<Badge v-if="averageRating">
					Рейтинг {{ $format('number', averageRating, 2) }}
				</Badge>

				<Badge
					v-for="discipline in disciplines"
					:key="discipline.id"
				>
					{{ discipline.name }}
				</Badge>
			</div>
		</Grid>
	</Island>
</template>


<script setup lang="ts">
import { computed } from 'vue'

import { Island, Grid } from '@/components/structures'
import { User } from '@/components/blocks'
import { Badge, Skeleton } from '@/components/elements'
import { emptyUser, IUser } from '@/interfaces/User'

interface Props {
	user: IUser,
	loading?: boolean
	link: boolean
}

const props = withDefaults(defineProps<Props>(), {
	user: () => ({ ...emptyUser }),
	loading: false,
	link: false
})

const university = computed(() => {
	const name = props.user?.expand?.university?.name
	if (name) return name
	return null
})

const averageRating = computed(() => {
	const rating = props.user?.expand?.rating
	if (rating) {
		return rating.reduce((result, current) => result + current.stars, 0) / rating.length
	}
	return null
})

const disciplines = computed(() => props.user?.expand?.disciplines ?? [])
</script>

<style lang="scss" scoped>
.user-card {
	overflow: hidden;

	background-color: hsl(var(--primary-foreground));

	&__info {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}
}
</style>
