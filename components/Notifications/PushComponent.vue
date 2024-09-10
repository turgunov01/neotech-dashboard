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

</script>

<template>
    <!-- <div>
        <p>Connected: {{ isConnected }}</p>
        <p>Transport: {{ transport }}</p>
        <p>ID: {{ identificator }} </p>
    </div> -->
</template>
