<template>
    <aside class="aside" :style="{
        '--top': top ? top : '-100%',
        '--left': left ? left : '-100%'
    }
        ">
        <div class="aside-container">
            <ul class="aside-list">
                <li class="aside-item" v-for="(type, index) in types">
                    <button class="aside-button" :data-type="type.type" @click="create(type.type), $emit('convert')">
                        <div class="aside-button-image">
                            <img :src="type.image" class="type" alt="Картинка не загрузилась!">
                        </div>
                        <p class="type-name">{{ type.name }}</p>
                    </button>
                </li>
            </ul>
        </div>
    </aside>
</template>

<script lang="ts" setup>
import '~/src/assets/scss/models/FloatingMenu.scss'

const $router = useRouter()

const emits = defineEmits(['create', 'convert'])

const types = [
    {
        name: "Заголовок",
        type: "Title",
        image: "/_nuxt/src/assets/blocks/h1.svg"
    },
    {
        name: "Текст",
        type: "Text",
        image: "/_nuxt/src/assets/blocks/p.svg"
    },
    {
        name: "Кнопка",
        type: "Button",
        image: "/_nuxt/src/assets/blocks/button.svg"
    },
    {
        name: "Колонна",
        type: "Column",
        image: "/_nuxt/src/assets/blocks/columns.svg"
    },
    {
        name: "Картинка",
        type: "Image",
        image: "/_nuxt/src/assets/blocks/img.svg"
    },
    {
        name: "Слайдер",
        type: "Slider",
        image: "/_nuxt/src/assets/blocks/slides.svg"
    },
]

const Route = ref({
    id: $router.currentRoute.value.params.id,
    query: $router.currentRoute.value.query.block
})

const props = defineProps({
    top: {
        required: true,
        type: String,
        default: 0
    },
    left: {
        required: true,
        type: String,
        default: 0
    },
    list: {
        required: true,
        type: Array
    }
})

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
            object.columns.push(newColumn as never)
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
        object.slides.push(slide as never)
    }

    (props.list[Number(Route.value.id as any)] as any).blocks[Number(Route.value.query)].components.push(object);
    return
}

</script>
