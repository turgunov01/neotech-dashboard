<template>
    <div class="projects">
        <div class="container">
            <div class="projects-header">
                <h1 class="projects-title">Все проекты</h1>
                <button class="projects-header-button" @click="openModal = !openModal">+</button>
            </div>
            <div class="projects-cards" v-if="loaded">
                <div class="projects-card" v-for="item in arr">
                    <p class="projects-card-name"><span>Название:</span> {{ item.name }}</p>
                    <div class="projects-card-buttons">
                        <nuxt-link :to="`/constructor?url=${item.url}&page_id=${item.pages[0].uid}`"
                            :href="item.url">Редактировать</nuxt-link>
                        <a :href="item.url" target="_blank" class="project-on">Перейти к проекту</a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="projects-modal" v-if="openModal" @click.self="openModal = !openModal">
        <div class="projects-modal-content">
            <h2 class="projects-modal-title">Новый проект</h2>
            <input type="text" placeholder="..." v-model="projectNew">
            <button class="projects-modal-link" @click="createProject">
                Создать проект
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { FailedAlert, PushNotification } from '~/composables/Notification/list';


const $router = useRouter();
const loaded = ref(false);

const arr = ref([] as any);
const openModal = ref(false);
const projectNew = ref("");

const projects = async () => {
    const options = {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("Authorization")}`
        }
    }

    await apiDataFetch(USER_FETCH_HOST + "/constructor/all", options)
        .then(response => response.json())
        .then(response => {
            const data = response;
            const projects = data.user.projects;


            projects.forEach((item: any) => {
                arr.value.push(item);
            });

        })
}

const createProject = async () => {
    if (projectNew.value.length === 0) return FailedAlert("Name is required!");
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("Authorization")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: projectNew.value
        })
    }

    await apiDataFetch(USER_FETCH_HOST + "/constructor/new-project", options)
        .then(response => response.json())
        .then(response => {
            const data = response;
            if (data.error) return FailedAlert(data.error);
            PushNotification(data.message);
        })
}

onMounted(async () => {
    await projects();
    loaded.value = true;
})

</script>


<style lang="scss" scoped>
.projects {
    &-modal {
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.2);
        backdrop-filter: blur(10px);
        left: 0;
        top: 0;

        &-content {
            background: white;
            width: 50rem;
            height: auto;
            padding: 3rem;
            border-radius: .4rem;
            color: black;
            display: flex;
            flex-direction: column;

            & h2 {
                color: black;
                font-size: 2.4rem;
                font-weight: 500;
                text-align: center;
            }

            & input {
                margin: 20px 0 30px 0;
                background-color: white;
                color: black;
                border-bottom: .1rem solid black;
                outline: none;
                font-size: 1.6rem;
            }

            & button {
                background: rgb(180, 180, 250);
                color: white;
                font-size: 1.4rem;
                padding: 10px 30px;
                border-radius: .4rem;
            }
        }
    }

    & .container {
        max-width: 102.4rem;
        width: 100%;
    }

    &-header {
        display: flex;
        align-items: center;
        justify-content: space-between;

        &-button {
            background: #3CC13B;
            color: white;
            margin-top: 2.4rem;
            margin-left: auto;
            border-radius: .4rem;
            width: 4rem;
            height: 4rem;
            display: flex;
            align-items: center;
            justify-content: center;

        }
    }

    &-cards {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-direction: column;
        margin-top: 1.2rem;
        gap: 1.5rem
    }

    &-card {
        color: black;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 2rem 2.5rem;
        border-radius: .4rem;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

        &-name {
            & span {
                font-weight: 500;
            }
        }

        &-buttons {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1.5rem;

            &>a {
                &.project-on {
                    color: white;
                    background: rgb(180, 180, 250);
                    padding: 10px 20px;
                    border-radius: .4rem;
                }
            }
        }
    }

    &-title {
        font-size: 3rem;
        font-weight: 500;
        line-height: 1.5;
    }

    & img {
        width: 100%;
        max-width: 100%;
        object-fit: cover;
    }


}
</style>
