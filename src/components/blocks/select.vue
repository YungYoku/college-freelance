<template>
	<Popover>
		<PopoverTrigger>
			<div class="relative w-[100%] h-12 py-2 px-3 bg-background hover:bg-accent rounded-lg border border-input font-light text-sm focus-visible:border-stone-100 outline-none disabled:opacity-50">
				<Label v-if="showedValue">
					{{ label }}
				</Label>

				<div
					class="w-[100%] h-[100%] text-sm font-semibold flex items-center justify-start"
					:class="{
						'pt-3': showedValue,
						'text-muted-foreground': !showedValue
					}"
				>
					{{ showedValue ?? label }}
				</div>
			</div>
		</PopoverTrigger>

		<PopoverContent class="p-1 flex flex-col gap-1">
			<component
				:is="multiple ? 'div' : PopoverClose"
				v-for="item in items"
				:key="item.value"
				class="w-full flex items-center justify-between cursor-pointer rounded-sm p-2 text-sm hover:bg-accent"
				:class="{
					'bg-background': value !== item.value,
					'bg-accent': value === item.value && !multiple
				}"
				@click="chooseValue(item)"
			>
				<Checkbox
					v-if="multiple"
					:checked="value.includes(item.value)"
					disabled
					:label="item.text"
				/>

				<template v-else>
					{{ item.text }}

					<Icon
						v-if="value === item.value"
						name="check"
						size="xs"
					/>
				</template>
			</component>
		</PopoverContent>
	</Popover>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { PopoverClose } from 'radix-vue'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Checkbox } from '@/components/blocks'
import { Label, Icon } from '@/components/elements'

interface Item {
	value: string
	text: string
}

const value = defineModel<string | Array<string>>({
	type: [String, Array],
	default: ''
})

const props = defineProps({
	label: {
		type: String,
		default: ''
	},
	items: {
		type: Array as PropType<Array<Item>>,
		default: () => ([])
	},
	multiple: {
		type: Boolean,
		default: false
	}
})

const validationError = new Error('Select multiple, but value is not an array')

const showedValue = computed(() => {
	if (props.multiple) {
		if (Array.isArray(value.value) === false) throw validationError

		return props.items.find(item => item.value === value.value[0])?.text ?? null
	}
	return props.items.find(item => item.value === value.value)?.text ?? null
})

const chooseValue = (item: Item) => {
	if (props.multiple) {
		if (Array.isArray(value.value) === false) throw validationError

		value.value.push(item.value)
	} else {
		value.value = item.value
	}
}
</script>
