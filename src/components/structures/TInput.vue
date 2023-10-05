<template>
    <input
        :value="modelValue"
        @input="updateValue"
    />
</template>

<script setup lang="ts">
defineProps({
    modelValue: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:modelValue'])

const updateValue = (event: Event) => {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style scoped>
input {
    height: 36px;
    margin-top: 10px;
    padding: 10px 10px;

    border-radius: 5px;
}
</style>
  