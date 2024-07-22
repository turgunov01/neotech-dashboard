<template>
    <div class="mail" v-if="loaded">
        <div class="mail-container">
            <aside class="mail-sidebar">
                <UsersFormRequest :data="(messages as any)" />
            </aside>
            <section class="mail-section">
                <span class="mail-favorite" @click="favorite(false)" v-if="(message as any).isFav == 'true'">
                    <img src="../../../assets/star-in.svg" alt="">
                    <p class="mail-favorite-heading">В избранных</p>
                </span>
                <span class="mail-favorite" @click="favorite(true)"
                    v-else-if="(message as any).isFav == 'false' || !(message as any).isFav">
                    <img src="../../../assets/star.svg" alt="">
                    <p class="mail-favorite-heading">Добавить в избранные</p>
                </span>
                <div class="mail-content">
                    <div class="mail-params">
                        <div class="mail-user-data">
                            <h4 class="mail-user-data-text"> {{ (message as any).name }} </h4>
                            <span>/</span>
                            <h4 class="mail-user-data-text"> {{ (message as any).email }} </h4>
                            <span>/</span>
                            <h4 class="mail-user-data-text"> {{ (message as any).phone }} </h4>
                        </div>
                        <p class="mail-user-date">
                            {{ (message as any).date.replace(/\./g, "/").replace(/\,/g, "").replace(/\:/g,
        "-") }}
                        </p>
                    </div>
                    <div class="mail-message">
                        <div class="mail-message-box" v-html="(message as any).messages"></div>
                    </div>
                    <div class="mail-message reply">
                        <span class="reply-span">
                            <img src="/assets/icons/mailbox/reply.svg" alt="">
                            <p class="replied-person"> {{ (message as any).email }} </p>
                        </span>
                        <textarea name="mail-reply" id="mail-reply" v-model="message.message" cols="30"
                            rows="10">Новое обращение пользователю {{ (message as any).email }}</textarea>
                    </div>
                    <button class="mail-send" @click.prevent="send()">Отправить</button>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import UsersFormRequest from '../../../components/Models/UsersFormRequestSidebar.vue'

const $router = useRouter()

const param = $router.currentRoute.value.params.id
const loaded = ref(false)


const message = ref({
    message: "Новое обращение ...",
})

const messages = ref({
    title: "Почта",
    type: "incoming",
    messages: []
})

const request = async () => {
    await apiDataFetch(`${uri}/api/messages`, {
        ...customHeaders("GET")
    })
        .then(response => response.json())
        .then(async response => {
            await response.messages.forEach((msg: any) => {
                messages.value.messages.push(msg as never)

                if (msg.id == param) {
                    message.value = msg as never
                }
            })

        })
}

const favorite = async (value: Boolean) => {
    const options = {
        ...customHeaders("PUT"),
        body: JSON.stringify({
            ...message.value
        })
    }


    await apiDataFetch(`${uri}/api/messages/${$router.currentRoute.value.params.id.toString()}?action=${value}`, options)
        .then(res => res.json())
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.log(err)
        })
        .finally(() => {
            setTimeout(() => {
                location.reload()
            }, 300);
        })
}

const send = async () => {
    const params = {
        email: "support@neotech.uz",
        name: "Neotech Support Team",
        phone: "+998 71 201 22 22",
        date: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()} `,
        messages: message.value.message.toString(),
        reply_to: $router.currentRoute.value.params.id,
        type: 2,
    }

    await apiDataFetch(`${uri}/api/messages?type=2`, {
        ...customHeaders("POST"),
        body: JSON.stringify(params)
    })
        .then((res: Response) => res.json())
        .then(res => {
            const data = res
            console.log(data)
        })
}



onMounted(async () => {
    await request()
    loaded.value = true
})

</script>

<style scoped lang="scss"></style>