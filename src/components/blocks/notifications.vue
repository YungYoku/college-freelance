<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
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
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-56">
			<template v-if="notifications.length > 0">
				<template
					v-for="(notification, index) in notifications"
					:key="notification.id"
				>
					<DropdownMenuItem>
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
import { Icon, Text } from '@/components/elements'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { INotification } from '@/interfaces/Notification.ts'
import { Http } from '@/plugins'

const auth = useAuthStore()

const notifications = computed<Array<INotification>>(() => auth.user?.expand?.notifications ?? [])

const onOpen = () => {
	Http.post<Array<INotification>>('/check-notifications')
		.then(() => {
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
		})
}
</script>