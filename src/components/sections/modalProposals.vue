<template>
	<Modal
		:width="400"
		@close="close"
	>
		<Grid
			:columns="1"
			class="pt-7"
		>
			<Text
				class="absolute top-2 left-3"
				size="xs"
			>
				Отклики
			</Text>

			<div
				v-for="(user) in responsesUsers"
				:key="user.id"
				class="flex w-full items-center gap-2"
			>
				<UserCard
					:loading="responsesLoading"
					:user="user"
					link
				/>

				<Icon
					v-if="!responsesLoading"
					class="ml-auto"
					name="check"
					@click="choseProposal"
				/>
			</div>
			
			<Text
				v-if="responsesUsers.length === 0"
				size="xs"
			>
				Пусто
			</Text>
		</Grid>
	</Modal>
</template>

<script setup lang="ts">
import { Grid, Modal } from '@/components/structures'
import { UserCard } from '@/components/blocks'
import { Icon, Text } from '@/components/elements'
import { IUser } from '@/interfaces/User.ts'

interface Props {
	responsesUsers: Array<IUser>
	responsesLoading: boolean
}

withDefaults(defineProps<Props>(), {
	responsesUsers: () => ([]),
	responsesLoading: false
})

const emit = defineEmits(['close', 'chose-proposal'])
const close = () => emit('close')
const choseProposal = (user: IUser) => emit('chose-proposal', user)
</script>