<template>
	<Popover>
		<PopoverTrigger as-child>
			<div class="relative cursor-pointer">
				<slot name="trigger"/>
			</div>
		</PopoverTrigger>

		<PopoverContent class="w-auto max-h-[360px] p-0 flex flex-col rounded-xl overflow-hidden">
			<slot/>
		</PopoverContent>
	</Popover>
</template>

<script setup lang="ts">
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
</script>

