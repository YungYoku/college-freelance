<template>
	<div class="flex flex-wrap items-center gap-2 ml-auto mr-auto">
		<Icon
			v-for="(icon, index) in icons"
			:key="index"
			:name="icon"
			size="s"
			:pointer="false"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Icon } from '@/components/elements'

const props = defineProps({
	stars: {
		type: Number,
		default: 0
	}
})

const icons = computed(() => {
	const result = []
	for (let i = 0; i < 5; i++) {
		if (i < props.stars) {
			result.push('star-active')
		} else {
			result.push('star')
		}
	}
	return result
})
</script>