<template>
    <label class="checkbox">
        <input
            type="checkbox"
            :value="modelValue"
            @click="updateValue"
        />
        {{ label }}
    </label>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: Boolean,
        default: false
    },
    label: {
        type: String,
        default: ''
    }
})
const emit = defineEmits(['update:model-value'])

const updateValue = () => {
    emit('update:model-value', !props.modelValue)
}
</script>

<style scoped lang="scss">
.checkbox {
    color: #333333;

    input {
        border: none;
        border-radius: 5px;
    }
}
</style>
  