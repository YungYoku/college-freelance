<template>
	<Skeleton
		v-if="loading"
		class="h-5 w-[132px] ml-auto mr-auto"
	/>

	<Grid
		v-else
		class="flex flex-wrap justify-center items-center gap-2 ml-auto mr-auto"
	>
		<Text size="s">
			Оставьте свой отзыв для {{ props.user }}!
		</Text>

		<RatingStarsEditable
			v-model="value.stars"
		/>

		<Textarea
			v-model="value.review"
			label="Отзыв"
		/>

		<Button @click="send">
			Отправить
		</Button>

		<Button @click="back">
			Назад
		</Button>
	</Grid>
</template>

<script setup lang="ts">
import { ref, PropType, watch } from 'vue'

import { Grid } from '@/components/structures'
import { Button, Textarea, RatingStarsEditable } from '@/components/blocks'
import { Text, Skeleton } from '@/components/elements'
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
