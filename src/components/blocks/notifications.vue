<template>
	<Dropdown :items>
		<Button
			variant="outline"
			class="relative"
			@click="onOpen"
		>
			<Icon name="notifications"/>

			<span
				v-if="notifications.findIndex(item => !item.checked) !== -1"
				class="bg-red-500 w-2 h-2 absolute right-1 top-1 rounded-full"
			/>
		</Button>

		<template #item="notification">
			<Grid
				:columns="1"
				vertical
				gap="xs"
			>
				<Text size="xs">
					{{ notification.text }}
				</Text>

				<Text
					size="xs"
					class="text-xs"
				>
					{{ $date(new Date(notification?.created), 'datetime') }}
				</Text>

				<span
					v-if="!notification.checked"
					class="bg-red-500 w-2 h-2 absolute right-2 top-2 rounded-full"
				/>
			</Grid>
		</template>
	</Dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

import { Dropdown, Grid } from '@/components/structures'
import { Button } from '@/components/blocks'
import { Icon, Text } from '@/components/elements'
import { INotification } from '@/interfaces/Notification.ts'
import { Http } from '@/plugins'

const auth = useAuthStore()

const notifications = computed<Array<INotification>>(() => auth.user?.expand?.notifications ?? [])
const items = computed(() => notifications.value.map(item => [item]))

const onOpen = async () => {
	await Http.post<Array<INotification>>('/check-notifications')

	setTimeout(() => {
		auth.setUser({
			...auth.user,
			expand: {
				...auth.user?.expand,
				notifications: notifications.value.map(item => {
					item.checked = true
					return item
				})
			}
		})
	}, 3000)
}
</script>