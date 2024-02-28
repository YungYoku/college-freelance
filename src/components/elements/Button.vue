<template>
    <button
        class="btn"
        type="submit"
    >
        <slot></slot>
    </button>
</template>

<style scoped lang="scss">
.btn {
    font-size: 14px;
    line-height: 1;

    border-radius: 5px;

    cursor: pointer;
}
</style>
