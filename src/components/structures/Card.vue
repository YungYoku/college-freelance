<template>
	<Card :class="`w-[${width}]`">
		<CardHeader v-if="title">
			<CardTitle>
				{{ title }}
			</CardTitle>
		</CardHeader>

		<CardContent>
			<div class="grid items-center w-full gap-2">
				<slot/>
			</div>
		</CardContent>
	</Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

defineProps({
	width: {
		type: String,
		default: '300px'
	},
	title: {
		type: String,
		default: null
	}
})
</script>
