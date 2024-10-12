<template>
	<div class="relative flex items-center justify-center cursor-pointer">
		<Icon
			v-if="compact"
			name="file"
		/>
		<div
			:class="inputWrapStyle"
		>
			<Input
				:disabled="loading"
				:error="error"
				type="file"
				@input="updateFile"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { Input } from '@/components/blocks'
import { Icon } from '@/components/elements'
import { Http } from '@/plugins'

interface Props {
	modelValue: string | null
	error?: string | null
	loading?: boolean
	compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: null,
	error: null,
	loading: false,
	compact: false,
})

const emit = defineEmits(['update:model-value', 'update:name'])

const value = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:model-value', value)
})

const name = ref('')
const updateName = (value: string) => {
	name.value = value
	emit('update:name', value)
}

const updateFile = async (event: Event) => {
	const target = event.target as HTMLInputElement
	if (target.files) {
		const file = target.files[0]
		updateName(file.name)

		const formData = new FormData()

		formData.append('file', file)

		value.value = await Http
			.post<{ id: string }>('/collections/files/records', formData)
			.then(({ id }) => id)
	}
}

const inputWrapStyle = computed(() => {
	if (props.compact) {
		return [
			'w-[48px]',
			'h-[48px]',
			'absolute',
			'left-0',
			'top-0',
			'opacity-0'
		]
	}
	return ['w-[100%]']
})
</script>
