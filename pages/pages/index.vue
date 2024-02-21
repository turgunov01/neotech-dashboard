<template>
    <div class="pages">
        <Layers />
        <aside class="aside" :class="aside ? 'active' : ''" @mouseleave="activate" v-if="loaded">
            <div class="aside-container">
                <img src="../../src/assets/images/logo.svg" class="aside-logotype" alt="">
                <div class="aside-content">
                    <h1 class="aside-title">Основные блоки</h1>
                    <div class="aside-buttons">
                        <div class="aside-button" @click="create('Title')">
                            <div class="aside-button-icon">
                                <img src="../../src/assets/blocks/h1.svg" alt="" class="aside-button-image">
                            </div>
                            <p class="aside-button-name">Заголовок</p>
                        </div>
                        <div class="aside-button" @click="create('Text')">
                            <div class="aside-button-icon">
                                <img src="../../src/assets/blocks/p.svg" alt="" class="aside-button-image">
                            </div>
                            <p class="aside-button-name">Текст</p>
                        </div>
                        <div class="aside-button" @click="create('Image')">
                            <div class="aside-button-icon">
                                <img src="../../src/assets/blocks/img.svg" alt="" class="aside-button-image">
                            </div>
                            <p class="aside-button-name">Изображение</p>
                        </div>
                        <div class="aside-button" @click="create('Button')">
                            <div class="aside-button-icon">
                                <img src="../../src/assets/blocks/button.svg" alt="" class="aside-button-image">
                            </div>
                            <p class="aside-button-name">Кнопка</p>
                        </div>
                        <!-- <div class="aside-button" @click="create('Table', 'File')">
                            <div class="aside-button-icon">
                                <img src="../../src/assets/blocks/table.svg" alt="" class="aside-button-image">
                            </div>
                            <p class="aside-button-name">Таблица</p>
                        </div>
                        <div class="aside-button">
                            <div class="aside-button-icon">
                                <img src="../../src/assets/blocks/file.svg" alt="" class="aside-button-image">
                            </div>
                            <p class="aside-button-name">Файл</p>
                        </div> -->
                        <div class="aside-button" @click="create('Video')">
                            <div class="aside-button-icon">
                                <img src="../../src/assets/blocks/video.svg" alt="" class="aside-button-image">
                            </div>
                            <p class="aside-button-name">Видео</p>
                        </div>
                        <div class="aside-button" @click="create('Slider')">
                            <div class="aside-button-icon">
                                <img src="../../src/assets/blocks/slides.svg" alt="" class="aside-button-image">
                            </div>
                            <p class="aside-button-name">Слайдер</p>
                        </div>
                        <div class="aside-button" @click="createColumn('Columns')">
                            <div class="aside-button-icon">
                                <img src="../../src/assets/blocks/columns.svg" alt="" class="aside-button-image">
                            </div>
                            <p class="aside-button-name">2 колонки</p>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
        <div class="pages-content" v-if="loaded">
            <draggable :list="list" v-if="list.length">
                <template #item="{ element }">
                    <TiptapEditorVue :object="element" v-model="element.text" :list="list" />
                </template>
            </draggable>
            <button class="more-btns-label" @click="activate">
                +
            </button>
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
import Layers from '~/components/redaktor/layers.vue';

const list = ref([])
const $router = useRouter()
const loaded = ref(false)
const aside = ref(false)

const getComponents = async () => {
    await getIndexData(`/pages/index/block/${$router.currentRoute.value.query.blockID}`)
        .then((response: any) => response.json())
        .then(response => {
            const data = response.data

            if (data.block.components) {
                data.block.components.forEach((item: any) => {
                    list.value.push(item)
                })
            }

            //            console.log(list.value)
        })
}

const save = async () => {

    await putIndexData(`/pages/index/block/${$router.currentRoute.value.query.blockID}`, JSON.stringify(list.value))
        .then(response => response.json())
        .then(async (response) => {
            const data = response
            await toastGood(data.message, data.status ? data.status : 200)
        })

}


const activate = () => {
    aside.value = !aside.value
}

const create = (value: String) => {
    const object = {
        name: "block-name",
        css: "",
        component: value,
        text: null,
        id: list.value.length + 1,
        slides: value === "Slider" ? [
            {
                id: 1,
                name: "slide",
                heading: "Название слайдера",
                image: {
                    url: '',
                    resolution: "",
                },
                title: "Титул слайдера",
                button: {
                    innerText: "Текст кнопки"
                },
                description: "Описание слайдера"
            },
        ] : null,
        url: value === "Video" || value === "Image" ? {
            path: "",
            resolution: "",
            maxResolution: "",
        } : null,
        button: value === "Button" ? {
            innerText: "",
            href: "",
            border: "",
        } : null
    }

    if (value === "Title") {
        object.text = "<h1>Новый Заголовок</h1>"
    } else if (value === "Text") {
        object.text = "<p>Новый текст</p>"
    }

    list.value.push(object)
}

const createColumn = (amount: any) => {
    const element = {
        id: 1,
        component: "Columns",
        blocks: [
            {
                id: 1,
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
        ],
        text: null
    }

    list.value.push(element)


}

onMounted(async () => {
    await getComponents()
    loaded.value = true
})

</script>
  
<style lang="scss">
@import "../../src/assets/scss/aside.scss";

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

.more {
    &-btns {
        &-label {
            color: #8A98AC;
            font-size: 1.8rem;
            border: .2rem solid #EFEFEF;
            background: unset;
            border-radius: .4rem;
            max-width: 5.2rem;
            height: 4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            width: 100%;
            margin-left: 2.4rem;
            margin-top: 2.4rem;

            &.active {
                position: relative;
            }
        }
    }
}
</style>