<template>
	<div class="relative">
		<Skeleton
			v-if="loading"
			class="h-12"
		/>

		<template v-else>
			<Label v-if="!placeholder && label">
				{{ label }}
			</Label>

			<input
				v-model="value"
				class="w-[100%] h-12 py-2 pl-3 pr-10 bg-background hover:bg-accent rounded-lg border border-input font-light text-sm focus-visible:border-stone-100 outline-none disabled:opacity-50"
				:class="[`cursor-${cursor}`, {
					'pt-4': !placeholder
				}]"
				:placeholder
				:disabled
				:type
				autocomplete="off"
				@input="onInput"
			>

			<span
				v-if="error"
				class="pl-3 text-xs text-destructive font-extralight"
			>
				{{ error }}
			</span>

			<Icon
				v-if="icon"
				class="absolute right-3 top-3.5 cursor-pointer"
				:name="icon"
				@click="action"
			/>

			<Icon
				v-else-if="filled"
				class="absolute right-3 top-3.5 cursor-pointer"
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
	cursor?: 'text' | 'pointer'
}

const props = withDefaults(defineProps<Props>(), {
	error: null,
	loading: false,
	label: '',
	disabled: false,
	type: 'text',
	icon: null,
	autocomplete: 'off',
	cursor: 'text'
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
	}
	else emit('input', target.value)
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
