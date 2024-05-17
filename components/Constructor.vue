<template>
    <div id="gjs">
        <h1>Hello World Component!</h1>
    </div>
</template>

<script setup lang="ts">
import 'grapesjs/dist/css/grapes.min.css';
import { GrapesInit } from '~/composables/Editor'; // Add this line

onMounted(() => {
    GrapesInit()
});
</script>

<style scoped lang="scss">
#gjs {
    border: 3px solid #444;
}

</style>