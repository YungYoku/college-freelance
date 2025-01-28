<template>
	<div
		class="card"
		:style="{
			width
		}"
	>
		<div
			v-if="title"
			class="card__title"
		>
			{{ title }}
		</div>

		<Grid
			vertical
			class="card__content"
		>
			<slot/>
		</Grid>

		<Grid
			v-if="$slots.footer"
			vertical
			class="card__footer"
		>
			<slot name="footer"/>
		</Grid>
	</div>
</template>

<script setup lang="ts">
import { Grid } from '@/components/structures'

defineProps({
	width: {
		type: String,
		default: '300px'
	},
	title: {
		type: String,
		default: null
	}
})
</script>

<style lang="scss" scoped>
.card {
	max-width: 100%;

	border: 1px solid hsl(var(--input));
	border-radius: 12px;
	--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
	--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
	box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

	&__title {
		padding: 16px 20px 4px 20px;

		font-weight: 600;
	}

	&__content {
		padding: 20px;
	}

	&__footer {
		padding: 0 20px 20px 20px;
	}
}
</style>