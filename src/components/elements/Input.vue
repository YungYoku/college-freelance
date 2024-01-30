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
    width: 300px
    height: 36px

    padding: 10px

    border-radius: 5px
    border: none
</style>
  