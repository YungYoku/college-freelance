<template>
	<Skeleton
		v-if="loading"
		width="120px"
		height="28px"
	/>

	<component
		:is="link ? 'router-link' : 'div'"
		v-else
		class="user"
		:class="{
			'_link': link,
		}"
		:to="`/users/${user.id}`"
	>
		<Avatar
			size="s"
			:user="user"
		/>
		{{ user.name }}

		<template v-if="showingSurname">
			{{ user.surname }}
		</template>
	</component>
</template>


<script setup lang="ts">
import { emptyUser, IUser } from '@/interfaces/User'
import { Skeleton } from '@/components/elements'
import Avatar from './avatar.vue'

interface Props {
	user: IUser,
	loading: boolean
	link?: boolean
	showingSurname?: boolean
}

withDefaults(defineProps<Props>(), {
	user: () => ({ ...emptyUser }),
	loading: false,
	link: false,
	showingSurname: false
})
</script>

<style lang="scss" scoped>
.user {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	gap: 10px;

	&._link {
		cursor: pointer;
	}
}
</style>
