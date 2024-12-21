<template>
	<Popover>
		<template #trigger>
			<Label v-if="value">
				{{ label }}
			</Label>

			<Button
				:variant="'outline'"
				:class="['w-full', 'justify-between', 'pl-3', {
					'pt-4': value,
					'text-muted-foreground': !value
				}]"
			>
				{{ printedValue ? df.format(printedValue.toDate(getLocalTimeZone())) : label }}
			</Button>
		</template>
		
		<Calendar v-model="value"/>
	</Popover>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import {
	CalendarDate,
	DateFormatter,
	getLocalTimeZone,
} from '@internationalized/date'

import { Popover } from '@/components/structures'
import { Button, Calendar } from '@/components/blocks'
import { Label } from '@/components/elements'

interface Props {
	label: string
}
withDefaults(defineProps<Props>(), {
	label: 'Дата'
})

const value = defineModel<Date>({
	default: () => new Date()
})
const printedValue = computed(() => {
	const date = new Date(value.value)
	return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
})

const df = new DateFormatter('ru-RU', {
	dateStyle: 'long',
})
</script>

