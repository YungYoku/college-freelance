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

		<CardFooter v-if="$slots.footer">
			<slot name="footer"/>
		</CardFooter>
	</Card>
</template>

<script setup lang="ts">
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'

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
