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
                <input type="text" placeholder="Neotech Веб-сайт" value="Neotech Веб-сайт">
                <select name="pages" class="pages-select" @change="choose($event)">
                    <option :value="page.id"
                        :selected="page.id === useRouter().currentRoute.value.query.uid ? true : false"
                        v-for="page in pages">{{ page.name?.toUpperCase() }}
                    </option>
                </select>
            </div>
            <div class="nav-event">
                <div class="backward">
                    <img src="/assets/constructor/backward.svg" alt="">
                </div>
                <div class="forward">
                    <img src="/assets/constructor/forward.svg" alt="">
                </div>
                <div class="frame" @click="iframe(true)">
                    <img src="/assets/constructor/play.svg" alt="">
                </div>
                <button class="frame publish" @click="load" style="position: relative;">
                    <Loader :height="'100%'" :curved="'.8rem'" v-if="clicked" />
                    Опубликовать
                </button>
            </div>
        </nav>
        <div class="main">
            <div class="wrapper" style="margin-top: 0 !important;">
                <aside class="aside" style="position: relative;">
                    <ConstructorSidebarElements />
                </aside>
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

    <div class="mirror" v-if="showFrame" @click.self="showFrame = false">
        <iframe src="http://localhost:5500" class="mirror-player" frameborder="0" allowfullscreen></iframe>
    </div>

</template>

<script lang="ts" setup>
import Constructor from '~/components/Constructor.vue';
import ConstructorSidebarElements from '../../components/Models/ConstructorSidebarElements.vue'

import 'grapesjs/dist/css/grapes.min.css';

interface Page {
    id: string,
    name?: string,
    route: string,
    length: number | 0,
    sections: Array<any>,
    html: string,
    css: string,
    cipher: string,
}

const pages = ref([] as Page[])

const getList = () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('Authorization')}`,
        }
    }

    apiDataFetch(`${uri}/pages/all`, options)
        .then(response => response.json())
        .then(response => {
            response.forEach(async (item: any) => {
                const name = item.replace("pages/", "").replace(".json", "");

                await apiDataFetch(`${uri}/pages/${name}`, options)
                    .then(data => data.json())
                    .then(data => {

                        const object = {
                            id: data.id,
                            name: name,
                            route: `/${name}`,
                            length: 0,
                            sections: data.sections ? data.sections : [],
                            html: data.html,
                            css: data.css ? data.css : '',
                        } as Page;

                        pages.value.push(object);
                        if (!useRouter().currentRoute.value.query.uid) {
                            useRouter().push({ query: { uid: pages.value[0].id } })
                        } else {
                            return
                        }

                    })

            })
        })

}

const choose = (event: any) => {
    const page = event.target.value;
    useRouter().push({ query: { uid: page } })
    setTimeout(() => {
        location.reload();
    }, 300);
}


const loaded = ref(true)
const clicked = ref(false)

const showFrame = ref(false)

const load = () => {
    clicked.value = true;

    setTimeout(() => {
        clicked.value = false
        location.reload()
    }, 1500);
}

const iframe = (bool: Boolean) => {
    showFrame.value = true
}



onMounted(async () => {
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

.demo-container {
    width: 100% !important;
}

.wrapper {
    display: flex;
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