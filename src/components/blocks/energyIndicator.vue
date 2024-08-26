<template>
	<Button
		v-if="auth.isLoggedIn"
		variant="outline"
		@click="claim"
	>
		<Icon
			name="energy"
			class="mr-1"
		/>
		{{ auth.user.energy }}
	</Button>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts'
import { Button } from '@/components/blocks'
import { Icon } from '@/components/elements'
import { useToast } from '@/components/ui/toast'
import { Datetime, Http } from '@/plugins'
import { IUser } from '@/interfaces/User.ts'

const auth = useAuthStore()

const { toast } = useToast()
const claim = async () => {
	await Http
		.post<IUser>('/claim-energy')
		.then((res) => {
			auth.setUser(res)
			toast({
				title: 'Было получено 5 энергии!'
			})
		})
		.catch(() => {
			toast({
				title: `Не прошло достаточно времени. Последняя дата получения энергии: ${Datetime.get(auth.user.checked_at)}`
			})
		})
}
</script>