<template>
    <div class="grid" :class="{ vertical }">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">

defineProps({
  vertical: {
    type: Boolean,
    default: false  
  }
})

</script>

<style scoped>
.grid {
  display: grid;
  gap: 10px;
}

.vertical {
  grid-auto-flow: column;
}
</style>