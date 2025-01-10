<template>
	<Select v-model="value">
		<SelectTrigger class="h-12">
			<SelectValue :placeholder="label"/>
		</SelectTrigger>
		<SelectContent>
			<SelectGroup>
				<SelectLabel>{{ label }}</SelectLabel>
				<SelectItem
					v-for="item in items"
					:key="item.value"
					:value="item.value"
				>
					{{ item.text }}
				</SelectItem>
			</SelectGroup>
		</SelectContent>
	</Select>

	<Popover v-if="false">
		<PopoverTrigger>
			<div class="relative w-[100%] h-12 py-2 px-3 bg-background hover:bg-accent rounded-lg border border-input font-light text-sm focus-visible:border-stone-100 outline-none disabled:opacity-50">
				<Label v-if="value === ''">
					{{ label }}
				</Label>

				<div>
					123
				</div>
			</div>
		</PopoverTrigger>
		<PopoverContent>
			Some popover
		</PopoverContent>
	</Popover>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Label } from '@/components/elements'

interface Item {
	value: string
	text: string
}

const value = defineModel<string>({
	type: String,
	default: ''
})

defineProps({
	label: {
		type: String,
		default: ''
	},
	items: {
		type: Array as PropType<Array<Item>>,
		default: () => ([])
	}
})
</script>
