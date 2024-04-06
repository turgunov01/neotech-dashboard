<template>
    <div class="pages">
        <div class="container"></div>
    </div>
</template>
<script lang="ts" setup>
const $router = useRouter()
onMounted(async () => {
    const locale = await getLanguage()
    await $router.push("/pages/" + locale + "/0")
    setTimeout(() => {
        location.reload()
    }, 1000);
})
</script>
<style lang="">

</style>