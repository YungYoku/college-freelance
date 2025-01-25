<template>
	<Skeleton
		v-if="loading"
		:class="props.class"
		height="48px"
	/>

	<component
		:is="to ? 'router-link' : 'button'"
		v-else
		:to
		class="button"
		:class="[props.class, variant]"
		:type
		:disabled
	>
		<slot/>
	</component>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import { Skeleton } from '@/components/elements'

type Type = 'button' | 'submit' | 'reset'
type Variant = 'default' | 'positive' | 'destructive' | 'outline'

const props = defineProps({
	class: {
		type: [String, Array, Object],
		default: ''
	},
	loading: {
		type: Boolean,
		default: false
	},
	type: {
		type: String as PropType<Type>,
		default: 'button'
	},
	disabled: {
		type: Boolean,
		default: false
	},
	variant: {
		type: String as PropType<Variant>,
		default: 'default'
	},
	to: {
		type: String,
		default: null
	}
})
</script>

<style scoped lang="scss">
.button {
	height: 48px;

	padding: 12px;

	display: flex;
	align-items: center;
	justify-content: center;

	font-size: 14px;
	font-weight: 500;

	transition: all 0.2s;
	border-radius: 14px;
	border: none;
	outline: none;

	&.default {
		background-color: hsl(var(--primary));

		color: hsl(var(--primary-foreground));

		&:hover {
			background-color: hsl(var(--primary) / 0.9);
		}
	}

	&.positive {
		--tw-bg-opacity: 1;
		background-color: rgb(22 163 74 / var(--tw-bg-opacity, 1));

		&:hover {
			background-color: rgb(22 163 74 / 0.9);
		}
	}

	&.destructive {
		background-color: hsl(var(--destructive));

		&:hover {
			background-color: hsl(var(--destructive) / 0.9);
		}
	}

	&.outline {
		background-color: hsl(var(--background));

		border: 1px solid hsl(var(--input));

		&:hover {
			background-color: hsl(var(--accent));
		}
	}
}
</style>