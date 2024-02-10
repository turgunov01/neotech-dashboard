<template>
    <div class="pages">
        <Layers />
        <div class="pages-content">
            <draggable :list="list">
                <template #item="{ element }">
                    <TiptapEditorVue :object="element" v-model="element.text" />
                </template>
            </draggable>
            <div class="buttons">
                <button class="save" @click="save">Сохранить</button>
                <button class="edit">Опубликовать</button>
            </div>
        </div>
    </div>
</template>
  
<script setup lang="ts">
import draggable from 'vuedraggable'
import TiptapEditorVue from '~/components/TiptapEditor.vue';
import ButtonEditor from '~/components/redaktor/blocks/ButtonEditor.vue';
import Layers from '~/components/redaktor/layers.vue';

const list = ref([
    {
        name: "block-name",
        css: "",
        component: "Title",
        text: "<h1>профессиональная команда с мировым опытом в IT-разработке, которая ценит индивидуальность, ответственность и взаимный рост, стремясь к устойчивым результатам</h1>",
        id: 1,
    },
    {
        name: "block-name",
        css: "",
        component: "Text",
        text: "<p>профессиональная команда с мировым опытом в IT-разработке, которая ценит индивидуальность, ответственность и взаимный рост, стремясь к устойчивым результатам</p>",
        id: 2,
    },
    {
        name: "block-name",
        text: "<p>A Vue.js wrapper component for tiptap to use v-model</p>",
        css: "",
        component: "Button",
        button: {
            innerText: "",
            href: "",
            background: "",
            border: ""
        },
        id: 3,
    },
    {
        name: "block-name",
        url: {
            path: "",
            resolution: "",
            maxResolution: "",
        },
        alt: "",
        component: "Image",
        id: 4,
    },
    {
        name: "block-name",
        url: {
            path: "",
            resolution: "",
            maxResolution: "",
        },
        alt: "",
        component: "Video",
        id: 5,
    },
    {
        name: "block-name",
        component: "Slider",
        id: 6,
        slides: [
            {
                id: 1,
                name: "slide",
                heading: "IT - проекты",
                image: {
                    url: '',
                    resolution: "",
                },
                title: "Построение комплексных решений для проектов под ключ",
                button: {
                    value: "Подробнее"
                },
                description: "Наша компания специализируется на реализации самых разнообразных проектов — от простых интернет-магазинов до высокотехнологичных заказных программных решений."
            },
            {
                id: 2,
                name: "slide",
                heading: "IT - проекты",
                image: {
                    url: '',
                    resolution: "",
                },
                title: "Построение комплексных решений для проектов под ключ",
                description: "Наша компания специализируется на реализации самых разнообразных проектов — от простых интернет-магазинов до высокотехнологичных заказных программных решений."
            },
        ]
    }
])

const save = () => {
    console.log(list.value)
}



</script>
  
<style lang="scss">
.pages {
    display: flex;
    width: 100%;
    gap: 2rem;

    &-content {
        width: 100%;
        border: .1rem solid #e5e5e5;
        padding: .8rem 1.6rem;
        padding-bottom: 2.4rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
}

/* Basic editor styles */
.tiptap {
    >*+* {
        margin-top: 0.75em;
    }

    code {
        background-color: rgba(#616161, 0.1);
        color: #616161;
    }

    & * {
        color: #365BA7;
    }
}

.content {
    padding: 1rem 0 0;

    h3 {
        margin: 1rem 0 0.5rem;
    }

    pre {
        border-radius: 5px;
        color: #333;
    }

    code {
        display: block;
        white-space: pre-wrap;
        font-size: 0.8rem;
        padding: 0.75rem 1rem;
        background-color: #e9ecef;
        color: #495057;
    }
}

.buttons {
    display: flex;
    gap: 1rem;
    margin-top: 5rem;
}

.save {
    background: #E2F0FD;
    border: none;
    padding: 1.1rem 4.2rem;
    width: max-content;
    color: #365BA7;
    border-radius: .4rem;
    font-size: 1.5rem;
    font-weight: 500;
}

.edit {
    background: #E4F8EE;
    border: none;
    padding: 1.1rem 4.2rem;
    width: max-content;
    color: #18D26B;
    border-radius: .4rem;
    font-size: 1.5rem;
    font-weight: 400;
}
</style>