<template>
	<Card
		width="100%"
		class="max-w-[100%]"
	>
		<Grid :columns="[1, '132px']">
			<router-link
				class="user cursor-pointer"
				:to="`/users/${rating.expand?.by?.id}`"
			>
				<Grid
					:columns="['30px', 1]"
					gap="l"
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
				v-model="stars"
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

const emit = defineEmits(['update:model-value'])

const stars = computed({
	get: () => props.rating.stars,
	set: value => emit('update:model-value', value)
})

const created = computed(() => new Date(props.rating?.created))
</script>
