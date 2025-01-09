<script lang="ts" setup>
import logo from '@/assets/mini-logo.svg';
import dropdown from '@/assets/tick.svg';
import { FailedAlert } from '~/composables/Notification/list';

const projects = ref([]);
const loader = ref(true);
const $router = useRouter();

const params = {
    project_id: $router.currentRoute.value.params.project_id,
    page_id: $router.currentRoute.value.params.page_id
}


const getProjects = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${showStoreData("Authorization")}`
        }
    }

    const response = await apiDataFetch(`${USER_FETCH_HOST}/projects/${params.project_id}/pages`, options);
    const data = await response.json() as any;

    if (data.error) {
        return FailedAlert("No pages found - create one!");
    }

    data.forEach((page: any) => {
        projects.value.push(page as never);
    });

    setTimeout(() => {
        loader.value = false;
    }, 3000);
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
                        <th>Путь</th>
                        <th>Последнее сохранение</th>
                        <th>Статус</th>
                        <th>Прочее</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(page) in projects">
                        <td>
                            <div class="image-placeholder">
                                <img alt="Thumbnail of the website" height="50" src="https://placehold.co/50x50"
                                    width="50" />
                            </div>
                            {{ (page as any).title ? (page as any).title : 'Укажите название сайта' }}
                        </td>
                        <td>{{ (page as any).path ? (page as any).path : 'Путь не подключен' }}</td>
                        <td> {{ (() => {
                            const date = new Date((page as any).updated_at);

                            // Extract components
                            const day = date.getDate();
                            const months = [
                                'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
                                'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
                            ];
                            const month = months[date.getMonth()]; // Get month in Russian
                            const hours = date.getHours().toString().padStart(2, '0');
                            const minutes = date.getMinutes().toString().padStart(2, '0');
                            const seconds = date.getSeconds().toString().padStart(2, '0');

                            return `${day} ${month} ${hours}:${minutes}:${seconds}`;
                        })() }}
                        </td>
                        <td v-if="(page as any).is_published"><span class="status good">Опубликован</span></td>
                        <td v-else><span class="status bad">Черновик</span></td>
                        <td align="center" style="display: flex; align-items: center; font-size: 24px; height: 100%;">
                            <!-- <span>...</span> -->
                            <ul class="table-dropdown">
                                <li>
                                    <nuxt-link
                                        :to="`/projects/${$router.currentRoute.value.params.project_id}/editor/${(page as any).page_id}`">Редактировать</nuxt-link>
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
            font-size: 1.2rem;


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
    color: #ffffff !important;
    padding: 5px 10px;
    border-radius: 15px;
    display: inline-block;

    &.good {
        background-color: #4caf50;
    }

    &.bad {
        background-color: #4773ff;
    }
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
