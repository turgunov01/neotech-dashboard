<script lang="ts" setup>
import icon from '@/assets/tick.svg';

const $router = useRouter();
const page = ref({});
const params = ref({
    path: $router.currentRoute.value.path,
    project_id: $router.currentRoute.value.params.project_id,
})

onMounted(() => {

})

</script>

<template>
    <div class="projects">
        <div class="projects-container">
            <header class="projects-header">
                <ul class="projects-header-list back">
                    <li class="projects-header-item">
                        <nuxt-link :to="`/projects/${params.project_id}/pages`">
                            Страницы
                        </nuxt-link>
                    </li>
                    <li class="projects-header-item">
                        <nuxt-link to="#" class="projects-header-link">
                            Товары
                        </nuxt-link>
                    </li>
                    <li class="projects-header-item">
                        <nuxt-link to="#" class="projects-header-link">
                            Заявки
                        </nuxt-link>
                    </li>
                    <li class="projects-header-item">
                        <nuxt-link to="#" class="projects-header-link">
                            Аналитика
                        </nuxt-link>
                    </li>
                    <li class="projects-header-item">
                        <nuxt-link to="#" class="projects-header-link">
                            Настройки
                        </nuxt-link>
                    </li>
                </ul>
                <ul class="projects-header-list">
                    <li class="projects-header-item">
                        <nuxt-link to="#" class="projects-header-link primary">Тарифный план</nuxt-link>
                    </li>
                    <li class="projects-header-item">
                        <nuxt-link to="#" class="projects-header-link">Оплата</nuxt-link>
                    </li>
                    <li class="projects-header-item">
                        <nuxt-link to="#" class="projects-header-link">
                            <ui-avatar :class="'avatar-user'" />
                        </nuxt-link>
                    </li>
                </ul>
            </header>
            <header class="projects-header sub">
                <ul class="projects-header-list">
                    <li class="projects-header-item">
                        <span>Окна</span>
                    </li>
                    <li class="projects-header-item">
                        <span>Шрифты</span>
                    </li>
                    <li class="projects-header-item">
                        <span>Код</span>
                    </li>
                </ul>
                <ul class="projects-header-list buttons">
                    <li class="projects-header-item">
                        <button class="projects-header-button save">Сохранить</button>
                    </li>
                    <li class="projects-header-item">
                        <button class="projects-header-button publish">Опубликовать</button>
                    </li>
                </ul>
            </header>
            <main class="projects-sections">
                <slot />
            </main>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.projects {
    &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: .5rem 1rem;
        background: black;
        height: 4rem;

        &.sub {
            height: 100%;
            padding: 1rem;
        }

        &:not(:last-of-type) {
            border-bottom: .1rem solid #5a5a5a;
        }

        &-item {
            transition: 300ms;
            opacity: 0.7;
            background: unset;
            height: 100%;
            padding: 0 1rem;

            & span {
                color: #ffffff !important;
                cursor: pointer;
            }

            &:hover {
                opacity: 1;
            }
        }

        &-list {
            display: flex;
            align-items: center;
            justify-content: center;

            &.buttons {
                gap: 0;

                & li {
                    padding: 0 .5rem;
                }
            }

        }

        &-link {
            background: unset;
            color: white;

            &.back {
                background: rgba(255, 255, 255);
                border-radius: .4rem;
                width: 2rem;
                height: 2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                transform: rotate(90deg);
            }

            &.title {
                font-size: 2.4rem;
            }

            &.primary {
                color: gold;
            }

            & .avatar-user {
                width: 3rem;
                height: 3rem;
                border-radius: 50%;
                border: 1px solid white;
                overflow: hidden;

                & img {
                    object-fit: cover;
                }
            }
        }

        &-button {
            color: white;
            border-radius: 2.4rem;
            padding: 1rem 2rem;

            &.save {
                background: #5a5a5a;
            }

            &.publish {
                background: #4caf50;
            }
        }
    }

}
</style>
