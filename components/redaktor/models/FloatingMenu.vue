<template>
    <aside class="aside" :style="{
        '--top': top ? top : '-100%',
        '--left': left ? left : '-100%'
    }
        ">
        <div class="aside-container">
            <ul class="aside-list">
                <li class="aside-item">
                    <button class="aside-button" @click="$emit('create')" data-type="Title">
                        <div class="aside-button-image">
                            <img src="../../../src/assets/blocks/h1.svg" class="type" alt="">
                        </div>
                        <p class="type-name">Заголовок</p>
                    </button>
                </li>
                <li class="aside-item">
                    <button class="aside-button" @click="create('Text')" data-type="Text">
                        <div class="aside-button-image">
                            <img src="../../../src/assets/blocks/p.svg" class="type" alt="">
                        </div>
                        <p class="type-name">Текст</p>
                    </button>
                </li>
                <li class="aside-item">
                    <button class="aside-button" @click="create('Button')" data-type="Button">
                        <div class="aside-button-image">
                            <img src="../../../src/assets/blocks/button.svg" class="type" alt="">
                        </div>
                        <p class="type-name">Кнопка</p>
                    </button>
                </li>
                <li class="aside-item">
                    <button class="aside-button" @click="create('Column')" data-type="Column">
                        <div class="aside-button-image">
                            <img src="../../../src/assets/blocks/columns.svg" class="type" alt="">
                        </div>
                        <p class="type-name">Колонка</p>
                    </button>
                </li>
                <li class="aside-item">
                    <button class="aside-button" @click="create('Image')" data-type="Image">
                        <div class="aside-button-image">
                            <img src="../../../src/assets/blocks/img.svg" class="type" alt="">
                        </div>
                        <p class="type-name">Картинка</p>
                    </button>
                </li>
                <li class="aside-item">
                    <button class="aside-button" @click="create('Video')" data-type="Video">
                        <div class="aside-button-image">
                            <img src="../../../src/assets/blocks/video.svg" class="type" alt="">
                        </div>
                        <p class="type-name">Видео</p>
                    </button>
                </li>
                <li class="aside-item">
                    <button class="aside-button" @click="create('Slider')" data-type="Slider">
                        <div class="aside-button-image">
                            <img src="../../../src/assets/blocks/slides.svg" class="type" alt="">
                        </div>
                        <p class="type-name">Слайдер</p>
                    </button>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script lang="ts" setup>

const emits = defineEmits(['create'])

const types = [
    {
        name: "Заголовок",
        type: "Title",
        image: "/_nuxt/assets/blocks/h1.svg"
    },
    {
        name: "Текст",
        type: "Text",
        image: "/_nuxt/assets/blocks/p.svg"
    },
    {
        name: "Кнопка",
        type: "Button",
        image: "/_nuxt/assets/blocks/button.svg"
    },
    {
        name: "Колонна",
        type: "Column",
        image: "/_nuxt/assets/blocks/columns.svg"
    },
    {
        name: "Картинка",
        type: "Image",
        image: "/_nuxt/assets/blocks/img.svg"
    },
    {
        name: "Слайдер",
        type: "Slider",
        image: "/_nuxt/assets/blocks/slides.svg"
    },
]

const props = defineProps({
    top: {
        required: true,
        type: Number,
        default: 0
    },
    left: {
        required: true,
        type: Number,
        default: 0
    },
    element: {
        required: true,
        type: Object
    }
})

</script>
