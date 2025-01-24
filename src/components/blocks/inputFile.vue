<template>
	<div class="input-file">
		<Button
			v-if="compact"
			:disabled="loading"
			variant="outline"
			class="input-file__button"
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
import { computed, PropType } from 'vue'

import { Button, Input } from '@/components/blocks'
import { Icon } from '@/components/elements'
import { Http } from '@/plugins'

interface Props {
	error?: string | null
	loading?: boolean
	compact?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	error: null,
	loading: false,
	compact: false,
})


const emit = defineEmits(['update:name'])
const updateName = (value: string) => emit('update:name', value)

const value = defineModel<string | null>({
	type: Object as PropType<string | null>,
	default: null,
})
const updateFile = async (file: File) => {
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

<style lang="scss" scoped>
.input-file {
	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;

	cursor: pointer;

	&__button {
		position: absolute;
		left: 0;
		top: 0;
	}
}
</style>