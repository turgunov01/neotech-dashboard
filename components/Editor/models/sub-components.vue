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

const toggle = () => {
    const components = document.querySelector(".project-subcomponents");
    components?.classList.toggle("active");
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
                    <button class="components-header-button active">
                        Базовые
                    </button>
                </li>

                <div class="components-header-icon" @click="toggle">
                    <i></i>
                    <i></i>
                </div>
            </ul>
        </div>
        <div class="components-main">
            <!-- <aside class="components-aside">
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
            </aside> -->
            <div class="components-content">
                <div class="components-cards" :id="item.id" v-for="item in components" :style="{
                    display: item.components.length && item.id === 'defaults' ? 'flex' : 'none'
                }">
                    <div class="components-card-main">
                        <div class="components-card" :data-html="cmp.content" :area-id="`/default/${cmp.id}`"
                            v-for="(cmp, cmpIndex) in item.components"
                            :style="{ display: cmpIndex !== 3 ? 'block' : 'none' }">
                            <div class="components-card-preview">
                                <div class="components-card-icons">
                                    <i></i><i></i><i></i>
                                </div>
                                <!-- <span class="components-card-title text-sm">header:{{ cmpIndex + 1 }}</span> -->
                            </div>
                            <img :src="cmp.label.replace('https://api-neotech-landing.neotech.uz', 'http://localhost:5003')" alt="">
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
    height: 100%;
    width: 100%;
    background-color: #ffffff;
    border-radius: .8rem;
    box-shadow: 0 0 2rem rgba(0, 0, 0, 0.3);
    padding: 0;
    flex-direction: column;
    overflow: hidden;
    position: relative;

}

.components {
    &-header {
        background: #ffffff;
        padding: 1rem 2rem;
        color: black;
        position: relative;

        &-icon {
            position: absolute;
            right: 2rem;
            top: 50%;
            transform: translateY(-50%);
            width: 2rem;
            height: 2rem;

            & i {
                background: #000000;
                width: 100%;
                height: .15rem;
                display: flex;
                align-items: center;
                justify-content: center;
                transform: rotate(-45deg);
                position: absolute;
                left: 0;
                top: 50%;

                &:last-of-type {
                    transform: rotate(45deg);
                }
            }
        }

        &-list {
            display: flex;
            align-items: center;
            gap: .4rem;

            &>li {
                display: flex;
                align-items: center;
                justify-content: center;

                & button {
                    width: 100%;
                    padding: 1rem;

                    &.active {
                        background: #f1f1f1;
                        border-radius: .4rem;
                    }
                }
            }
        }
    }

    &-main {
        display: flex;
        gap: .4rem;
        overflow: hidden;
        background-color: #f1f1f1;
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
        width: 100%;
        margin-left: auto;
        margin-right: auto;
        overflow: scroll;
        padding: 0 2rem;
    }

    &-cards {
        display: flex;
        align-items: center;
        margin: 1.6rem 0 2rem;
        flex-direction: column;

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
        max-width: calc(100% / 2 - 1rem);


        &-main {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            flex-wrap: wrap;
            row-gap: 1.2rem;
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
