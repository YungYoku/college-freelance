<template>
	<div
		class="grid"
		:class="[`_gap-${gap}`, {
			'_vertical': vertical
		}]"
		:style="style"
	>
		<slot/>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

import { Screen } from '@/plugins'

type Align = 'start' | 'center' | 'end' | 'stretch' | 'initial'
type Columns = number | Array<number | string> | null

interface Props {
	vertical?: boolean
	gap?: 'xs' | 's' | 'm' |'l'
	verAlign?: Align
	horAlign?: Align
	columns?: Columns
	columnsXl?: Columns
	columnsL?: Columns
	columnsM?: Columns
	columnsS?: Columns
}

const props = withDefaults(defineProps<Props>(), {
	vertical: false,
	gap: 's',
	verAlign: 'initial',
	horAlign: 'initial',
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
		return
	}

	const columnsXl = props.columnsXl
	const columnsL = props.columnsL
	const columnsM = props.columnsM
	const columnsS = props.columnsS

	if (Screen.isSize('s')) {
		activeColumns.value = columnsS ?? columnsM ?? columnsL ?? columnsXl
	} else if (Screen.isSize('m')) {
		activeColumns.value = columnsM ?? columnsL ?? columnsXl
	} else if (Screen.isSize('l')) {
		activeColumns.value = columnsL ?? columnsXl
	} else if (Screen.isSize('xl') || Screen.isLarger('xl')) {
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
watch(() => [props.columns, props.columnsXl, props.columnsL, props.columnsM, props.columnsS], updateActiveColumns)

const getAlign = (align: Align) => {
	switch (align) {
	case 'start':
		return 'flex-start'
	case 'center':
		return 'center'
	case 'end':
		return 'flex-end'
	case 'initial':
		return 'initial'
	case 'stretch':
		return 'stretch'
	default:
		return 'initial'
	}
}
const style = computed(() => {
	if (activeColumns.value === null) return {}

	if (props.vertical) {
		return {
			'align-items': getAlign(props.horAlign)
		}
	}

	if (typeof activeColumns.value === 'number') {
		return {
			gridTemplateColumns: `repeat(${activeColumns.value}, 1fr)`,
			'align-items': getAlign(props.verAlign),
			'justify-items': getAlign(props.horAlign)
		}
	}

	const _columns = [...activeColumns.value as Array<string | number>]
	return {
		gridTemplateColumns: _columns.reduce((result: string, column: string | number) => {
			if (typeof column === 'string') return `${result} ${column} `
			if (typeof column === 'number') return `${result} ${column}fr `
			return result
		}, '').trim(),
		'align-items': getAlign(props.verAlign),
		'justify-items': getAlign(props.horAlign)
	}
})
</script>]

<style lang="scss" scoped>
.grid {
	width: 100%;

	display: grid;

	&._vertical {
		display: flex;
		flex-direction: column;
	}

	&._gap-xs {
		gap: 4px;
	}
	&._gap-s {
		gap: 8px;
	}
	&._gap-m {
		gap: 12px;
	}
	&._gap-l {
		gap: 16px;
	}
}
</style>