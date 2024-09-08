<template>
	<Modal
		:width="600"
		@close="close"
	>
		<Grid
			:columns="1"
			vertical
		>
			<slot/>

			<Grid :columns="2">
				<Button @click="remove">
					Да
				</Button>
				<Button @click="close">
					Нет
				</Button>
			</Grid>
		</Grid>
	</Modal>
</template>

<script setup lang="ts">
import { Grid, Modal } from '@/components/structures'
import { Button } from '@/components/blocks'

const emit = defineEmits(['remove', 'close'])

const remove = () => emit('remove')
const close = () => emit('close')
</script>