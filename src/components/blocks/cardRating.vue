<template>
	<Card
		width="100%"
		class="max-w-[100%] pt-4"
	>
		<Grid :columns="[1, '132px']">
			<router-link
				class="user cursor-pointer"
				:to="`/users/${rating.expand?.by?.id}`"
			>
				<Grid
					:columns="['50px', 1, 1]"
					class="flex flex-wrap justify-between items-center"
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

		<div
			v-if="rating.review"
			class="border border-solid border-1 border-gray-500 rounded-sm my-2"
		/>

		<Text
			size="xs"
			class="text-base mb-2"
		>
			{{ rating.review }}
		</Text>

		{{ $date(created) }}
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
