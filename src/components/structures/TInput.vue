<template>
    <input :value="modelValue"  type="text" @input="updateInput"/>
  </template>
  
  <script>
  export default {
    name: 'TInput',
      
    methods: {
      updateInput(event) {
        this.$emit('update:modelValue', event.target.value)
      }
    }
  }
  </script>
  
  <style scoped>
  input {
    margin-top: 10px;
    height: 36px;
    padding: 10px 10px;
    border-radius: 5px;
  }
  </style>
  