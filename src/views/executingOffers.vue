<template>
	<Grid :columns="1">
		<PageTitle>
			Выполняемые объявления
		</PageTitle>
	</Grid>

	<Grid
		class="mt-4"
		:columns-xl="4"
		:columns-l="3"
		:columns-m="2"
		:columns-s="1"
	>
		<template v-if="loading">
			<EmptyJobOffer
				v-for="i in 8"
				:key="i"
			/>
		</template>
		<template v-else>
			<JobOffer
				v-for="offer in offers"
				:key="offer.id"
				:job-offer="offer"
				:loading="loading"
				showing-chat
				showing-status
				@show-chat="openChat"
			/>
		</template>
	</Grid>

	<Modal
		v-if="openedChat"
		:width="600"
		@close="closeChat"
	>
		<Chat
			:offer="openedChat"
			rating-type="ratingCreator"
			user-type="creator"
			@update:status="updateStatus"
			@update:rating="updateRating"
		/>
	</Modal>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'

import { Http } from '@/plugins'
import { IJobOffer, IJobOffers, IJobOfferStatus } from '@/interfaces/JobOffer.ts'
import { Grid, Modal } from '@/components/structures'
import { Chat } from '@/components/sections'
import { EmptyJobOffer, JobOffer } from '@/components/blocks'
import { PageTitle } from '@/components/elements'
import { IRating } from '@/interfaces/Rating.ts'

const auth = useAuthStore()

const offers = ref<Array<IJobOffer>>([])

const loading = ref(true)
const getUserOffers = async () => {
	if (auth.user.id === '') return

	loading.value = true

	await Http
		.get<IJobOffers>('/collections/job_offers/records', {
			filter: `(executor='${auth.user.id}')`,
			expand: ['type', 'discipline', 'creator', 'ratingCreator']
		})
		.then(response => {
			offers.value = response.items
		})

	loading.value = false
}

watch(() => auth.user.id, getUserOffers, { immediate: true })

const openedChat = ref<IJobOffer | null>(null)
const openChat = (offer: IJobOffer) => {
	openedChat.value = offer
}

const closeChat = () => openedChat.value = null

const updateStatus = async (status: IJobOfferStatus) => {
	if (openedChat.value) {
		openedChat.value.status = status
	}
}

const updateRating = async (rating: IRating) => {
	if (openedChat.value && openedChat.value.expand) {
		openedChat.value.ratingCreator = rating.id
		openedChat.value.expand.ratingCreator = rating
	}
}
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
