<template>
    <div class="mail">
        <div class="mail-container">
            <aside class="mail-sidebar">
                <div class="sidebar-conf">
                    <div class="sidebar-params">
                        <h2 class="sidebar-params-title"> Входящие </h2>
                    </div>
                    <div class="sidebar-items">
                        <ul class="sidebar-list">
                            <li class="sidebar-item" v-for="(data, index) in messages" :style="{
                                display: data.to.name || data.to.surname ? 'none' : 'block'
                            }" :class="$router.currentRoute.value.params.id == data.id ? 'active' : ''"
                                v-bind:class="data.events.read ? 'read' : ''">
                                <nuxt-link :to="`/messages/incoming/${data.id}`">
                                    <h4 class="sidebar-item-message"> {{ data.from.message }} </h4>
                                    <h6 class="sidebar-item-author"> {{ data.from.name + " " + data.from.surname }}
                                    </h6>
                                    <p class="sidebar-item-date"> {{ formatTimestamp(data.database.date) }} </p>
                                </nuxt-link>
                                <img src="../../../assets/star-in.svg" class="sidebar-item-star"
                                    :class="data.events.liked ? 'active' : ''" alt="">
                            </li>
                        </ul>
                    </div>
                </div>
            </aside>
            <section class="mail-section" v-if="loaded">
                <span class="mail-favorite" @click="like()" v-if="(selectedMessage as any).events.liked">
                    <img src="../../../assets/star-in.svg" alt="">
                    <p class="mail-favorite-heading">В избранных</p>
                </span>
                <span class="mail-favorite" @click="like()" v-else>
                    <img src="../../../assets/star.svg" alt="">
                    <p class="mail-favorite-heading">Добавить в избранные</p>
                </span>
                <div class="mail-content">
                    <div class="mail-params">
                        <div class="mail-user-data">
                            <h4 class="mail-user-data-text"> {{ (selectedMessage as any).from.name + " " +
                                (selectedMessage as any).from.surname }} </h4>
                            <span>/</span>
                            <h4 class="mail-user-data-text"> {{ (selectedMessage as any).from.email }} </h4>
                            <span v-if="(selectedMessage as any).from.email">/</span>
                            <h4 class="mail-user-data-text"> {{ (selectedMessage as any).from.phone }} </h4>
                            <span v-if="(selectedMessage as any).from.phone">/</span>
                        </div>
                        <p class="mail-user-date">
                            {{ formatTimestamp((selectedMessage as any).database.date) }}
                        </p>
                    </div>
                    <div class="mail-message">
                        <div class="mail-message-box" v-html="(selectedMessage as any).from.message"></div>
                    </div>
                    <div class="mail-message reply">
                        <span class="reply-span">
                            <img src="/assets/icons/mailbox/reply.svg" alt="">
                            <p class="replied-person">
                                Новое обращение к пользователю <b>{{ (selectedMessage as any).from.name + " " +
                                    (selectedMessage as any).from.surname }}</b>
                            </p>
                        </span>
                        <textarea name="mail-reply" id="mail-reply" v-model="currentMessage.message" cols="30"
                            rows="10">Новое обращение пользователю {{ (currentMessage as any).email }}</textarea>
                    </div>
                    <button class="mail-send" @click="reply()" :style="{
                        'cursor': !(selectedMessage as any).from.email ? 'not-allowed' : 'pointer'
                    }">Отправить</button>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { FailedAlert, PushNotification } from '~/composables/Notification/list';

const loaded = ref(false);

const $router = useRouter();
const messages = ref([] as any)

const currentMessage = ref({
    message: 'Новое обращение от администратора',
    type: 2,
    phone: '+998 71 201 22 22',
    reply_to: null,
    user: 'Neotech Support Team',
    liked: 0,
    email: 'support@neotech.uz',
});

const selectedMessage = ref({})

const request = async () => {
    const options = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`
        }
    }
    const read = await apiDataFetch(USER_FETCH_HOST + "/messages/read/" + $router.currentRoute.value.params.id, options);

    await apiDataFetch(USER_FETCH_HOST + "/messages/all", { method: "GET", headers: { Authorization: `Bearer ${localStorage.getItem("Authorization")}` } })
        .then(response => response.json())
        .then(response => {
            const data = response;
            data.forEach((item: any) => {
                messages.value.push(item);
            })


            selectedMessage.value = data.find((item: any) => item.id == $router.currentRoute.value.params.id);
            console.log(selectedMessage.value);
        })

}

function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}:${month}:${year} ${hours}:${minutes}:${seconds}`;
}

const like = async () => {
    const id = $router.currentRoute.value.params.id;
    const options = {
        method: "PATCH",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`
        }
    }

    await apiDataFetch(USER_FETCH_HOST + "/messages/like/" + id, options)
        .then(response => response.json())
        .then(response => {
            const data = response;
            if (data.error) {
                FailedAlert(data.error);
            }

            PushNotification(data.message);
        })
}

const reply = async () => {
    const options = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`
        },
        body: JSON.stringify({
            message: currentMessage.value.message
        })
    };


    await apiDataFetch(USER_FETCH_HOST + "/messages/app/" + $router.currentRoute.value.params.id, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: currentMessage.value.message
        })
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.error) {
                return FailedAlert(result.error);
            }

            PushNotification(result.message);
        })
        .catch((error) => console.error(error));
}

onMounted(async () => {
    await request();
    loaded.value = true;
})

</script>

<style scoped lang="scss"></style>