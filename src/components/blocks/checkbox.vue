<template>
	<Grid
		:columns="['16px', 1]"
		@click="value = !value"
	>
		<Checkbox :checked="value"/>

		<Label v-if="label">
			{{ label }}
		</Label>
	</Grid>
</template>

<script setup lang="ts">
import { Grid } from '@/components/structures'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { computed } from 'vue'

interface Props {
	modelValue?: boolean,
	error?: string | null,
	checked?: boolean,
	disabled?: boolean
	label: string
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: false,
	error: null,
	checked: false,
	disabled: false,
	label: ''
})

const emit = defineEmits(['update:model-value'])

const value = computed({
	get: () => {
		if (props.disabled) {
			return props.checked ?? false
		}
		return props.modelValue
	},
	set: (value) => {
		if (!props.disabled) {
			emit('update:model-value', value)
		}
	}
})
</script>