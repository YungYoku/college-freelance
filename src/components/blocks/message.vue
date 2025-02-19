<template>
	<div
		class="message"
		:class="{
			'_self': self,
		}"
	>
		<Text size="xs">
			{{ message.text }}
		</Text>

		<File
			v-if="message.expand?.file?.file"
			:src="`${message.expand.file.collectionId}/${message.expand.file.id}/${message.expand.file.file}`"
			:colors="self ? ['dark', 'light'] : ['light', 'dark']"
		/>

		<span class="message__date">{{ $date(created, 'fullDatetime') }}</span>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { File, Text } from '@/components/elements'

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

const created = computed(() => new Date(props.message?.created))
</script>

<style lang="scss" scoped>
.message {
	display: flex;
	flex-direction: column;

	width: max-content;
	max-width: 50%;
	margin-right: auto;
	padding: 8px 12px;

	background-color: hsl(var(--muted));
	border-radius: 8px 8px 8px 0;
	gap: 4px;

	&._self {
		margin-right: initial;
		margin-left: auto;

		color: hsl(var(--primary-foreground));

		background-color: hsl(var(--primary));
		border-radius: 8px 8px 0 8px;
	}

	&__date {
		font-size: 12px;
	}
}
</style>