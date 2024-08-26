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
			<template v-if="notifications.length > 0">
				<template
					v-for="(notification, index) in notifications"
					:key="notification.id"
				>
					<DropdownMenuItem>
						<Grid
							vertical
							gap="xs"
						>
							<span>{{ notification.text }}</span>

							<span>{{ $date(new Date(notification?.created)) }}</span>
						</Grid>
					</DropdownMenuItem>

					<DropdownMenuSeparator v-if="notifications.length !== index + 1"/>
				</template>
			</template>

			<DropdownMenuItem v-else>
				Уведомления отсутствуют
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useAuthStore } from '@/stores/auth.ts'
import { Grid } from '@/components/structures'
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

const notifications = computed(() => auth.user?.expand?.notifications ?? [])
</script>
