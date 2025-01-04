<script lang="ts" setup>

</script>

<template>
    <div class="projects">
        <div class="projects-container">
            <header class="projects-header">
                <ul class="projects-header-list">
                    <li class="projects-header-item">
                        <nuxt-link to="/projects" class="projects-header-link title">Сайты</nuxt-link>
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
            <slot />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.projects {
    &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2rem 1.5rem;
        background: black;

        &-list {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2rem;
        }

        &-link {
            background: unset;
            color: white;

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
