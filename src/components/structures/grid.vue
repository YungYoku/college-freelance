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
import { computed } from 'vue'

const props = defineProps({
	vertical: {
		type: Boolean,
		default: false  
	},
	columns: {
		type: [Number, Array],
		default: 1
	}
})

const style = computed(() => {
	if (typeof props.columns === 'number') {
		return {
			gridTemplateColumns: `repeat(${props.columns}, 1fr)`
		}
	}

	const columns = [...props.columns as Array<string | number>]
	return {
		gridTemplateColumns: columns.reduce((result: string, column: string | number) => {
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