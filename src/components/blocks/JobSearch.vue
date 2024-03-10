<template>
	<Grid
		class="job-search"
		:columns="columns"
	>
		<Input
			v-model="value"
			placeholder="Поиск"
		/>

		<Button v-if="value">
			Поиск
		</Button>
	</Grid>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Grid from '@/components/structures/Grid.vue'

const props = defineProps({
	modelValue: {
		type: String,
		default: ''
	}
})

const emit = defineEmits(['update:model-value'])

const value = computed({
	get() {
		return props.modelValue
	},
	set(value) {
		emit('update:model-value', value)
	}
})

const columns = computed(() => {
	if (value.value.length) return [4, 1]
	return 1
})
</script>

<style scoped lang="scss">
.job-search {
    width: 720px;
    min-width: 320px;
    max-width: 100%;
}</style>
