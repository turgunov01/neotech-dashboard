<template>
    <div class="mail" v-if="loaded">
        <div class="mail-container">
            <aside class="mail-sidebar">
                <UsersFormRequest :data="(outgoings as any)" />
            </aside>
            <section class="mail-section">
                <span class="mail-favorite" @click="favorite(false)" v-if="currentMessage.isFav == 'true'">
                    <img src="../../../assets/star-in.svg" alt="">
                    <p class="mail-favorite-heading">В избранных</p>
                </span>
                <span class="mail-favorite" @click="favorite(true)"
                    v-else-if="currentMessage.isFav == 'false' || !currentMessage.isFav">
                    <img src="../../../assets/star.svg" alt="">
                    <p class="mail-favorite-heading">Добавить в избранные</p>
                </span>
                <div class="mail-content" v-if="currentMessage && currentMessageOutgoing">
                    <div class="mail-params">
                        <div class="mail-user-data">
                            <h4 class="mail-user-data-text"> {{ (currentMessage as any).name }} </h4>
                            <span>/</span>
                            <h4 class="mail-user-data-text"> {{ (currentMessage as any).email }} </h4>
                            <span>/</span>
                            <h4 class="mail-user-data-text"> {{ (currentMessage as any).phone }} </h4>
                        </div>
                        <p class="mail-user-date">
                            {{ (currentMessage as any)
        .date
        .replace(/\./g, "/")
        .replace(/\,/g, "")
        .replace(/\:/g,
            "-") }}
                        </p>
                    </div>
                    <div class="mail-message">
                        <div class="mail-message-box" v-html="(currentMessage as any).messages"></div>
                    </div>
                    <div class="mail-message reply">
                        <span class="reply-span">
                            <img src="/assets/icons/mailbox/reply.svg" alt="">
                            <div class="mail-user-data">
                                <h4 class="mail-user-data-text"> {{ (currentMessageOutgoing as any).name }} </h4>
                                <span>/</span>
                                <h4 class="mail-user-data-text"> {{ (currentMessageOutgoing as any).email }}
                                </h4>
                                <span>/</span>
                                <h4 class="mail-user-data-text"> {{ (currentMessageOutgoing as any).phone }}
                                </h4>
                            </div>
                        </span>

                        <div class="mail-message">
                            <div class="mail-message-box" v-html="(currentMessageOutgoing as any).messages"></div>
                        </div>
                    </div>
                    <button class="mail-send" disabled :style="{
                        cursor: 'not-allowed',
                        opacity: '0.5'
                    }">Отправить</button>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
import UsersFormRequest from '../../../components/Models/UsersFormRequestSidebar.vue'

const $router = useRouter().currentRoute.value

const loaded = ref(false)
const outgoings = ref({
    title: "Отправленные",
    type: "outgoing",
    messages: []
})

const request = async () => {
    const options = {
        ...customHeaders("GET"),
    }

    await apiDataFetch(`${uri}/api/messages`, options)
        .then(res => res.json())
        .then(res => {

            res.messages.forEach((item: Object, index: number) => {
                if ((item as any).type === 2) {
                    outgoings.value.messages.push(item as never)
                }
            })
        })
}

const favorite = async (value: Boolean) => {
    const options = {
        ...customHeaders("PUT"),
        body: JSON.stringify({
            ...currentMessage.value
        })
    }


    await apiDataFetch(`${uri}/api/messages/${useRouter().currentRoute.value.params.id.toString()}?action=${value}`, options)
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

const currentMessage = ref(Object as any)

const currentMessageOutgoing = ref({} as any)

onMounted(async () => {
    await request()
    loaded.value = true

    if (!outgoings.value.messages.length) {
        useRouter().push("/mail/incoming/")
    }

    currentMessageOutgoing.value = outgoings.value.messages.find(item => (item as any).id == $router.params.id)
    currentMessage.value = outgoings.value.messages.find(item => (item as any).id == currentMessageOutgoing.value.id)
})

</script>

<style scoped lang="scss">
.mail-favorite {
    cursor: pointer;
}
</style>