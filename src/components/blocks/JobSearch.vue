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
    // eslint-disable-next-line vue/require-default-prop
    inputValue: {
        type: String,
    }
})


</script>
