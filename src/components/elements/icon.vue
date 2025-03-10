<template>
	<Image
		class="icon"
		:class="[`icon_${size}`, currentColor]"
		:style="{
			cursor: pointer ? 'pointer' : 'initial',
		}"
		:src="src"
		alt="icon"
		local
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'

import Image from './image.vue'

const props = defineProps({
	name: {
		type: String,
		default: 'file'
	},
	size: {
		type: String,
		default: 's',
		validator: (size: string) => {
			return ['xs', 's', 'm', 'l'].includes(size)
		}
	},
	colors: {
		type: Array,
		default: () => ['light', 'dark']
	},
	pointer: {
		type: Boolean,
		default: true
	}
})

const mode = useColorMode({ selector: 'body' })
const currentTheme = computed(() => mode.state.value)

const currentColor = computed(() => {
	const colorIndex = currentTheme.value === 'dark' ? 0 : 1

	return props.colors[colorIndex]
})

const src = computed(() => {
	return new URL(`./icons/${props.name}.svg`, import.meta.url).href
})
</script>

<style lang="scss" scoped>
.icon {
	&.light {
		filter: invert(1);
	}

    &_xs {
		width: 10px;
        max-width: 10px;
        max-height: 10px;
    }

    &_s {
		width: 20px;
        max-width: 20px;
        max-height: 20px;
    }

    &_m {
		width: 30px;
        max-width: 30px;
        max-height: 30px;
    }

    &_l {
		width: 40px;
        max-width: 40px;
        max-height: 40px;
    }
}
</style>