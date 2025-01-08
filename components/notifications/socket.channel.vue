<script setup>
import { socket } from "~/composables/socket";

const isConnected = ref(false);
const transport = ref("N/A");

const identificator = ref("")

function onConnect() {
    isConnected.value = true;
    transport.value = socket.io.engine.transport.name;
    console.log(socket);

    socket.io.engine.on("upgrade", (rawTransport) => {
        transport.value = rawTransport.name;
    });

    setTimeout(() => {
        identificator.value = socket.id;
    }, 1000);
}

function onResponse() {
    isConnected.value = "Pending";
    const url = "https://www.zedge.net/notification-sounds/1921bd91-fe05-4ba3-8e09-97bf661b4020";

    const audio = new Audio(url);
    audio.play();

    PushNotification("Новое сообщение!")

    setTimeout(() => {
        isConnected.value = true;
    }, 3000);
}


function onDisconnect() {
    isConnected.value = false;
    transport.value = "N/A";
}

socket.on("connect", onConnect);
socket.on("disconnect", onDisconnect);
socket.on("chat message", onResponse);

onBeforeUnmount(() => {
    socket.off("disconnect", onDisconnect);
});

onMounted(() => {})

</script>

<template>
    <!-- <div>
        <p>Connected: {{ isConnected }}</p>
        <p>Transport: {{ transport }}</p>
        <p>ID: {{ identificator }} </p>
    </div> -->
</template>
