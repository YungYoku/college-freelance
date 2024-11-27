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
				v-for="proposal in proposals"
				:key="proposal.id"
				class="flex w-full items-center gap-2"
			>
				<UserCard
					v-if="proposal.expand?.user"
					:user="proposal.expand.user"
					link
				/>

				<Icon
					v-if="proposal.expand?.user"
					class="ml-auto"
					name="check"
					@click="choseProposal(proposal.expand?.user)"
				/>
			</div>
			
			<Text
				v-if="proposals.length === 0"
				size="xs"
			>
				Пусто
			</Text>
		</Grid>
	</Modal>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Grid, Modal } from '@/components/structures'
import { UserCard } from '@/components/blocks'
import { Icon, Text } from '@/components/elements'
import { IUser } from '@/interfaces/User.ts'
import { emptyOffer, IJobOffer } from '@/interfaces/JobOffer.ts'

interface Props {
	offer: IJobOffer
}

const props = withDefaults(defineProps<Props>(), {
	offer: () => ({ ...emptyOffer })
})

const proposals = computed(() => props.offer.expand?.proposals ?? [])

const emit = defineEmits(['close', 'chose-proposal'])
const close = () => emit('close')
const choseProposal = (user: IUser) => emit('chose-proposal', user)
</script>