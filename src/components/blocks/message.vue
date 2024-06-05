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
			v-if="message.expand?.file.file"
			:src="`${message.expand?.file.collectionId}/${message.expand?.file.id}/${message.expand?.file.file}`"
			:inverted-color="!self"
		/>

		<span class="text-xs">{{ created }}</span>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { File } from '@/components/elements'

const props = defineProps({
	message: {
		type: Object,
		default: () => ({})
	},
	self: {
		type: Boolean,
		default: false
	}
})

const created = computed(() => new Date(props.message?.created).toLocaleString())
</script>
