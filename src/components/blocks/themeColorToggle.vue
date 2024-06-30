<template>
	<Button
		variant="outline"
		@click="toggle"
	>
		<Icon
			v-if="isLight"
			name="sun"
		/>
		<Icon
			v-else
			name="moon"
		/>
	</Button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'

import { Button } from '@/components/blocks'
import { Icon } from '@/components/elements'

const mode = useColorMode({ selector: 'body' })
const currentTheme = computed(() => mode.state.value)
const isLight = computed(() => currentTheme.value === 'light')
const toggle = () => {
	if (currentTheme.value === 'light') {
		mode.value = 'dark'
	} else {
		mode.value = 'light'
	}
}
</script>

