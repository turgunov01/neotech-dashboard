<template>
    <div class="history">
        <div class="history-container">
            <h1 class="history-title">История активности</h1>
            <table class="history-table">
                <thead>
                    <tr class="history-table-head">
                        <td class="history-table-head-item">Имя</td>
                        <td class="history-table-head-item">Почта</td>
                        <td class="history-table-head-item">Дата</td>
                        <td class="history-table-head-item">Событие</td>
                    </tr>
                </thead>
                <tbody>
                    <tr class="history-table-body" v-for="(log, index) in tables" :key="index">
                        <th class="history-table-body-item">{{ (log as any).data.user.role }}</th>
                        <th class="history-table-body-item">{{ (log as any).data.user.id }}</th>
                        <th class="history-table-body-item">
                            {{ new Date((log as any).data.event.timestamp).toLocaleTimeString() }}
                            {{ new Date((log as any).data.event.timestamp).toLocaleDateString() }}
                        </th>
                        <th class="history-table-body-item">
                            {{ (log as any).data.event.type }}
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { setActivityMiddleware } from '~/middleware/history.activity';


const tables = ref([])

const getLogs = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("Authorization")}`,
        }
    }
    await apiDataFetch(USER_FETCH_HOST + "/activity/all", options)
        .then(response => response.json())
        .then(response => {
            const data = response;

            const username = localStorage.getItem("username");

            data.forEach((log: any) => {
                if (log.data.user.role === 0) {
                    log.data.user.role = 'Администратор';
                    tables.value.push(log as never);
                } else {
                    if (log.data.user.id === username) {
                        log.data.user.role = 'Пользователь'
                        tables.value.push(log as never);
                    }
                }
            })
        })
}

onMounted(async () => {
    // await getLogs();
    setActivityMiddleware("Вход в профиль", "profile");
})

</script>

<style scoped lang="scss"></style>