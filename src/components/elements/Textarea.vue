<template>
    <textarea
        class="textarea"
        :value="modelValue"
        :placeholder="label"
        cols="30"
        rows="10"
        @input="updateValue"
    ></textarea>
</template>

<script setup lang="ts">
defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: ''
    }
})

const emit = defineEmits(['update:model-value'])

const updateValue = (event: Event) => {
    emit('update:model-value', (event.target as HTMLInputElement).value)
}
</script>

<style scoped lang="scss">
.textarea {
    padding: 10px;

    border: none;
    border-radius: 5px;

    resize: none;
}
</style>