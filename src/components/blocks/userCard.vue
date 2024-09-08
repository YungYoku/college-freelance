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

				<div class="flex flex-wrap gap-2">
					<Badge v-if="user.expand?.university">
						{{ user.expand.university.name }}
					</Badge>

					<Badge v-if="averageRating">
						Рейтинг {{ averageRating }}
					</Badge>

					<template v-if="user.expand?.disciplines">
						<Badge
							v-for="discipline in user.expand?.disciplines"
							:key="discipline.id"
						>
							{{ discipline.name }}
						</Badge>
					</template>
				</div>
			</template>
		</Grid>
	</Island>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { emptyUser, IUser } from '@/interfaces/User'
import { Island, Grid } from '@/components/structures'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import Avatar from './avatar.vue'

interface Props {
	user: IUser,
	loading: boolean
	link: boolean
}

const props = withDefaults(defineProps<Props>(), {
	user: () => ({ ...emptyUser }),
	loading: false,
	link: false
})

const averageRating = computed(() => {
	const rating = props.user?.expand?.rating
	if (rating) {
		return rating.reduce((result, current) => result + current.stars, 0) / rating.length
	}
	return null
})
</script>

<style lang="scss" scoped>
.user {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;
}
</style>
