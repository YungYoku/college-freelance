<template>
	<Modal
		:width="440"
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

			<template
				v-for="(proposal, index) in proposals"
				:key="proposal.id"
			>
				<div class="flex w-full items-start gap-2 flex-col">
					<div class="flex w-full items-center gap-2">
						<UserCard
							v-if="proposal.expand?.user"
							:user="proposal.expand.user"
							link
						/>

						<Button
							v-if="proposal.expand?.user"
							class="ml-auto"
							@click="choseProposal(proposal.expand?.user)"
						>
							Выбрать
						</Button>
					</div>

					<span v-if="proposal.price">
						Предложенная цена: {{ proposal.price }}₽
					</span>

					<span v-if="proposal.text">
						Сообщение: {{ proposal.text }}
					</span>
				</div>

				<div
					v-if="index !== proposals.length - 1"
					class="border-t my-1"
				/>
			</template>

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
import { UserCard, Button } from '@/components/blocks'
import { Text } from '@/components/elements'
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