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

type Columns = number | Array<number | string> | null

interface Props {
	vertical: boolean
	columns: Columns
	columnsL: Columns
	columnsM: Columns
	columnsS: Columns
	columnsXs: Columns
}

const props = withDefaults(defineProps<Props>(), {
	vertical: false,
	columns: null,
	columnsL: null,
	columnsM: null,
	columnsS: null,
	columnsXs: null
})

const activeColumns = ref<Array<number | string> | number | null>(1)
const updateActiveColumns = () => {
	if (props.columns) {
		activeColumns.value = props.columns
	}

	const columnsL = props.columnsL
	const columnsM = props.columnsM
	const columnsS = props.columnsS
	const columnsXs = props.columnsXs

	if (window.innerWidth < 768 && columnsXs) {
		activeColumns.value = columnsXs
	} else if (window.innerWidth < 1024 && columnsS) {
		activeColumns.value = columnsS
	} else if (window.innerWidth < 1280 && columnsM) {
		activeColumns.value = columnsM
	} else if (columnsL) {
		activeColumns.value = columnsL
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
	if (typeof activeColumns.value === 'number') {
		return {
			gridTemplateColumns: `repeat(${activeColumns.value}, 1fr)`
		}
	}

	const _columns = [...activeColumns.value as Array<string | number>]
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