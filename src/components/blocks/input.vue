<template>
	<div class="relative">
		<Skeleton
			v-if="loading"
			class="h-12"
		/>

		<template v-else>
			<Label
				v-if="!placeholder"
				class="absolute left-3 top-1 text-xs text-muted-foreground font-extralight"
			>
				{{ label }}
			</Label>

			<Input
				v-model="value"
				:class="['h-12', {
					'pt-4': !placeholder,
				}]"
				:placeholder="placeholder"
				:disabled="disabled"
				:type="type"
				@input="onInput"
			/>

			<Icon
				v-if="icon"
				class="absolute right-3 top-3.5 cursor-pointer"
				:name="icon"
				@click="action"
			/>
		</template>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Icon } from '@/components/elements'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'

const props = defineProps({
	modelValue: {
		type: [String, Number],
		default: ''
	},
	loading: {
		type: Boolean,
		default: false
	},
	label: {
		type: String,
		default: ''
	},
	disabled: {
		type: Boolean,
		default: false
	},
	type: {
		type: String,
		default: 'text'
	},
	icon: {
		type: [String, null],
		default: null
	}
})

const emit = defineEmits(['update:model-value', 'input', 'action'])
const onInput = (event: InputEvent) => emit('input', event)
const action = () => emit('action')

const value = computed({
	get: () => props.modelValue,
	set: (val) => emit('update:model-value', val)
})

const placeholder = computed(() => {
	let hasValue = false
	if (typeof props.modelValue === 'number') {
		hasValue = true
	} else if (typeof props.modelValue === 'string') {
		hasValue = props.modelValue.length > 0
	}

	if (props.label && !hasValue) {
		return props.label
	}

	return null
})
</script>
