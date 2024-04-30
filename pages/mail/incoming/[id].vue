<template>
    <div class="mail">
        <div class="mail-container">
            <aside class="mail-sidebar">
                <UsersFormRequest :data="(messages as any)" />
            </aside>
            <section class="mail-section">
                <span class="mail-favorite">
                    <img src="../../../assets/star.svg" alt="">
                    <p class="mail-favorite-heading">Добавить в избранные</p>
                </span>
                <div class="mail-content">
                    <div class="mail-params">
                        <div class="mail-user-data">
                            <h4 class="mail-user-data-text"> {{ (currentMessage as any).author.name }} </h4>
                            <span>/</span>
                            <h4 class="mail-user-data-text"> {{ (currentMessage as any).author.email }} </h4>
                            <span>/</span>
                            <h4 class="mail-user-data-text"> {{ (currentMessage as any).author.phone }} </h4>
                        </div>
                        <p class="mail-user-date">
                            {{ (currentMessage as any).author.date.replace(/\./g, "/").replace(/\,/g, "").replace(/\:/g,
                    "-") }}
                        </p>
                    </div>
                    <div class="mail-message">
                        <div class="mail-message-box" v-html="(currentMessage as any).message"></div>
                    </div>
                    <div class="mail-message reply">
                        <span class="reply-span">
                            <img src="/assets/icons/mailbox/reply.svg" alt="">
                            <p class="replied-person"> {{ (currentMessage as any).author.email }} </p>
                        </span>
                        <textarea name="mail-reply" id="mail-reply" cols="30"
                            rows="10">Новое обращение пользователю {{ (currentMessage as any).author.email }}</textarea>
                    </div>
                    <button class="mail-send">Отправить</button>
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
const path = $router.currentRoute.value.path


const messages = {
    title: 'Входящие',
    type: 'incoming',
    messages: [
        {
            id: 1,
            author: {
                name: 'John Doe',
                email: 'example@example.com',
                phone: '1234567890',
                date: new Date().toLocaleString()
            },
            type: 'incoming',
            reply_to: null,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 2,
            author: {
                name: 'Jane Smith',
                email: 'example2@example.com',
                phone: '0987654321',
                date: new Date().toLocaleString()
            },
            type: 'incoming',
            reply_to: null,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 3,
            author: {
                name: 'Michael Johnson',
                email: 'example3@example.com',
                phone: '1234567890',
                date: new Date().toLocaleString()
            },
            type: 'incoming',
            reply_to: null,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 4,
            author: {
                name: 'Emily Davis',
                email: 'example4@example.com',
                phone: '0987654321',
                date: new Date().toLocaleString()
            },
            type: 'incoming',
            reply_to: null,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 5,
            author: {
                name: 'Daniel Wilson',
                email: 'example5@example.com',
                phone: '1234567890',
                date: new Date().toLocaleString()
            },
            type: 'incoming',
            reply_to: null,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 6,
            author: {
                name: 'Olivia Brown',
                email: 'example6@example.com',
                phone: '0987654321',
                date: new Date().toLocaleString()
            },
            type: 'incoming',
            reply_to: null,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 7,
            author: {
                name: 'William Taylor',
                email: 'example7@example.com',
                phone: '1234567890',
                date: new Date().toLocaleString()
            },
            type: 'incoming',
            reply_to: null,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 8,
            author: {
                name: 'Sophia Anderson',
                email: 'example8@example.com',
                phone: '0987654321',
                date: new Date().toLocaleString()
            },
            type: 'incoming',
            reply_to: null,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 9,
            author: {
                name: 'James Martinez',
                email: 'example9@example.com',
                phone: '1234567890',
                date: new Date().toLocaleString()
            },
            type: 'incoming',
            reply_to: null,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 10,
            author: {
                name: 'Isabella Thompson',
                email: 'example10@example.com',
                phone: '0987654321',
                date: new Date().toLocaleString()
            },
            type: 'incoming',
            reply_to: null,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    ],
}

const currentMessage = messages.messages.find((item: any) => item.id == param)


</script>

<style scoped lang="scss"></style>