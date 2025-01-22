<template>
	<div
		ref="popover"
		class="popover relative"
		@click="contentShowed = true"
	>
		<div
			ref="trigger"
			class="popover__trigger relative cursor-pointer"
		>
			<slot name="trigger"/>
		</div>

		<div
			v-if="contentShowed"
			ref="content"
			class="popover__content max-h-[360px] absolute top-14 overflow-hidden bg-background border border-input rounded-lg flex flex-col z-10"
			:style="{
				maxWidth: `${triggerWidth}px`,
				left: `${contentLeft}px`
			}"
		>
			<slot/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, useTemplateRef, onUpdated } from 'vue'

const contentShowed = ref(false)

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

