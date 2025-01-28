<template>
	<Dropdown
		class="notifications"
		:items
	>
		<Button
			variant="outline"
			class="notifications__button"
			@click="onOpen"
		>
			<Icon name="notifications"/>

			<span
				v-if="notifications.findIndex(item => !item.checked) !== -1"
				class="notifications__signal"
			/>
		</Button>

		<template #item="{item}">
			<Grid
				:columns="1"
				vertical
				gap="xs"
				class="notifications__item"
			>
				<Text size="xs">
					{{ item.text }}
				</Text>

				<Text
					v-if="item?.created"
					size="xs"
				>
					{{ $date(new Date(item.created), 'datetime') }}
				</Text>

				<span
					v-if="!item.checked"
					class="notifications__signal"
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

<style lang="scss" scoped>
.notifications {
	&__button {
		position: relative;
	}

	&__signal {
		width: 8px;
		height: 8px;

		position: absolute;
		top: 0;
		right: 0;

		background-color: rgb(239 68 68 / 1);
		border-radius: 50%;
	}

	&__item {
		position: relative;
	}
}
</style>