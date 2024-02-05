<template>
    <div class="job-search">
        <Input
            v-model="value"
            placeholder="Поиск"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import Input from '@/components/elements/Input.vue'

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:model-value'])

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:model-value', value)
    }
})
</script>
