<template>
	<Card
		:style="{
			width
		}"
		class="max-w-[100%]"
	>
		<CardHeader
			v-if="title"
			class="p-5 pb-2"
		>
			<CardTitle>
				{{ title }}
			</CardTitle>
		</CardHeader>

		<CardContent class="p-5">
			<div class="grid items-center w-full gap-2">
				<slot/>
			</div>
		</CardContent>

		<CardFooter
			v-if="$slots.footer"
			class="p-5"
		>
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
