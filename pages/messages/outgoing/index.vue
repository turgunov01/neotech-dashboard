<template>
    <div> {{ index }} </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { FailedAlert } from '~/composables/Notification/list';

const $router = useRouter()

const param = $router.currentRoute.value.params.id;

// Template messages array
// const messages = {
//     title: 'Исходящие',
//     type: 'outgoing',
//     messages: [
//         {
//             id: 1,
//             author: {
//                 name: 'Support Neotech',
//                 email: 'support@neotech.uz',
//                 phone: '1234567890',
//                 date: new Date().toLocaleString()
//             },
//             type: 'outgoing',
//             reply_to: 1,
//             message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//         },
//         {
//             id: 2,
//             author: {
//                 name: 'Support Neotech',
//                 email: 'support@neotech.uz',
//                 phone: '0987654321',
//                 date: new Date().toLocaleString()
//             },
//             type: 'outgoing',
//             reply_to: 2,
//             message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//         },
//         {
//             id: 3,
//             author: {
//                 name: 'Support Neotech',
//                 email: 'support@neotech.uz',
//                 phone: '1234567890',
//                 date: new Date().toLocaleString()
//             },
//             type: 'outgoing',
//             reply_to: 3,
//             message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//         },
//         {
//             id: 4,
//             author: {
//                 name: 'Support Neotech',
//                 email: 'support@neotech.uz',
//                 phone: '0987654321',
//                 date: new Date().toLocaleString()
//             },
//             type: 'outgoing',
//             reply_to: 4,
//             message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//         },
//         {
//             id: 5,
//             author: {
//                 name: 'Support Neotech',
//                 email: 'support@neotech.uz',
//                 phone: '1234567890',
//                 date: new Date().toLocaleString()
//             },
//             type: 'outgoing',
//             reply_to: 5,
//             message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//         },
//         {
//             id: 6,
//             author: {
//                 name: 'Support Neotech',
//                 email: 'support@neotech.uz',
//                 phone: '0987654321',
//                 date: new Date().toLocaleString()
//             },
//             type: 'outgoing',
//             reply_to: 6,
//             message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//         },
//         {
//             id: 7,
//             author: {
//                 name: 'Support Neotech',
//                 email: 'support@neotech.uz',
//                 phone: '1234567890',
//                 date: new Date().toLocaleString()
//             },
//             type: 'outgoing',
//             reply_to: 7,
//             message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//         },
//         {
//             id: 8,
//             author: {
//                 name: 'Support Neotech',
//                 email: 'support@neotech.uz',
//                 phone: '0987654321',
//                 date: new Date().toLocaleString()
//             },
//             type: 'outgoing',
//             reply_to: 8,
//             message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//         },
//         {
//             id: 9,
//             author: {
//                 name: 'Support Neotech',
//                 email: 'support@neotech.uz',
//                 phone: '1234567890',
//                 date: new Date().toLocaleString()
//             },
//             type: 'outgoing',
//             reply_to: 9,
//             message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//         },
//         {
//             id: 10,
//             author: {
//                 name: 'Support Neotech',
//                 email: 'support@neotech.uz',
//                 phone: '0987654321',
//                 date: new Date().toLocaleString()
//             },
//             type: 'outgoing',
//             reply_to: 10,
//             message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
//         }
//     ],
// }

const index = ref(0)

onMounted(async () => {
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
            Accept: "application/json",
        }
    }

    await apiDataFetch(`${USER_FETCH_HOST}/messages/all`, options)
        .then(response => response.json())
        .then(response => {

            if (response.length === 0) {
                FailedAlert("No messages were found!");
                setTimeout(() => {
                    $router.push("/")
                    location.reload();
                }, 3000);
            }

            index.value = response.find((message: any) => message.to && message.to.name && message.to.surname);
            $router.push({ path: `/messages/outgoing/${(index.value as any).id}` })
        })
})
</script>

<style scoped lang="scss">
div {
    color: black;
}
</style>