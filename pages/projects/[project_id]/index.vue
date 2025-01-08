<script lang="ts" setup>
const $router = useRouter();
onMounted(() => {
    return $router.push(`/projects/${$router.currentRoute.value.params.project_id}/pages/`)
})
</script>

<template>

</template>

<style lang="scss" scoped></style>
