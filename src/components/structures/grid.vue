<template>
	<div
		class="w-full"
		:class="[`gap-${gaps[gap]}`, {
			grid: !vertical,
			flex: vertical,
			'flex-col': vertical
		}]"
		:style="style"
	>
		<slot/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

import Screen from '@/plugins/screen'

type Columns = number | Array<number | string> | null

interface Props {
	vertical?: boolean
	gap: 'xs' | 's' | 'm' |'l'
	columns?: Columns
	columnsXl?: Columns
	columnsL?: Columns
	columnsM?: Columns
	columnsS?: Columns
}

const props = withDefaults(defineProps<Props>(), {
	vertical: false,
	gap: 's',
	columns: null,
	columnsXl: null,
	columnsL: null,
	columnsM: null,
	columnsS: null
})

const activeColumns = ref<Array<number | string> | number | null>(1)
const updateActiveColumns = () => {
	if (props.columns) {
		activeColumns.value = props.columns
	}

	const columnsXl = props.columnsXl
	const columnsL = props.columnsL
	const columnsM = props.columnsM
	const columnsS = props.columnsS

	if (Screen.isSize('s') && columnsS !== null) {
		activeColumns.value = columnsS
	} else if (Screen.isSmaller('m') && columnsM !== null) {
		activeColumns.value = columnsM
	} else if (Screen.isSmaller('l') && columnsL !== null) {
		activeColumns.value = columnsL
	} else if ((Screen.isSmaller('xl') || Screen.isSize('xl')) && columnsXl !== null) {
		activeColumns.value = columnsXl
	}
}
onMounted(() => {
	updateActiveColumns()
	window.addEventListener('resize', updateActiveColumns)
})
onBeforeUnmount(() => {
	window.removeEventListener('resize', updateActiveColumns)
})

const gaps = {
	xs: '1',
	s: '2',
	m: '3',
	l: '4'
}
const style = computed(() => {
	if (props.vertical) return {}

	if (typeof activeColumns.value === 'number') {
		return {
			gridTemplateColumns: `repeat(${activeColumns.value}, 1fr)`,
			'place-items': 'stretch'
		}
	}

	const _columns = [...activeColumns.value as Array<string | number>]
	return {
		gridTemplateColumns: _columns.reduce((result: string, column: string | number) => {
			if (typeof column === 'string') return `${result} ${column} `
			if (typeof column === 'number') return `${result} ${column}fr `
			return result
		}, '').trim(),
		'place-items': 'stretch'
	}
})

</script>