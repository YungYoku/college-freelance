<template>
	<div class="flex flex-wrap items-center gap-2 ml-auto mr-auto">
		<Icon
			v-for="i in 5"
			:key="i"
			:name="i <= stars ? 'star-active' : 'star'"
			size="s"
			:pointer="false"
		/>
	</div>
</template>

<script setup lang="ts">
import { Icon } from '@/components/elements'

defineProps({
	stars: {
		type: Number,
		default: 0
	}
})
</script>