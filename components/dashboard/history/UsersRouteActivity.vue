<template>
    <div class="hst">
        <div class="hst-container">
            <header class="stats-header">
                <h4 class="stats-heading">Просмотры</h4>
                <div class="stats-header-buttons">
                    <button class="stats-header-button active">За день</button>
                    <button class="stats-header-button">За месяц</button>
                    <button class="stats-header-button">За год</button>
                </div>
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

</style>