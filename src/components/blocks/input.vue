<template>
	<div class="input">
		<Skeleton
			v-if="loading"
			height="48px"
		/>

		<template v-else>
			<Label v-if="!placeholder && label">
				{{ label }}
			</Label>

			<input
				v-model="value"
				class="input__field"
				:class="[variant, {
					'_empty': !placeholder
				}]"
				:style="{
					cursor
				}"
				:placeholder
				:disabled
				:type
				autocomplete="off"
				@input="onInput"
			>

			<span
				v-if="error"
				class="input__error"
			>
				{{ error }}
			</span>

			<Icon
				v-if="icon"
				class="input__action"
				:name="icon"
				@click="action"
			/>

			<Icon
				v-else-if="clearable && filled"
				class="input__clear"
				name="close"
				size="s"
				@click.prevent.stop="clear"
			/>
		</template>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Icon, Label, Skeleton } from '@/components/elements'

interface Props {
	error?: string | null
	loading?: boolean
	label?: string
	disabled?: boolean
	type?: 'text' | 'password' | 'email' | 'file' | 'number'
	icon?: string | null
	autocomplete?: 'off' | 'on' | 'new-password' | 'username',
	cursor?: 'text' | 'pointer',
	clearable?: boolean,
	variant?: 'default' | 'plain'
}

const props = withDefaults(defineProps<Props>(), {
	error: null,
	loading: false,
	label: '',
	disabled: false,
	type: 'text',
	icon: null,
	autocomplete: 'off',
	cursor: 'text',
	clearable: true,
	variant: 'default'
})

const value = defineModel<string | number>({
	type: [String, Number],
	default: ''
})
const clear = () => value.value = ''

const emit = defineEmits(['update-file', 'input', 'action'])
const onInput = (event: Event) => {
	const target = event.target as HTMLInputElement
	if (props.type === 'file') {
		const file = target.files?.[0]
		if (file) emit('update-file', file)
	} else emit('input', target.value)
}
const action = () => emit('action')

const placeholder = computed(() => {
	let hasValue = false
	if (typeof value.value === 'number') {
		hasValue = true
	} else if (typeof value.value === 'string') {
		hasValue = value.value.length > 0
	}

	if (props.label && !hasValue) {
		return props.label
	}

	return ''
})

const filled = computed(() => {
	if (typeof value.value === 'number') return true
	if (typeof value.value === 'string') return value.value.length > 0
	return false
})
</script>

<style scoped lang="scss">
.input {
	position: relative;

	&__field {
		width: 100%;
		height: 48px;

		padding: 8px 40px 8px 12px;

		font-size: 14px;
		font-weight: 400;

		transition: all 0.2s;
		border-radius: 14px;
		background: hsl(var(--background));
		outline: none;
		border: 1px solid hsl(var(--input));

		&._empty {
			padding-top: 20px;
		}

		&:focus-visible {
			--tw-border-opacity: 1;
			border-color: rgb(245 245 244 / var(--tw-border-opacity, 1));
		}

		&.plain {
			border: initial;
			border-radius: initial;

			&:focus-visible {
				border-color: initial;
			}
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

		color: hsl(var(--destructive));
		font-size: 12px;
		font-weight: 200;
	}

	&__action,
	&__clear {
		position: absolute;
		right: 12px;
		top: 14px;

		cursor: pointer;
	}
}
</style>