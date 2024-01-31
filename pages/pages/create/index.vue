<template>
    <div class="create">
        <div class="create-wrapper">
            <h1 class="create-wrapper-title">Новая страница</h1>
            <p class="create-wrapper-description">Выберите подходящий шаблон и адаптируйте его под ваши цели.</p>
            <ul class="create-wrapper-list">
                <li class="create-wrapper-item">
                    <button class="template-logout" @click.prevent="$router.back()">
                        <img src="../../../src/assets/images/sidebar-icons/lougout.svg" class="template-back" alt="">
                        <p class="template-logout-name">Назад</p>
                    </button>
                </li>
                <li class="create-wrapper-item">
                    <nuxt-link class="template" to="/pages/template/1">
                        <div class="template-image">
                            <img src="https://static.tildacdn.com/tild3362-3062-4931-a666-343865323534/tpl_bu_universal_0_r.jpg"
                                alt="">
                        </div>
                        <div class="template-text">
                            <h4 class="template-name">
                                Тема Light
                            </h4>
                            <p class="template-description">Универсальная страница для бизнеса. Понятная структура, подходит
                                для больших текстов и списков</p>
                        </div>
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>
<script setup lang="ts">
const $router = useRouter()
const meta = definePageMeta({
    layout: "pages"
})
</script>
<style lang="scss" scoped>
.create {
    &-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        max-width: 128rem;
        margin: 0 auto;
        row-gap: 1rem;
        width: 100%;

        &-title {
            font-size: 6.4rem;
            font-weight: 200;
            line-height: 120%;
        }

        &-description {
            font-size: 2.4rem;
            line-height: 120%;
            font-weight: 300;
        }

        &-list {
            display: flex;
            align-items: center;
            width: 100%;
            margin-top: 2rem;
            gap: 1rem;
            flex-wrap: wrap;
        }

        &-item {
            max-width: calc(100% / 3 - 1rem);
            width: 100%;
            height: 39rem;
            max-height: 39rem;
            box-shadow: 0 1px 6px #eee;
        }
    }
}

.template {
    &-image {
        max-height: 30rem;
        overflow: hidden;
        width: 100%;
        cursor: zoom-in;
        transition: 1s;


        & img {
            object-fit: cover;
            width: 100%;
            transition: 10s;
            height: 100%;

            &:hover {
                transform: translateY(-65%);
            }
        }
    }

    &-logout {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: row-reverse;
        gap: 1.5rem;
        width: 100%;
        height: 100%;
        background: unset;
        border: none;
        transform: rotate(-180deg);

        & img {
            width: 4rem;
            height: 4rem;
        }

        &-name {
            font-size: 3rem;
            line-height: 120%;
            color: #000;
            opacity: 0.7;
            transform: rotate(-180deg);
        }
    }

    &-text {
        color: #000;
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        row-gap: 1rem;
        border-top: .1rem solid #e5e5e5;
        border-bottom: .1rem solid #e5e5e5;
    }

    &-name {
        font-size: 1.4rem;
        font-weight: 600;
        line-height: 120%;
    }

    &-description {
        font-size: 1.3rem;
        font-weight: 400;
        line-height: 120%;
        opacity: 0.7;
    }
}
</style>