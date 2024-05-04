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

				<div>Рейтинг:  {{ auth.user.rating }}</div>
			</div>
		</div>

		<Textarea
			v-model="description"
			placeholder="О себе"
			class="h-[240px]"
		/>

		<SelectLive
			v-model="university"
			place-holder="Выберите университет..."
			api="universities"
		/>

		<SelectLive
			v-model="disciplines"
			multiple
			place-holder="Выберите дисциплины..."
			api="disciplines"
		/>

		<Input
			v-model="card"
			placeholder="Номер карты"
		/>

		<Skeleton
			v-if="loading"
			class="h-9"
		/>
		<Button
			v-else
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
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import SelectLive from '@/components/blocks/SelectLive.vue'
import { University } from '@/interfaces/University.ts'
import { Discipline } from '@/interfaces/Discipline.ts'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'

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
const card = ref('')

watch(() => auth.user, () => {
	description.value = auth.user.description
	card.value = auth.user.card
	if (auth.user.expand?.university) {
		university.value = auth.user.expand.university
	}
	if (auth.user.expand?.disciplines) {
		disciplines.value = auth.user.expand.disciplines
	}
}, { immediate: true })

const loading = ref(false)

const save = async () => {
	loading.value = true

	await http
		.patch(`/collections/users/records/${auth.user.id}`, {
			description: description.value,
			university: university.value?.id,
			disciplines: disciplines.value.map(item => item.id),
			card: card.value
		})
		.then(() => {
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
