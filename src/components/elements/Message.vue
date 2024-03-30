<template>
	<div class="message">
		Message
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import { Message } from '@/interfaces/Message.ts'

defineProps({
	message: {
		type: Object as PropType<Message>,
		required: true
	}
})
</script>

<style scoped lang="scss">
.message {
	border-radius: 5px;
}
</style>