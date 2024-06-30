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
			</Button>
		</DropdownMenuTrigger>
		<DropdownMenuContent>
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

<script setup lang="ts">
import { computed } from 'vue'
import { useColorMode } from '@vueuse/core'

import { Button } from '@/components/blocks'
import { Icon } from '@/components/elements'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const mode = useColorMode({ selector: 'body' })
const currentTheme = computed(() => mode.state.value)
const isLight = computed(() => currentTheme.value === 'light')
</script>

