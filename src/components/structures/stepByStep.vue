<template>
	<div class="step-by-step w-full">
		<div class="step-by-step__steps">
			<span
				v-for="(step, i) in steps"
				:key="step"
				:class="getCurrentClass(i)"
			/>
		</div>

		<template
			v-for="(step, i) in steps"
			:key="step"
		>
			<slot
				v-if="i + 1 === currentStep"
				:name="step"
				:next="next"
				:back="back"
			/>
		</template>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, useSlots } from 'vue'

const emit = defineEmits(['update:modelValue', 'apply'])

const slots = useSlots()
const steps = reactive(Object.keys(slots).filter((slot) => slot !== 'footer'))
const currentStep = ref(1)

defineProps({
	width: {
		type: Number,
		default: 302
	},
	title: {
		type: String,
		default: null
	}
})

const isRequestStep = computed(() => currentStep.value === steps.length)
const isCancelStep = computed(() => currentStep.value === 1)

const back = () => {
	if (!isCancelStep.value) {
		currentStep.value--
	}
}

const next = () => {
	if (isRequestStep.value) {
		emit('apply')
	} else {
		currentStep.value++
	}
}

const getCurrentClass = (step: number) => {
	const _step = step + 1
	if (_step + 1 === currentStep.value) return 'current_step'
	if (_step < currentStep.value) return 'accept_step'

	return ''
}
</script>

<style scoped lang="scss">
.step-by-step {
	&__steps {
		display: flex;

		width: 100%;
		padding-bottom: 10px;
		gap: 5px;
		& span {
			width: 100%;
			height: 5px;

			background: transparent;
			border-radius: 3px;
			&.current_step {
				background: transparent;
			}
			&.accept_step {
				background: transparent;
			}
		}
	}
}
</style>