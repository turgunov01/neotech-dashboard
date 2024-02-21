<template>
    <div class="blocks">
        <draggable :list="array.blocks" class="block-template">
            <template #item="{ element }">
                <div class="block active">
                    <p class="block-title"> Колонна {{ element.id }} </p>
                    <div class="block-params">
                        <div class="block-params-media">
                            <img src="../../../src/assets/burger.svg" class="burger" alt="">
                            <label class="block-params-image" :for="`block-params-image-${element.id}`"
                                v-if="!element.image.url">
                                <img src="../../../src/assets/editor-methods/upload.svg" :class="`block-params-icon`"
                                    alt="">
                                <p class="block-params-text">Перетащите изображение сюда
                                    или <span>загрузите изображение</span>
                                </p>
                                <p class="block-params-format">Формат: jpeg, png, svg. </p>
                                <input type="file" :id="`block-params-image-${element.id}`"
                                    @change="upload(element, $event)" class="block-params-input" accept="image/*" hidden>
                            </label>
                            <div class="block-params-output" v-else>
                                <div class="block-params-output-content">
                                    <img :src="element.image.url" alt="">
                                </div>
                                <label class="block-params-image" :for="`block-params-image-${element.id + 1}`"
                                    v-if="element.image.url">
                                    <img src="../../../src/assets/editor-methods/upload.svg"
                                        :class="`block-params-output-icon`" alt="">
                                    <p class="block-params-text">Перетащите изображение сюда
                                        или <span>загрузите изображение</span>
                                    </p>
                                    <p class="block-params-format">Формат: jpeg, png, svg. </p>
                                    <input type="file" :id="`block-params-image-${element.id + 1}`"
                                        @change="upload(element, $event)" class="block-params-input" accept="image/*"
                                        hidden>
                                </label>
                            </div>
                        </div>
                        <div class="block-params-title">
                            <img src="../../../src/assets/burger.svg" class="burger" alt="">
                            <h1 class="block-params-heading" contenteditable>Заголовок колонны</h1>
                        </div>
                        <div class="block-params-title">
                            <img src="../../../src/assets/burger.svg" class="burger" alt="">
                            <p class="block-params-description" contenteditable>Описание колонны</p>
                        </div>
                    </div>

                </div>
            </template>
        </draggable>
    </div>
    <button @click="update" class="blocks-button">Создать колонну</button>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';

const screen = window.innerWidth

const calculate = (array: any) => {
    console.log(array)
}

const props = defineProps({
    array: {
        required: true,
        type: Object
    },
})

const upload = (item: any, e: any) => {
    const input = e.target
    const files = input.files[0]
    const url = URL.createObjectURL(files)
    const size = files.size / 1024

    item.image.url = url
    item.image.size += size
}

const update = () => {
    const element = {
        id: props.array.blocks.length + 1,
        image: {
            url: "",
            size: 0,
        },
        button: {
            innerText: "Button",
            href: "/",
            border: "2rem"
        },
    }

    if (props.array.blocks.length <= 7) {
        props.array.blocks.push(element)
    }

    console.log(props.array)
}

const open = (e: MouseEvent) => {
    const target = e.target as HTMLDivElement
    if (target) {
        target.classList.toggle("active")
    }
}

onMounted(() => {
    calculate(props.array)
})

</script>

<style scoped lang="scss">
@import '../../../src/assets/scss/columns.scss'
</style>