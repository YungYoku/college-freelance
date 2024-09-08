<template>
	<Skeleton
		v-if="loading"
		class="h-7 w-[120px]"
	/>
	<component
		:is="link ? 'router-link' : 'div'"
		v-else
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
		{{ user.name }}
	</component>
</template>


<script setup lang="ts">
import { emptyUser, IUser } from '@/interfaces/User'
import { Skeleton } from '@/components/ui/skeleton'
import Avatar from './avatar.vue'

interface Props {
    user: IUser,
	loading: boolean
	link?: boolean
}

withDefaults(defineProps<Props>(), {
	user: () => ({ ...emptyUser }),
	loading: false,
	link: false
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
