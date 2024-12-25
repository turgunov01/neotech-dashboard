<template>
    <div class="constructor">
        <nav class="nav">
            <Loader :height="'7rem'" v-if="loaded" />
            <div class="nav-media">
                <img src="/assets/mini-logo.svg" class="nav-media-logo" alt="">
                <div class="nav-media-router" @click="$router.back()">
                    <img src="/assets/tick.svg" alt="">
                </div>
                <select name="pages" class="pages-select">
                    <option :value="page.uid"
                        :selected="page.uid === useRouter().currentRoute.value.query.page_id ? true : false"
                        v-for="page in pages">{{ page.name?.toUpperCase() }}
                    </option>
                </select>
                <!-- <button class="create-page" @click="abilityCreatePage = true">Создать</button> -->
                <!-- <button class="create-page delete" @click="deletePage">Delete</button> -->
            </div>
            <div class="nav-event">
                <button class="frame publish" style="position: relative;">
                    <Loader :height="'100%'" :curved="'.8rem'" v-if="loaded" />
                    Опубликовать
                </button>
            </div>
        </nav>
        <div class="main">
            <div class="wrapper" style="margin-top: 0 !important;">
                <div class="demo">
                    <div class="demo-page">
                        <div class="demo-container">
                            <!-- <Loader v-if="loaded" :has-background="true" :height="'100%'" /> -->
                            <Constructor />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="form-wrapper" :class="abilityCreatePage ? 'active' : ''" @click.self="closeModalWindow">
        <div class="form-container">
            <h4 class="form-create">Новая страница</h4>
            <label for="name">
                <p class="form-create-title">Имя</p>
                <input type="text" id="name" ref="new_name" placeholder="Название страницы">
            </label>
            <button class="create-page submit">Создать</button>
        </div>
    </div>

    <div class="project-components" @click.self="toggle()">
        <EditorComponents />
    </div>

    <div class="project-subcomponents" @click.self="toggle()">
        <EditorSubComponents />
    </div>

</template>

<script lang="ts" setup>
import Constructor from '~/components/Constructor.vue';

import 'grapesjs/dist/css/grapes.min.css';
import { FailedAlert, PushNotification } from '~/composables/Notification/list';

const $router = useRouter();
const loaded = ref(false);

const new_name = ref("");
const abilityCreatePage = ref(false);

const closeModalWindow = () => {
    abilityCreatePage.value = !abilityCreatePage.value;
}

const toggle = () => {
    const components = document.querySelector('.project-components') as HTMLElement;
    components.classList.toggle('active');
}

const pages = ref([] as any[])

const getList = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('Authorization')}`,
        }
    }

    await apiDataFetch(`${USER_FETCH_HOST}/constructor/projects?url=${$router.currentRoute.value.query.url}`, options)
        .then(response => response.json())
        .then(response => {
            const data = response;
            data.pages.forEach((item: any) => {
                pages.value.push(item);
            })
        })


}

onMounted(async () => {
    init()

    await getList();
    setTimeout(() => {
        loaded.value = false
    }, 2000);
})


</script>


<style scoped lang="scss">
h1,
h2,
h3,
h4,
h5,
h6,
p,
span {
    color: #344054 !important;
}

.create {
    &-page {
        background: #365BA7;
        color: white;
        height: 3.8rem;
        width: max-content;
        border-radius: .8rem;
        padding: 0 1.4rem;

        &.submit {
            border-radius: .4rem;
            margin-top: 2.4rem;
            width: 100%;
        }

        &.delete {
            background: red
        }
    }
}

.demo-container {
    width: 100% !important;
}

.wrapper {
    display: flex;
}

.form {
    &-wrapper {
        position: fixed;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 9999;
        align-items: center;
        justify-content: center;
        display: none;

        &.active {
            display: flex;
        }
    }

    &-container {
        width: 100%;
        max-width: 40rem;
        height: max-content;
        display: flex;
        flex-direction: column;
        background: white;
        border-radius: .8rem;
        padding: 2.4rem;

        &>label {
            margin-top: 1.2rem;
            width: 100%;
            display: flex;
            flex-direction: column;
            row-gap: .4rem;

            & p {
                font-size: 1.4rem;
                color: #dcdada !important;
            }

            & input {
                width: 100%;
                height: 100%;
                color: black !important;
                background: white !important;
                border: .1rem solid #dcdada !important;
                padding: .6rem 1.2rem;
            }
        }
    }

    &-create {
        font-size: 2.4rem;
        font-weight: 500;
        line-height: 1.5;
        text-align: center;
    }
}

.mirror {
    width: 100%;
    max-width: 100%;
    height: 100%;
    position: fixed;
    z-index: 999;
    background: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    display: flex;
    align-items: center;
    justify-content: center;

    &-player {
        width: 95vw;
        max-width: 1728px;
        height: 80vh;
        border-radius: .8rem
    }
}

.pages {
    &-select {
        background: white;
        color: black;
        border: 1px solid #344054;
        height: 39px;
        border-radius: 5px;
        padding: 5px 10px;
        appearance: none;
    }
}

.project {
    &-components, &-subcomponents {
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 300ms;
        transform: scale(0);

        &.active {
            transform: scale(1);
        }

        &.logged {
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(2px);
        }
    }
}
</style>