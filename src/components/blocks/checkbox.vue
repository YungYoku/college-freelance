<template>
	<Grid
		class="checkbox"
		:columns="['16px', 1]"
		ver-align="center"
		@click="toggle"
	>
		<div
			class="checkbox__content"
			:class="{
				'_active': (value ?? checked)
			}"
		>
			<Icon
				v-if="value ?? checked"
				name="check"
				size="xs"
				:colors="['dark', 'light']"
			/>
		</div>

		<div
			v-if="label"
			class="checkbox__label"
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
	default: null
})

const toggle = () => {
	value.value = !value.value
}
</script>

<style scoped lang="scss">
.checkbox {
	cursor: pointer;

	&__content {
		width: 16px;
		height: 16px;

		display: flex;
		align-items: center;
		justify-content: center;

		background: hsl(var(--accent));
		border-radius: 5px;
		border: 1px solid hsl(var(--primary));

		&._active {
			background: hsl(var(--primary));
		}
	}

	&__label {
		text-align: left;
		font-weight: 300;
	}
}
</style>