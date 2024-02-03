<template>
    <div
        class="avatar"
        :class="[`avatar__${size}`, {
            'avatar__editable': editable && avatar
        }]"
    >
        <Image
            v-if="avatar"
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
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { useAuthStore } from '@/stores/auth'
import { User } from '@/interfaces/User.ts'
import http from '@/plugins/http'
import Image from '@/components/elements/Image.vue'

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

const handleImage = async (avatar: File) => {
    console.log(avatar)
    const formData = new FormData()

    formData.append('avatar', avatar)

    
    const user = await http.patch<User>(`/collections/users/records/${auth.user.id}`, formData)
    auth.setUser(user)
}

const onImageLoad = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target?.files?.[0]

    if (file) handleImage(file)
}
</script>

<style lang="sass" scoped>
.avatar
    position: relative
    border-radius: 50%
    overflow: hidden
    background: #333333

    img
        max-width: 100%
        max-height: 100%

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
            width: 100%
            height: 100%
            position: absolute
            left: 0
            top: 0
            z-index: 1
            background: transparent
            transition: all 0.2s

        &:hover::before
            background: #333333
            transition: all 0.2s

    &__input
        width: 100%
        height: 100%
        opacity: 0
        cursor: pointer
</style>
