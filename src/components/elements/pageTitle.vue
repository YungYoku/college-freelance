<template>
	<Skeleton
		v-if="loading"
		class="w-[400px] max-w-[100%] h-12"
	/>

	<Text
		size="l"
	>
		<slot/>
	</Text>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
import { Text } from '@/components/elements'
defineProps({
	loading: {
		type: Boolean,
		default: false
	}
})
</script>
