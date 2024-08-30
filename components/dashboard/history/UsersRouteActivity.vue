<template>
    <div class="hst">
        <div class="hst-layer">
            <div class="hst-layer-container">
                <p class="hst-layer-title">В разработке</p>
            </div>
        </div>

        <div class="hst-container">
            <header class="stats-header">
                <h4 class="stats-heading">Просмотры</h4>
                <!-- <div class="stats-header-buttons">
                    <button class="stats-header-button active">За день</button>
                    <button class="stats-header-button">За месяц</button>
                    <button class="stats-header-button">За год</button>
                </div> -->
            </header>
            <section class="hst-section">
                <div class="hst-heading">
                    <p class="hst-heading-name">Страницы</p>
                    <p class="hst-heading-name">Просмотры</p>
                </div>
                <ul class="hst-list">
                    <li class="hst-item" v-for="(hst, index) in history">
                        <div class="hst-item-info">
                            <img src="/assets/mini-logo.svg" alt="">
                            <p class="hst-item-name">{{ hst.name }}</p>
                        </div>
                        <p class="hst-item-views">{{ hst.views }}</p>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
const history = ref([
    {
        name: "Главная",
        views: 100,
        path: "/",
        origin: "https://neotech.uz",
    },
    {
        name: "О нас",
        views: 100,
        path: "/about",
        origin: "https://neotech.uz",
    },
    {
        name: "Контакты",
        views: 100,
        path: "/contacts",
        origin: "https://neotech.uz",
    },
    {
        name: "Услуги",
        views: 100,
        path: "/services",
        origin: "https://neotech.uz",
    },
    {
        name: "Example Page",
        views: 50,
        path: "/example",
        origin: "https://neotech.uz",
    },
    {
        name: "Blog",
        views: 75,
        path: "/blog",
        origin: "https://neotech.uz",
    },
    {
        name: "Products",
        views: 120,
        path: "/products",
        origin: "https://neotech.uz",
    }
])

</script>

<style lang="scss" scoped>
.stats {
    &-header {
        border-bottom: .1rem solid #e5e5e5;
        padding: 2.4rem;
    }
}

.hst {
    position: relative;
    border: 1px solid #e5e5e5;
    width: 100%;

    &-layer {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        &-container {
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &-title {
            font-size: 32px;
            font-weight: 600;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            text-transform: uppercase;
        }
    }
}
</style>