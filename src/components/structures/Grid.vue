<template>
    <div
        class="grid"
        :class="{ vertical }"
        :style="style"
    >
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    vertical: {
        type: Boolean,
        default: false  
    },
    columns: {
        type: [Number, Array],
        default: 1
    }
})

const style = computed(() => {
    if (typeof props.columns === 'number') {
        return {
            gridTemplateColumns: `repeat(${props.columns}, 1fr)`
        }
    }

    return {
        gridTemplateColumns: [...props.columns].reduce((str: string, item) => str + item + 'fr ', '').trim()
    }
})

</script>

<style scoped lang="sass">
.grid
    display: grid

    width: 100%
    gap: 10px

.vertical
    grid-auto-flow: column</style>