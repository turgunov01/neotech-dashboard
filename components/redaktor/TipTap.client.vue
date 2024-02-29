<template>
    <div class="editor" :style="{
        color: element.component === 'Button' ? element.button.color : '#000000',
    }">
        <div v-if="editor && modules">
            <button @click="editor.chain().focus().toggleBold().run()"
                :disabled="!editor.can().chain().focus().toggleBold().run()"
                :class="{ 'is-active': editor.isActive('bold') }">
                bold
            </button>
            <button @click="editor.chain().focus().toggleItalic().run()"
                :disabled="!editor.can().chain().focus().toggleItalic().run()"
                :class="{ 'is-active': editor.isActive('italic') }">
                italic
            </button>
            <button @click="editor.chain().focus().toggleStrike().run()"
                :disabled="!editor.can().chain().focus().toggleStrike().run()"
                :class="{ 'is-active': editor.isActive('strike') }">
                strike
            </button>
            <button @click="editor.chain().focus().toggleCode().run()"
                :disabled="!editor.can().chain().focus().toggleCode().run()"
                :class="{ 'is-active': editor.isActive('code') }">
                code
            </button>
            <button @click="editor.chain().focus().unsetAllMarks().run()">
                clear marks
            </button>
            <button @click="editor.chain().focus().clearNodes().run()">
                clear nodes
            </button>
            <button @click="editor.chain().focus().setParagraph().run()"
                :class="{ 'is-active': editor.isActive('paragraph') }">
                paragraph
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }">
                h1
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }">
                h2
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }">
                h3
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
                h4
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
                h5
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
                h6
            </button>
            <button @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'is-active': editor.isActive('bulletList') }">
                bullet list
            </button>
            <button @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'is-active': editor.isActive('orderedList') }">
                ordered list
            </button>
            <button @click="editor.chain().focus().toggleCodeBlock().run()"
                :class="{ 'is-active': editor.isActive('codeBlock') }">
                code block
            </button>
            <button @click="editor.chain().focus().toggleBlockquote().run()"
                :class="{ 'is-active': editor.isActive('blockquote') }">
                blockquote
            </button>
            <button @click="editor.chain().focus().setHorizontalRule().run()">
                horizontal rule
            </button>
            <button @click="editor.chain().focus().setHardBreak().run()">
                hard break
            </button>
            <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
                undo
            </button>
            <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
                redo
            </button>
        </div>
        <TiptapEditorContent :editor="editor" />
    </div>
</template>
  
<script setup>

const $emit = defineEmits(['input'])

const props = defineProps({
    modules: {
        type: Boolean,
        required: true,
        default: true
    },
    element: {
        required: true,
        type: Object,
        default: {}
    }
})

const editor = useEditor({
    content: props.element.text,
    extensions: [TiptapStarterKit],
    onUpdate: () => {
        $emit('input', editor.value.getHTML())
    },
});

watch({
    value(value) {
        const isSame = this.editor.getHTML() === value

        if (isSame) {
            console.log(true)
            return
        }

        editor.value.commands.setContent(value, false)
    }
})

// watch(props.element.text, (value) => {
//     const isSame = editor.value.getHTML() === value

//     if (isSame) return

//     editor.value.commands.setContent(value)

//     console.log(isSame);
// })

</script>
  

<style scoped>
.editor {
    border-bottom: .1rem solid #e5e5e5;
}
</style>