<template>
    <div class="pages-locale">
        <button @click="redirectTo($event)" id="ru"
            :class="$router.currentRoute.value.path.includes('ru') ? 'active' : ''"
            class="pages-locale-button">Русский</button>
        <button @click="redirectTo($event)" id="en"
            :class="$router.currentRoute.value.path.includes('en') ? 'active' : ''"
            class="pages-locale-button">Английский</button>
        <button @click="redirectTo($event)" id="uz"
            :class="$router.currentRoute.value.path.includes('uz') ? 'active' : ''"
            class="pages-locale-button">Узбекский</button>
    </div>
</template>

<script lang="ts" setup>

const $router = useRouter()

const Route = ref({
    pathname: $router.currentRoute.value.path,
    id: $router.currentRoute.value.params.id,
    query: $router.currentRoute.value.query.block
})

const redirectTo = async (e: any) => {
    const route = `/pages/${e.target.id}/${Route.value.id}`

    await clearStoreData("lang")
    await storeData("lang", e.target.id)

    $router.push({ path: route })

    setTimeout(() => {
        location.reload()
    }, 500);
    return
}
</script>

<style scoped lang="scss">
.pages {
    &-locale {
        display: flex;
        align-items: center;

        &-button {
            background: unset;
            width: 12rem;
            height: 4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: .1rem solid #e5e5e5;

            &.active {
                background: #F1F9FE;
                color: #0054FF;
                font-size: 1.5rem;
                font-weight: 500;
                line-height: 2.1rem;
            }
        }
    }
}
</style>