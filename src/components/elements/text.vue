<template>
	<Skeleton
		v-if="loading"
		:width="loadingWidth"
		:height="skeletonHeights[size]"
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
import { PropType } from 'vue'

import { Skeleton } from '@/components/elements'

type Size = 'xs' | 's' | 'm'| 'l'

defineProps({
	size: {
		type: String as PropType<Size>,
		default: 'm'
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

const skeletonHeights = {
	xs: '24px',
	s: '32px',
	m: '40px',
	l: '48px'
}
</script>
