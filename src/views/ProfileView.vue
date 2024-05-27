<template>
	<div class="flex max-w-screen-md w-full gap-2 align-center flex-col">
		<div class="flex gap-4 items-center">
			<Avatar
				size="l"
				editable
			/>
			<div class="flex flex-col align-center gap-4">
				<div>Имя: {{ auth.user.name }}</div>

				<div>Фамилия: {{ auth.user.surname }}</div>

				<div>Рейтинг: {{ auth.user.rating }}</div>
			</div>
		</div>

		<Textarea
			v-model="description"
			placeholder="О себе"
			class="h-[240px]"
		/>

		<SelectLive
			v-model="university"
			place-holder="Университет"
			api="universities"
		/>

		<SelectLive
			v-model="disciplines"
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
					:loading="loading"
					@click="generateRefCode"
				>
					Создать
				</Button>
			</template>
		</Grid>


		<Button
			:loading="loading"
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
import Avatar from '@/components/blocks/Avatar.vue'
import Button from '@/components/blocks/Button.vue'
import { Textarea } from '@/components/ui/textarea'
import SelectLive from '@/components/blocks/SelectLive.vue'
import { University } from '@/interfaces/University.ts'
import { Discipline } from '@/interfaces/Discipline.ts'
import Input from '@/components/blocks/Input.vue'
import { ReferralCode } from '@/interfaces/ReferralCode.ts'
import Grid from '@/components/structures/Grid.vue'
import { User } from '@/interfaces/User.ts'

const auth = useAuthStore()
const { toast } = useToast()

const university = ref<University>({
	collectionId: '',
	collectionName: '',
	created: new Date(),
	id: '',
	updated: new Date(),
	name: ''
})
const disciplines = ref<Array<Discipline>>([])
const description = ref('')

watch(() => auth.user, () => {
	description.value = auth.user.description
	if (auth.user.expand?.university) {
		university.value = auth.user.expand.university
	}
	if (auth.user.expand?.disciplines) {
		disciplines.value = auth.user.expand.disciplines
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

	await http
		.patch<User>(`/collections/users/records/${auth.user.id}`, {
			description: description.value,
			university: university.value?.id,
			disciplines: disciplines.value.map(item => item.id)
		})
		.then((res) => {
			auth.setUser(res)
			toast({
				title: 'Сохранено успешно!'
			})
		})
		.catch(() => {
			toast({
				title: 'Ошибка сохранения'
			})
		})

	loading.value = false
}
</script>
