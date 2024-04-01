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
        </div>
        <editor-content :editor="editor" />
    </div>
</template>


<script>
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { Editor, EditorContent } from '@tiptap/vue-3'

export default {
    components: {
        EditorContent,
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
        }
    },

    methods: {
        increment() {
            this.size++
            console.log()
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
    },

    mounted() {
        this.editor = new Editor({
            extensions: [
                StarterKit,
                Underline
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
</style>