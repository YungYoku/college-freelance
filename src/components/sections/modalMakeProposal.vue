<template>
	<Modal
		:width="600"
		@close="close"
	>
		<Grid
			:columns="1"
			vertical
		>
			<Textarea
				v-model="form.text.value"
				:error="form.text.error"
				:disabled="loading"
				label="Текст"
				height="240px"
			/>
			<Input
				v-model="form.price.value"
				:error="form.price.error"
				:disabled="loading"
				label="Своя цена"
				height="240px"
			/>

			<Grid :columns="2">
				<Button @click="close">
					Отменить
				</Button>
				<Button @click="makeProposal">
					Откликнуться
				</Button>
			</Grid>
		</Grid>
	</Modal>
</template>

<script setup lang="ts">
import { watch } from 'vue'

import { Grid, Modal } from '@/components/structures'
import { Button, Textarea, Input } from '@/components/blocks'
import { Form } from '@/plugins'
import { emptyProposal, IJobOfferProposal } from '@/interfaces/JobOffer.ts'

const props = defineProps({
	loading: {
		type: Boolean,
		default: false
	},
	defaultPrice: {
		type: Number,
		default: 0
	}
})

const form = Form<IJobOfferProposal>({ ...emptyProposal })

watch(() => props.defaultPrice, () => {
	form.price.value = props.defaultPrice
}, { immediate: true })

const emit = defineEmits(['make-proposal', 'close'])

const makeProposal = () => emit('make-proposal', form.get())
const close = () => emit('close')
</script>