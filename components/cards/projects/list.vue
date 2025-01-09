<script lang="ts" setup>
import logo from '@/assets/mini-logo.svg';
import dropdown from '@/assets/tick.svg';
import { FailedAlert } from '~/composables/Notification/list';

const projects = ref([]);
const loader = ref(true);

const getProjects = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${showStoreData("Authorization")}`
        }
    }

    const response = await apiDataFetch(`${USER_FETCH_HOST}/projects/`, options);
    const data = await response.json() as any;

    if (data.length > 0) {

        await data.forEach((item: any) => {
            projects.value.push(item as never);
        })

        setTimeout(() => {
            loader.value = false;
        }, 3000);

        return;
    } else {
        FailedAlert("No projects found!");
    }
}

onMounted(() => {
    getProjects()
})

</script>

<template>
    <div class="project-cards">
        <div class="project-card" v-for="(card, index) in projects">
            <header class="project-card-header">
                <div class="project-card-domain">
                    <img :src="logo" class="project-card-logo" alt="">
                    <h2 class="project-card-domain-title">Домен подключен</h2>
                </div>
                <div class="project-card-dropdown">
                    <img :src="dropdown" class="project-card-dropdown-icon" alt="">
                    <ul class="project-card-dropdown-list" hidden></ul>
                </div>
            </header>
            <nuxt-link class="project-card-main" :to="`/projects/${(card as any).project_id}`">
                <ui-loader :has-background="true" :height="'100%'" v-if="loader" />
                <!-- <img src="https://picsum.photos/200" alt=""> -->
                <img :src="`https://api.screenshotone.com/take?access_key=Hm3GgEaIePutLw&url=${(card as any).nest}&ignore_host_errors=true&format=jpg&block_ads=true&block_cookie_banners=true&block_banners_by_heuristics=false&block_trackers=true&delay=2&timeout=60&response_type=by_format&image_quality=80`"
                    alt="">
                <span class="project-card-main-redirect">Перейти</span>
            </nuxt-link>
            <footer class="project-card-footer">
                <div class="project-card-details">
                    <span class="project-card-details-text">Название проекта:
                        <strong>{{ (card as any).name }}</strong>
                    </span>
                </div>
            </footer>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.project {
    &-cards {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        column-gap: 2.4rem;
        flex-wrap: wrap;
        margin-top: 2.4rem;
    }

    &-card {
        max-width: calc(100% / 4 - 1.8rem);
        width: 100%;
        margin-bottom: 2.4rem;
        background: white;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
        border-radius: .8rem;
        transition: 300ms;

        &:hover {
            transform: translateY(-.5rem);
        }

        &-header,
        &-footer {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 2rem 1.5rem;
            gap: .4rem;
            background: #eeeeee;
        }

        &-domain {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: .4rem;

            &-title {
                font-size: 1.3rem;
                color: #c5c0c0 !important;
            }
        }

        &-logo {
            width: 2rem;
            height: 2rem;

        }

        &-main {
            width: 100%;
            height: 200px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;

            &::after {
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                transition: 300ms;
            }

            & img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }

            &-redirect {
                position: absolute;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                top: 0;
                left: 0;
                z-index: 2;
                color: white !important;
                opacity: 0;
                transition: 300ms;
                cursor: pointer;
                font-size: 1.8rem;

                &:hover {
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(2px);
                    opacity: 1;
                }
            }
        }

    }
}
</style>
