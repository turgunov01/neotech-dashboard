<template>
    <div class="pages" v-if="loaded">
        <div class="pages-wrapper">
            <div class="pages-container">
                <h1 class="pages-title">{{ list[Number(Route.id)].name }}</h1>
            </div>
            <div class="pages-content">
                <RedaktorModelsLayers :list="list[Number(Route.id)].blocks" :model="model" @open="model = !model" />
                <div class="pages-editor" v-if="list[Number(Route.id)].blocks && list[Number(Route.id)].blocks.length">
                    <div class="pages-editor-drag">
                        <draggable
                            :list="list[Number(Route.id)].blocks[Route.query].components ? list[Number(Route.id)].blocks[Route.query].components : []">
                            <template #item="{ element, index }" class="element">
                                <div class="element-selector">
                                    <img src="../../src/assets/burger.svg" alt="">
                                    <div class="element-draggable">
                                        <div class="element"
                                            v-if="element.component === 'Title' || element.component === 'Text'">
                                            <RedaktorEditor v-model="element.text" :modules="true"
                                                @class="updateClass($event, element)" />
                                        </div>
                                        <div class="element" v-else-if="element.component === 'Button'">
                                            <div class="element-button">
                                                <div class="element-button-visual">
                                                    <RedaktorTipTap :element="element" :style="{
        'border-color': element.button.borderColor,
        'background-color': element.button.backgroundColor,
        'color': element.button.color
    }" :modules="false" />
                                                </div>
                                                <div class="element-button-labels">
                                                    <label :for="`element-button-background-${index}`"
                                                        class="element-button-label">
                                                        <p class="element-button-label-title">Выбор фона цвета кнопки
                                                        </p>
                                                        <div :style="{
        'background-color': element.button.backgroundColor,
    }" class="element-button-label-rect"></div>
                                                        <input :id="`element-button-background-${index}`" hidden
                                                            type="color" v-model="element.button.backgroundColor" />
                                                    </label>
                                                    <label :for="`element-button-border-${index}`"
                                                        class="element-button-label">
                                                        <p class="element-button-label-title">Выбор цвета контура кнопки
                                                        </p>
                                                        <div :style="{
        'background-color': element.button.borderColor,
    }" class="element-button-label-rect"></div>
                                                        <input :id="`element-button-border-${index}`" hidden
                                                            type="color" v-model="element.button.borderColor" />
                                                    </label>
                                                    <label :for="`element-button-color-${index}`"
                                                        class="element-button-label">
                                                        <p class="element-button-label-title">Выбор цвета текста кнопки
                                                        </p>
                                                        <div :style="{
        'background-color': element.button.color,
    }" class="element-button-label-rect"></div>
                                                        <input :id="`element-button-color-${index}`" hidden type="color"
                                                            v-model="element.button.color" />
                                                    </label>
                                                    <div class="element-button-linker">
                                                        <p class="element-button-linker-title">Открыть -</p>
                                                        <select :id="`element-button-route-${index}-${element.name}`"
                                                            @change="selected($event, element)">
                                                            <option value="/" selected disabled>Выберите страницу
                                                            </option>
                                                            <option v-for="(route, index) in Route.pages"
                                                                :value="route ? route.route : '/'"> {{ route.name }}
                                                            </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="element" v-else-if="element.component === 'Slider'">
                                            <div class="element-sliders">
                                                <div class="element-slider" :id="`element-${index}`"
                                                    v-for="(slide, index) in element.slides">
                                                    <div class="element-slider-text">
                                                        <p class="element-slider-name">
                                                            <span>
                                                                Название слайдера:
                                                            </span>
                                                            <RedaktorEditor :modules="false" v-model="slide.heading" />
                                                        </p>
                                                        <img src="../../src/assets/blocks/chevron.svg"
                                                            class="element-slider-chevron" alt="">
                                                    </div>
                                                    <div class="element-slider-content">
                                                        <div class="element-slider-image">
                                                            <label class="image-box"
                                                                :for="`slider-image-box-${'block-' + Route.id}-${index}`"
                                                                v-if="!slide.image.src.length">
                                                                <div class="element-icon">
                                                                    <img src="../../src/assets/editor-methods/upload.svg"
                                                                        alt="">
                                                                </div>
                                                                <div class="element-name">
                                                                    <p class="element-text">Перетащите изображение сюда
                                                                        или <span>загрузите изображение</span>
                                                                    </p>
                                                                    <p class="element-text">
                                                                        Формат: jpeg, png, svg.
                                                                    </p>
                                                                </div>
                                                                <input type="file" @change="upload($event)" hidden
                                                                    :id="`slider-image-box-${'block-' + Route.id}-${index}`">
                                                            </label>
                                                        </div>
                                                        <div class="element-slider-title">
                                                            <RedaktorEditor :modules="false" v-model="slide.title" />
                                                        </div>
                                                        <div class="element-slider-title">
                                                            <RedaktorEditor :modules="false" v-model="slide.text" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <button class="element-slider-button"
                                                    @click="append(element.slides)">Добавить новый слайд</button>
                                            </div>
                                        </div>
                                        <div class="element" v-if="element.component === 'Image'">
                                            <label class="image-box" :for="`image-box-${'block-' + Route.id}-${index}`"
                                                v-if="!element.image.src.length">
                                                <div class="element-icon">
                                                    <img src="../../src/assets/editor-methods/upload.svg" alt="">
                                                </div>
                                                <div class="element-name">
                                                    <p class="element-text">Перетащите изображение сюда
                                                        или <span>загрузите изображение</span>
                                                    </p>
                                                    <p class="element-text">
                                                        Формат: jpeg, png, svg.
                                                    </p>
                                                </div>
                                                <input type="file" @change="upload($event)" hidden
                                                    :id="`image-box-${'block-' + Route.id}-${index}`">
                                            </label>
                                            <output class="image-box-output" v-else>
                                                <img :src="element.image.src" alt="">
                                            </output>
                                        </div>
                                        <div class="element" v-if="element.component === 'Column' || element.component === 'Columns'">
                                            <div class="element-columns">
                                                <div class="element-column">
                                                    1
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </draggable>
                    </div>
                    <div class="element-event">
                        <button class="pages-button" @click="position">+</button>
                        <div class="element-event-left">
                            <button class="element-event-save" @click="pageUpdate()">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <aside class="aside" v-if="opened" :style="{
        '--top': asideTop ? asideTop : '-100%',
        '--left': asideLeft ? asideLeft : '-100%'
    }">
        <div class="aside-container">
            <ul class="aside-list">
                <li class="aside-item">
                    <button class="aside-button" @click="create('Title')" data-type="Title">
                        <div class="aside-button-image">
                            <img src="../../src/assets/blocks/h1.svg" class="type" alt="">
                        </div>
                        <p class="type-name">Заголовок</p>
                    </button>
                </li>
                <li class="aside-item">
                    <button class="aside-button" @click="create('Text')" data-type="Text">
                        <div class="aside-button-image">
                            <img src="../../src/assets/blocks/p.svg" class="type" alt="">
                        </div>
                        <p class="type-name">Текст</p>
                    </button>
                </li>
                <li class="aside-item">
                    <button class="aside-button" @click="create('Button')" data-type="Button">
                        <div class="aside-button-image">
                            <img src="../../src/assets/blocks/button.svg" class="type" alt="">
                        </div>
                        <p class="type-name">Кнопка</p>
                    </button>
                </li>
                <li class="aside-item">
                    <button class="aside-button" @click="create('Column')" data-type="Column">
                        <div class="aside-button-image">
                            <img src="../../src/assets/blocks/columns.svg" class="type" alt="">
                        </div>
                        <p class="type-name">Колонка</p>
                    </button>
                </li>
                <li class="aside-item">
                    <button class="aside-button" @click="create('Image')" data-type="Image">
                        <div class="aside-button-image">
                            <img src="../../src/assets/blocks/img.svg" class="type" alt="">
                        </div>
                        <p class="type-name">Картинка</p>
                    </button>
                </li>
                <li class="aside-item">
                    <button class="aside-button" @click="create('Video')" data-type="Video">
                        <div class="aside-button-image">
                            <img src="../../src/assets/blocks/video.svg" class="type" alt="">
                        </div>
                        <p class="type-name">Видео</p>
                    </button>
                </li>
                <li class="aside-item">
                    <button class="aside-button" @click="create('Slider')" data-type="Slider">
                        <div class="aside-button-image">
                            <img src="../../src/assets/blocks/slides.svg" class="type" alt="">
                        </div>
                        <p class="type-name">Слайдер</p>
                    </button>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';
// Using references to use dynamic variables
import { ref } from 'vue'

const loaded = ref(false)

// Neccessary components' variables
const list = ref([])
const layers = ref([])
const $router = useRouter()
const opened = ref(false)

// Draggable component
const component = defineComponent(draggable)

// Route information for using in the component
const Route = ref({
    id: $router.currentRoute.value.params.id,
    path: $router.currentRoute.value.path,
    query: $router.currentRoute.value.query.block,
})

// Opens the modal window which creates a new block inside of the Route.value.layers and declares it in blocks list.
// Pushes immediately into server
const model = ref(false)

// Get all data by route and by default for editing
const getData = async () => {
    await getIndexData("/pages/")
        .then((response: any) => response.json())
        .then((response: Response | any) => {

            // response.data.pages.forEach((page: Object | any) => {
            //     Route.value.pages.push(page)
            // })

            response.data.pages.forEach((pages: Object | any) => {
                list.value.push(pages)
            })

            // console.log(list.value[Route.value.id].blocks[Route.value.query].components)
            return

            const data = response.data.pages[Number($router.currentRoute.value.params.id)]
            Route.value.name = data.name

            data.blocks.forEach((block: any, index: Number) => {
                Route.value.layers.push(block)

                console.log(block)

                if (index === Number(Route.value.query) && block.components.length) {
                    block.components.forEach((component: any, index: Number) => {
                        Route.value.components.push(component)
                    })
                }
            });

        })
}

// Add Class to block
const updateClass = (e: MouseEvent | any, fields: Object | any) => {
    fields.css = []
    fields.css.push(e.target.id)
}

// aside positioning on active\clicked

// Aside positions for further deletion of the components 
const asideTop = ref(0)
const asideLeft = ref(0)

// Function which calculates the position and the distances for aside
const position = () => {
    const button = document.querySelector(".pages-button")

    const rect = button?.getBoundingClientRect()

    asideTop.value = `${(rect?.top + 40) / 10}rem`
    asideLeft.value = `${(rect?.left) / 10}rem`
    opened.value = !opened.value

}

// Create an element with the target component/dataset ("data-type")
const create = (val: String) => {
    const object = {
        name: `Block-${val}`,
        component: val,
        text: "",
        url: {},
        slides: [],
        image: {},
        video: {},
        button: {},
        columns: []
    }



    switch (val) {
        case "Title":
            object.text = "<h1>Новый заголовок</h1>"
            break;
        case "Text":
            object.text = "<p>Новый текст</p>"
            break;
        case "Button":
            object.button = {
                text: "Кнопка",
                route: "",
                color: "",
                backgroundColor: "",
                borderColor: ""
            }
            break;
        case "Column":
            object.column = {
                title: "<h1>Новый заголовок</h1>",
                text: "<p>Новый текст</p>",
                image: {},
                // isNoImage is false only text content if true no text content
                isNoImage: true,
            }
            break;
        case "Image":
            object.image = {
                src: "",
                alt: "",
            }
            break;
        case "Video":
            object.video = {
                src: "",
                alt: "",
            }
            break;
    }

    if (val === "Slider") {
        const slide = {
            title: "",
            heading: "",
            text: "",
            image: {
                src: "",
                alt: "",
            },
        }
        object.slides.push(slide)
    }

    list.value[Number(Route.value.id)].blocks[Number(Route.value.query)].components.push(object)
    opened.value = false
    return
}

// Update the image in the route and push to server
// const upload = async (e: MouseEvent | any) => {
//     const file = e.target.files[0]



//     const formData = new FormData()
//     formData.append("image", file)

//     await postImage("/upload", formData)
//         .then(response => response.json())
//         .then((response: Response | any) => {
//             console.log(response)
//         })

// }

// Button color customization
const color = ref({
    backgroundColor: "",
    borderColor: ""
})

// GET select value
const selected = (e: MouseEvent | any, element: Object | any) => {
    const value = e.target.value
    element.button.route = value
}

// Create a new slide with params parent
const append = (parent: Array<Object>) => {
    const slide = {
        title: "",
        heading: "",
        text: "",
        image: {
            src: "",
            alt: "",
        },
    }
    parent.push(slide)
    console.log(parent)
}

// Update the page with the current page block:id
const pageUpdate = async () => {
    const index = list.value[Number(Route.value.id)]
    await postIndexData(`/pages/${Route.value.id}/update?block=${Route.value.query}`, JSON.stringify(index))
        .then(response => response.json())
        .then((response: Response | any) => {
            console.log(response)
        })
}

onMounted(async () => {
    await getData()

    if (!Route.value.query) {
        $router.push({ query: { block: 0 } })
        setTimeout(() => {
            location.reload()
        }, 300);
    }

    loaded.value = true
})

</script>

<style lang="scss" scoped>
@import '../../src/assets/scss/pages.scss'
</style>