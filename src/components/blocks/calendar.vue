<template>
	<div class="calendar">
		<div class="calendar__header">
			<div
				class="calendar__back"
				@click="back"
			>
				{{ '<' }}
			</div>

			<div class="calendar__title">
				{{ monthTitle }} {{ year }}
			</div>

			<div
				class="calendar__next"
				@click="next"
			>
				{{ '>' }}
			</div>
		</div>

		<div class="calendar__week-days">
			<div
				v-for="weekDay in weekInfo"
				:key="weekDay"
				class="calendar__week-day"
			>
				{{ weekDay }}
			</div>
		</div>

		<div class="calendar__content">
			<div
				v-for="day in daysAmount"
				:key="day"
				class="calendar__month-day"
				:class="{
					'_active': isDayActive(day)
				}"
				@click="value = new Date(year, month, day)"
			>
				{{ day }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const value = defineModel<Date>({
	default: () => new Date(),
})

const year = ref(new Date().getFullYear())

const monthInfo = [
	{
		days: 31,
		title: 'Январь'
	},
	{
		days: 28,
		title: 'Февраль'
	},
	{
		days: 31,
		title: 'Март'
	},
	{
		days: 30,
		title: 'Апрель'
	},
	{
		days: 31,
		title: 'Май'
	},
	{
		days: 30,
		title: 'Июнь'
	},
	{
		days: 31,
		title: 'Июль'
	},
	{
		days: 31,
		title: 'Август'
	},
	{
		days: 30,
		title: 'Сентябрь'
	},
	{
		days: 31,
		title: 'Октябрь'
	},
	{
		days: 30,
		title: 'Ноябрь'
	},
	{
		days: 31,
		title: 'Декабрь'
	}
]
const month = ref(new Date().getMonth())
const next = () => {
	month.value++
	if (month.value === 12) {
		month.value = 0
		year.value++
	}
}
const back = () => {
	month.value--
	if (month.value === -1) {
		month.value = 11
		year.value--
	}
}
const monthTitle = computed(() => monthInfo[month.value].title)
const daysAmount = computed(() => monthInfo[month.value].days)

const weekInfo = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

const isDayActive = (day: number) => {
	const date = new Date(value.value)
	return date.getFullYear() === year.value && date.getMonth() === month.value && date.getDate() === day
}
</script>

<style scoped lang="scss">
.calendar {
	max-width: 244px;

	display: flex;
	flex-direction: column;
	gap: 10px;

	padding: 10px;

	&__next,
	&__back {
		width: 32px;
		height: 32px;

		display: flex;
		align-items: center;
		justify-content: center;

		background: #333;
		border-radius: 5px;
		cursor: pointer;
	}

	&__header {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;

		font-size: 14px;
	}

	&__week-days {
		display: flex;
	}

	&__week-day {
		width: 32px;
		height: 32px;

		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 14px;
	}

	&__content {
		display: flex;
		flex-wrap: wrap;
	}

	&__month-day {
		width: 32px;
		height: 32px;

		display: flex;
		align-items: center;
		justify-content: center;

		font-size: 14px;
		border-radius: 5px;
		cursor: pointer;

		&:hover {
			background: #6c6c6c;
		}

		&._active {
			background: #6c6c6c;
		}
	}
}
</style>