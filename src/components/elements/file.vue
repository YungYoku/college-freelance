<template>
	<a
		:href="file"
		target="_blank"
		class="text-sm flex items-center gap-1"
	>
		<Icon
			name="file"
			:inverted-color="invertedColor"
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
	invertedColor: {
		type: Boolean,
		default: false
	}
})

const file = computed(() => `${import.meta.env.VITE_API}/files/${props.src}`)
</script>
