<template>
    <input
        type="text"
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
const emit = defineEmits(['update:model-value'])

const updateValue = (event: Event) => {
    emit('update:model-value', (event.target as HTMLInputElement).value)
}
</script>

<style scoped lang="sass">
input
    height: 36px
    padding: 10px

    border: none
    border-radius: 5px</style>
  