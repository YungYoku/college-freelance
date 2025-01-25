<template>
	<Skeleton
		v-if="loading"
		:width="loadingWidth"
		:height="skeletonHeights[size]"
	/>

	<h1
		v-else-if="size === 'xl'"
		class="text text-4xl font-extrabold tracking-tight lg:text-5xl truncate"
		:style="{
			height: skeletonHeights[size]
		}"
	>
		<slot/>
	</h1>

	<h2
		v-else-if="size === 'l'"
		class="text pb-2 text-3xl font-semibold tracking-tight truncate"
		:style="{
			height: skeletonHeights[size]
		}"
	>
		<slot/>
	</h2>

	<h3
		v-else-if="size === 'm'"
		class="text text-2xl font-semibold tracking-tight truncate"
		:style="{
			height: skeletonHeights[size]
		}"
	>
		<slot/>
	</h3>

	<h4
		v-else-if="size === 's'"
		class="text text-l tracking-tight"
	>
		<slot/>
	</h4>

	<h5
		v-else-if="size === 'xs'"
		class="text text-sm tracking-tight"
	>
		<slot/>
	</h5>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import { Skeleton } from '@/components/elements'

type Size = 'xs' | 's' | 'm' | 'l' | 'xl'

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
	xs: '16px',
	s: '24px',
	m: '32px',
	l: '40px',
	xl: '56px'
}
</script>

<style scoped lang="scss">
.text {
	max-width: 100%;
}
</style>