<template>
    <img
        :src="'https://college-freelance.hop.sh/api/files/' + src"
        :alt="alt"
    />
</template>

<script setup lang="ts">
defineProps({
    src: {
        type: String,
        default: ''
    },
    alt: {
        type: String,
        default: ''
    }
})
</script>
