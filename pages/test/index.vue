<template>
    <div class="swiper">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="slide in 5"> {{ slide }} </div>
        </div>
        <button class="swiper-button-next" @click="swiper.next()">Next</button>
        <button class="swiper-button-prev" @click="swiper.prev()">Prev</button>
    </div>
    <Loader :height="'100%'" v-if="!loaded" />
</template>

<script lang="ts" setup>
import { Swiper } from '~/plugins/swiper/swiper'

const swiper = ref()
const loaded = ref(false)

onMounted(async () => {
    try {
        const launch = await new Swiper({
            container: ".swiper",
            slideClass: ".swiper-slide",
            slidesPerView: 3,
            padding: 20,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            },
            spaceBetween: 30,
            loop: false,
        })

        swiper.value = launch
    } catch (err) {
        alert(err)
    } finally {
        loaded.value = true
    }
})


</script>

<style lang="scss" scoped>
.swiper {
    color: black !important;

    &-wrapper {
        display: flex;
        align-items: center;
    }

}
</style>