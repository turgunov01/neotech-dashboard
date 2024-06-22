<template>
    <div class="constructor">
        <nav class="nav">
            <Loader :height="'7rem'" v-if="loaded" />
            <div class="nav-media" :style="{
                opacity: !loaded ? '1' : '0',
                transition: '1s'
            }">
                <img src="/assets/mini-logo.svg" class="nav-media-logo" alt="">
                <div class="nav-media-router" @click="$router.back()">
                    <img src="/assets/tick.svg" alt="">
                </div>
                <input type="text" placeholder="Neotech Веб-сайт" value="Neotech Веб-сайт">
            </div>
            <div class="nav-event">
                <div class="backward">
                    <img src="/assets/constructor/backward.svg" alt="">
                </div>
                <div class="forward">
                    <img src="/assets/constructor/forward.svg" alt="">
                </div>
                <div class="frame" @click="iframe(true)">
                    <img src="/assets/constructor/play.svg" alt="">
                </div>
                <button class="frame publish" @click="load" style="position: relative;">
                    <Loader :height="'100%'" :curved="'.8rem'" v-if="clicked" />
                    Опубликовать
                </button>
            </div>
        </nav>
        <div class="main">
            <div class="wrapper" style="margin-top: 0 !important;">
                <aside class="aside" style="position: relative;">
                    <ConstructorSidebarElements />
                </aside>
                <div class="demo">
                    <div class="demo-page">
                        <div class="demo-container">
                            <Constructor />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="mirror" v-if="showFrame" @click.self="showFrame = false">
        <iframe src="http://constructor.neotech.uz/" class="mirror-player" frameborder="0" allowfullscreen></iframe>
    </div>

</template>

<script lang="ts" setup>
import Constructor from '~/components/Constructor.vue';
import ConstructorSidebarElements from '../../components/Models/ConstructorSidebarElements.vue'

import 'grapesjs/dist/css/grapes.min.css';

const loaded = ref(false)
const clicked = ref(false)

const showFrame = ref(false)

const load = () => {
    clicked.value = true;

    setTimeout(() => {
        clicked.value = false
        location.reload()
    }, 1500);
}

const iframe = (bool: Boolean) => {
    showFrame.value = true
}



onMounted(async () => {
    loaded.value = true

    try {
        await init()
    } catch (err) {
        alert(err)
    } finally {
        setTimeout(() => {
            loaded.value = false
        }, 100);
    }
})


</script>


<style scoped lang="scss">
h1,
h2,
h3,
h4,
h5,
h6,
p,
span {
    color: #344054 !important;
}

.demo-container {
    width: 100% !important;
}

.wrapper {
    display: flex;
}


.mirror {
    width: 100%;
    max-width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;

    &-player {
        width: 95vw;
        max-width: 1728px;
        height: 80vh;
        border-radius: .8rem
    }
}
</style>