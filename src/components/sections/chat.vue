<template>
	<StepByStep
		:key="offer.id"
		class="chat"
	>
		<template #step_1="{ next }">
			<Grid
				vertical
				:columns="1"
			>
				<Grid
					:columns="[0, 1, 0]"
					ver-align="center"
				>
					<User
						v-if="chatMember"
						:loading="loading"
						link
						:user="chatMember"
					/>

					<span/>

					<Badge
						v-if="auth.isExecutor && offer.status === 'on_review'"
						bg="yellow"
					>
						Проверяется
					</Badge>
					<Badge
						v-if="offer.status === 'ended'"
						bg="green"
					>
						Завершено
					</Badge>
					<span v-else/>
				</Grid>

				<div
					ref="messages-ref"
					class="chat__messages"
				>
					<Message
						v-for="message in chat.expand?.messages ?? []"
						:key="message.id"
						:message="message"
						:self="message.user === auth.user.id"
					/>
				</div>

				<Grid vertical>
					<Badge v-if="fileName">
						Прикреплен файл {{ fileName }}
					</Badge>
					<Grid
						:columns="['54px', 1]"
						gap="xs"
					>
						<InputFile
							v-model="file"
							:loading="loading"
							compact
							@update:name="value => fileName = value"
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
					</Grid>
				</Grid>

				<Button
					v-if="auth.isExecutor && offer.status === 'in_progress'"
					:loading="loading"
					@click="sendToReview"
				>
					Отправить на проверку
				</Button>

				<Grid
					v-if="auth.isCustomer && offer.status === 'on_review'"
					:columns="[1, 1]"
				>
					<Button
						:loading="loading"
						variant="destructive"
						@click="declineReview"
					>
						Отказ
					</Button>
					<Button
						:loading="loading"
						variant="positive"
						@click="approveReview"
					>
						Подтвердить выполнение
					</Button>
				</Grid>

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
import { computed, nextTick, ref, useTemplateRef, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/stores/toast'

import { Grid, StepByStep } from '@/components/structures'
import { Rating } from '@/components/sections'
import { Input, Button, Message, InputFile, User } from '@/components/blocks'
import { Badge } from '@/components/elements'
import { Http } from '@/plugins'
import { IMessage } from '@/interfaces/Message.ts'
import { IChat } from '@/interfaces/Chat.ts'
import { emptyOffer, IJobOffer, IJobOfferStatus } from '@/interfaces/JobOffer.ts'
import { IRating } from '@/interfaces/Rating'

const toast = useToast()

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

const messagesRef = useTemplateRef('messages-ref')
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
		cb: (response) => {
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
const fileName = ref<string | null>(null)
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
	by: '',
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

			toast.set('Отзыв оставлен!')
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
