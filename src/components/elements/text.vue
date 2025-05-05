<template>
	<Skeleton
		v-if="loading"
		:width="loadingWidth"
		:height="skeletonHeights[size]"
	/>

	<span
		v-else
		class="text"
		:class="size"
		:style="{
			height: skeletonHeights[size]
		}"
	>
		<slot/>
	</span>
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
	xs: 'auto',
	s: 'auto',
	m: '24px',
	l: '30px',
	xl: '48px'
}
</script>

<style scoped lang="scss">
.text {
	max-width: 100%;

	&.xl,
	&.l,
	&.m {
		overflow: hidden;

		line-height: 1;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	&.xl {
		font-size: 48px;
		font-weight: 800;

		@media (max-width: 1024px) {
			font-size: 36px;
		};
	}

	&.l {
		font-size: 30px;
		font-weight: 600;
	}

	&.m {
		font-size: 24px;
		font-weight: 600;
	}

	&.s {
		font-size: 16px;
	}

	&.xs {
		font-size: 14px;
	}
}
</style>