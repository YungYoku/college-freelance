<template>
	<div class="relative">
		<Label v-if="!placeholder">
			{{ label }}
		</Label>

		<textarea
			v-model="value"
			:placeholder="label"
			class="w-[100%] py-2 px-3 bg-background hover:bg-accent rounded-lg border border-input font-light text-sm focus-visible:border-stone-100 outline-none disabled:opacity-50"
			:class="[{
				'pt-4': !placeholder,
			}]"
			:style="{
				height
			}"
			:disabled
		/>

		<span
			v-if="error"
			class="pl-3 text-xs text-destructive font-extralight"
		>
			{{ error }}
		</span>

		<Icon
			v-else-if="filled"
			class="absolute right-3 top-3.5 cursor-pointer"
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
