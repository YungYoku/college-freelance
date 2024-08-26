<template>
	<DropdownMenu v-if="auth.isLoggedIn">
		<DropdownMenuTrigger as-child>
			<Button variant="outline">
				<Icon
					name="energy"
					class="mr-1"
				/>
				{{ auth.user.energy }}
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-46">
			<Button
				v-if="auth.isRewardClaimable"
				variant="outline"
				@click="claim"
			>
				Получить 5 энергии!
			</Button>

			<DropdownMenuItem v-else>
				Энергию можно будет получить завтра!
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.ts'

import { Button } from '@/components/blocks'
import { Icon } from '@/components/elements'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
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