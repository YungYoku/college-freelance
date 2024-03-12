<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Icon from '@/components/elements/Icon.vue'

const mode = useColorMode({ selector: 'body' })
const currentTheme = computed(() => mode.state.value)
const isLight = computed(() => currentTheme.value === 'light')
</script>

<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<Button variant="outline">
				<Icon
					v-if="isLight"
					name="sun"
				/>
				<Icon
					v-else
					name="moon"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent align="end">
			<DropdownMenuItem @click="mode = 'light'">
				Светлая
			</DropdownMenuItem>
			<DropdownMenuItem @click="mode = 'dark'">
				Темная
			</DropdownMenuItem>
			<DropdownMenuItem @click="mode = 'auto'">
				Системная
			</DropdownMenuItem>
		</DropdownMenuContent>
	</DropdownMenu>
</template>