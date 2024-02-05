<template>
    <div class="block">
        <img src="../../../src/assets/burger.svg" alt="">
        <div class="block-text">
            <div class="textarea" v-if="opened">
                <div class="events">
                    <div class="text-events">
                        <img src="../../../src/assets/editor-methods/bold.svg" @click="bold(data.id)" alt="">
                        <img src="../../../src/assets/editor-methods/underline.svg" alt="">
                        <img src="../../../src/assets/editor-methods/italic.svg" alt="">
                    </div>
                    <div class="text-events params">
                        <img src="../../../src/assets/editor-methods/color.svg" alt="">
                        <img src="../../../src/assets/editor-methods/line-height.svg" alt="">
                    </div>
                </div>
            </div>
            <div class="sub-title" :class="data.position" :style="data.css">
                <p :style="data.textCss" :id="`text-${data.id}`" contenteditable="true" @click="opened = true"
                    @keyup="writeDown($event)">{{
                        data.text }}</p>
            </div>
            <button class="save" @click="toggle(data.id)" v-if="opened">Сохранить</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    data: {
        required: true,
        type: Object,
        default: {
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
        }
    }
})

const opened = ref(false)

const toggle = (e: number) => {
    opened.value = !opened.value
}

const bold = (id: number) => {
}

const writeDown = (e: any) => {
    props.data.text = e.target.value
}

const emits = defineEmits(['toggle'])

</script>
<style scoped>
:root {
    --border: #ADCEF9;
    --color: #365BA7;
}

.textarea {
    display: flex;
    flex-direction: column;
}

.events {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.events .text-events {
    display: flex;
    align-items: center;
}

.events .text-events.params {
    gap: .4rem;
}

.events .text-events.params img {
    width: 100%;
    height: 100%;
    padding: 0;
}

.events .text-events img {
    width: 4rem;
    height: 4rem;
    padding: 1.25rem;
    background: #e5e5e5;
}

.events .text-events img:hover {
    background: #d4d1d1;
    cursor: pointer;
}

.save {
    max-width: 20rem;
    width: 100%;
    margin-top: 1rem;
    padding: 1rem 0;
    border: none;
    background: #E2F0FD;
    color: #0054FF;
    border-radius: .4rem;
    font-size: 1.5rem;
    line-height: 1.8rem;
}

.block {
    display: flex;
    align-items: center;
}

.block-text {
    display: flex;
    flex-direction: column;
    padding: 1.6rem 1.3rem;
    row-gap: 1rem;
    width: 100%;
}

/*.sub-title {}*/

textarea {
    width: 100%;
}

.sub-title.left {
    margin-right: auto;
}

.sub-title.right {
    margin-left: auto;
}
</style>