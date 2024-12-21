<template>
	<Calendar v-model="value"/>
</template>

<script setup lang="ts">
import { Calendar } from '@/components/ui/calendar'
import { computed } from 'vue'
import { CalendarDate, getLocalTimeZone } from '@internationalized/date'

interface Props {
	modelValue: Date
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: () => new Date()
})

const emit = defineEmits(['update:model-value'])

const value = computed({
	get() {
		const date = new Date(props.modelValue)
		return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
	},
	set(value) {
		emit('update:model-value', value.toDate(getLocalTimeZone()))
	}
})
</script>

<style scoped lang="scss">

</style>