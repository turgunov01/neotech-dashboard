<template>
    <div class="mail" v-if="loaded">
        <div class="mail-container">
            <aside class="mail-sidebar">
                <div class="sidebar-conf">
                    <div class="sidebar-params">
                        <h2 class="sidebar-params-title"> Отправленные </h2>
                    </div>
                    <ul class="sidebar-list">
                        <li class="sidebar-item" v-for="(data, index) in messages" :style="{
                            display: (data as any).from.message ? 'block' : 'none'
                        }" v-bind:class="(data as any).events.read ? 'read' : ''"
                            :data-type="`${(data as any).id}-message`"
                            :class="(data as any).id == $router.currentRoute.value.params.id ? 'active' : ''">
                            <nuxt-link :to="`/messages/outgoing/${(data as any).id}`">
                                <h4 class="sidebar-item-message"> {{ (data as any).from.message }} </h4>
                                <h6 class="sidebar-item-author">
                                    {{ (data as any).from.name + " " + (data as any).from.surname }}
                                </h6>
                                <p class="sidebar-item-date"> {{ formatTimestamp((data as any).database.date) }} </p>
                            </nuxt-link>
                            <img src="../../../assets/star-in.svg" class="sidebar-item-star"
                                :class="(data as any).events.liked ? 'active' : ''" alt="">
                            <span></span>
                        </li>
                    </ul>
                </div>
            </aside>
            <section class="mail-section">
                <span class="mail-favorite" @click="like" v-if="(selectedMessage as any).events.liked">
                    <img src="../../../assets/star-in.svg" alt="">
                    <p class="mail-favorite-heading">В избранных</p>
                </span>
                <span class="mail-favorite" @click="like" v-else>
                    <img src="../../../assets/star.svg" alt="">
                    <p class="mail-favorite-heading">Добавить в избранные</p>
                </span>
                <div class="mail-content" v-if="selectedMessage">
                    <div class="mail-params">
                        <div class="mail-user-data">
                            <h4 class="mail-user-data-text">
                                {{ (selectedMessage as any).to.name + " " + (selectedMessage as any).to.surname }}
                            </h4>
                            <span>/</span>
                            <h4 class="mail-user-data-text"> {{ (selectedMessage as any).to.email }} </h4>
                            <span>/</span>
                            <h4 class="mail-user-data-text"> {{ (selectedMessage as any).to.phone }} </h4>
                        </div>
                        <p class="mail-user-date">
                            {{ formatTimestamp((selectedMessage as any).database.date) }}
                        </p>
                    </div>
                    <div class="mail-message">
                        <div class="mail-message-box" v-html="(selectedMessage as any).to.message"></div>
                    </div>
                    <div class="mail-message reply">
                        <span class="reply-span">
                            <img src="/assets/icons/mailbox/reply.svg" alt="">
                            <div class="mail-user-data">
                                <h4 class="mail-user-data-text"> {{ (selectedMessage as any).from.name + " " +
                                    (selectedMessage as any).from.surname }} </h4>
                                <span>/</span>
                                <h4 class="mail-user-data-text"> {{ (selectedMessage as any).from.email }} </h4>
                                <span>/</span>
                                <h4 class="mail-user-data-text"> {{ (selectedMessage as any).from.phone }}
                                </h4>
                            </div>
                        </span>

                        <div class="mail-message">
                            <div class="mail-message-box" v-html="(selectedMessage as any).from.message"></div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FailedAlert, PushNotification } from '~/composables/Notification/list';


const loaded = ref(false);

const $router = useRouter()
const messages = ref([])

const selectedMessage = ref({});

const request = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('Authorization')}`,
        }
    }

    await apiDataFetch(USER_FETCH_HOST + "/messages/all", options)
        .then(response => response.json())
        .then(response => {
            const data = response;
            data.forEach((item: any) => {
                if (item.to.name && item.to.surname) {
                    messages.value.push(item as never)
                }

                if (item.id == $router.currentRoute.value.params.id) {
                    selectedMessage.value = item;
                }
            });
        })

    options.method = "PATCH";
    options.headers["Authorization"] = `Bearer ${localStorage.getItem('Authorization')}`

    await apiDataFetch(USER_FETCH_HOST + "/messages/read/" + $router.currentRoute.value.params.id, options)
}

function formatTimestamp(timestamp: string) {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const year = String(date.getFullYear()).slice(-2); // Get last two digits of the year
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

const like = async () => {
    const options = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('Authorization')}`,
        }
    }

    await apiDataFetch(USER_FETCH_HOST + "/messages/like/" + $router.currentRoute.value.params.id, options)
        .then(response => response.json())
        .then(response => {
            const data = response;
            if (data.error) return FailedAlert(data.error);
            PushNotification(data.message)
        })
}

onMounted(async () => {
    await request();
    loaded.value = true;

})

</script>

<style scoped lang="scss">
.mail-favorite {
    cursor: pointer;
}
</style>