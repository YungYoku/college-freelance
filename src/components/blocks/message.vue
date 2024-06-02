<template>
	<div
		class="chat__message flex w-max max-w-[50%] flex-col gap-1 rounded-lg px-3 py-2"
		:class="{
			'text-primary-foreground': self,
			'bg-primary': self,
			'bg-muted': !self,
			'ml-auto': self,
			'mr-auto': !self
		}"
	>
		<span class="text-sm">{{ message.text }}</span>

		<File
			v-if="message.file"
			:src="`${message.collectionId}/${message.id}/${message.file}`"
			:inverted-color="!self"
		/>

		<span class="text-xs">{{ message.created }}</span>
	</div>
</template>

<script setup lang="ts">
import { File } from '@/components/elements'

defineProps({
	message: {
		type: Object,
		default: () => ({})
	},
	self: {
		type: Boolean,
		default: false
	}
})
</script>
