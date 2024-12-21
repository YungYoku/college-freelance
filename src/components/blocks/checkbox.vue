<template>
	<Grid
		:columns="['16px', 1]"
		ver-align="center"
		@click="value = !value"
	>
		<div
			class="w-[16px] h-[16px] active:bg-accent-1 rounded-md border border-primary outline-none flex items-center justify-center cursor-pointer"
			:class="{
				'bg-accent': !value,
				'bg-primary': value
			}"
		>
			<Icon
				v-if="value"
				name="check"
				size="xs"
				:colors="['dark', 'light']"
			/>
		</div>

		<div
			v-if="label"
			class="text-left font-light"
		>
			{{ label }}
		</div>
	</Grid>
</template>

<script setup lang="ts">
import { Grid } from '@/components/structures'
import { Icon } from '@/components/elements'

interface Props {
	error?: string | null,
	checked?: boolean,
	disabled?: boolean
	label: string
}

withDefaults(defineProps<Props>(), {
	error: null,
	checked: false,
	disabled: false,
	label: ''
})

const value = defineModel<boolean>({
	type: Boolean,
	default: false
})
</script>