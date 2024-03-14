<template>
    <div class="pages">
        <div class="container"></div>
    </div>
</template>
<script lang="ts" setup>
const $router = useRouter()
onMounted(async () => {
    await $router.push("/pages/" + getLanguage() + "/0")
    setTimeout(() => {
        location.reload()
    }, 1000);
})
</script>
<style lang="">

</style>