
<template>
    <Modal>
        <swiper
            :slides-per-view="4"
            :space-between="30"
            :navigation="true"
            :pagination="{
                clickable: true
            }"
            :modules="modules"
            class="mySwiper"
        >
            <swiper-slide
                v-for="(item, index) in items"
                :key="index"
            >
                {{ item }}
            </swiper-slide>
        </swiper>
    </Modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

import Modal from '@/components/structures/Modal.vue'

const modules = [Pagination, Navigation]

const items = ref([
    'Университет','Русский язык',
    'Литература','История',
    'Обществознание','Математика',
    'География','ОБЖ',
    'Иностранные языки','Физика',
    'Химия', 'Биология',
    'Информатика',
])
</script>

<style scoped lang="sass">
.swiper
    width: 1000px
    height: 75px

    color: black

    background-color: #4b525c

    .swiper-button-prev::after,
    .swiper-button-next::after
        content: ''
    --swiper-theme-color: black
    --swiper-navigation-size: 25px
.swiper-button-prev, .swiper-button-next
    right: var(--swiper-navigation-sides-offset, 0px)

.swiper-pagination
    bottom: var(--swiper-pagination-bottom, -5px)
.swiper-pagination-bullet
    background-color: #333

.swiper-slide
    display: flex
    justify-content: center
    align-items: center

    font-size: 18px
    text-align: center</style>