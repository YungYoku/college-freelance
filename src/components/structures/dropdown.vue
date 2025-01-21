<template>
	<DropdownMenu>
		<DropdownMenuTrigger as-child>
			<slot/>
		</DropdownMenuTrigger>
		<DropdownMenuContent class="w-56">
			<template
				v-for="(item, index) in items"
				:key="index"
			>
				<DropdownMenuGroup>
					<template
						v-for="child in item"
						:key="child.text"
					>
						<DropdownMenuItem v-if="child.can !== false">
							<component
								:is="child.to ? 'router-link' : 'div'"
								class="block w-full h-full"
								:to="child.to"
								@click="child.action"
							>
								<slot :item="child">
									{{ child.text }}
								</slot>
							</component>
						</DropdownMenuItem>
					</template>
				</DropdownMenuGroup>

				<DropdownMenuSeparator v-if="index !== items.length - 1"/>
			</template>
		</DropdownMenuContent>
	</DropdownMenu>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IDropdownMenuItem } from '@/interfaces/DropdownMenuItem.ts'

defineProps({
	items: {
		type: Array as PropType<Array<Array<IDropdownMenuItem>>>,
		default: () => ([])
	}
})
</script>
