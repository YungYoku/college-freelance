<template>
	<Popover>
		<PopoverTrigger as-child>
			<div class="relative">
				<Label
					v-if="filled"
					class="absolute left-3 top-1 text-xs text-muted-foreground font-extralight"
				>
					{{ label }}
				</Label>

				<Button
					:variant="'outline'"
					:class="['w-full', 'justify-between', 'pl-3', {
						'pt-4': filled,
						'text-muted-foreground': !filled
					}]"
				>
					<span>{{ value ? format(value, "PPP") : label }}</span>
				</Button>
			</div>
		</PopoverTrigger>
		<PopoverContent class="w-auto p-0">
			<Calendar v-model="value"/>
		</PopoverContent>
	</Popover>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

import { computed } from 'vue'
import { Button } from '@/components/blocks'
import { Calendar } from '@/components/ui/calendar'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Label } from '@/components/ui/label'

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
		return props.modelValue
	},
	set(value) {
		emit('update:model-value', value)
	}
})

const filled = computed(() => value.value instanceof Date)
</script>

