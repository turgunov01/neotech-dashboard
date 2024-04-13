<template>
    <div :class="`element-item-${identificator}`" class="element" v-if="loaded">
        <div class="element-sliders">
            <div class="element-slider" :id="`element-${index}`" v-for="(slide, index) in element.slides">
                <div class="element-slider-text">
                    <p class="element-slider-name">
                        <span>
                            Название слайдера:
                        </span>
                        <EditorComponentEditor :modules="false" v-model="slide.locale[locale].heading" />
                    </p>
                    <img src="../../../src/assets/blocks/chevron.svg" class="element-slider-chevron" alt="">
                </div>
                <div class="element-slider-content">
                    <div class="element-slider-image">
                        <label class="image-box" :for="`slider-image-box-${'block-' + Route.id}-${index}`"
                            v-if="!slide.image.src.length">
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
                            <input type="file" @change="upload($event, slide.image)" hidden
                                :id="`slider-image-box-${'block-' + Route.id}-${index}`">
                        </label>
                        <output class="image-box-output" v-else>
                            <img :src="slide.image.src" alt="">
                        </output>
                    </div>
                    <div class="element-slider-title">
                        <EditorComponentEditor :modules="false" v-model="slide.locale[locale].title" />
                    </div>
                    <div class="element-slider-title">
                        <EditorComponentEditor :modules="false" v-model="slide.locale[locale].text" />
                    </div>
                </div>
            </div>
            <button class="element-slider-button" @click="append(element.slides)">Добавить новый слайд</button>
        </div>
    </div>
</template>


<script lang="ts" setup>

const locale = ref("")

const $router = useRouter()

const Route = ref({
    id: $router.currentRoute.value.params.id,
    pathname: $router.currentRoute.value.path
})

const loaded = ref(false)

const props = defineProps({
    element: {
        required: true,
        type: Object
    },
    identificator: {
        required: true,
        type: Number
    }
})

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
        }
    })

    // Set up the event listener for when there is an error during the upload
    xhr.addEventListener('error', function () {
        console.error('There was an error during the upload.');
    });

    // Send the FormData object with the image
    xhr.send(formData);
}

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

onMounted(async () => {
    locale.value = await (getLanguage() as string)
    loaded.value = !loaded.value
})

</script>

<style lang="scss" scoped>
.element {
    width: 100%;

    &-sliders {
        display: flex;
        flex-direction: column;
        row-gap: 1.2rem;
        align-items: flex-start;
        justify-content: flex-start;
        width: 100%;
    }

    &-slider {
        border: .1rem solid #e5e5e5;
        border-radius: .4rem;
        width: 100%;
        height: 7.5rem;
        overflow: hidden;
        transition: 1s;

        &:hover {
            overflow: visible;
            height: 100%;
        }

        & .editor {
            border-bottom: .1rem solid #e5e5e5;
        }

        & input {
            border: unset;
            outline: none;
            background: unset;
            border-bottom: .1rem solid #e5e5e5;
            width: 100%;
        }

        &-text {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 2.4rem 3.2rem;
            border-bottom: .1rem solid #e5e5e5;
        }

        &-content {
            padding: 2.4rem 3.2rem !important;

            display: flex;
            flex-direction: column;
            row-gap: 3.2rem;
        }

        &-name {
            display: flex;
            align-items: center;
            gap: .5rem;
            width: 100%;

            & input {
                width: max-content;
                margin-left: 1rem;
            }

            & span {
                font-size: 2rem;
                line-height: 130%;
            }

            & .editor {
                width: 100%;
                max-width: max-content;
                min-width: 10rem;
            }
        }

        &-button {
            color: #FFA800;
            background: #FFA80020;
            padding: 1.1rem 5.3rem;
            font-size: 1.5rem;
            line-height: 2.1rem;
            border-radius: .4rem;
            border: none;
            margin-top: 1.2rem;
            width: max-content
        }
    }

    & label {
        width: 100%;
        max-width: 30rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        height: 100%;
        text-align: center;
        padding-top: 3rem;
    }

    &-icon {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 1rem;

        & img {
            width: 3rem;
        }
    }

    &-name {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        & .element-text {
            font-size: 1.4rem;
            margin-bottom: 2.5rem;
            margin-top: .8rem;
            color: #0000008A;

            & span {
                cursor: pointer;
                text-decoration: underline;
            }

        }

        & .element-text-format {
            font-size: 1.2rem;
            color: #0000008A;
        }
    }
}
</style>