<template>
    <div class="nav">
        <div class="nav-logo">
            <nuxt-link to="/">
                <img src="/assets/icons/logo.svg" alt="">
            </nuxt-link>
        </div>
        <ul class="nav-list">
            <li class="nav-item">
                <nuxt-link :to="`/`">
                    <span>
                        <img src="/assets/icons/navigation/stats.svg" alt="">
                    </span>
                    <p class="nav-item-name">Дашбоард</p>
                </nuxt-link>
                <nuxt-link :to="`/mail`">
                    <span>
                        <img src="/assets/icons/navigation/messages.svg" alt="">
                    </span>
                    <p class="nav-item-name">Сообщения</p>
                </nuxt-link>
                <nuxt-link :to="`/pages`">
                    <span>
                        <img src="/assets/icons/navigation/pages.svg" alt="">
                    </span>
                    <p class="nav-item-name">Страницы</p>
                </nuxt-link>
                <nuxt-link :to="`/me`">
                    <span>
                        <img src="/assets/icons/navigation/user.svg" alt="">
                    </span>
                    <p class="nav-item-name">Профиль</p>
                </nuxt-link>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup></script>

<style scoped lang="scss"></style>