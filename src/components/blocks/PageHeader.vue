<template>
    <header>
        <router-link to="/">
            Main
        </router-link>
        <router-link to="/login">
            Login
        </router-link>
        <router-link to="/registration">
            Registration
        </router-link>
    </header>
</template>

<script lang="ts" setup>

</script>

<style scoped>
header {
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  gap: 10px;
}
</style>