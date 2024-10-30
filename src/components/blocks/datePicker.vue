<template>
	<Popover>
		<PopoverTrigger as-child>
			<div class="relative">
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
					{{ value ? df.format(value.toDate(getLocalTimeZone())) : label }}
				</Button>
			</div>
		</PopoverTrigger>
		<PopoverContent class="w-auto p-0">
			<Calendar v-model="value"/>
		</PopoverContent>
	</Popover>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import {
	CalendarDate,
	DateFormatter,
	getLocalTimeZone,
} from '@internationalized/date'

import { Button } from '@/components/blocks'
import { Label } from '@/components/elements'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

interface Props {
	modelValue: Date
	label: string
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: () => new Date(),
	label: 'Дата'
})

const emit = defineEmits(['update:model-value'])

const value = computed({
	get() {
		const date = new Date(props.modelValue)
		return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
	},
	set(value) {
		emit('update:model-value', value.toDate(getLocalTimeZone()))
	}
})

const df = new DateFormatter('ru-RU', {
	dateStyle: 'long',
})
</script>

