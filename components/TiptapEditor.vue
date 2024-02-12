<template>
    <div class="box">
        <div class="text-editor">
            <img src="../src/assets/burger.svg" alt="">
        </div>
        <div class="wrapper" v-if="object.component === 'Title'">
            <div class="btns">
                <button class="btn" title="Ctrl + B/CMD + B" @click="editor.chain().focus().toggleBold().run()">
                    <img src="../src/assets/editor-methods/bold.svg" @click="editor.chain().focus().toggleBold().run()"
                        alt="">
                </button>
                <button class="btn" title="Ctrl + I/CMD + I" @click="editor.chain().focus().toggleItalic().run()">
                    <img src="../src/assets/editor-methods/italic.svg" @click="editor.chain().focus().toggleItalic().run()"
                        alt="">
                </button>
                <button class="btn no-padding" title="Ctrl + I/CMD + I">
                    <label for="color-1">
                        <img src="../src/assets/editor-methods/color.svg" alt="">
                    </label>
                    <input type="color" id="color-1" hidden
                        @input="editor.chain().focus().setColor($event.target.value).run()">
                </button>
            </div>
            <editor-content :editor="editor" />
        </div>
        <div class="wrapper" v-else-if="object.component === 'Text'" >
            <div class="btns">
                <button class="btn" title="Ctrl + B/CMD + B" @click="editor.chain().focus().toggleBold().run()">
                    <img src="../src/assets/editor-methods/bold.svg" @click="editor.chain().focus().toggleBold().run()"
                        alt="">
                </button>
                <button class="btn" title="Ctrl + I/CMD + I" @click="editor.chain().focus().toggleItalic().run()">
                    <img src="../src/assets/editor-methods/italic.svg" @click="editor.chain().focus().toggleItalic().run()"
                        alt="">
                </button>
                <button class="btn no-padding" title="Ctrl + I/CMD + I">
                    <label for="color-2">
                        <img src="../src/assets/editor-methods/color.svg" alt="">
                    </label>
                    <input type="color" id="color-2" hidden
                        @input="content.chain().focus().setColor($event.target.value).run()">
                </button>
            </div>
            <editor-content :editor="editor" />
        </div>
        <div class="wrapper box-editor" v-else-if="object.component === 'Button'">
            <div class="button-name">
                <input type="text" :style="{
                    border: object.button ? object.button.border : '.1rem solid #e5e5e5'
                }" class="button-input" :placeholder="'Новая кнопка'"
                    :value="object.button.innerText ? object.button.innerText : ''">
            </div>
            <div class="box-button">
                <div class="box-methods">
                    <label for="color-input">
                        <p class="color-name">Выбор фона цвета кнопки</p>
                        <input type="color" id="border-color" @change="buttonColor($event, 'border')"
                            :value="object.button.background">
                    </label>
                    <label for="color-border">
                        <p class="color-name">Выбор цвета контура кнопки</p>
                        <input type="color" id="background-color" @change="buttonColor($event, 'background')"
                            :value="object.button.border">
                    </label>
                    <label class="link-selector">
                        <p class="color-name">Открыть</p>
                        <select name="button-selector" id="" @change="select($event)">
                            <option value="default" selected disabled>Выбрать страницу</option>
                            <option value="/">Главная страница</option>
                            <option value="/solutions/1">Наши решение 1</option>
                            <option value="/solutions/2">Наши решение 2</option>
                        </select>
                    </label>
                </div>
            </div>
        </div>
        <div class="wrapper image-editor" v-else-if="object.component === 'Image'">
            <label for="image-box" class="image-box" v-if="!object.url.path.length">
                <img src="../src/assets/editor-methods/upload.svg" alt="">
                <h6 class="image-box-title">Перетащите изображение сюда
                    или <span>загрузите изображение</span></h6>
                <p class="image-box-type">Формат: jpeg, png, svg. </p>
                <input type="file" accept="image/*" @change="input($event)" id="image-box" hidden>
            </label>
            <div class="image-box-content" v-else-if="object.url.path.length">
                <img :src="object.url.path" alt="">
            </div>
        </div>
        <div class="wrapper image-editor" v-else-if="object.component === 'Video'">
            <label for="video-box" class="image-box" v-if="!object.url.path.length">
                <img src="../src/assets/editor-methods/upload.svg" alt="">
                <h6 class="image-box-title">Перетащите видеофайл сюда
                    или <span>загрузите видеофайл</span></h6>
                <p class="image-box-type">Формат: jpeg, png, svg. </p>
                <input type="file" accept="video/*" @change="input($event)" id="video-box" hidden>
            </label>
            <div class="video-box-content" v-else-if="object.url.path.length">
                <video :src="object.url.path" controls></video>
            </div>
        </div>
        <div class="wrapper slides-editor" v-else-if="object.component === 'Slider'">
            <div class="slides">
                <div class="slide-box" v-for="item in object.slides" :key="item.id">
                    <p class="slide-box-index"> {{ item.name }} {{ item.id }} </p>
                    <div class="slide-box-params">
                        <h1 class="slide-box-params-heading" contenteditable @keyup="update($event, item.heading)">
                            {{ item.heading }}
                        </h1>
                        <label :for="'slide-box-params-image-' + item.id" class="slide-box-params-image"
                            :class="item.image.url ? '' : 'active'" v-if="!item.image.url && !item.image.resolution">
                            <img src="../src/assets/editor-methods/upload.svg" class="slide-box-params-icon" alt="">
                            <p class="slide-box-params-instruction">
                                Перетащите изображение сюда
                                или <span>загрузите изображение</span>
                            </p>
                            <p class="slide-box-params-format">Формат: jpeg, png, svg.</p>
                            <input type="file" class="slide-box-params-input" @change="slideInputChange($event, item)"
                                :id="'slide-box-params-image-' + item.id" accept="image/*" hidden>
                        </label>
                        <div class="slide-box-params-image" v-else>
                            <img :src="item.image.url" :data-size="'image: ' + item.image.resolution" alt="">
                        </div>
                        <p class="slide-box-params-title" contenteditable @keyup="update($event, item.title)">
                            {{ item.title }}
                        </p>
                        <p class="slide-box-params-description" contenteditable @keyup="update($event, item.description)">
                            {{ item.description }}
                        </p>
                        <button class="slide-box-params-button" :class="!item.button ? '' : 'active'">
                            <input type="text" :placeholder="'Название кнопки'" v-if="!item.button">
                            <p class="slide-box-params-text" contenteditable @keyup="slideButtonChange($event, item.button.value)" v-else> {{ item.button.value }} </p>
                        </button>
                    </div>
                </div>
                <button @click="create(object.slides)" class="slide-button">Создать слайд</button>
            </div>
        </div>

    </div>
</template>

<script>
import StarterKit from '@tiptap/starter-kit'
import { Color } from '@tiptap/extension-color'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import { Editor, EditorContent } from '@tiptap/vue-3'
import draggable from 'vuedraggable'
import { mode } from 'crypto-js'
import Swal from 'sweetalert2'

Color.configure({
    types: ['textStyle']
})

export default {
    components: {
        EditorContent,
        draggable
    },

    props: {
        modelValue: {
            type: String,
            default: '',
        },
        object: {
            type: Object,
            required: true,
        }
    },

    emits: ['update:modelValue'],

    data() {
        return {
            editor: null,
            content: null,
        }
    },

    emits: ['add'],

    watch: {
        modelValue(value) {
            // HTML
            const isSame = this.editor.getHTML() === value

            // JSON
            // const isSame = JSON.stringify(this.editor.getJSON()) === JSON.stringify(value)

            if (isSame) {
                return
            }

            this.editor.commands.setContent(value, false)
        },
    },

    methods: {
        bold() {
            this.editor.commands.toggleBold()
        },
        italic() {
            this.editor.commands.toggleItalic()
        },
        color(e) {
            this.editor.commands.setColor(e.target.value)
        },
        buttonColor(e, value) {
            this.object.button[value] = e.target.value
        },
        select(e) {
            const value = e.target.value

            this.object.button.href = value
            console.log(this.object.button.href)
        },
        input(e) {
            const file = e.target.files[0]
            const url = URL.createObjectURL(file)

            this.object.url.path = url
        },
        slideImage(e, value) {
            const file = e.target.files[0]
            const url = URL.createObjectURL(file)

            value.image.url = url
        },
        newSlide() {
            const item = {
                id: this.object.slides.length + 1,
                name: "slide",
                heading: "Название слайда",
                image: {
                    url: '',
                    resolution: "",
                },
                title: "Титул слайда",
                description: "Описание слайда",
            }

            this.object.slides.push(item)
        },
        update(event, value) {
            const html = event.target.innerHTML
            value = html
4        },
        create(value) {
            const item = {
                id: value.length + 1,
                name: "slide",
                heading: "Название слайда",
                title: "Титул слайда",
                image: {
                    url: "",
                    resolution: ""
                },
                description: "Описание слайда"
            }

            value.push(item)
        },
        slideInputChange(e, input) {
            const file = e.target.files[0]
            const url = URL.createObjectURL(file)
            const resolution = Math.floor(file.size / 1024)

            if (resolution > 3000) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Размер файла больше чем максимум!",
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true,
                });
            } else {
                input.image.url = url
                input.image.resolution = resolution
            }
        },
        slideButtonChange(e, input) {
            const html = e.target.innerHTML 

            input = html
        }
    },

    mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit,
                Color,
                TextStyle
            ],
            content: this.modelValue,
            onUpdate: () => {
                // HTML
                this.$emit('update:modelValue', this.editor.getHTML())

                // JSON
                // this.$emit('update:modelValue', this.editor.getJSON())
            },
        })

        this.content = new Editor({
            extensions: [
                Document,
                Paragraph,
                Text,
                TextStyle,
                Color,
            ],
            content: this.object.text,
            onUpdate: () => {
                // HTML
                this.$emit('update:modelValue', this.content.getHTML())

                // JSON
                // this.$emit('update:modelValue', this.editor.getJSON())
            },
        })
    },

    beforeUnmount() {
        this.editor.destroy()
    },
}
</script>


<style lang="scss" scoped>
@import '../src/assets/scss/slider.scss';

.slides {
    &-editor {
        width: 100%;
    }
}

.box {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
}

.box .wrapper {
    width: 100%;
}

.box:not(:first-of-type) {
    margin-top: 2rem;
}

.btns {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    gap: .4rem;
}

.btn {
    width: 4rem;
    height: 3rem;
    border: none;
    background: #e5e5e5;
    border-radius: .4rem;
    cursor: pointer;
    padding: .85rem;

    &.no-padding {
        padding: 0;
        width: 5rem;
        height: 3rem;
    }
}

.btn img {
    width: 100%;
    height: 100%;
}

.btn:hover {
    background: #ced0d4;
}

.button-input {
    background: #fff;
    border: .1rem solid #ced0d4;
    border-radius: 1rem;
    padding: 1rem 2rem;
    text-align: center;
    outline: none;
    width: 100%;
    max-width: 100%;
    color: #365BA7;

    &::placeholder {
        font-size: 1.5rem;
        line-height: 130%;
        color: #365BA7;
    }

}

.box-methods {
    display: flex;
    flex-direction: column;
    row-gap: .5rem;
    margin-top: 2rem;
}

.box-methods label {
    cursor: pointer;
}

.box-methods label>input {
    border: unset;
    width: 2rem;
    height: 2rem;
}

.box-methods p {
    font-size: 1.2rem;
    color: #8A98AC;
}

.box-methods p+* {
    margin-top: .6rem;
}

.box-editor {
    background: #fff;
    border: .1rem solid #ced0d4;
    padding: 2.4rem;
    border-radius: .4rem;
    width: 100%;
    max-width: 30rem;
}

.link-selector p {
    font-size: 1.5rem;
    line-height: 2.1rem;
}

.link-selector select {
    margin: 0 !important;
    border: unset;
    color: #365BA7;
    background-color: unset;
    font-size: 1.5rem;
    line-height: 2.1rem;
    font-weight: 500;
}

.link-selector {
    display: flex;
    align-items: center;
    gap: .5rem;
}

.image-box {
    border: .1rem solid #8A98AC;
    background: #EFEFEF;
    border-radius: .4rem;
    padding: 1.1rem;
    width: 30rem;
    height: 13.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.image-box-content {
    max-width: 30rem;
    width: 100%;
}

.image-box-content img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.image-box-title {
    font-size: 1.2rem;
    font-weight: 400;
    opacity: .54;
    max-width: 20rem;
    text-align: center;
    margin-top: .8rem;
    margin-bottom: 2rem;
}

.image-box-type {
    font-size: 1.2rem;
    font-weight: 400;
    line-height: 130%;
    opacity: .54;
}

.video-box-content {
    max-width: 30rem;
}

.video-box-content video {
    width: 100%;
    height: 100%;
}
</style>