<script lang="ts" setup>
import icon from '@/assets/tick.svg'

</script>

<template>
    <div class="projects">
        <div class="projects-container">
            <header class="projects-header">
                <ul class="projects-header-list back">
                    <li class="projects-header-item">
                        <nuxt-link to="/" class="projects-header-link back">
                            <img :src="icon" alt="">
                        </nuxt-link>
                    </li>
                    <li class="projects-header-item">
                        <nuxt-link to="/projects" class="projects-header-link title">Страницы</nuxt-link>
                    </li>
                </ul>
                <ul class="projects-header-list">
                    <li class="projects-header-item">
                        <nuxt-link to="/projects" class="projects-header-link primary">Тарифный план</nuxt-link>
                    </li>
                    <li class="projects-header-item">
                        <nuxt-link to="/projects" class="projects-header-link">Оплата</nuxt-link>
                    </li>
                    <li class="projects-header-item">
                        <nuxt-link to="/projects" class="projects-header-link">
                            <ui-avatar :class="'avatar-user'" />
                        </nuxt-link>
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

        &-list {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2rem;

            &.back {
                gap: 1rem;
            }

        }

        &-link {
            background: unset;
            color: white;

            &.back {
                background: rgba(255, 255, 255);
                border-radius: .4rem;
                width: 3rem;
                height: 3rem;
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
                width: 4rem;
                height: 4rem;
                border-radius: 50%;
                border: 1px solid white;
                overflow: hidden;

                & img {
                    object-fit: cover;
                }
            }
        }
    }
}
</style>
