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

		<div
			class="flex flex-wrap items-center gap-2 ml-auto mr-auto"
			@mouseleave="hover(null)"
		>
			<Icon
				v-for="(icon, index) in icons"
				:key="index"
				:name="icon"
				size="m"
				@mouseenter="hover(index + 1)"
				@click="value.stars = index + 1"
			/>
		</div>

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
import { ref, computed, PropType, watch } from 'vue'

import { Grid } from '@/components/structures'
import { Button, Textarea } from '@/components/blocks'
import { Text, Icon } from '@/components/elements'
import { Skeleton } from '@/components/ui/skeleton'
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
const icons = computed(() => {
	const result = []

	for (let i = 0; i < 5; i++) {
		if (hoverIndex.value !== null) {
			if (i < hoverIndex.value) {
				result.push('star-active')
			} else {
				result.push('star')
			}
		} else {
			if (i < props.modelValue.stars) {
				result.push('star-active')
			} else {
				result.push('star')
			}
		}
	}

	return result
})

const hoverIndex = ref<number | null>(null)
const hover = (index: number | null) => hoverIndex.value = index


const emit = defineEmits(['update:modelValue', 'back'])

const value = ref({
	stars: 0,
	review: ''
})
watch(() => props.modelValue, () => value.value = props.modelValue, { immediate: true })
const send = () => emit('update:modelValue', value.value)
const back = () => emit('back')
</script>
