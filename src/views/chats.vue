<template>
	<Grid :columns="headerColumns">
		<Icon
			v-if="Screen.isSize('s') && isChatOpened"
			name="arrow-left"
			size="l"
			@click="openedChat = null"
		/>

		<PageTitle>
			Мои чаты
		</PageTitle>
	</Grid>

	<Grid :columns="Screen.isLarger('s') ? [1,4] : 1 ">
		<Island v-if="Screen.isLarger('s') || !isChatOpened">
			<Grid
				vertical
				:columns="1"
			>
				<Grid
					v-for="chat in chats"
					:key="chat.id"
					gap="xs"
					class="cursor-pointer rounded-md py-2 px-4 hover:bg-card"
					:class="{
						'bg-card': openedChat?.chat === chat.chat
					}"
					vertical
					:columns="1"
					@click="loadChat(chat)"
				>
					<Text size="xs">
						{{ chat.title }}
					</Text>

					<UserCard
						:loading="loading"
						:user="getUserForChar(chat)"
					/>
				</Grid>
			</Grid>
		</Island>

		<Island
			v-if="(Screen.isSize('s') && isChatOpened) || Screen.isLarger('s')"
			class="relative"
		>
			<Text v-if="!isChatOpened">
				Выберите чат
			</Text>
			<Chat
				v-else-if="openedChat !== null"
				:offer="openedChat"
				:rating-type="chatRatingType"
				:user-type="chatUserType"
				@update:status="updateStatus"
				@update:rating="updateRating"
			/>
		</Island>
	</Grid>
</template>

<script setup lang="ts">
import { Chat } from '@/components/sections'
import { User as UserCard } from '@/components/blocks'
import { PageTitle, Icon } from '@/components/elements'
import { Island, Grid } from '@/components/structures'
import { IJobOffer, IJobOffers, IJobOfferStatus } from '@/interfaces/JobOffer'

import { Http, Screen } from '@/plugins'
import { computed, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import Text from '@/components/elements/text.vue'
import { IRating } from '@/interfaces/Rating.ts'
import { emptyUser } from '@/interfaces/User.ts'

const auth = useAuthStore()
const openedChat = ref<IJobOffer | null>(null)
const isChatOpened = computed(() => openedChat.value !== null)
const headerColumns = computed(() => {
	if (Screen.isSize('s') && isChatOpened.value) {
		return ['40px', 1]
	}
	return 1
})
const chats = ref<Array<IJobOffer>>([])
const loading = ref(true)

const chatRatingType = computed(() => auth.isCustomer ? 'ratingExecutor' : 'ratingCreator')
const getUserForChar = (chat: IJobOffer) => {
	if (loading.value) return emptyUser
	
	const executor = chat.expand?.executor
	const creator = chat.expand?.creator
	if (executor && creator) {
		return auth.isCustomer ? executor : creator
	}

	return emptyUser
}
const chatUserType = computed(() => auth.isCustomer ? 'executor' : 'creator')

const getChats = async () => {
	if (auth.user.id === '') return
	loading.value = true

	const filter = auth.isCustomer ? `creator='${auth.user.id}'` : `executor='${auth.user.id}'`
	const encodedFilter = encodeURIComponent(`(${filter} && status!='created')`)

	await Http.get<IJobOffers>('/collections/job_offers/records', {
		filter: `(${encodedFilter})`,
		expand: ['proposals', 'type', 'discipline', 'creator', 'ratingCreator', 'executor', 'ratingExecutor']
	})
		.then(({ items }) => {
			chats.value = items
		})

	loading.value = false
}
watch(() => auth.user.id, getChats, { immediate: true })

const updateStatus = async (status: IJobOfferStatus) => {
	if (openedChat.value) {
		openedChat.value.status = status
	}
}

const updateRating = async (rating: IRating) => {
	if (openedChat.value && openedChat.value.expand) {
		if (auth.isCustomer) {
			openedChat.value.ratingExecutor = rating.id
			openedChat.value.expand.ratingExecutor = rating
		} else if (auth.isExecutor) {
			openedChat.value.ratingCreator = rating.id
			openedChat.value.expand.ratingCreator = rating
		}
	}
}

const loadChat = (offer: IJobOffer) => {
	openedChat.value = offer
}
</script>
