<template>
    <div class="layers" v-if="loaded">
        <div class="layers-container">
            <div class="layers-title">Блоки</div>
            <div class="layers-list">
                <div class="layers-item" :class="query.blockID == index ? 'active' : ''" v-for="(item, index) in list"
                    :key="index">
                    <button class="layers-button" @dblclick="setQuery(Number(index))"
                        :class="query.blockID == index ? 'active' : ''">
                        <p class="layers-button-name" :id="`layers-button-${index}`">
                            {{ item.name }}
                        </p>
                        <img src="../../src/assets/burger.svg" alt="">
                    </button>
                </div>
            </div>
            <button class="layers-create" @click="modal = true">+ Добавить блок</button>
            <button class="save" v-if="change">Сохранить</button>
        </div>
    </div>
    <RedaktorModelLayersModel v-if="modal" :list="list" :close="modal" @modal="modal = !modal" />
</template>
<script lang="ts" setup>
const list = ref([])
const loaded = ref(false)
const change = ref(false)
const $router = useRouter()
const query = $router.currentRoute.value.query

const modal = ref(false)

const getBlocks = async () => {
    const params = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }

    await getIndexData("/pages/index")
        .then(response => response.json())
        .then((response: any) => {
            const data = response.data

            data.pages[0].blocks.forEach((item: any | any, index: any) => {
                list.value.push(item);
            })

        })
}

const queryHandler = async () => {
    await getBlocks()
    const element = list.value.find(item => item.id == $router.currentRoute.value.query.blockID)
    if (!$router.currentRoute.value.query.blockID) {
        $router.push({
            query: {
                blockID: 0
            }
        })
        setTimeout(() => {
            location.reload()
        }, 200);
    }
    else if (!$router.currentRoute.value.query.blockID && element) {
        $router.push({ query: { blockID: 0 } })
        setTimeout(() => {
            location.reload()
        }, 200);
    } else if (!element && $router.currentRoute.value.query.blockID) {
        $router.push({ query: { blockID: 0 } })
        setTimeout(() => {
            location.reload()
        }, 200);
    } else {
        $router.push({ query: { blockID: $router.currentRoute.value.query.blockID } })
    }
}

const setQuery = async (index: Number) => {
    await $router.push({ query: { blockID: index } })
    location.reload()
}

onMounted(async () => {
    await queryHandler()

    loaded.value = true
})


</script>
<style lang="scss" scoped>
$active: #0054FF;
$active-background: #E3F2FD;

.save {
    background: #E2F0FD;
    border: none;
    padding: 1.1rem 4.2rem;
    width: max-content;
    color: #365BA7;
    border-radius: .4rem;
    font-size: 1.5rem;
    font-weight: 500;
    max-width: 22rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    margin-bottom: 2rem;
}

.layers {
    &-container {
        width: 25rem;
        border-radius: .4rem;
        border: .1rem solid #e5e5e5;
    }

    &-title {
        font-size: 2rem;
        line-height: 120%;
        font-weight: 500;
        color: #000000;
        padding: 2.4rem;
        padding-bottom: 1.6rem;
        border-bottom: .1rem solid #e5e5e5;
    }

    &-list {
        padding: 1.6rem 1.4rem;
    }

    &-item {
        padding: 1rem;
        border-radius: .4rem;
        cursor: pointer;

        &.active {
            background: $active-background;
        }
    }

    &-button {
        border: unset;
        font-size: 1.5rem;
        line-height: 125%;
        text-align: start;
        background-color: unset;
        width: 100%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: space-between;

        &.active {
            color: $active;
        }
    }

    &-create {
        background: #E3F2FD50;
        color: #0054FF;
        width: 100%;
        max-width: 22rem;
        font-size: 1.5rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        border: unset;
        padding: 1.1rem 0;
        border-radius: .4rem;
        cursor: pointer;
        margin-bottom: 2rem;

        &:hover {
            background: #E3F2FD;
        }
    }
}
</style>