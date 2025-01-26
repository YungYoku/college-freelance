<template>
	<div
		ref="popover"
		class="popover"
		@click="showContent"
	>
		<div
			ref="trigger"
			class="popover__trigger"
		>
			<slot name="trigger"/>
		</div>

		<Transition name="popover">
			<div
				v-if="contentShowed"
				ref="content"
				class="popover__content"
				:style="{
					maxWidth: `${triggerWidth}px`,
					left: `${contentLeft}px`
				}"
			>
				<slot/>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, useTemplateRef, onUpdated, nextTick } from 'vue'

const contentShowed = ref(false)
const showContent = () => {
	contentShowed.value = true
	nextTick(() => {
		updateStyles()
	})
}

const popover = useTemplateRef('popover')
const handleClick = (e: MouseEvent) => {
	if (!popover.value) return

	const withinBoundaries = e.composedPath().includes(popover.value)
	if (!withinBoundaries) {
		contentShowed.value = false
	}
}
onMounted(() => document.addEventListener('click', handleClick))
onUnmounted(() => document.addEventListener('click', handleClick))


const trigger = useTemplateRef('trigger')
const triggerWidth = ref(0)

const content = useTemplateRef('content')
const contentWidth = ref(0)

const calculateNodeWidth = (node: HTMLDivElement | null) => {
	if (node) {
		return node.getBoundingClientRect().width
	} else {
		return 0
	}
}
const updateStyles = () => {
	triggerWidth.value = calculateNodeWidth(trigger.value)
	contentWidth.value = calculateNodeWidth(content.value)
}
onMounted(updateStyles)
onUpdated(updateStyles)

const contentLeft = computed(() => {
	return (triggerWidth.value - contentWidth.value) / 2
})
</script>

<style lang="scss" scoped>
.popover {
	position: relative;

	&__trigger {
		position: relative;

		cursor: pointer;
	}

	&__content {
		max-height: 360px;

		position: absolute;
		top: 56px;
		z-index: 10;

		display: flex;
		flex-direction: column;

		background-color: hsl(var(--background));
		border: 1px solid hsl(var(--input));
		border-radius: 12px;
		overflow: hidden;

		&.popover-enter-from {
			opacity: 0;
		}

		&.popover-enter-active {
			transition: opacity 0.1s;
		}

		&.popover-enter-to {
			opacity: 1;
		}

		&.popover-leave-from {
			opacity: 1;
		}

		&.popover-leave-active {
			transition: opacity 0.1s;
		}

		&.popover-leave-to {
			opacity: 0;
		}
	}
}
</style>