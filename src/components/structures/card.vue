<template>
	<div
		:style="{
			width
		}"
		class="max-w-[100%] border rounded-xl shadow"
	>
		<div
			v-if="title"
			class="font-semibold p-5 pt-4 pb-1"
		>
			{{ title }}
		</div>

		<div class="grid items-center w-full gap-2 p-5">
			<slot/>
		</div>

		<div
			v-if="$slots.footer"
			class="p-5"
		>
			<slot name="footer"/>
		</div>
	</div>
</template>

<script setup lang="ts">
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
