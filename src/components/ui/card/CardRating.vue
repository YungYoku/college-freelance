<template>
	<Card
		width="100%"
		class="max-w-[100%] pt-4">
		<Grid
			:columns="[1,1]">
			<component
				is="router-link"
				class="user cursor-pointer"
				:to="`/users/${item.expand.by.id}`"
			>
				<Grid
					:columns="['50px', 1, 1]"
					class="flex flex-wrap justify-between items-center"
				>
					<Avatar
						size="s"
						:user="item.expand.by"
					/>
					<div>
						{{ item.expand.by.name }} {{ item.expand.by.surname }}
					</div>
				</Grid>
			</component>
			<div class="flex flex-wrap justify-end items-center">
				<RatingStars
					v-model="item.stars"
					size="s"
				/>
			</div>
		</Grid>
		<div
			v-if="item.review"
			class="border border-solid border-1 border-gray-500 rounded-sm my-2"/>
		<Text
			size="xs"
			class="text-base mb-2"
		>
			{{item.review }}
		</Text>
		{{$date(created)}}

	</Card>
</template>


<script setup lang="ts">

import { Card, Grid } from '@/components/structures'
import Avatar from '@/components/blocks/avatar.vue'
import { computed } from 'vue'
import { Text } from '@/components/elements'
import { RatingStars } from '@/components/blocks'


const props = defineProps ({
	item: {
		type: Object,
		default: () => ({})
	}
})
const created = computed(() => new Date(props.item?.created))

</script>

<style scoped lang="scss">

</style>