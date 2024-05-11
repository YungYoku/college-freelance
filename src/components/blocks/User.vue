<template>
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
			:image="`users/${user.id}/${user.avatar}`"
		/>
		{{ user.name }}
	</component>
</template>


<script setup lang="ts">
import { User } from '@/interfaces/User'
import Avatar from '@/components/blocks/Avatar.vue'

interface Props {
    user: User,
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
		rating: 0,
		updated: '',
		username: '',
		verified: false,
		role: 'customer',
		university: '',
		energy: 0,
		disciplines: [],
		referral_code: ''
	}),
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
