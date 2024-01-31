<template>
    <div class="pager">
        <div class="container">
            <div class="pager-wrapper router">
                <div class="pager-burger">
                    <div class="pager-burger-container"></div>
                </div>
                <div class="pager-router">
                    <div class="pager-router-svg" @click="$router.back()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path
                                d="M5.83333 9.91667H9.16667V14.5H12.9167L13 7.5H14H15L7.5 0L0 7.5H2.08333V14.5H5.83333V9.91667Z"
                                fill="black"></path>
                        </svg>
                        NeoTech
                    </div>
                    /
                    <div class="pager-router-svg">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                            <path
                                d="M8.05 1H3C2.44772 1 2 1.44772 2 2V13C2 13.5523 2.44771 14 3 14H12C12.5523 14 13 13.5523 13 13V5.5M8.05 1L13 5.5M8.05 1V4.5C8.05 5.05228 8.49772 5.5 9.05 5.5H13M5 8.5H10M5 10.5H10"
                                stroke="black"></path>
                        </svg>
                        <select name="pager-selector" id="pager-selector">
                            <option value="glavnaya-stranitsa">Главная страница</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="pager-wrapper">
                <ul class="pager-wrapper-list">
                    <li class="pager-wrapper-item">
                        <v-btn class="pager-wrapper-btn">Отменить</v-btn>
                    </li>
                    <li class="pager-wrapper-item">
                        <v-btn class="pager-wrapper-btn">Предпросмотр</v-btn>
                    </li>
                    <li class="pager-wrapper-item">
                        <v-btn class="pager-wrapper-btn">Опубликовать</v-btn>
                    </li>
                    <li class="pager-wrapper-item">
                        <v-btn class="pager-wrapper-btn">Настройки</v-btn>
                    </li>
                    <li class="pager-wrapper-item">
                        <v-btn class="pager-wrapper-btn">Помощь</v-btn>
                    </li>
                </ul>
            </div>
        </div>
        <div class="pager-box">
            <div class="container pager-container">
                <component v-for="component in elements.currentComponents" :is="component.name"></component>
                <div class="pager-button" @click="elements.aside.avail = !elements.aside.avail">+</div>
            </div>
            <div class="pager-buttons" @click="null">
                <ul class="pager-list"></ul>
            </div>
        </div>

        <Aside :elements="elements" v-if="elements.aside.avail" @changeCoverComponent="coverComponent($event)" />
    </div>
</template>
<script setup lang="ts">
import Aside from '~/components/pages/Aside.vue';

const meta = definePageMeta({
    layout: "pages"
})

const allComponents = {
    cover1: resolveComponent('ComponentCover1'),
    cover2: resolveComponent('ComponentCover2'),
    cover3: resolveComponent('ComponentCover3'),
}

const scroller = () => {
    const el = document.querySelector(".pager .container")

    setTimeout(() => {
        el?.classList.add('active')
    }, 10);
}

const activeComponent = reactive({
    cover: {}
})

const elements = reactive({
    selected: "Обложка",
    aside: {
        avail: false,
        opened: false,
        id: 1,
    },
    currentComponents: [],
});

const coverComponent = (e: number) => {
    const cover = {
        id: e,
        name: allComponents[`cover${e}`],
        type: 'cover'
    }

    elements.currentComponents.push(cover)
    activeComponent.cover = { ...cover }
    elements.aside.avail = false

}




onMounted(() => {
    scroller()
})

</script>
<style lang="scss">
.pager {
    overflow-y: scroll;

    &-box {
        height: 100%;
        overflow-x: auto;
    }

    &-container {
        padding: 0;
        border-left: .1rem dashed rgb(173, 206, 249);
        border-right: .1rem dashed rgb(173, 206, 249);
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    &-burger {
        width: 2.5rem;
        height: 1.5rem;
        position: relative;
        cursor: pointer;

        &-container {
            background: #000;
            width: 100%;
            height: .2rem;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
        }

        &::after {
            content: "";
            background: #000;
            width: 100%;
            height: .2rem;
            position: absolute;
            left: 0;
            top: 0;
        }

        &::before {
            content: "";
            background: #000;
            width: 100%;
            height: .2rem;
            position: absolute;
            left: 0;
            bottom: 0;
        }
    }

    & .container {
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: 300ms;
        top: 8rem;
        z-index: 99999;
        width: 100%;
        max-width: 132rem;

        &.active {
            position: fixed;
            height: 8rem;
            width: 100%;
            max-width: 100%;
            top: 0;
            left: 0;
            background: white;
        }
    }

    &-router {
        display: flex;
        align-items: center;
        gap: .5rem;

        &-svg {
            display: flex;
            align-items: center;
            gap: .5rem;
            font-size: 1.4rem;
            font-weight: 600;
            text-transform: uppercase;

            & svg {
                height: 100%;
            }

            & select {
                appearance: none;
                background: unset;
                border: unset;
                border-bottom: .2rem solid #e5e5e5;
                padding-bottom: .25rem;
            }
        }
    }

    &-wrapper {
        &.router {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1.5rem;
        }

        &-list {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 2rem;
        }
    }

    &-button {
        font-size: 1.8rem;
        padding: 1.2rem;
        font-weight: 500;
        background: #000;
        color: #fff;
        width: 3rem;
        height: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        margin: 0 auto;
        position: relative;
        opacity: 0;
        transition: 300ms;
        cursor: pointer;

        &.active {
            opacity: 1;
        }

        &:hover {
            opacity: 1;
        }

        &::after {
            content: "";
            position: absolute;
            left: -49vw;
            top: 50%;
            transform: translateY(-50%);
            width: 100vw;
            height: .1rem;
            border-top: .1rem dashed #000;
            z-index: -1;
        }
    }
}
</style>