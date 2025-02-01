<template>
	<Grid
		vertical
		gap="l"
		class="rating"
	>
		<Text
			size="m"
			:loading
		>
			Оставьте свой отзыв для {{ user }}!
		</Text>

		<RatingStarsEditable
			v-if="!loading"
			v-model="value.stars"
		/>

		<Textarea
			v-model="value.review"
			label="Отзыв"
			:disabled="loading"
		/>

		<Grid
			:columns-xl="2"
			:columns-s="1"
		>
			<Button
				:loading
				@click="back"
			>
				Назад
			</Button>

			<Button
				:loading
				@click="send"
			>
				Отправить
			</Button>
		</Grid>
	</Grid>
</template>

<script setup lang="ts">
import { ref, PropType, watch } from 'vue'

import { Grid } from '@/components/structures'
import { Button, Textarea, RatingStarsEditable } from '@/components/blocks'
import { Text } from '@/components/elements'
import { IRating } from '@/interfaces/Rating.ts'

const props = defineProps({
	modelValue: {
		type: Object as PropType<IRating>,
		default: () => ({})
	},
	loading: {
		type: Boolean,
		default: false
	},
	user: {
		type: String,
		default: 'User'
	}
})

const emit = defineEmits(['update:modelValue', 'back'])

const value = ref<IRating>({
	by: '',
	collectionId: '',
	collectionName: '',
	created: '',
	id: '',
	updated: '',
	stars: 0,
	review: ''
})
watch(() => props.modelValue, () => {
	if (props.modelValue) value.value = props.modelValue
}, { immediate: true })

const back = () => emit('back')
const send = () => {
	emit('update:modelValue', value.value)
	back()
}
</script>

<style scoped lang="scss">
.rating {
}
</style>