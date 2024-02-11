<template>
    <img
        :src="image"
        :alt="alt"
    />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    src: {
        type: String,
        default: ''
    },
    alt: {
        type: String,
        default: ''
    },
    local: {
        type: Boolean,
        default: false
    }
})

const image = computed(() => {
    if (props.local) return props.src
    return `https://college-freelance.hop.sh/api/files/${props.src}`
})
</script>
