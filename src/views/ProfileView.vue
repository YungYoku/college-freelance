<template>
	<div class="profile">
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
		placeholder="Описание"
		class="profile__description"
	/>

	<Button @click="save">
		Сохранить
	</Button>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

import http from '@/plugins/http'
import Avatar from '@/components/blocks/Avatar.vue'
import { Button } from '@/components/ui/button/index.ts'
import { Textarea } from '@/components/ui/textarea/index.ts'

const auth = useAuthStore()
const description = ref('')

watch(() => auth.user.description, () => {
	description.value = auth.user.description
}, { immediate: true })

const save = async () => {
	await http.patch(`/collections/users/records/${auth.user.id}`, { description: description.value })
}
</script>

<style scoped lang="scss">
.profile {
    display: flex;
    align-items: center;
    gap: 50px;

    &__name-rate {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
    }

    &__description {
        width: 50%;
        height: 240px;

        resize: none;
    }
}
</style>