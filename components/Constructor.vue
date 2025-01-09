<template>
    <div id="gjs">
        <UiLoader :height="'100%'" v-if="loaded" />
    </div>
</template>

<script setup lang="ts">
const loaded = ref(true);

onMounted(() => {
    setTimeout(() => {
        loaded.value = false;
    }, 2000);
})
</script>

<style scoped lang="scss">
</style>