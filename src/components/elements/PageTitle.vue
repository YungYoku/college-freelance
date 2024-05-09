<template>
	<h1
		v-if="size === 'l'"
		class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl"
	>
		<slot/>
	</h1>

	<h2
		v-else-if="size === 'm'"
		class="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0"
	>
		<slot/>
	</h2>

	<h3
		v-else-if="size === 's'"
		class="scroll-m-20 text-2xl font-semibold tracking-tight"
	>
		<slot/>
	</h3>

	<h4
		v-else-if="size === 'xs'"
		class="scroll-m-20 text-xl font-semibold tracking-tight"
	>
		<slot/>
	</h4>
</template>

<script setup lang="ts">
defineProps({
	size: {
		type: String,
		default: 'm',
		validator: (val: string) => {
			return ['xs', 's', 'm', 'l'].includes(val)
		}
	}
})
</script>
