<template>
	<a
		:href="file"
		target="_blank"
		class="text-sm flex items-center gap-1"
	>
		<Icon
			name="file"
			:colors="colors"
		/>
		Скачать файл
	</a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Icon } from '@/components/elements'

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
