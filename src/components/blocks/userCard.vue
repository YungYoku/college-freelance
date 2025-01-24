<template>
	<Island class="bg-primary-foreground overflow-hidden">
		<Grid
			:columns="1"
			vertical
		>
			<template v-if="loading">
				<Skeleton class="h-8 w-[180px]"/>
				<Skeleton class="h-5 w-[120px]"/>
			</template>

			<template v-else>
				<component
					:is="link ? 'router-link' : 'div'"
					class="user"
					:class="{
						'cursor-pointer': link,
					}"
					:to="`/users/${user.id}`"
				>
					<Avatar
						size="s"
						:user="user"
					/>
					{{ user.name }} {{ user.surname }}
				</component>

				<div
					v-if="university || averageRating || disciplines.length"
					class="flex flex-wrap gap-2"
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
			</template>
		</Grid>
	</Island>
</template>


<script setup lang="ts">
import { computed } from 'vue'

import { Island, Grid } from '@/components/structures'
import { Badge, Skeleton } from '@/components/elements'
import Avatar from './avatar.vue'
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
.user {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
}
</style>
