<template>
    <div class="mail">
        <div class="mail-container">
            <aside class="mail-sidebar">
                <div class="sidebar-conf">
                    <div class="sidebar-params">
                        <h2 class="sidebar-params-title"> Отправленные </h2>
                    </div>
                    <ul class="sidebar-list">
                        <li class="sidebar-item" :style="{
                            display: data.type != 2 ? 'none' : 'block'
                        }" :class="routeId == data.id ? 'active' : ''" :data-type="`${data.type}-messages`"
                            v-for="data in messages">
                            <nuxt-link :to="`${data.id}`" v-if="data.type === 2">
                                <h4 class="sidebar-item-message"> {{ data.message }} </h4>
                                <h6 class="sidebar-item-author"> {{ data.user }} </h6>
                                <p class="sidebar-item-date"> {{ data.date }} </p>
                            </nuxt-link>
                            <img src="../../../assets/star-in.svg" class="sidebar-item-star"
                                :class="data.liked == true ? 'active' : ''" alt="">
                        </li>
                    </ul>
                </div>
            </aside>
            <section class="mail-section">
                <span class="mail-favorite" @click="like" v-if="selectedMessage.liked == true">
                    <img src="../../../assets/star-in.svg" alt="">
                    <p class="mail-favorite-heading">В избранных</p>
                </span>
                <span class="mail-favorite" @click="like"
                    v-else-if="selectedMessage.liked == false || !selectedMessage.liked">
                    <img src="../../../assets/star.svg" alt="">
                    <p class="mail-favorite-heading">Добавить в избранные</p>
                </span>
                <div class="mail-content" v-if="selectedMessage">
                    <div class="mail-params">
                        <div class="mail-user-data">
                            <h4 class="mail-user-data-text"> {{ (selectedMessage as Message).user }} </h4>
                            <span v-if="selectedMessage.email">/</span>
                            <h4 class="mail-user-data-text"> {{ (selectedMessage as Message).email }} </h4>
                            <span>/</span>
                            <h4 class="mail-user-data-text"> {{ (selectedMessage as Message).phone }} </h4>
                        </div>
                        <p class="mail-user-date">
                            {{ (selectedMessage as Message).date }}
                        </p>
                    </div>
                    <div class="mail-message">
                        <div class="mail-message-box" v-html="(selectedMessage as Message).message"></div>
                    </div>
                    <div class="mail-message reply">
                        <span class="reply-span">
                            <img src="/assets/icons/mailbox/reply.svg" alt="">
                            <div class="mail-user-data">
                                <h4 class="mail-user-data-text"> {{ (currentMessage as Message).user }} </h4>
                                <span>/</span>
                                <h4 class="mail-user-data-text"> {{ (currentMessage as Message).email }}
                                </h4>
                                <span>/</span>
                                <h4 class="mail-user-data-text"> {{ (currentMessage as Message).phone }}
                                </h4>
                            </div>
                        </span>

                        <div class="mail-message">
                            <div class="mail-message-box" v-html="(currentMessage as Message).message"></div>
                        </div>
                    </div>
                    <!-- <button class="mail-send" disabled :style="{
                        cursor: 'not-allowed',
                        opacity: '0.5'
                    }">Отправить</button> -->
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>

interface Message {
    id: number,
    date: string,
    message: string,
    type: number,
    phone: string,
    reply_to: Message | null,
    user: string,
    liked?: boolean | null,
    email?: string | null,
}


const $router = useRouter().currentRoute.value
const routeId = parseInt($router.params.id as string);
const messages = ref([] as Message[])

const selectedMessage = ref({} as Message);
const currentMessage = ref({} as Message);

const request = async () => {

    await apiDataFetch(`${uri}/messages/all`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("Authorization")
        },
    })
        .then(response => response.json())
        .then(async response => {
            const data = response.data;

            data.forEach((msg: Message) => {
                messages.value.push(msg);

                if (msg.reply_to !== null || msg.reply_to == $router.params["id"]) {
                    selectedMessage.value = msg.reply_to;
                    msg.email = "support@neotech.uz"
                    currentMessage.value = msg;
                }
                // if (reply_to?.id == parseInt($router.params.id as string)) {
                //     console.log(reply_to)
                // }
            })
        })
}

const like = async () => {
    const options = {
        method: "PATCH",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("Authorization")}`,
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

onMounted(async () => {
    await request()
})

</script>

<style scoped lang="scss">
.mail-favorite {
    cursor: pointer;
}
</style>