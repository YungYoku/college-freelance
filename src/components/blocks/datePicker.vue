<template>
	<Popover class="date-picker">
		<template #trigger>
			<Label v-if="value">
				{{ label }}
			</Label>

			<Button
				class="date-picker__button"
				variant="outline"
			>
				{{ printedValue }}
			</Button>
		</template>

		<Calendar v-model="value"/>
	</Popover>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Popover } from '@/components/structures'
import { Button, Calendar } from '@/components/blocks'
import { Label } from '@/components/elements'

interface Props {
	label: string
}

withDefaults(defineProps<Props>(), {
	label: 'Дата'
})

const months = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря'
]

const value = defineModel<Date>({
	default: () => new Date()
})
const printedValue = computed(() => {
	const date = new Date(value.value)

	const day = date.getDate()
	const month = months[date.getMonth()]
	const year = date.getFullYear()

	return `${day} ${month} ${year} г.`
})
</script>

<style scoped lang="scss">
.date-picker {
	&__button {
		width: 100%;

		justify-content: flex-start;

		padding-top: 20px;
		padding-left: 12px;
	}
}
</style>