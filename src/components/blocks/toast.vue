<template>
	<Transition name="toast">
		<div
			v-if="toast.showed"
			class="toast"
		>
			<Text size="xs">
				{{ toast.text }}
			</Text>

			<Icon
				name="close"
				size="s"
				@click="close"
			/>
		</div>
	</Transition>
</template>

<script setup lang="ts">
import { useToast } from '@/stores/toast'

import { Text, Icon } from '@/components/elements'

const toast = useToast()

const close = () => toast.close()
</script>

<style lang="scss" scoped>
.toast {
	position: fixed;
	right: 12px;
	bottom: 12px;

	display: flex;
	align-items: center;

	max-width: 340px;
	padding: 12px 12px 12px 16px;

	background-color: hsl(var(--background));
	border: 1px solid rgb(113 113 122 / 1);
	border-radius: 12px;
	gap: 8px;

	&.toast-enter-from {
		opacity: 0;
	}

	&.toast-enter-active {
		transition: opacity 0.1s;
	}

	&.toast-enter-to {
		opacity: 1;
	}

	&.toast-leave-from {
		opacity: 1;
	}

	&.toast-leave-active {
		transition: opacity 0.1s;
	}

	&.toast-leave-to {
		opacity: 0;
	}
}
</style>