<template>
	<Grid :columns="4">
		<JobOffer
			v-for="offer in offers"
			:key="offer.id"
			:job-offer="offer"
			show-responses
			show-remove
			@show-responses="openResponses"
			@show-chat="openChat"
			@remove="remove"
		/>
	</Grid>

	<Modal
		v-if="openedOffer"
		@close="closeResponses"
	>
		<Grid :columns="1">
			<div
				v-for="(user) in responsesUsers"
				:key="user.id"
				class="flex w-full items-center gap-2"
			>
				<Avatar
					size="m"
					:image="`users/${user.id}/${user.avatar}`"
				/>

				{{ user.name }}

				<Icon
					v-if="!openedOffer.executor"
					class="ml-auto"
					name="check"
					@click="pickExecutor(user)"
				/>
			</div>
		</Grid>
	</Modal>

	<Modal
		v-if="openedChat"
		@close="closeChat"
	>
		<Chat/>
	</Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

import http from '@/plugins/http'
import { Users, User } from '@/interfaces/User.ts'
import { JobOffer as IJobOffer, JobOffers } from '@/interfaces/JobOffer.ts'
import JobOffer from '@/components/blocks/JobOffer.vue'
import Grid from '@/components/structures/Grid.vue'
import Modal from '@/components/structures/Modal.vue'
import Avatar from '@/components/blocks/Avatar.vue'
import Icon from '@/components/elements/Icon.vue'
import Chat from '@/components/sections/Chat.vue'

const auth = useAuthStore()

const offers = ref<Array<IJobOffer>>([])

const getUserOffers = async () => {
	if (auth.user.id === '') return

	await http
		.get<JobOffers>(`/collections/job_offers/records?filter=(creator='${auth.user.id}')`)
		.then(response => {
			offers.value = response.items
		})
}

watch(() => auth.user.id, getUserOffers, { immediate: true })

const openedOffer = ref<IJobOffer | null>(null)
const responsesUsers = ref<Array<User>>([])

const openResponses = async (offer: IJobOffer) => {
	if (offer.responses.length === 0) return

	openedOffer.value = offer

	let ids = offer.responses.reduce((result, id) => result + `id='${id}' || `, '')
	ids = ids.slice(0, ids.length - 3)
	await http
		.get<Users>(`/collections/users/records?filter=(${ids})`)
		.then(response => {
			responsesUsers.value = response.items
		})
}

const closeResponses = () => {
	openedOffer.value = null
	responsesUsers.value = []
}

const pickExecutor = async (user: User) => {
	if (!openedOffer.value) return

	await http
		.patch(`/collections/job_offers/records/${openedOffer.value.id}`, {
			executor: user.id
		})
		.then(closeResponses)
}

const remove = async (offer: IJobOffer) => {
	await http
		.delete<IJobOffer>(`/collections/job_offers/records/${offer.id}`)
		.then(() => {
			offers.value = offers.value.filter((item) => item.id !== offer.id)
		})
}

const openedChat = ref<IJobOffer | null>(null)
const openChat = (offer: IJobOffer) => openedChat.value = offer

const closeChat = () => openedChat.value = null
</script>


<style scoped lang="scss">
.offer-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    padding: 20px;

    border: 1px solid grey;
    border-radius: 10px;
    gap: 20px;
}
</style>