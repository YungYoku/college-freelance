<template>
	<div
		class="avatar"
		:class="[`avatar__${size}`, {
			'avatar__editable': editable && avatar
		}]"
		:style="style"
	>
		<template v-if="avatar">
			<Icon
				v-if="editable"
				class="avatar__icon-remove"
				name="trash"
				size="m"
				@click="removeAvatar"
			/>
		</template>

		<template v-else>
			<template v-if="editable">
				<input
					v-if="editable"
					id="avatar"
					class="avatar__input"
					type="file"
					accept="image/png, image/gif, image/jpeg, image/jpg, image/svg, image/webp, image/avif"
					@input="onImageLoad"
				>

				<Icon
					v-if="editable"
					class="avatar__icon-upload"
					name="upload"
					size="m"
				/>
			</template>

			<Icon
				v-else
				name="user"
				size="s"
			/>
		</template>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

import { Icon } from '@/components/elements'
import { useAuthStore } from '@/stores/auth'
import { Http } from '@/plugins'
import { emptyUser, IUser } from '@/interfaces/User.ts'

interface Props {
	user?: IUser | null | undefined
	self?: boolean
	size?: 'xs' | 's' | 'm' | 'l'
	editable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	user: () => ({ ...emptyUser }),
	self: false,
	size: 'm',
	editable: false
})

const auth = useAuthStore()

const avatar = computed(() => {
	if (props.user && !props.self) {
		if (props.user.avatar) {
			return `${import.meta.env.VITE_API}/files/users/${props.user.id}/${props.user.avatar}`
		}
	} else {
		if (auth.user.avatar) {
			return `${import.meta.env.VITE_API}/files/_pb_users_auth_/${auth.user.id}/${auth.user.avatar}`
		}
	}

	return null
})

const style = computed(() => {
	if (avatar.value) {
		return {
			backgroundImage: `url(${avatar.value})`,
		}
	}
	return {}
})

const loadImage = async (avatar: File | string) => {
	const formData = new FormData()

	formData.append('avatar', avatar)

	const user = await Http.patch<IUser>(`/collections/users/records/${auth.user.id}`, formData)
	auth.setUser(user)
}

const onImageLoad = (event: Event) => {
	const target = event.target as HTMLInputElement
	const file = target?.files?.[0]

	if (file) loadImage(file)
}

const removeAvatar = () => loadImage('')
</script>

<style lang="scss" scoped>
.avatar {
    position: relative;

	display: flex;
	align-items: center;
	justify-content: center;

    overflow: hidden;

    background-color: #444444;
	background-position: center;
	background-size: cover;
    border-radius: 50%;

    &__image {
        max-width: 100%;
        max-height: 100%;
    }

    &__icon-remove,
    &__icon-upload {
        position: absolute;
        top: calc(50% - 15px);
        right: calc(50% - 15px);
        z-index: 2;
    }

	&__icon-upload {
		pointer-events: none;
	}

    &__icon-remove {
        opacity: 0;
        transition: all 0.2s;
    }

    &:hover {
        .avatar__icon-remove {
            opacity: 1;
            transition: all 0.2s;
        }
    }

    &__xs {
        min-width: 16px;
        max-width: 16px;
        min-height: 16px;
        max-height: 16px;
    }

    &__s {
        min-width: 32px;
        max-width: 32px;
        min-height: 32px;
        max-height: 32px;
    }

    &__m {
        min-width: 48px;
        max-width: 48px;
        min-height: 48px;
        max-height: 48px;
    }

    &__l {
        min-width: 160px;
        max-width: 160px;
        min-height: 160px;
        max-height: 160px;
    }

    &__editable {
        &::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;

            width: 100%;
            height: 100%;

            background: transparent;

            transition: all 0.2s;
        }

        &:hover::before {
            background: rgba(68, 68, 68, 0.8);

            transition: all 0.2s;
        }
    }

    &__input {
        position: absolute;
        left: 0;

        width: 100%;
        height: 100%;

        cursor: pointer;
        opacity: 0;
    }
}
</style>
