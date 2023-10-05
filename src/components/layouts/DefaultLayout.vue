<template>
    <div class="default-layout">
        <page-header />

        <slot></slot>
    </div>
</template>

<script lang="ts" setup>
import PageHeader from '@/components/blocks/PageHeader.vue'
</script>

<style>
.default-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>