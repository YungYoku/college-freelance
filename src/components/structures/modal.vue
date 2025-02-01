<template>
	<div
		class="modal"
		@click.self="close"
	>
		<form
			class="modal__form"
			:style="style"
			@submit.prevent
		>
			<Icon
				class="modal__close"
				name="close"
				@click="close"
			/>
			<slot/>
		</form>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Icon } from '@/components/elements'

const props = defineProps({
	width: {
		type: Number,
		default: 300
	}
})

const style = computed(() => {
	return {
		width: `${props.width}px`
	}
})

const emit = defineEmits(['close'])

const close = () => emit('close')
</script>

<style scoped lang="scss">
.modal {
	position: fixed;
	top: 0;
	left: 0;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

	width: 100%;
	height: 100vh;
    padding: 10px;

	background-color: rgba(26, 26, 26, 0.7);

    &__form {
		max-width: 100%;
		min-height: 70px;
		max-height: 70vh;

		position: relative;

        display: flex;
        justify-content: center;
        align-items: center;

		padding: 10px;

		border: 1px solid hsl(var(--border));
		background-color: hsl(var(--card));
		border-radius: 14px;

		--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
		box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    }

	&__close {
		position: absolute;
		top: 10px;
		right: 10px;
	}
}
</style>
