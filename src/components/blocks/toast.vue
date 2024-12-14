<template>
	<div
		v-if="toast.showed"
		class="max-w-[340px] fixed bottom-3 right-3 flex items-center gap-2 bg-background py-3 pl-4 pr-3 text-sm rounded-lg border border-zinc-500"
	>
		{{ toast.text }}

		<Icon
			name="close"
			size="s"
			@click="close"
		/>
	</div>
</template>

<script setup lang="ts">
import { useToast } from '@/stores/toast'

import { Icon } from '@/components/elements'

const toast = useToast()

const close = () => toast.close()
</script>