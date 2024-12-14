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
