<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="outline">
				<Icon
					:name="auth.user.notifications.length ? 'notifications-on' : 'notifications-off'"
				/>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-56">
			<template v-if="notificationsAmount > 0">
				<template
					v-for="(notification, index) in auth.user.expand?.notifications"
					:key="notification.id"
				>
					<DropdownMenuItem>
						{{ notification.text }}
					</DropdownMenuItem>

					<DropdownMenuSeparator v-if="notificationsAmount !== index + 1"/>
				</template>
			</template>

			<DropdownMenuItem v-else>
				Уводомления отсутствуют
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useAuthStore } from '@/stores/auth.ts'
import { Button } from '@/components/blocks'
import { Icon } from '@/components/elements'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const auth = useAuthStore()

const notificationsAmount = computed(() => {
	const notifications = auth.user.expand?.notifications
	if (notifications && notifications.length > 0) return notifications.length
	return 0
})
</script>
