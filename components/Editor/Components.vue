<script lang="ts" setup>
const components = ref([] as any);
const getComponents = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`
        }
    }

    await apiDataFetch(USER_FETCH_HOST + "/components/", options)
        .then(response => response.json())
        .then(response => {
            const data = response;
            data.forEach((item: any) => {
                components.value.push(item)
            })
        })
}

const categoryFilter = (e: any) => {
    const category = e.target.dataset.category;
    console.log(category);
}

const removeContainer = (item: any) => {
    const data = document.querySelector(".project-components");
    data?.classList.remove("active");
}

onMounted(async () => {
    await getComponents();
})

</script>

<template>
    <div class="container">
        <div class="components-header">
            <ul class="components-header-list">
                <li class="components-header-item">
                    <button class="components-header-button">
                        Каталог секции
                    </button>
                </li>
            </ul>
        </div>
        <div class="components-main">
            <aside class="components-aside">
                <ul class="components-list">
                    <li class="components-item" v-for="item in components">
                        <button @click="categoryFilter($event)" :data-category="item.id"
                            class="components-linker bg-transparent text-stone-950 opacity-50 w-full text-xl text-start pt-4 pb-4 pl-6 pr-6">
                            {{ item.name }}
                        </button>
                    </li>
                </ul>
            </aside>
            <div class="components-content">
                <div class="components-cards" v-for="item in components" :style="{
                    display: item.components.length ? 'flex' : 'none'
                }">
                    <h3 class="components-card-title text-sm">Компонент: {{ item.name }}</h3>
                    <div class="components-card-main">
                        <div class="components-card" @click="removeContainer(cmp)"
                            v-for="(cmp, cmpIndex) in item.components">
                            <div class="components-card-preview">
                                <div class="components-card-icons">
                                    <i></i><i></i><i></i>
                                </div>
                                <span class="components-card-title text-sm">header:{{ cmpIndex + 1 }}</span>
                            </div>
                            <img :src="cmp.label" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.container {
    display: flex;
    height: calc(100vh - 20%);
    max-width: 144rem;
    background-color: #ffffff;
    border-radius: .8rem;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
    padding: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.components {
    &-header {
        padding: 15px;
        border-bottom: .1rem solid rgba(0, 0, 0, 0.1);
        height: max-content;
        width: 100%;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);

        &-list {
            display: flex;
            align-items: center;
            gap: 2rem;
        }

        &-button {
            color: black;
            font-size: 1.4rem;
            background: #f1f1f1;
            padding: 10px;
            border-radius: .6rem;
        }
    }

    &-main {
        display: flex;
        gap: .4rem;
    }

    &-aside {
        width: 20%;
        border-right: .1rem solid rgba(0, 0, 0, 0.1);
        height: 100vh;
    }

    &-linker:hover {
        opacity: 1;
    }

    &-content {
        width: 78.5%;
        margin-left: auto;
        margin-right: auto;
        padding-top: 1.2rem;
    }

    &-cards {
        display: flex;
        align-items: center;
        flex-direction: column;
    }

    &-card {
        border-bottom-left-radius: .4rem;
        border-bottom-right-radius: .4rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: 300ms;
        max-width: calc(100% / 3 - 2.4rem);

        &-main {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            column-gap: 3.2rem;
            row-gap: 2.4rem;
        }

        &:active {
            transform: translateY(.5rem);
            box-shadow: 0 0 1rem .4rem rgba(0, 0, 0, 0.1);
        }

        &-icons {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: .2rem;
        }

        &-preview {
            background: black;
            border-top-left-radius: .4rem;
            border-top-right-radius: .4rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px;

            & i {
                width: .5rem;
                height: .5rem;
                background: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }

        &-title {
            color: white !important;
        }
    }
}
</style>
