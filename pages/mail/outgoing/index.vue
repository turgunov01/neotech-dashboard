<template>
    <div></div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

const $router = useRouter()

const param = $router.currentRoute.value.params.id

const messages = {
    title: 'Исходящие',
    type: 'outgoing',
    messages: [
        {
            id: 1,
            author: {
                name: 'Support Neotech',
                email: 'support@neotech.uz',
                phone: '1234567890',
                date: new Date().toLocaleString()
            },
            type: 'outgoing',
            reply_to: 1,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 2,
            author: {
                name: 'Support Neotech',
                email: 'support@neotech.uz',
                phone: '0987654321',
                date: new Date().toLocaleString()
            },
            type: 'outgoing',
            reply_to: 2,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 3,
            author: {
                name: 'Support Neotech',
                email: 'support@neotech.uz',
                phone: '1234567890',
                date: new Date().toLocaleString()
            },
            type: 'outgoing',
            reply_to: 3,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 4,
            author: {
                name: 'Support Neotech',
                email: 'support@neotech.uz',
                phone: '0987654321',
                date: new Date().toLocaleString()
            },
            type: 'outgoing',
            reply_to: 4,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 5,
            author: {
                name: 'Support Neotech',
                email: 'support@neotech.uz',
                phone: '1234567890',
                date: new Date().toLocaleString()
            },
            type: 'outgoing',
            reply_to: 5,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 6,
            author: {
                name: 'Support Neotech',
                email: 'support@neotech.uz',
                phone: '0987654321',
                date: new Date().toLocaleString()
            },
            type: 'outgoing',
            reply_to: 6,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 7,
            author: {
                name: 'Support Neotech',
                email: 'support@neotech.uz',
                phone: '1234567890',
                date: new Date().toLocaleString()
            },
            type: 'outgoing',
            reply_to: 7,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 8,
            author: {
                name: 'Support Neotech',
                email: 'support@neotech.uz',
                phone: '0987654321',
                date: new Date().toLocaleString()
            },
            type: 'outgoing',
            reply_to: 8,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 9,
            author: {
                name: 'Support Neotech',
                email: 'support@neotech.uz',
                phone: '1234567890',
                date: new Date().toLocaleString()
            },
            type: 'outgoing',
            reply_to: 9,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
            id: 10,
            author: {
                name: 'Support Neotech',
                email: 'support@neotech.uz',
                phone: '0987654321',
                date: new Date().toLocaleString()
            },
            type: 'outgoing',
            reply_to: 10,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        }
    ],
}
</script>

<style scoped lang="scss">

</style>