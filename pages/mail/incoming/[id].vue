<template>
    <div class="mail">
        <div class="mail-container">
            <aside class="mail-sidebar">
                <div class="sidebar-conf">
                    <div class="sidebar-params">
                        <h2 class="sidebar-params-title"> Входящие </h2>
                    </div>
                    <ul class="sidebar-list" v-for="(data, index) in messages">
                        <li class="sidebar-item" :class="routeId === data.id ? 'active' : ''" v-if="data.type === 1">
                            <nuxt-link :to="`${data.id}`" v-if="data.type === 1">
                                <h4 class="sidebar-item-message"> {{ data.message }} </h4>
                                <h6 class="sidebar-item-author"> {{ data.user }} </h6>
                                <p class="sidebar-item-date"> {{ data.date.replace(/\./g, '/') }} </p>
                            </nuxt-link>
                            <img src="../../../assets/star-in.svg" class="sidebar-item-star"
                                :class="data.liked === true ? 'active' : ''" alt="">
                        </li>
                    </ul>
                </div>
            </aside>
            <section class="mail-section">
                <span class="mail-favorite" @click="like()" v-if="(selectedMessage as any).liked == true">
                    <img src="../../../assets/star-in.svg" alt="">
                    <p class="mail-favorite-heading">В избранных</p>
                </span>
                <span class="mail-favorite" @click="like()"
                    v-else-if="(selectedMessage as any).liked == false || !(selectedMessage as any).liked">
                    <img src="../../../assets/star.svg" alt="">
                    <p class="mail-favorite-heading">Добавить в избранные</p>
                </span>
                <div class="mail-content">
                    <div class="mail-params">
                        <div class="mail-user-data">
                            <h4 class="mail-user-data-text"> {{ (selectedMessage as any).user }} </h4>
                            <span v-if="selectedMessage.email">/</span>
                            <h4 class="mail-user-data-text"> {{ (selectedMessage as any).email }} </h4>
                            <span>/</span>
                            <h4 class="mail-user-data-text"> {{ (selectedMessage as any).phone }} </h4>
                        </div>
                        <p class="mail-user-date">
                            {{ (selectedMessage as any).date }}
                        </p>
                    </div>
                    <div class="mail-message">
                        <div class="mail-message-box" v-html="(selectedMessage as any).message"></div>
                    </div>
                    <div class="mail-message reply">
                        <span class="reply-span">
                            <img src="/assets/icons/mailbox/reply.svg" alt="">
                            <p class="replied-person">
                                Новое обращение к пользователю <b>{{ (selectedMessage as any).user }}</b>
                            </p>
                        </span>
                        <textarea name="mail-reply" id="mail-reply" v-model="currentMessage.message" cols="30"
                            rows="10">Новое обращение пользователю {{ (currentMessage as any).user }}</textarea>
                    </div>
                    <button class="mail-send" @click="adminSend()" :style="{
                        'cursor': !selectedMessage.email ? 'not-allowed' : 'pointer'
                    }">Отправить</button>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

interface Message {
    id: number,
    date: string,
    message: string,
    type: number,
    phone: string,
    reply_to: number | null,
    user: string,
    liked?: boolean | null,
    email?: string | null,
}

const $router = useRouter();
const routeId = parseInt($router.currentRoute.value.params.id as string);
const messages = ref([] as Message[]);
const selectedMessage = ref({} as Message);
const currentMessage = ref({
    message: 'Новое обращение от администратора',
    type: 2,
    phone: '+998 71 201 22 22',
    reply_to: null,
    user: 'Neotech Support Team',
    liked: null,
    email: 'support@neotech.uz',
} as Message);

const request = async () => {

    await apiDataFetch(`${uri}/messages/all`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("Authorization")
        },
    })
        .then(response => response.json())
        .then(async response => {
            const data = response.data;

            data.forEach((msg: Message) => {
                messages.value.push(msg);

                if (msg.id === parseInt($router.currentRoute.value.params.id as any)) {
                    selectedMessage.value = msg;
                    console.log(selectedMessage.value);
                }
            })
        })
}

const like = async () => {
    const options = {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("Authorization")}`,
            "Content-type": "application/json"
        }
    }

    await apiDataFetch(`${uri}/messages/like/${selectedMessage.value.id}`, options)
        .then(response => response.json())
        .then(response => {
            if (response.message) { return response.message }
            setTimeout(() => {
                location.reload();
            }, 1000);
        })
}

function truncate(str: string, length: number, suffix = '...') {
    if (str.length > length) {
        return str.slice(0, length) + suffix;
    }
    return str;
}

const adminSend = async () => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("Authorization")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message: currentMessage.value.message
        })
    }

    await apiDataFetch(`${uri}/messages/app/${$router.currentRoute.value.params.id}`, options)
        .then(response => response.json())
        .then(response => {

        })
}



onMounted(async () => {
    await request();
})

</script>

<style scoped lang="scss"></style>