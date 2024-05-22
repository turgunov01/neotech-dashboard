<template>
    <div class="constructor">
        <nav class="nav">
            <div class="nav-media">
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
                <div class="frame demo">
                    <img src="/assets/constructor/play.svg" alt="">
                </div>
                <button class="frame publish">
                    Опубликовать
                </button>
            </div>
        </nav>
        <div class="main">
            <div class="wrapper">
                <aside class="aside">
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

</template>

<script lang="ts" setup>
import Constructor from '~/components/Constructor.vue';
import ConstructorSidebarElements from '../../components/Models/ConstructorSidebarElements.vue'

import 'grapesjs/dist/css/grapes.min.css';



onMounted(async () => {
    GrapesInit()
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
</style>