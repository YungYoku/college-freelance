<template>
	<Text
		size="l"
		:loading="loading"
	>
		<slot/>
	</Text>
</template>

<script setup lang="ts">
import { Text } from '@/components/elements'

defineProps({
	loading: {
		type: Boolean,
		default: false
	}
})
</script>
