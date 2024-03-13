<template>
	<div class="profile flex max-w-screen-md w-full gap-2">
		<div class="flex gap-4 items-center">
			<Avatar
				size="l"
				editable
			/>
			<div class="profile__name-rate">
				<div>Имя: {{ auth.user.name }}</div>

				<div>Фамилия: {{ auth.user.surname }}</div>

				<div>Рейтинг:  {{ auth.user.rating }}</div>
			</div>
		</div>

		<Textarea
			v-model="description"
			placeholder="О себе"
			class="profile__description"
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

		<Button @click="save">
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
}, { immediate: true })

const save = async () => {
	await http
		.patch(`/collections/users/records/${auth.user.id}`, {
			description: description.value,
			university: university.value?.id,
			disciplines: disciplines.value.map(item => item.id)
		})
		.then(() => {
			toast({
				title: 'Сохранено успешно!'
			})
		})
}
</script>

<style scoped lang="scss">
.profile {
	flex-direction: column;
    align-items: center;

    &__name-rate {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    &__description {
        height: 240px;
    }
}
</style>