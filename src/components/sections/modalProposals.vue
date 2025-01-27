<template>
	<Modal
		:width="440"
		class="modal-proposals"
		@close="close"
	>
		<Grid
			:columns="1"
			gap="l"
		>
			<Text size="m">
				Отклики
			</Text>

			<template
				v-for="(proposal, index) in proposals"
				:key="proposal.id"
			>
				<div class="modal-proposals__item">
					<Grid
						:columns="[1, '80px']"
						ver-align="center"
					>
						<UserCard
							v-if="proposal.expand?.user"
							:user="proposal.expand.user"
							link
						/>

						<Button
							v-if="proposal.expand?.user"
							@click="choseProposal(proposal.expand?.user)"
						>
							Выбрать
						</Button>
					</Grid>

					<span v-if="proposal.price">
						Предложенная цена: {{ proposal.price }}₽
					</span>

					<span v-if="proposal.text">
						Сообщение: {{ proposal.text }}
					</span>
				</div>

				<Separator
					v-if="index !== proposals.length - 1"
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
import { Text, Separator } from '@/components/elements'
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

<style scoped lang="scss">
.modal-proposals {
	&__item {
		width: 100%;

		display: flex;
		align-items: flex-start;
		flex-direction: column;
		gap: 8px;
	}
}
</style>