<template>
	<a
		:href="file"
		target="_blank"
		class="file"
	>
		<Icon
			name="file"
			:colors="colors"
		/>

		<Text size="xs">
			Скачать файл
		</Text>
	</a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Icon, Text } from '@/components/elements'

const props = defineProps({
	src: {
		type: String,
		default: ''
	},
	colors: {
		type: Array,
		default: () => ['light', 'dark']
	}
})

const file = computed(() => `${import.meta.env.VITE_API}/files/${props.src}`)
</script>

<style scoped lang="scss">
.file {
	display: flex;
	align-items: center;
	gap: 4px;
}
</style>