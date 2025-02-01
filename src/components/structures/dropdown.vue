<template>
	<div
		ref="dropdown"
		class="dropdown"
		@click="contentShowed = true"
	>
		<div class="dropdown__trigger">
			<slot/>
		</div>

		<Transition name="dropdown">
			<div
				v-if="contentShowed"
				class="dropdown__content"
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
								class="dropdown__item"
								:to="child.to"
								@click.stop="() => { child.action?.(); contentShowed = false }"
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

					<Separator v-if="index !== items.length - 1"/>
				</template>

				<div
					v-if="items.length === 0"
					class="dropdown__empty"
				>
					Пусто
				</div>
			</div>
		</Transition>
	</div>
</template>

<script setup lang="ts">
import { ref, PropType, useTemplateRef, onMounted, onUnmounted } from 'vue'

import { IDropdownMenuItem } from '@/interfaces/DropdownMenuItem.ts'
import Separator from '@/components/elements/separator.vue'

defineProps({
	items: {
		type: Array as PropType<Array<Array<IDropdownMenuItem>>>,
		default: () => ([])
	}
})

const contentShowed = ref(false)

const dropdown = useTemplateRef('dropdown')
const handleClick = (e: MouseEvent) => {
	if (!dropdown.value) return

	const withinBoundaries = e.composedPath().includes(dropdown.value)
	if (!withinBoundaries) {
		contentShowed.value = false
	}
}
onMounted(() => document.addEventListener('click', handleClick))
onUnmounted(() => document.addEventListener('click', handleClick))
</script>

<style scoped lang="scss">
.dropdown {
	position: relative;

	&__trigger {
		cursor: pointer;
	}

	&__content {
		width: 200px;
		max-height: 500px;

		position: absolute;
		top: 56px;
		right: 0;
		z-index: 10;

		display: flex;
		flex-direction: column;
		gap: 4px;

		padding: 4px;

		background-color: hsl(var(--background));
		border: 1px solid hsl(var(--input));
		border-radius: 12px;
		overflow: auto;

		&.dropdown-enter-from {
			opacity: 0;
		}
		&.dropdown-enter-active {
			transition: opacity 0.1s;
		}
		&.dropdown-enter-to {
			opacity: 1;
		}

		&.dropdown-leave-from {
			opacity: 1;
		}
		&.dropdown-leave-active {
			transition: opacity 0.1s;
		}
		&.dropdown-leave-to {
			opacity: 0;
		}
	}

	&__empty,
	&__item {
		width: 100%;

		display: block;

		padding: 8px;

		font-size: 14px;
		border-radius: 8px;
	}

	&__item {
		cursor: pointer;

		&:hover {
			background-color: hsl(var(--accent));
		}
	}

	&__empty {
		cursor: default;
	}
}
</style>