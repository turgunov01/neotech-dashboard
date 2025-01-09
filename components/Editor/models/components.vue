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

const categoryFilter = (e: Event) => {
    const target = e.target as HTMLElement;
    const category = target?.dataset.category;

    const buttons = document.querySelectorAll(".components-linker");
    buttons.forEach((button: any) => {
        button.classList.remove("active");
    })

    target.classList.add("active");

    if (!category) {
        console.warn("Category data attribute is missing.");
        return;
    }

    const item = document.querySelector(`#${category}`);
    if (!item) {
        console.warn(`Element with id "${category}" not found.`);
        return;
    }

    const rect = item.getBoundingClientRect();
    const components = document.querySelector(".components-content");

    if (!components) {
        console.warn('Element with class ".components-content" not found.');
        return;
    }

    const currentScroll = components.scrollTop;
    const componentsRect = components.getBoundingClientRect();
    const offsetTop = currentScroll + rect.top - componentsRect.top;

    components.scrollTo({
        top: offsetTop,
        behavior: "smooth",
    });
};

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
                    <li class="components-item" v-for="item in components"
                        :style="{ display: item.id === 'defaults' || item.components.length == 0 ? 'none' : 'block', color: 'black' }"
                        :hidden="!item.components">
                        <button @click="categoryFilter($event)" :data-category="item.id"
                            class="components-linker bg-transparent text-stone-950 opacity-50 w-full text-xl text-start pt-4 pb-4 pl-6 pr-6">
                            {{ item.name }}
                        </button>
                    </li>
                </ul>
            </aside>
            <div class="components-content">
                <div class="components-cards" :id="item.id" v-for="item in components" :style="{
                    display: item.components.length && item.id !== 'defaults' ? 'flex' : 'none'
                }">
                    <h3 class="components-card-name mt-2 text-sm">{{ item.name }}</h3>
                    <div class="components-card-main">
                        <div class="components-card" :data-html="cmp.content" v-for="(cmp, cmpIndex) in item.components"
                            :style="{ display: /\d/.test(cmp.label) ? 'block' : 'none', color: 'black' }">
                            <div class="components-card-preview">
                                <div class="components-card-icons">
                                    <i></i><i></i><i></i>
                                </div>
                                <span class="components-card-title text-sm">header:{{ cmpIndex + 1 }}</span>
                            </div>
                            <img v-if="cmp.label"
                                :src="cmp.label.replace('https://api-neotech-landing.neotech.uz', 'http://localhost:5003')"
                                alt="">
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
    flex-direction: column;
    overflow: hidden;
    position: relative;

    @media(max-width: 1200px) {
        max-width: 95vw;
        height: 95vh;
    }
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
        overflow: hidden;
    }

    &-aside {
        width: 20%;
        border-right: .1rem solid rgba(0, 0, 0, 0.1);
        height: 100vh;

        @media(max-width: 770px) {
            width: 40%;
        }
    }

    &-linker {
        &:hover {
            opacity: 1;
        }

        &.active {
            opacity: 1 !important;
            background: #f1f1f1;
        }
    }

    &-content {
        width: 78.5%;
        margin-left: auto;
        margin-right: auto;
        padding-top: 1.2rem;
        overflow: scroll;

        @media(max-width: 770px) {
            width: 60%;
            padding: 0 1rem;
        }
    }

    &-cards {
        display: flex;
        align-items: center;
        margin: 2.4rem 0 1.6rem 0;
        flex-direction: column;

        @media(max-width: 770px) {
            border-top: .1rem solid #f1f1f1;
            padding: 0;
        }

        &:nth-of-type(1) {
            margin-top: 0;

            @media(max-width: 770px) {
                border-top: unset;
            }
        }

        &>h3 {
            font-size: 2.4rem;
            font-weight: 500;
            line-height: 1.25;
            color: black !important;
            width: 100%;
            text-align: start;
            margin-bottom: .4rem;

            @media(max-width: 770px) {
                padding: 0;
                text-align: center;
                font-size: 3rem;
            }
        }
    }

    &-card {
        border-bottom-left-radius: .4rem;
        border-bottom-right-radius: .4rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
        cursor: pointer;
        transition: 300ms;
        max-width: calc(100% / 3 - 2.4rem);

        @media(max-width: 1200px) {
            max-width: calc(100% / 2 - 2.4rem);
        }

        @media(max-width: 770px) {
            max-width: calc(100%);
        }

        &-main {
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;
            column-gap: 3.2rem;
            row-gap: 2.4rem;

            @media(max-width: 770px) {
                flex-wrap: nowrap;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
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
