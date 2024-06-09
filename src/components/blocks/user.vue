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
			:image="`${user.id}/${user.avatar}`"
		/>
		{{ user.name }}
	</component>
</template>


<script setup lang="ts">
import { User } from '@/interfaces/User'
import Avatar from './avatar.vue'
import { Skeleton } from '@/components/ui/skeleton'

interface Props {
    user: User,
	loading: boolean
	link: boolean
}

withDefaults(defineProps<Props>(), {
	user: () => ({
		avatar: '',
		collectionId: '',
		collectionName: '',
		created: '',
		email: '',
		emailVisibility: false,
		id: '',
		name: '',
		description: '',
		surname: '',
		rating: [],
		updated: '',
		username: '',
		verified: false,
		role: 'customer',
		university: '',
		energy: 0,
		disciplines: [],
		favorite: [],
		referral_code: ''
	}),
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
