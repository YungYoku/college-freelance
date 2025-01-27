<template>
	<div class="textarea">
		<Label v-if="!placeholder">
			{{ label }}
		</Label>

		<textarea
			v-model="value"
			:placeholder="label"
			class="textarea__field"
			:class="[{
				'_empty': value.length === 0
			}]"
			:style="{
				height
			}"
			:disabled
		/>

		<span
			v-if="error"
			class="textarea__error"
		>
			{{ error }}
		</span>

		<Icon
			v-else-if="filled && !disabled"
			class="textarea__clear"
			name="close"
			size="s"
			@click.prevent.stop="clear"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Icon, Label } from '@/components/elements'

interface Props {
	error?: string | null
	label: string
	height?: string
	disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	error: null,
	label: '',
	height: '200px',
	disabled: false
})

const value = defineModel<string>({
	type: String,
	default: ''
})
const clear = () => value.value = ''

const placeholder = computed(() => {
	if (props.label && value.value.length === 0) {
		return props.label
	}

	return ''
})

const filled = computed(() => value.value.length > 0)
</script>

<style scoped lang="scss">
.textarea {
	position: relative;

	&__field {
		width: 100%;

		padding: 16px 12px 8px 12px;

		font-size: 14px;
		font-weight: 300;

		transition: all 0.2s, padding 0s;
		border-radius: 14px;
		background: hsl(var(--background));
		border: 1px solid hsl(var(--input));
		outline: none;

		&._empty {
			padding-top: 8px;
		}

		&:focus-visible {
			--tw-border-opacity: 1;
			border-color: rgb(245 245 244 / var(--tw-border-opacity, 1));
		}

		&:hover {
			background: hsl(var(--accent));
		}

		&:disabled {
			opacity: 0.5;
		}
	}

	&__error {
		padding-left: 12px;

		font-size: 12px;
		font-weight: 200;
		color: hsl(var(--destructive));
	}

	&__clear {
		position: absolute;
		top: 14px;
		right: 12px;

		cursor: pointer;
	}
}
</style>