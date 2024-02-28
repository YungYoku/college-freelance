<template>
    <div
        class="modal"
        :style="style"
    >
        <form
            class="modal__form"
            @submit.prevent
        >
            <slot></slot>
        </form>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    width: {
        type: Number,
        default: 300
    }
})

const style = computed(() => {
    return {
        width: `${props.width}px`
    }
})
</script>

<style scoped lang="scss">
.modal {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 10px;

    background-color: #4b525c;
    border-radius: 5px;

    &__form {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 100%;
        padding: 10px;
    }
}
</style>
