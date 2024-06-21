<template>
	<StepByStep :key="offer.id">
		<template #step_1="{ next }">
			<Grid class="chat pt-10">
				<User
					v-if="chatMember"
					class="absolute top-2 left-23"
					:loading="loading"
					link
					:user="chatMember"
				/>

				<div
					ref="messagesRef"
					class="chat__messages"
				>
					<Message
						v-for="message in chat.expand?.messages ?? []"
						:key="message.id"
						:message="message"
						:self="message.user === auth.user.id"
					/>
				</div>

				<InputFile
					v-model="file"
					:loading="loading"
				/>

				<Input
					v-model="newMessage"
					:disabled="loading"
					:loading="loading"
					label="Cообщение"
					icon="send"
					@action="sendMessage"
					@keyup.enter="sendMessage"
				/>

				<template v-if="offer.status === 'ended'">
					<Button
						v-if="rating"
						@click="next"
					>
						Просмотр отзыва
					</Button>
					<Button
						v-else
						@click="next"
					>
						Оставить отзыв
					</Button>
				</template>


				<template v-if="auth.isExecutor">
					<Button
						v-if="offer.status === 'in_progress'"
						:loading="loading"
						@click="sendToReview"
					>
						Отправить на проверку
					</Button>
					<span
						v-else-if="offer.status === 'on_review'"
						class="text-xs text-center"
					>
						На проверке
					</span>
					<span
						v-else-if="offer.status === 'ended'"
						class="text-xs text-center"
					>
						Объявление завершено
					</span>
				</template>

				<template v-if="auth.isCustomer">
					<template v-if="offer.status === 'on_review'">
						<Button
							:loading="loading"
							@click="approveReview"
						>
							Подтвердить выполнение
						</Button>
						<Button
							:loading="loading"
							@click="declineReview"
						>
							Отказ
						</Button>
					</template>
					<span
						v-else-if="offer.status === 'ended'"
						class="h-9 text-xs text-center content-center"
					>
						Объявление завершено
					</span>
				</template>
			</Grid>
		</template>

		<template #step_2="{back}">
			<Rating
				v-if="offer.status === 'ended'"
				v-model="newRating"
				:user="chatMember?.name"
				:loading="loading"
				@update:model-value="sendRating"
				@back="back"
			/>
		</template>
	</StepByStep>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

import { Grid, StepByStep } from '@/components/structures'
import { Input, Button, Rating, Message, InputFile, User } from '@/components/blocks'
import { Http } from '@/plugins'
import { IMessage } from '@/interfaces/Message.ts'
import { IChat } from '@/interfaces/Chat.ts'
import { emptyOffer, IJobOffer, IJobOfferStatus } from '@/interfaces/JobOffer.ts'
import { emptyUser } from '@/interfaces/User'
import { IRating } from '@/interfaces/Rating'
import { useToast } from '@/components/ui/toast'

const { toast } = useToast()

interface Props {
	offer: IJobOffer,
	userType: 'executor' | 'creator'
	ratingType: 'ratingExecutor' | 'ratingCreator'
}
const props = withDefaults(defineProps<Props>(), {
	offer: () => emptyOffer,
	userType: 'creator',
	ratingType: 'ratingCreator',
})

const messagesRef = ref<HTMLInputElement | null>(null)
const chat = ref<IChat>({
	created: '',
	id: '',
	messages: [],
	collectionId: '',
	collectionName: '',
	updated: '',
	expand: {
		messages: []
	}
})

const loading = ref(true)

const chatMember = computed(() => props.offer.expand?.[props.userType])
const rating = computed(() => props.offer.expand?.[props.ratingType] ?? null)

const loadChat = async () => {
	await Http.connect<IChat>({
		collection: 'chats',
		id: props.offer.chat,
		expand: ['messages', 'messages.file'],
		cb: (response: IChat) => {
			chat.value = response

			nextTick(() => {
				if (messagesRef.value) {
					const messagesRefScrollHeight = messagesRef.value.scrollHeight ?? 0
					messagesRef.value?.scrollTo(0, messagesRefScrollHeight) // Не всегда срабатывает с первого раза
				}

				loading.value = false
			})
		}
	})
}

watch(() => props.offer.chat, loadChat, { immediate: true })
watch(() => props.offer.status, () => { loading.value = false })

const auth = useAuthStore()

const newMessage = ref('')
const file = ref<string | null>(null)
const sendMessage = async () => {
	if (loading.value) return
	if (newMessage.value.length === 0 && file.value === null) return

	loading.value = true

	await Http
		.post<IMessage>(`/send-message/${props.offer.chat}`, {
			text: newMessage.value,
			file: file.value
		})

	newMessage.value = ''
	file.value = null
	loading.value = false
}

const emit = defineEmits(['update:status', 'update:rating'])

const updateStatus = async (status: IJobOfferStatus) => {
	loading.value = true

	const body: IJobOffer = {
		...props.offer,
		status
	}

	await Http
		.patch<IJobOffer>(`/collections/job_offers/records/${props.offer.id}`, body)
		.then((response) => {
			emit('update:status', response.status)
		})

	loading.value = false
}

const declineReview = () => updateStatus('in_progress')
const sendToReview = () => updateStatus('on_review')
const approveReview = () => updateStatus('ended')

const newRating = ref<IRating>({
	by: emptyUser,
	collectionId: '',
	collectionName: '',
	created: '',
	id: '',
	updated: '',
	stars: 0,
	review: ''
})
watch(rating, () => {
	if (rating.value) newRating.value = rating.value
}, { immediate: true })

const sendRating = async (value: { stars: number, review: string } = { stars: 1, review: '' }) => {
	const { stars, review } = value

	await Http.post<IRating>(`/send-review/${props.offer.id}`, {
		stars,
		review
	})
		.then((response) => {
			emit('update:rating', response)

			toast({
				title: 'Отзыв оставлен!'
			})
		})
}
</script>

<style scoped lang="scss">
.chat {
	&__messages {
		display: flex;
		flex-direction: column;

		height: 40vh;
		min-height: 300px;
		max-height: 800px;
		padding: 0 10px;
		overflow: auto;
		gap: 10px;
	}
}
</style>
