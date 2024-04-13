<template>
	<a
		:href="file"
		target="_blank"
		class="text-sm"
	>
		Скачать файл
	</a>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
	src: {
		type: String,
		default: ''
	}
})

const file = computed(() => `${import.meta.env.VITE_API}/files/${props.src}`)
</script>
