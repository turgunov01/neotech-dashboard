<script lang="ts" setup>
import logo from '@/assets/mini-logo.svg';
import dropdown from '@/assets/tick.svg';

const projects = ref([]);
const loader = ref(true);
const $router = useRouter();


const getProjects = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${showStoreData("Authorization")}`
        }
    }

    const response = await apiDataFetch(`${USER_FETCH_HOST}/constructor/all`, options);
    const data = await response.json() as any;
    const details = data.user;


    await details.projects.forEach(async (p: any) => {
        const p_id = $router.currentRoute.value.params.project_id;

        if (p_id == p.project_id) {
            p.status = p.is_published ? "Опубликован" : "Не опубликован";
            p.last_saved = new Date().toLocaleString();
            p.domain = p.domain ? p.domain : "Не указан";

            projects.value.push(p as never);
            console.log(p)
        }
    });

    setTimeout(() => {
        loader.value = false;
    }, 3000);
}

const drop = (e: MouseEvent) => {
    const event = e.target as HTMLElement;
    const dropdown = event.nextElementSibling;
    dropdown?.classList.toggle("open");
}

onMounted(() => {
    getProjects()
})

</script>

<template>
    <div class="project-cards">
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Домен</th>
                        <th>Последнее сохранение</th>
                        <th>Статус</th>
                        <th>Прочее</th>
                    </tr>
                </thead>
                <tbody v-for="tab in (projects as any)">
                    <tr v-for="page in tab.pages">
                        <td>
                            <div class="image-placeholder">
                                <img alt="Thumbnail of the website" height="50" src="https://placehold.co/50x50"
                                    width="50" />
                            </div>
                            Укажите название сайта
                        </td>
                        <td>Домен не подключен</td>
                        <td>4 января</td>
                        <td><span class="status">Опубликован</span></td>
                        <td>
                            <ul class="table-dropdown">
                                <li>
                                    <nuxt-link
                                        :to="`/projects/${$router.currentRoute.value.params.project_id}/pages/${page.uid}`">Редактировать</nuxt-link>
                                </li>
                                <li>
                                    <button class="delete">Удалить</button>
                                </li>
                            </ul>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.table {
    &-container {
        width: 100%;
        overflow-x: auto;
    }

    &-dropdown {
        display: flex;
        align-items: center;
        gap: 1.5rem;

        & li>* {
            padding: 1rem 1.5rem;
            border: 1px solid #eeeeee;
            transition: 300ms;
            cursor: pointer;


            &.delete {
                background-color: rgb(255, 193, 193);

                &:hover {
                    background-color: rgb(250, 74, 74);
                    color: white;
                }
            }
        }
    }
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
    min-width: 600px;
}

th,
td {
    padding: 15px 0;
    text-align: left;
}

th {
    font-weight: normal;
    color: #888;
}

td {
    color: #555;
}

tbody tr {
    border-bottom: 1px solid #eeeeee;
}

.status {
    background-color: #4caf50;
    color: #ffffff !important;
    padding: 5px 10px;
    border-radius: 15px;
    display: inline-block;
}

.ellipsis {
    color: #888;
    cursor: pointer;
}

.image-placeholder {
    width: 50px;
    height: 50px;
    background-color: #e0e0e0;
    display: inline-block;
    vertical-align: middle;
    margin-right: 1rem;
}

.image-placeholder img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.divider {
    border-bottom: 1px solid #e0e0e0;
    margin-top: 10px;
}
</style>
