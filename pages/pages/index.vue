<template>
    <div class="pages">
        <div class="container"></div>
    </div>
</template>
<script lang="ts" setup>
const $router = useRouter()
onMounted(() => {
    setTimeout(() => {
        $router.push("/pages/0")
    }, 200);
})
</script>
<style lang="">
    
</style>