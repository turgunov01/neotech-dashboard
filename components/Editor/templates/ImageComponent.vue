<template>
    <div :class="`element-item-${identificator}`" class="element" v-if="element.component === 'Image'">
        <label class="image-box" :for="`image-box-${'block-' + Route.id}-${identificator}`"
            v-if="!element.image.src.length">
            <div class="element-icon">
                <img src="../../../src/assets/editor-methods/upload.svg" alt="">
            </div>
            <div class="element-name">
                <p class="element-text">Перетащите изображение сюда
                    или <span>загрузите изображение</span>
                </p>
                <p class="element-text-format">
                    Формат: jpeg, png, svg.
                </p>
            </div>
            <input type="file" hidden ref="fileInput" @change="upload($event, element.image)"
                :id="`image-box-${'block-' + Route.id}-${identificator}`">
        </label>
        <output class="image-box-output" v-else>
            <img :src="element.image.src" alt="">
        </output>
    </div>
</template>

<script lang="ts" setup>

const $router = useRouter()

const Route = ref({
    pathname: $router.currentRoute.value.path,
    id: $router.currentRoute.value.params.id
})


const props = defineProps({
    element: {
        required: true,
        type: Object,
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

</script>

<style scoped lang="scss">
label {
    max-width: 30rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
    height: 100%;
    background: #EFEFEF;
    padding: 2.5rem 0 1.1rem;
    border: .1rem solid #8A98AC;


    & output {
        width: 100%;
        height: 100%;
        max-width: 40rem;
        display: flex;

        & img {
            width: 100%;
        }
    }
}

.element {
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