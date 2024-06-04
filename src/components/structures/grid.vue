<template>
	<div
		class="grid"
		:class="{ vertical }"
		:style="style"
	>
		<slot/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
	vertical: {
		type: Boolean,
		default: false  
	},
	columnsL: {
		type: [Number, Array<number | string>],
		default: 1
	},
	columnsM: {
		type: [Number, Array<number | string>],
		default: 1
	}
})

const columns = ref<Array<number | string> | number>(1)
const updateActiveColumns = () => {
	if (window.innerWidth < 1280) {
		columns.value = props.columnsM
	}

	if (window.innerWidth >= 1280) {
		columns.value = props.columnsL
	}
}
onMounted(() => {
	updateActiveColumns()
	window.addEventListener('resize', updateActiveColumns)
})
onBeforeUnmount(() => {
	window.removeEventListener('resize', updateActiveColumns)
})

const style = computed(() => {
	if (typeof columns.value === 'number') {
		return {
			gridTemplateColumns: `repeat(${columns.value}, 1fr)`
		}
	}

	const _columns = [...columns.value as Array<string | number>]
	return {
		gridTemplateColumns: _columns.reduce((result: string, column: string | number) => {
			if (typeof column === 'string') return `${result} ${column} `
			if (typeof column === 'number') return `${result} ${column}fr `
			return result
		}, '').trim()
	}
})

</script>

<style scoped lang="scss">
.grid {
    display: grid;

    width: 100%;
    gap: 10px;

    &.vertical {
        grid-auto-flow: column;
    }
}
</style>