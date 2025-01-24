<template>
	<Card width="100%">
		<Grid :columns="[1, '132px']">
			<router-link
				class="user cursor-pointer"
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
			<div class="border-t my-1"/>

			<Text size="xs">
				{{ rating.review }}
			</Text>

			<div class="border-t my-1"/>
		</template>

		<Text size="xs">
			{{ $date(created) }}
		</Text>
	</Card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Card, Grid } from '@/components/structures'
import { Avatar, RatingStars } from '@/components/blocks'
import { Text } from '@/components/elements'
import { IRating, emptyRating } from '@/interfaces/Rating.ts'

interface Props {
	rating: IRating
}
const props = withDefaults(defineProps<Props>(), {
	rating: () => emptyRating,
})

const created = computed(() => new Date(props.rating?.created))
</script>
