<template>
	<Popover>
		<template #trigger>
			<Label v-if="value">
				{{ label }}
			</Label>

			<Button
				:variant="'outline'"
				:class="['w-full', 'justify-between', 'pl-3', {
					'pt-5': value,
					'text-muted-foreground': !value
				}]"
			>
				{{ printedValue ?? label }}
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

