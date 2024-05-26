<template>
	<a
		:href="file"
		target="_blank"
		class="text-sm flex items-center gap-1"
	>
		<Icon
			name="file"
			:inverted-color="false"
		/>
		Скачать файл
	</a>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '@/components/elements/Icon.vue'

const props = defineProps({
	src: {
		type: String,
		default: ''
	}
})

const file = computed(() => `${import.meta.env.VITE_API}/files/${props.src}`)
</script>
