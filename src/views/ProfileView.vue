<template>
	<div class="flex max-w-screen-md w-full gap-2 align-center flex-col">
		<div class="flex gap-4 items-center">
			<Avatar
				size="l"
				editable
			/>
		</div>

		<Input
			v-model="form.name.value"
			:error="form.name.error"
			:disabled="loading"
			label="Имя"
		/>

		<Input
			v-model="form.surname.value"
			:error="form.surname.error"
			:disabled="loading"
			label="Фамилия"
		/>

		<Input
			v-model="form.email.value"
			:error="form.email.error"
			:disabled="loading"
			label="Почта"
		/>

		<Textarea
			v-model="form.description.value"
			:error="form.description.error"
			:disabled="loading"
			label="О себе"
			height="240px"
		/>

		<SelectLive
			v-model="university"
			:error="form.university.error"
			place-holder="Университет"
			api="universities"
		/>

		<SelectLive
			v-model="form.disciplines.value"
			:error="form.disciplines.error"
			multiple
			place-holder="Дисциплины"
			api="disciplines"
		/>

		<Grid :columns="auth.user.referral_code?.length === 0 ? [3, 1] : 1">
			<Input
				v-model="auth.user.referral_code"
				disabled
				label="Реферальный код"
			/>
			<template v-if="auth.user.referral_code?.length === 0">
				<Button
					:disabled="loading"
					@click="generateRefCode"
				>
					Создать
				</Button>
			</template>
		</Grid>

		<Button
			:disabled="loading"
			@click="save"
		>
			Сохранить
		</Button>
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/components/ui/toast/use-toast'

import http from '@/plugins/http'
import { Grid } from '@/components/structures'
import { Avatar, Button, Textarea, SelectLive, Input } from '@/components/blocks'
import { University } from '@/interfaces/University.ts'
import { Discipline } from '@/interfaces/Discipline.ts'
import { ReferralCode } from '@/interfaces/ReferralCode.ts'
import { User } from '@/interfaces/User.ts'
import Form from '@/plugins/form'

const auth = useAuthStore()
const { toast } = useToast()

const form = Form({
	name: '',
	surname: '',
	email: auth.user.email,
	university: '',
	disciplines: [] as Array<Discipline>,
	description: ''
})
const university = ref<University>({
	collectionId: '',
	collectionName: '',
	created: new Date(),
	id: '',
	updated: new Date(),
	name: ''
})

watch(() => auth.user, () => {
	form.name.value = auth.user.name
	form.surname.value = auth.user.surname
	form.email.value = auth.user.email
	form.description.value = auth.user.description
	if (auth.user.expand?.university) {
		university.value = auth.user.expand.university
	}
	if (auth.user.expand?.disciplines) {
		form.disciplines.value = auth.user.expand.disciplines
	}
}, { immediate: true })

const loading = ref(false)

const generateRefCode = async () => {
	loading.value = true

	let referral_code = ''
	await http
		.post<ReferralCode>('/collections/referral_codes/records')
		.then((res) => {
			referral_code = res.id
		})

	await http
		.patch<User>(`/collections/users/records/${auth.user.id}`, {
			referral_code
		})
		.then((res) => {
			auth.setUser(res)
		})

	loading.value = false
}

const save = async () => {
	loading.value = true
	form.clearErrors()

	await http
		.patch<User>(`/collections/users/records/${auth.user.id}`, {
			...form.get(),
			university: university.value?.id,
			disciplines: form.disciplines.value.map(item => item.id)
		})
		.then((res) => {
			auth.setUser(res)
			toast({
				title: 'Сохранено успешно!'
			})
		})
		.catch(({ data }) => {
			form.setErrors(data)
			
			toast({
				title: 'Ошибка сохранения'
			})
		})

	loading.value = false
}
</script>
