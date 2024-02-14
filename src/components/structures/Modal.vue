<template>
    <div class="modal">
        <form
            class="modal__form"
            @submit.prevent
        >
            <slot></slot>
        </form>
    </div>
</template>

<style scoped lang="sass">
.modal
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    
    padding: 10px

    background-color: #4b525c
    border-radius: 5px

    &__form
        display: flex
        justify-content: center
        align-items: center

        padding: 10px</style>
