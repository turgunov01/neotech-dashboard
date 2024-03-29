<template>
    <div class="pages" v-if="loaded">
        <div class="pages-wrapper">
            <div class="pages-container">
                <h1 class="pages-title">{{ list[Number(Route.id)].name }}</h1>
                <div class="pages-locale">
                    <button @click="redirectTo($event)" id="ru"
                        :class="$router.currentRoute.value.path.includes('ru') ? 'active' : ''"
                        class="pages-locale-button">Русский</button>
                    <button @click="redirectTo($event)" id="en"
                        :class="$router.currentRoute.value.path.includes('en') ? 'active' : ''"
                        class="pages-locale-button">Английский</button>
                    <button @click="redirectTo($event)" id="uz"
                        :class="$router.currentRoute.value.path.includes('uz') ? 'active' : ''"
                        class="pages-locale-button">Узбекский</button>
                </div>
            </div>
            <div class="pages-content">
                <RedaktorModelsLayers :list="list[Number(Route.id)]" :model="model" :edit-model="editModel"
                    @save="pageUpdate" @open="model = !model" />
                <div class="pages-editor" v-if="list[Number(Route.id)].blocks && list[Number(Route.id)].blocks.length">
                    <div class="pages-editor-drag">
                        <draggable :list="list[Number(Route.id)].blocks[Route.query].components">
                            <template #item="{ element, index }" class="element">
                                <div class="element-selector">
                                    <img src="../../../src/assets/burger.svg" @click="toggleModal($event)" alt="">
                                    <aside class="element-delete-request">
                                        <p class="element-request-text">
                                            Удалить блок?
                                        </p>
                                        <div class="element-request-buttons">
                                            <button class="element-request-button"
                                                @click="deleteNode(index, $event)">Да</button>
                                            <button class="element-request-button">Нет</button>
                                        </div>
                                    </aside>
                                    <div class="element-draggable">
                                        <div class="element"
                                            v-if="element.component === 'Title' || element.component === 'Text'">
                                            <RedaktorEditor v-model="element.locale[lang].text" :modules="true"
                                                @class="updateClass($event, element)" />
                                        </div>
                                        <div class="element" v-else-if="element.component === 'Button'">
                                            <div class="element-button">
                                                <div class="element-button-visual">
                                                    <RedaktorBlocksButtonEditor :element="element.button"
                                                        :modules="false" />
                                                </div>
                                                <div class="element-button-labels">
                                                    <label :for="`element-button-background-${index}`"
                                                        class="element-button-label">
                                                        <p class="element-button-label-title">Выбор фона цвета кнопки
                                                        </p>
                                                        <div class="element-button-label-rect"></div>
                                                        <input :id="`element-button-background-${index}`" hidden
                                                            type="color" v-model="element.button.backgroundColor" />
                                                    </label>
                                                    <label :for="`element-button-border-${index}`"
                                                        class="element-button-label">
                                                        <p class="element-button-label-title">Выбор цвета контура кнопки
                                                        </p>
                                                        <div class="element-button-label-rect"></div>
                                                        <input :id="`element-button-border-${index}`" hidden
                                                            type="color" v-model="element.button.borderColor" />
                                                    </label>
                                                    <label :for="`element-button-color-${index}`"
                                                        class="element-button-label">
                                                        <p class="element-button-label-title">Выбор цвета текста кнопки
                                                        </p>
                                                        <div class="element-button-label-rect"></div>
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
                                                        <img src="../../../src/assets/blocks/chevron.svg"
                                                            class="element-slider-chevron" alt="">
                                                    </div>
                                                    <div class="element-slider-content">
                                                        <div class="element-slider-image">
                                                            <label class="image-box"
                                                                :for="`slider-image-box-${'block-' + Route.id}-${index}`"
                                                                v-if="!slide.image.src.length">
                                                                <div class="element-icon">
                                                                    <img src="../../../src/assets/editor-methods/upload.svg"
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
                                                                <input type="file" @change="upload($event, slide.image)"
                                                                    hidden
                                                                    :id="`slider-image-box-${'block-' + Route.id}-${index}`">
                                                            </label>
                                                            <output class="image-box-output" v-else>
                                                                <img :src="slide.image.src" alt="">
                                                            </output>
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
                                                    <img src="../../../src/assets/editor-methods/upload.svg" alt="">
                                                </div>
                                                <div class="element-name">
                                                    <p class="element-text">Перетащите изображение сюда
                                                        или <span>загрузите изображение</span>
                                                    </p>
                                                    <p class="element-text">
                                                        Формат: jpeg, png, svg.
                                                    </p>
                                                </div>
                                                <input type="file" hidden ref="fileInput"
                                                    @change="upload($event, element.image)"
                                                    :id="`image-box-${'block-' + Route.id}-${index}`">
                                            </label>
                                            <output class="image-box-output" v-else>
                                                <img :src="element.image.src" alt="">
                                            </output>
                                        </div>
                                        <div class="element"
                                            v-if="element.component === 'Column' || element.component === 'Columns'">
                                            <div class="element-columns">
                                                <div class="element-column" v-for="(column, index) in element.columns"
                                                    :key="index">
                                                    <label class="image-box"
                                                        :for="`image-box-${'block-' + Route.id}-${index}`"
                                                        v-if="!column.image.src">
                                                        <div class="element-icon">
                                                            <img src="../../../src/assets/editor-methods/upload.svg"
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
                                                        <input type="file" hidden ref="fileInput"
                                                            @change="upload($event, column.image)"
                                                            :id="`image-box-${'block-' + Route.id}-${index}`">
                                                    </label>
                                                    <output class="image-box-output" v-else>
                                                        <img :src="column.image.src" alt="">
                                                    </output>
                                                    <div class="element-column-textarea">
                                                        <div class="element-column-title">
                                                            <RedaktorEditor :modules="true" v-model="column.title" />
                                                        </div>
                                                        <div class="element-column-text">
                                                            <RedaktorEditor :modules="true" v-model="column.text" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <button class="element-column-button"
                                                @click="appendColumn(element.columns)">Добавить новую
                                                колонну</button>
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
import draggable from 'vuedraggable';
// Using references to use dynamic variables
import { ref } from 'vue'

const loaded = ref(false)

// Neccessary components' variables
const list = ref([])
const layers = ref([])
const $router = useRouter()
const opened = ref(false)

const deleteModal = ref(false)

const lang = getLanguage()

const fileInput = ref(null)

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
const editModel = ref(false)

// Get all data by route and by default for editing
const getData = async () => {
    await getIndexData("/pages/")
        .then((response: any) => response.json())
        .then((response: Response | any) => {
            response.data.pages.forEach((pages: Object | any) => {
                list.value.push(pages)
            })

            // console.log(list.value[Route.value.id].blocks[Route.value.query].components)
            return
        })

    await currentComponent()
}

const currentComponent = async () => {
    await getIndexData(`/pages/${Route.value.id}`)
        .then((response: Response | any) => response.json())
        .then((response: Response | any) => {
            const data = response

            const component = data.page

            try {
                if ($router.currentRoute.value.query.block) return
                $router.push({ path: $router.currentRoute.value.path, query: { block: 0 } })
                setTimeout(() => {
                    location.reload()
                }, 300);
            } catch (err) {
                console.log(err)
            }

        })
        .catch((error: Error | any) => {
            if (error) console.log(error)
        })
}

// Toggling the delete window
const toggleModal = (e: MouseEvent | any) => {
    deleteModal.value = !deleteModal.value
    const modals = document.querySelectorAll(".element-delete-request")
    modals.forEach((modal: any) => {
        modal.classList.remove("active")
    })

    e.target.nextSibling.classList.add("active")
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
        locale: {
            en: {
                text: ""
            },
            ru: {
                text: ""
            },
            uz: {
                text: ""
            },
        },
        url: {},
        slides: [],
        image: {},
        video: {},
        button: {},
        columns: []
    }



    switch (val) {
        case "Title":
            object.locale["ru"].text = "<h1>Новый заголовок</h1>"
            object.locale["en"].text = "<h1>Newborn Title</h1>"
            object.locale["uz"].text = "<h1>Yangi Titul</h1>"
            break;
        case "Text":
            object.locale["ru"].text = "<p>Новый Текст</p>"
            object.locale["en"].text = "<p>New Text</p>"
            object.locale["uz"].text = "<p>Yangi Tekst</p>"
            break;
        case "Button":
            object.button = {
                locale: {
                    ru: {
                        text: "Новая кнопка",
                        url: {
                            text: "Ссылка",
                            placeholder: "Введите ссылку"
                        }
                    },
                    en: {
                        text: "New Button",
                        url: {
                            text: "Link",
                            placeholder: "Enter link"
                        }
                    },
                    uz: {
                        text: "Yangi knopka",
                        url: {
                            text: "Knopka",
                            placeholder: "Ssilkani kiriting"
                        }
                    }
                },
                route: "",
                color: "",
                backgroundColor: "",
                borderColor: ""
            }
            break;
        case "Column":
            const newColumn = {
                locale: {
                    en: {
                        title: "<h1>New Column Title</h1>",
                        text: "<p>New Column Text</p>",
                    },
                    ru: {
                        title: "<h1>Новый заголовок</h1>",
                        text: "<p>Новый текст</p>",
                    },
                    uz: {
                        title: "<h1>Yangi sarlavha</h1>",
                        text: "<p>Yangi tekst</p>",
                    }
                },
                image: {},
                // isNoImage is false only text content if true no text content
                hasNoImage: true,
            }
            object.columns.push(newColumn)
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
            locale: {
                en: {
                    title: "<h1>New Slide Title</h1>",
                    text: "<p>New Slide Text</p>",
                },
                ru: {
                    title: "<h1>Новый заголовок</h1>",
                    text: "<p>Новый текст</p>",
                },
                uz: {
                    title: "<h1>Yangi sarlavha</h1>",
                    text: "<p>Yangi tekst</p>",
                }
            },
            image: {
                src: "",
                alt: "",
            },
        }
        object.slides.push(slide)
    }

    console.log(object)
    list.value[Number(Route.value.id)].blocks[Number(Route.value.query)].components.push(object)
    opened.value = false
    return
}

// Update the image in the route and push to server
const upload = async (e: MouseEvent | any, value: Object | any) => {

    // Create FormData object
    const formData = new FormData();

    // Append the image file to FormData with a custom key ('image' in this example)
    formData.append('image', e.target.files[0]);

    // Create and configure a new XMLHttpRequest object
    const xhr = new XMLHttpRequest();

    xhr.open('POST', `${baseURI()}/api/upload`, true);

    // Set the Authorization header with the bearer token
    xhr.setRequestHeader('Authorization', `Bearer ${await checkToken()}`);

    // Set up an event listener to track the upload progress
    xhr.upload.addEventListener('progress', function (event) {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            console.log(`Upload Progress: ${percentComplete}%`);
        }
    });

    xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
            const response = JSON.parse(xhr.response)
            debugger
            value.src = response.route
            console.log(response)
        }
    })

    // Set up the event listener for when there is an error during the upload
    xhr.addEventListener('error', function () {
        console.error('There was an error during the upload.');
    });

    // Send the FormData object with the image
    xhr.send(formData);
}

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
        locale: {
            ru: {
                text: "",
            },
            en: {
                text: "",
            },
            uz: {
                text: "",
            }
        },
        image: {
            src: "",
            alt: "",
        },
    }
    parent.push(slide)
    console.log(parent)
}

// Create a new column with params parent
const appendColumn = (parent: Array<Object>) => {
    const object = {
        locale: {
            ru: {
                title: "",
                text: "",
            },
            en: {
                title: "",
                text: "",
            },
            uz: {
                title: "",
                text: "",
            }
        },
        image: {},
        hasNoImage: true
    }

    if (parent) parent.push(object)
    else throw new Error("Failed to create column!")
}

// Update the page with the current page block:id
const pageUpdate = async () => {
    const index = list.value[Number(Route.value.id)]
    await postIndexData(`/pages/${Route.value.id}/update?block=${Route.value.query}`, JSON.stringify(index))
        .then(response => response.json())
        .then((response: Response | any) => {
            console.log(response)
            if (response) {
                setTimeout(() => {
                    location.reload()
                }, 300);
            }
        })
}

// Deleting component 
const deleteNode = async (val: Number | any, e: MouseEvent | any) => {
    const array = list.value[Number(Route.value.id)].blocks[Number(Route.value.query)].components.filter((item: any, index: number) => index !== val)
    list.value[Number(Route.value.id)].blocks[Number(Route.value.query)].components = array
    pageUpdate()
}

// Change localization on the localStorage
const redirectTo = async (e: MouseEvent) => {
    const store = localStorage.getItem('lang')

    if (store) {
        await localStorage.removeItem('lang')
        await localStorage.setItem("lang", e.target?.id)

        $router.push({ path: `/pages/${await getLanguage()}/${$router.currentRoute.value.params.id}` })
        setTimeout(() => {
            location.reload()
        }, 1000);
        return
    }

    await localStorage.setItem("lang", e.target?.id)
    $router.push({ path: `/pages/${await getLanguage()}/${$router.currentRoute.value.params.id}` })
    setTimeout(() => {
        location.reload()
    }, 400);
    return
}

onMounted(async () => {
    await getData()

    if (!Route.value.query) {
        await $router.push({ path: `/pages/${getLanguage()}/${$router.currentRoute.value.params.id}`, query: { block: 0 } })
        setTimeout(() => {
            location.reload()
        }, 200);
    }

    loaded.value = true
})

</script>

<style lang="scss" scoped>
@import '../../../src/assets/scss/pages.scss';

.pages {
    &-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &-locale {
        display: flex;
        align-items: center;

        &-button {
            background: unset;
            width: 12rem;
            height: 4rem;
            display: flex;
            align-items: center;
            justify-content: center;
            border: .1rem solid #e5e5e5;

            &.active {
                background: #F1F9FE;
                color: #0054FF;
                font-size: 1.5rem;
                font-weight: 500;
                line-height: 2.1rem;
            }
        }
    }
}

.element {

    &-request {
        &-buttons {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            width: 100%;
            margin-top: 1rem;

            & button {
                width: 10rem;
                height: 4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                font-size: 1.5rem;
                line-height: 110%;
                font-weight: 500;
                border-radius: .4rem;

                &:nth-of-type(1) {
                    background: #E2F0FD;
                    color: #0054FF;
                }

                &:nth-of-type(2) {
                    background: #FBE9EA;
                    color: #FF3F3F;
                }

                &.active {
                    background: #F1F9FE;
                    color: #0054FF;
                    font-size: 1.5rem;
                    font-weight: 500;
                    line-height: 2.1rem;
                }
            }
        }
    }

    &-delete {
        &-request {
            display: none;
            position: absolute;
            top: 0;
            left: 4rem;
            box-shadow: 0 0 .4rem rgba(0, 0, 0, 0.2);
            z-index: 100;

            &.active {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                row-gap: 2rem;
                background: white;
                padding: 2rem;
            }
        }
    }

    &-selector {
        position: relative;
    }
}
</style>