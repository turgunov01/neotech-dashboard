<template>
    <div class="editor" :style="{
        color: modelValue.component === 'Button' ? modelValue.button.color : '#000000',
    }">
        <div v-if="editor && modules" class="editor-methods">
            <button class="bold" @click="$emit('class', $event), editor.chain().focus().toggleBold().run()"
                :id="'bold'">
                <img src="../../src/assets/editor-methods/bold.svg" alt="">
            </button>
            <button class="italic" id="italic"
                @click="$emit('class', $event), editor.chain().focus().toggleItalic().run()">
                <img src="../../src/assets/editor-methods/italic.svg" alt="">
            </button>
            <!-- <div class="buttons">
                <button class="decrement">-</button>
                <p class="element-fontSize"> {{ fontSize }} </p>
                <button class="increment" @click="increment">+</button>
            </div> -->
            <button @click="editor.chain().focus().toggleUnderline().run()"
                :class="{ 'is-active': editor.isActive('underline') }">
                <img src="../../src/assets/editor-methods/underline.svg" alt="">
            </button>
            <label class="color">
                <input type="color" @input="editor.chain().focus().setColor($event.target.value).run()"
                    :value="editor.getAttributes('textStyle').color">
            </label>
            <div class="positions">
                <div id="position" style="appearance: none;">
                    <button id="start" @click="editor.chain().focus().setTextAlign('left').run()"
                        :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
                        <img src="../../src/assets/editor-methods/text-start.svg" alt="">
                    </button>
                    <button id="center" @click="editor.chain().focus().setTextAlign('center').run()"
                        :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
                        <img src="../../src/assets/editor-methods/text-center.svg" alt="">
                    </button>
                    <button id="end" @click="editor.chain().focus().setTextAlign('right').run()"
                        :class="{ 'is-active': editor.isActive({ textAlign: 'end' }) }">
                        <img src="../../src/assets/editor-methods/text-end.svg" alt="">
                    </button>
                    <button id="justify" @click="editor.chain().focus().setTextAlign('justify').run()"
                        :class="{ 'is-active': editor.isActive({ textAlign: 'justify' }) }">
                        <img src="../../src/assets/editor-methods/text-justify.svg" alt="">
                    </button>
                </div>
            </div>
            <button class="link" @click.self="linkModal = !linkModal">
                LINK
            </button>
            <div class="link-modal" v-if="linkModal" @click.self="linkModal = !linkModal">
                <div class="link-modal-content">
                    <div class="link-modal-input">
                        <p class="link-modal-href">Ссылка</p>
                        <input type="text"
                            @input="editor.commands.setLink({ href: $event.target.value, target: '_blank' }), setLink($event)">
                    </div>
                    <div class="link-modal-buttons">
                        <button @click="linkModal = !linkModal">Сохранить</button>
                        <button @click="linkModal = !linkModal, editor.commands.unsetLink()">Удалить</button>
                    </div>
                </div>
            </div>
        </div>
        <editor-content :editor="editor" />
    </div>
</template>


<script>
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Color } from '@tiptap/extension-color'
import TextStyle from '@tiptap/extension-text-style'
import Text from '@tiptap/extension-text'
import TextAlign from '@tiptap/extension-text-align'
import Link from '@tiptap/extension-link'
import { Editor, EditorContent, FloatingMenu } from '@tiptap/vue-3'

export default {
    components: {
        EditorContent,
        FloatingMenu
    },

    props: {
        modelValue: {
            type: String,
            default: '',
        },
        modules: {
            required: true,
            type: Boolean
        },
        size: {
            required: true,
            type: Number,
            default: 16
        },
    },

    emits: ['update:modelValue', 'class'],

    data() {
        return {
            editor: null,
            isEditable: true,
            linkModal: false,
        }
    },

    methods: {
        increment() {
            this.size++
            console.log()
        },
        setLink(e) {
            const text = e.target.value
            this.editor.commands.unsetLink()
        }
    },

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
        isEditable(value) {
            this.editor.setEditable(value)
        },
    },

    mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit,
                Underline,
                Text,
                TextStyle,
                Color.configure({
                    types: ['textStyle'],
                }),
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
                Link.configure({
                    protocols: ['ftp', 'mailto'],
                    validate: href => /^https?:\/\//.test(href),
                })
            ],
            content: this.modelValue,
            onUpdate: () => {
                // HTML
                this.$emit('update:modelValue', this.editor.getHTML())
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

<style scoped lang="scss">
@import '../../src/assets/scss/buttons.scss';

.buttons {
    display: flex;
    align-items: center;
}

.color {
    width: 6rem;
}

.positions {
    display: flex;
    align-items: center;

    & button {
        &:not(:first-of-type) {
            margin-left: .8rem
        }
    }
}

.link {
    &-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;

        &-href {
            margin-bottom: 1rem;
            text-align: center;
            width: 100%;
        }

        &-content {
            background-color: #fff;
            border-radius: 1rem;
            width: 30rem;
            padding: 2rem 1rem;
            max-width: 100%;
        }

        &-input,
        input {
            width: 90%;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            outline: none;
        }

        &-buttons {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 2rem;
            gap: .4rem;

            & button {
                width: 100%;
                max-width: 15rem;
                margin: 0 auto;
            }
        }
    }
}
</style>