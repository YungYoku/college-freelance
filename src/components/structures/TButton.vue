<template>
    <div>
      <button class="btn" type="submit">
        <slot></slot>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TButton'
  }
  </script>
  
  <style scoped>
  .btn {
    margin-top: 10px;
    font-size: 14px;
    border-radius: 15px;
    cursor: pointer;
  }
  </style>
  