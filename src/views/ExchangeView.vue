<template>
    <DefaultLayout>
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
    </DefaultLayout>
</template>

<script setup lang="ts">
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import Modal from '@/components/structures/Modal.vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Pagination, Navigation } from 'swiper/modules'
import { ref } from 'vue'

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
    background-color: #4b525c 
    color: black

    .swiper-button-prev::after, .swiper-button-next::after
        content:''
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
