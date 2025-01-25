<template>
	<Card
		class="card-rating"
		width="100%"
	>
		<Grid
			vertical
			gap="l"
		>
			<Grid :columns="[1, '132px']">
				<router-link
					class="card-rating__user"
					:to="`/users/${rating.expand?.by?.id}`"
				>
					<Grid
						:columns="['32px', 1]"
						gap="s"
						ver-align="center"
					>
						<Avatar
							size="s"
							:user="rating.expand?.by"
						/>
						<div>
							{{ rating.expand?.by?.name }} {{ rating.expand?.by?.surname }}
						</div>
					</Grid>
				</router-link>

				<RatingStars
					:stars="rating.stars"
					size="s"
				/>
			</Grid>

			<template v-if="rating.review">
				<Separator/>

				<Text size="xs">
					{{ rating.review }}
				</Text>

				<Separator/>
			</template>

			<Text size="xs">
				{{ $date(created) }}
			</Text>
		</Grid>
	</Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Card, Grid } from '@/components/structures'
import { Avatar, RatingStars } from '@/components/blocks'
import { Text, Separator } from '@/components/elements'
import { IRating, emptyRating } from '@/interfaces/Rating.ts'

interface Props {
	rating: IRating
}
const props = withDefaults(defineProps<Props>(), {
	rating: () => emptyRating,
})

const created = computed(() => new Date(props.rating?.created))
</script>

<style scoped lang="scss">
.card-rating {
	&__user {
		cursor: pointer;
	}
}
</style>