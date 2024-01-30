<template>
    <div class="wrapper">
        <form @submit.prevent>
            <slot></slot>
        </form>
    </div>
</template>

<style scoped lang="sass">
form
    display: flex
    align-items: center
    justify-content: center
    padding: 10px

.wrapper
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    
    padding: 10px

    background-color: #ffffff
    border-radius: 5px

::slotted(input)
    margin: 10px
</style>


  