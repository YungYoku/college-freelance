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
	width: max-content;
	max-width: 50%;

	display: flex;
	flex-direction: column;
	gap: 4px;

	padding: 8px 12px;
	margin-right: auto;

	border-radius: 8px 8px 8px 0;
	background-color: hsl(var(--muted));

	&._self {
		margin-left: auto;
		margin-right: initial;

		color: hsl(var(--primary-foreground));
		border-radius: 8px 8px 0 8px;
		background-color: hsl(var(--primary));
	}

	&__date {
		font-size: 12px;
	}
}
</style>