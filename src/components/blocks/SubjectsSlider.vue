
<template>
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
</template>

<script setup lang="ts">
import { ref } from 'vue'

import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination } from 'swiper/modules'

const modules = [Pagination, Navigation]

const items = ref([
	'Университет', 'Русский язык',
	'Литература', 'История',
	'Обществознание', 'Математика',
	'География', 'ОБЖ',
	'Иностранные языки', 'Физика',
	'Химия', 'Биология',
	'Информатика',
])
</script>

<style scoped lang="scss">
.swiper {
    width: 100%;
    max-width: 1080px;
    height: 75px;

    color: #ffffff;

    background-color: #1a1a1a;
    border-radius: 5px;

    --swiper-theme-color: #ffffff;
    --swiper-pagination-bullet-inactive-color: #e5e5e5;
    --swiper-navigation-size: 25px;

    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;

        font-size: 18px;
        text-align: center;
    }
}
</style>