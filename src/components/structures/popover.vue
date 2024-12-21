<template>
	<Popover>
		<PopoverTrigger as-child>
			<div class="relative">
				<slot name="trigger"/>
			</div>
		</PopoverTrigger>

		<PopoverContent class="w-auto p-0">
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

