<template>
    <div class="mail">
        <div class="mail-container">
            <aside class="mail-sidebar">
                <UsersFormRequest :data="(messages as never)" />
            </aside>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import UsersFormRequest from '../../../components/Models/UsersFormRequestSidebar.vue'

const $router = useRouter()
const param = $router.currentRoute.value.params.id


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

</script>

<style scoped lang="scss"></style>