<template>
	<Dropdown
		v-if="auth.isLoggedIn"
		:items
	>
		<Button variant="outline">
			<Grid
				:columns="[0, 0]"
				gap="xs"
			>
				<Icon name="energy"/>

				{{ auth.user.energy }}
			</Grid>
		</Button>
	</Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/stores/toast'

import { Dropdown, Grid } from '@/components/structures'
import { Button } from '@/components/blocks'
import { Icon } from '@/components/elements'
import { Datetime, Http } from '@/plugins'
import { IUser } from '@/interfaces/User.ts'

const auth = useAuthStore()

const toast = useToast()
const claim = async () => {
	await Http
		.post<IUser>('/claim-energy')
		.then((res) => {
			auth.setUser(res)
			toast.set('Было получено 5 энергии!')
		})
		.catch(() => {
			toast.set(`Не прошло достаточно времени. Последняя дата получения энергии: ${Datetime.get(auth.user.checked_at)}`)
		})
}

const items = computed(() => [
	[
		{
			text: 'Получить 5 энергии!',
			action: claim,
			can: auth.isRewardClaimable
		},
		{
			text: 'Энергию можно будет получить завтра!',
			can: !auth.isRewardClaimable
		},
	],
])
</script>