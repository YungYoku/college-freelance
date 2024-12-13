<template>
	<div class="relative flex items-center justify-center cursor-pointer">
		<Button
			v-if="compact"
			:disabled="loading"
			variant="outline"
			class="absolute left-0 top-0"
		>
			<Icon name="file"/>

			<div :class="inputWrapStyle">
				<Input
					:disabled="loading"
					:error="error"
					type="file"
					cursor="pointer"
					@update-file="updateFile"
				/>
			</div>
		</Button>

		<div
			v-else
			:class="inputWrapStyle"
		>
			<Input
				:disabled="loading"
				:error="error"
				type="file"
				cursor="pointer"
				@update-file="updateFile"
			/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import { Button, Input } from '@/components/blocks'
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

const updateFile = async (file: File) => {
	console.log(file)
	updateName(file.name)

	const formData = new FormData()

	formData.append('file', file)

	value.value = await Http
		.post<{ id: string }>('/collections/files/records', formData)
		.then(({ id }) => id)
}

const inputWrapStyle = computed(() => {
	if (props.compact) {
		return [
			'w-[100%]',
			'h-[100%]',
			'absolute',
			'left-0',
			'top-0',
			'opacity-0'
		]
	}
	return ['w-[100%]']
})
</script>
