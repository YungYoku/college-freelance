<template>
	<div
		ref="popover"
		class="dropdown relative"
		@click="contentShowed = true"
	>
		<div class="dropdown__trigger">
			<slot/>
		</div>

		<div
			v-if="contentShowed"
			class="w-[200px] max-h-[500px] absolute right-0 top-14 bg-background border border-input p-1 rounded-xl flex flex-col gap-1 overflow-auto z-10"
		>
			<template
				v-for="(item, index) in items"
				:key="index"
			>
				<div class="dropdown__group">
					<template
						v-for="child in item"
						:key="child.text"
					>
						<component
							:is="child.to ? 'router-link' : 'div'"
							v-if="child.can !== false"
							class="block w-full h-full text-sm hover:bg-accent cursor-pointer p-2 rounded-md"
							:to="child.to"
							@click.stop="child.action; contentShowed = false"
						>
							<slot
								name="item"
								:item="child"
							>
								{{ child.text }}
							</slot>
						</component>
					</template>
				</div>

				<div
					v-if="index !== items.length - 1"
					class="w-full h-[1px] bg-muted"
				/>
			</template>

			<div
				v-if="items.length === 0"
				class="block w-full h-full text-sm p-2 cursor-default rounded-sm"
			>
				Пусто
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, PropType, useTemplateRef } from 'vue'

import { IDropdownMenuItem } from '@/interfaces/DropdownMenuItem.ts'

defineProps({
	items: {
		type: Array as PropType<Array<Array<IDropdownMenuItem>>>,
		default: () => ([])
	}
})

const contentShowed = ref(false)

const popover = useTemplateRef('popover')
document.addEventListener('click', (event) => {
	if (!popover.value) return

	const withinBoundaries = event.composedPath().includes(popover.value)
	if (!withinBoundaries) {
		contentShowed.value = false
	}
})
</script>
