<template>
	<Image
		class="icon"
		:class="[`icon_${size}`, currentColor, {
			'cursor-pointer': pointer
		}]"
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
	invertedColor: {
		type: Boolean,
		default: true
	},
	pointer: {
		type: Boolean,
		default: true
	}
})

const mode = useColorMode({ selector: 'body' })
const currentTheme = computed(() => mode.state.value)

const colors = {
	dark: 'light',
	light: 'dark'
}

const currentColor = computed(() => {
	return props.invertedColor ? colors[currentTheme.value] : currentTheme.value
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