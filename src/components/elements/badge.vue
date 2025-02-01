<template>
	<div
		class="badge"
		:class="[`_bg-${bg}`]"
	>
		<slot/>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

type Bg = 'white' | 'black' | 'purple' | 'green' | 'yellow'
defineProps({
	bg: {
		type: String as PropType<Bg>,
		default: 'white'
	}
})
</script>

<style scoped lang="scss">
.badge {
	padding: 1px 7px;

	color: hsl(var(--primary-foreground));
	font-size: 12px;
	font-weight: 600;
	border-radius: 6px;

	&._bg-white {
		background-color: hsl(var(--primary));
	}

	&._bg-purple {
		background-color: rgb(147 51 234 / 1)
	}

	&._bg-green {
		background-color: rgb(34 197 94 / 1)
	}

	&._bg-yellow {
		background-color: rgb(234 179 8 / 1)
	}
}
</style>