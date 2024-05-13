<template>
	<Popover>
		<PopoverTrigger as-child>
			<Button
				:variant="'outline'"
				:class="cn(
					'justify-start text-left font-normal',
					!value && 'text-muted-foreground',
				)"
			>
				<span>{{ value ? format(value, "PPP") : "Выберите дату" }}</span>
			</Button>
		</PopoverTrigger>
		<PopoverContent class="w-auto p-0">
			<Calendar v-model="value"/>
		</PopoverContent>
	</Popover>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'

const props = defineProps({
	modelValue: {
		type: Date,
		default: new Date()
	}
})

const emit = defineEmits(['update:model-value'])

const value = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:model-value', value)
	}
})
</script>

