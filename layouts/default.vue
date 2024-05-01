<template>
    <div class="wrapper">
        <div class="nav-wrapper">
            <div class="nav">
                <div class="nav-logo">
                    <nuxt-link to="/">
                        <img src="/assets/icons/logo.svg" alt="">
                    </nuxt-link>
                </div>
                <ul class="nav-list">
                    <nuxt-link :to="`/`">
                        <span>
                            <img src="/assets/icons/navigation/stats.svg" alt="">
                        </span>
                        <p class="nav-item-name">Дашбоард</p>
                    </nuxt-link>
                    <nuxt-link class="mail-links" :to="`/mail/`">
                        <div class="origin mail">
                            <div class="origin-star">
                                <span>
                                    <img src="/assets/icons/navigation/messages.svg" alt="">
                                </span>
                                <p class="nav-item-name">Сообщения</p>
                            </div>
                            <img class="mail-tick" src="../assets/tick.svg" alt="">
                        </div>
                        <span>
                            <ul class="sub-menu">
                                <li class="sub-menu-item"
                                    :class="$router.currentRoute.value.path.includes('incoming') ? 'active' : ''">
                                    <nuxt-link :to="`/mail`">Входящие</nuxt-link>
                                </li>
                                <li class="sub-menu-item"
                                    :class="$router.currentRoute.value.path.includes('outgoing') ? 'active' : ''">
                                    <nuxt-link :to="`/mail/outgoing`">Отправленные</nuxt-link>
                                </li>
                            </ul>
                        </span>
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
                </ul>
                <div class="logout">
                    <button data-type="logout">
                        <span>
                            <img src="/assets/icons/navigation/logout.svg" alt="">
                        </span>
                        <p class="nav-item-name">Выйти</p>
                    </button>
                </div>
            </div>
        </div>
        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>


</script>

<style scoped lang="scss">
.wrapper {
    display: flex;
    align-items: flex-start;

}

.origin {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    &-star {
        display: flex;
        align-items: center;
        gap: .8rem;
    }

    &>img {
        transform: rotate(-90deg);
        transition: 300ms;
    }

}

.content {
    padding: 3rem;
    width: 100%;
    max-width: 100%;
}
</style>