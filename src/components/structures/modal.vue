<template>
	<div
		class="modal relative"
		@click.self="close"
	>
		<form
			class="modal__form rounded-xl border bg-card text-card-foreground shadow"
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
		position: relative;

        display: flex;
        justify-content: center;
        align-items: center;

        max-width: 100%;
		min-height: 70px;
		max-height: 70vh;
        padding: 60px 10px 10px 10px;
    }

	&__close {
		position: absolute;
		top: 10px;
		right: 10px;
	}
}
</style>
