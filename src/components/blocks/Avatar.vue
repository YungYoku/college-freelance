<template>
    <div
        class="avatar"
        :class="[`avatar__${size}`, {
            'avatar__editable': editable && avatar
        }]"
    >
        <Image
            v-if="avatar"
            class="avatar__image"
            :src="avatar"
        />
        <input
            v-else-if="editable"
            id="avatar"
            class="avatar__input"
            type="file"
            accept="image/png, image/gif, image/jpeg, image/jpg, image/svg, image/webp, image/avif"
            @input="onImageLoad"
        />

        <Icon
            v-if="avatar && editable"
            class="avatar__icon-remove"
            name="trash"
            size="m"
            @click="removeAvatar"
        />
        <Icon
            v-if="!avatar && editable"
            class="avatar__icon-upload"
            name="upload"
            size="m"
        />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useAuthStore } from '@/stores/auth'
import { User } from '@/interfaces/User.ts'
import http from '@/plugins/http'
import Image from '@/components/elements/Image.vue'
import Icon from '@/components/elements/Icon.vue'

defineProps({
    size: {
        type: String,
        default: 'm',
        validator: (size: string) => {
            return ['xs', 's', 'm', 'l'].includes(size)
        }
    },
    editable: {
        type: Boolean,
        default: false
    }
})

const auth = useAuthStore()

const avatar = computed(() => {
    if (auth.user.avatar) return `users/${auth.user.id}/${auth.user.avatar}`
    return ''
})

const loadImage = async (avatar: File | string) => {
    const formData = new FormData()

    formData.append('avatar', avatar)

    const user = await http.patch<User>(`/collections/users/records/${auth.user.id}`, formData)
    auth.setUser(user)
}

const onImageLoad = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target?.files?.[0]

    if (file) loadImage(file)
}

const removeAvatar = () => loadImage('')
</script>

<style lang="sass" scoped>
.avatar
    position: relative

    overflow: hidden

    background: #444444
    border-radius: 50%

    &__image
        max-width: 100%
        max-height: 100%

    &__icon-remove,
    &__icon-upload
        position: absolute
        top: calc(50% - 15px)
        right: calc(50% - 15px)
        z-index: 2

    &__icon-remove
        opacity: 0
        transition: all 0.2s

    &:hover
        .avatar__icon-remove
            opacity: 1
            transition: all 0.2s

    &__xs
        min-width: 15px
        max-width: 15px
        min-height: 15px
        max-height: 15px
    &__s
        min-width: 30px
        max-width: 30px
        min-height: 30px
        max-height: 30px
    &__m
        min-width: 50px
        max-width: 50px
        min-height: 50px
        max-height: 50px
    &__l
        min-width: 150px
        max-width: 150px
        min-height: 150px
        max-height: 150px

    &__editable
        &::before
            content: ''
            position: absolute
            top: 0
            left: 0
            z-index: 1

            width: 100%
            height: 100%

            background: transparent

            transition: all 0.2s

        &:hover::before
            background: #444444

            transition: all 0.2s

    &__input
        position: absolute
        left: 0

        width: 100%
        height: 100%

        cursor: pointer
        opacity: 0</style>
