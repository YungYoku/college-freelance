<template>
    <h1>{{ msg }}</h1>

    <div class="card">
        <button
            type="button"
            @click="count++"
        >
            count is {{ count }}
        </button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
</script>
