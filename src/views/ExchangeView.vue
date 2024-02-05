<template>
    <DefaultLayout>
        <Modal>
            <swiper
                :slides-per-view="4"
                :space-between="30"
                :navigation="true"
                :pagination="{
                    clickable: true,
                }"
                :modules="modules"
                class="mySwiper"
            >
                <swiper-slide>Университет</swiper-slide>    
                <swiper-slide>Русский язык</swiper-slide>
                <swiper-slide>Литература</swiper-slide>
                <swiper-slide>История</swiper-slide>
                <swiper-slide>Обществознание</swiper-slide>
                <swiper-slide>Математика</swiper-slide>
                <swiper-slide>География</swiper-slide>
                <swiper-slide>ОБЖ</swiper-slide>
                <swiper-slide>Иностранные языки</swiper-slide>
                <swiper-slide>Физика</swiper-slide>
                <swiper-slide>Химия</swiper-slide>
                <swiper-slide>Биология</swiper-slide>
                <swiper-slide>Информатика</swiper-slide>
            </swiper>
        </Modal>
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import Modal from '@/components/structures/Modal.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'

const modules = [Pagination, Navigation]
</script>

<style scoped lang="sass">
.swiper
    width: 1000px
    height: 75px
    background-color: #4b525c 
    color: black

    @at-root .swiper-button-prev::after, .swiper-button-next::after
    --swiper-theme-color: black
    --swiper-navigation-size: 25px
.swiper-button-prev, .swiper-button-next
    right: var(--swiper-navigation-sides-offset, 0px)

.swiper-pagination
    bottom: var(--swiper-pagination-bottom, -5px)
.swiper-pagination-bullet
    background-color: #333

.swiper-slide 
    text-align: center
    font-size: 18px
    display: flex
    justify-content: center
    align-items: center
</style>
