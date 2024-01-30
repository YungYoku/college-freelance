<template>
    <div class="default-layout">
        <page-header />

        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import PageHeader from '@/components/blocks/PageHeader.vue'
</script>

<style scoped lang="sass">
.default-layout 
    display: flex
    flex-direction: column
    align-items: center
    gap: 10px
</style>