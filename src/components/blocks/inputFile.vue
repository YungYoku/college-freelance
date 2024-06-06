<template>
	<Input
		:disabled="loading"
		:error="error"
		type="file"
		@input="updateFile"
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Input } from '@/components/blocks/index.ts'
import http from '@/plugins/http'

interface Props {
	modelValue: string | null
	error?: string | null
	loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: null,
	error: null,
	loading: false,
	columnsL: null,
	columnsM: null,
	columnsS: null,
	columnsXs: null
})

const emit = defineEmits(['update:model-value'])

const value = computed({
	get: () => props.modelValue,
	set: (value) => emit('update:model-value', value)
})

const updateFile = async (event: Event) => {
	const target = event.target as HTMLInputElement
	if (target.files) {
		const file = target.files[0]

		const formData = new FormData()

		formData.append('file', file)

		value.value = await http
			.post<{ id: string }>('/collections/files/records', formData)
			.then(({ id }) => id)
	}
}
</script>
