<template>
	<Image
		class="icon"
		:class="[`icon_${size}`, color]"
		:src="src"
		alt="icon"
		local
	/>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Image from '@/components/elements/Image.vue'

const props = defineProps({
	name: {
		type: String,
		default: ''
	},
	color: {
		type: String,
		default: 'black',
		validator: (size: string) => {
			return ['black', 'white'].includes(size)
		}
	},
	size: {
		type: String,
		default: 's',
		validator: (size: string) => {
			return ['xs', 's', 'm', 'l'].includes(size)
		}
	}
})

const src = computed(() => {
	return new URL(`../icons/${props.name}.svg`, import.meta.url).href
})
</script>

<style lang="scss" scoped>
.icon {
    cursor: pointer;

	&.white {
		filter: invert(1);
	}

    &_xs {
        max-width: 10px;
        max-height: 10px;
    }

    &_s {
        max-width: 20px;
        max-height: 20px;
    }

    &_m {
        max-width: 30px;
        max-height: 30px;
    }

    &_l {
        max-width: 40px;
        max-height: 40px;
    }
}
</style>