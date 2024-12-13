<template>
	<Skeleton
		v-if="loading"
		:class="[`w-[${loadingWidth}] max-w-[100%]`, {
			'h-12': size === 'l',
			'h-10': size === 'm',
			'h-8': size === 's',
			'h-6': size === 'xs'
		}]"
	/>

	<h1
		v-else-if="size === 'l'"
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
		class="scroll-m-20 text-l tracking-tight"
	>
		<slot/>
	</h4>
</template>

<script setup lang="ts">
import { Skeleton } from '@/components/elements'

defineProps({
	size: {
		type: String,
		default: 'm',
		validator: (val: string) => {
			return ['xs', 's', 'm', 'l'].includes(val)
		}
	},
	loading: {
		type: Boolean,
		default: false
	},
	loadingWidth: {
		type: String,
		default: '400px'
	}
})
</script>
