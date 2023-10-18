<template>
  <div class="wrapper">
    <form @submit.prevent="submitEvent">
      <slot></slot>
    </form>
  </div>
</template>
  
<script>
export default {
  name: 'modal',

  methods: {
      submitEvent(e) {
      this.$emit('submit', e)
    }
  }
}
</script>

<style scoped>

form {
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 10px;
}

.wrapper {
  display:flex;
  align-items:center;
  justify-content:center;
  flex-direction: column;
  border-radius: 5px;
  padding: 20px;
  background-color:#fff;
}

::slotted(input) {
  margin: 10px;
}
</style>
  