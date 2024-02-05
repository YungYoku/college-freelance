<template>
    <div class="job-search">
        <Input
            placeholder="Поиск"
            :value="inputValue"
        />
    </div>
</template>

<script setup lang="ts">
import Input from '@/components/elements/Input.vue'

defineProps({
    inputValue: {
        type: String,
        default: ''
    }
})
</script>
