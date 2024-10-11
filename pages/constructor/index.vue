<template>
    <div class="constructor">
        <nav class="nav">
            <Loader :height="'7rem'" v-if="loaded" />
            <div class="nav-media" :style="{
                opacity: !loaded ? '1' : '0',
                transition: '1s'
            }">
                <img src="/assets/mini-logo.svg" class="nav-media-logo" alt="">
                <div class="nav-media-router" @click="$router.back()">
                    <img src="/assets/tick.svg" alt="">
                </div>
                <select name="pages" class="pages-select" @change="choose($event)">
                    <option :value="page.id"
                        :selected="page.id === useRouter().currentRoute.value.query.id ? true : false"
                        v-for="page in pages">{{ page.name?.toUpperCase() }}
                    </option>
                </select>
                <button class="create-page" @click="abilityCreatePage = true">Создать</button>
                <button class="create-page delete" @click="deletePage">Delete</button>
            </div>
            <div class="nav-event">
                <!-- <div class="backward">
                    <img src="/assets/constructor/backward.svg" alt="">
                </div>
                <div class="forward">
                    <img src="/assets/constructor/forward.svg" alt="">
                </div>
                <div class="frame" @click="iframe(true)">
                    <img src="/assets/constructor/play.svg" alt="">
                </div> -->
                <button class="frame publish" @click="load" style="position: relative;">
                    <Loader :height="'100%'" :curved="'.8rem'" v-if="clicked" />
                    Опубликовать
                </button>
            </div>
        </nav>
        <div class="main">
            <div class="wrapper" style="margin-top: 0 !important;">
                <div class="demo">
                    <div class="demo-page">
                        <div class="demo-container">
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
            <button class="create-page submit" @click="createPage">Создать</button>
        </div>
    </div>

</template>

<script lang="ts" setup>
import Constructor from '~/components/Constructor.vue';

import 'grapesjs/dist/css/grapes.min.css';
import "swiper/css";
import { setActivityMiddleware } from '~/middleware/history.activity';

interface Page {
    id: string,
    name?: string,
    route: string,
    length: number | 0,
    sections: Array<any>,
    html: string,
    css: string,
}

const new_name = ref("");
const abilityCreatePage = ref(false);

const closeModalWindow = () => {
    abilityCreatePage.value = !abilityCreatePage.value;
}

const pages = ref([] as Page[])

const getList = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem('Authorization')}`,
        }
    }

    await apiDataFetch(`${uri}/constructor/web`, options)
        .then(response => response.json())
        .then(response => {
            response.forEach((item: any) => {
                pages.value.push(item);
            });
        })

}

const choose = (event: any) => {
    const uid = event.target.value;

    const element = pages.value.find(page => page.id === uid);

    useRouter().push({ query: { id: uid } })
    setTimeout(() => {
        location.reload();
    }, 300);
}

const loaded = ref(true)
const clicked = ref(false)

const deletePage = async () => {
    const query = useRouter().currentRoute.value.query.id;
    const exact = pages.value.find(page => page.id === query);

    console.log(pages.value.length)

    if (pages.value.length === 1) {
        FailedAlert("The default page can not be removed!")
    } else {
        const isDeleted = confirm("Are you sure to delete " + exact?.name + " page");

        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
            }
        }

        if (isDeleted === true) {
            await apiDataFetch(`${uri}/constructor/delete/${query}`, options)
                .then(response => response.json())
                .then(response => {
                    if (response.message) {
                        PushNotification(response.message);
                    }

                    if (response.error) {
                        FailedAlert(response.error);
                    }

                    useRouter().push({ query: {} })

                    setTimeout(() => {
                        location.reload();
                    }, 1000);
                })
        } else {
            PushNotification("Operation canceled")
        }
    }




}

const load = () => {
    clicked.value = true;

    setTimeout(() => {
        clicked.value = false
        // location.reload()
    }, 1500);
}

const createPage = async () => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        },
        body: JSON.stringify({
            name: (new_name.value as any).value,
            html: "",
            css: "",
            sections: []
        })
    };

    await apiDataFetch(`${uri}/constructor/new`, options)
        .then(res => res.json())
        .then(res => {
            const data = res;
            if (data.message) {
                PushNotification(data.message);
            }

            if (data.error) {
                FailedAlert(data.error);
            }
        });

    (new_name.value as any).value = "";
    closeModalWindow()
}

onMounted(async () => {
    setActivityMiddleware(`Зашел в конструктор`, `constructor_opened`);

    loaded.value = false
    init()

    await getList();
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
</style>