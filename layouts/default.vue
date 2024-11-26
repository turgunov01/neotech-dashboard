<template>
    <Loader :height="'100%'" v-if="!loader" />
    <div class="wrapper" v-if="!$router.currentRoute.value.path.includes('constructor')">
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
                    <nuxt-link class="mail-links" :to="`/messages/`">
                        <div class="origin mail">
                            <div class="origin-star">
                                <span>
                                    <img src="/assets/icons/navigation/messages.svg" alt="">
                                </span>
                                <p class="nav-item-name">
                                    <span>Сообщения</span>
                                </p>
                            </div>
                            <div class="mail-counter">
                                <img class="mail-tick" src="../assets/tick.svg" alt="">
                                <span>{{ unread.length }}</span>
                            </div>
                        </div>
                        <span>
                            <ul class="sub-menu">
                                <li class="sub-menu-item"
                                    :class="$router.currentRoute.value.path.includes('incoming') ? 'active' : ''">
                                    <nuxt-link :to="`/messages/`">Входящие</nuxt-link>
                                </li>
                                <li class="sub-menu-item"
                                    :class="$router.currentRoute.value.path.includes('outgoing') ? 'active' : ''">
                                    <nuxt-link :to="`/messages/outgoing`">Отправленные</nuxt-link>
                                </li>
                            </ul>
                        </span>
                    </nuxt-link>
                    <nuxt-link :to="`/constructor`">
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
                    <!-- Test -->
                </ul>
                <div class="logout">
                    <button data-type="logout" @click="logout">
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
    <div class="wrapper" v-else>
        <slot />
    </div>
    <PushComponent />
</template>

<script lang="ts" setup>
import Loader from '~/components/Loader.vue';
import PushComponent from '~/components/Notifications/PushComponent.vue';

import { socket } from "~/composables/socket";

const count = ref(0);
const unread = ref([]);

const messages = async () => {
    unread.value = []

    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            "Content-Type": "application/json",
        }
    }

    await apiDataFetch(USER_FETCH_HOST + '/messages/all', options)
        .then(response => response.json())
        .then(async response => {
            const data = await response;

            count.value = data.length;

            data.forEach((item: any) => {
                if (!item.events.read) {
                    unread.value.push(item as never);
                }
            })
        })
}

const loader = ref(true)

const logout = async () => {
    removeStoreData("Authorization")
    removeStoreData("username")
    removeStoreData("password")

    setTimeout(() => {
        location.reload()
    }, 300);
}

socket.on("chat message", async () => {
    count.value = 0;
    await messages();
});

onMounted(async () => {
    const $router = useRouter();
    await messages();

    $router.afterEach(async (to, from) => {
        await messages();
    })


})



onMounted(() => {
    useRouter().afterEach(() => {
        loader.value = false
        setTimeout(() => {
            loader.value = true
        }, 400)
    })

    const url = '../assets/ringtone.mp3';
    const audio = document.createElement("audio");
    audio.src = url;
    audio.volume = 0.5;

    audio.play();

    document.body.appendChild(audio);
})
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

.mail-counter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;

    & span {
        font-size: 1.2rem;
        line-height: 1.6rem;
        font-weight: 500;
        color: white !important;
        background: #18D26B;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 1.2rem;
    }
}
</style>