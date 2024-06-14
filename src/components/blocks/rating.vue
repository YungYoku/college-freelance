<template>
	<Skeleton
		v-if="loading"
		class="h-5 w-[132px] ml-auto mr-auto"
	/>
	<div
		v-else
		class="flex flex-wrap justify-center items-center gap-2 ml-auto mr-auto"
	>
		<Text>
			Оставьте свой отзыв для {{ props.user }}!
		</Text>
		<div
			class="flex flex-wrap items-center gap-2 ml-auto mr-auto mb-10"
			@mouseleave="hover(null)"
		>
			<Icon
				v-for="(icon, index) in icons"
				:key="index"
				:name="icon"
				size="s"
				@mouseenter="hover(index + 1)"
				@click="review.rating = index + 1"
			/>
		</div>

		<Textarea
			v-model="review.text"
		/>

		<Button @click="send">
			Отправить
		</Button>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { Icon } from '@/components/elements'
import { Skeleton } from '@/components/ui/skeleton'
import { Textarea } from '@/components/ui/textarea'
import { Text } from '@/components/elements'
import Button from '@/components/blocks/button.vue'

const props = defineProps({
	modelValue: {
		type: Object,
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
			if (i < props.modelValue) {
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

const emit = defineEmits(['update:modelValue'])

const review = ref({
	rating: 0,
	text: ''
})
const send = () => emit('update:modelValue', review.value)
</script>
