<template>
    <div class="pages">
        <Layers />
        <div class="pages-content">
            <Draggable :list="list" @toggle="toggle"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Layers from '~/components/redaktor/layers.vue';

const opened = ref(false)

const index = ref(0)

const toggle = (e: any) => {
    index.value = e.target.id
}

const list = ref([
    {
        name: "block-name",
        text: "Мы — профессиональная команда с мировым опытом в IT-разработке, которая ценит индивидуальность, ответственность и взаимный рост, стремясь к устойчивым результатам",
        parent: "",
        component: "Text",
        position: "right",
        id: 1,
        css: `
            max-width: 100%;
            `,
        textCss: `font-size: 1.7rem;
                    color: #365BA7;
                    font-weight: 500;
                    line-height: 135%;
                    `
    },
    {
        name: "block-name",
        text: "профессиональная команда с мировым опытом в IT-разработке, которая ценит индивидуальность, ответственность и взаимный рост, стремясь к устойчивым результатам",
        parent: "",
        component: "Text",
        position: "right",
        id: 2,
        css: `
            max-width: 100%;
            `,
        textCss: `font-size: 1.7rem;
                    color: #365BA7;
                    font-weight: 500;
                    line-height: 135%;
                    `
    }
])

</script>
<style lang="scss" scoped>
.pages {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.aside {
    position: fixed;
    z-index: 99;
    top: 0;
    width: 100%;
    max-width: 27rem;
    background-color: white;
    height: 100%;
    padding: 1rem 1.6rem;
    left: -100%;
    transition: 300ms;

    &.active {
        left: 0;
    }
}
</style>