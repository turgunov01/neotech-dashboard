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
                        <th class="history-table-body-item">{{ (log as Log).username }}</th>
                        <th class="history-table-body-item">{{ (log as Log).email }}</th>
                        <th class="history-table-body-item">
                            {{ (log as Log).date }}
                        </th>
                        <th class="history-table-body-item">
                            <span v-if="(log as Log).action == 1">Создал</span>
                            <span v-if="(log as Log).action == 2">Удалил</span>
                            <span v-if="(log as Log).action == 3">Редактировал</span>
                            <span v-if="(log as Log).action == 4">Опубликовал</span>
                            элемент на странице "{{ (log as Log).pagename }}"
                        </th>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>

interface Log {
    username: string,
    date: string,
    email: string,
    action: number,
    pagename: string,
}

const tables = ref([])

const options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Content-Language": "ru"
    }
}

async function getLogs() {
    await apiDataFetch(`${uri}/api/history/${localStorage.getItem('username')}`, options)
        .then(res => res.json())
        .then(res => {
            const data = res.data

            data.history.forEach((item: any, index: number) => {
                tables.value.push(item as never)
            });
        })
}

onMounted(() => {
    getLogs()
})

</script>

<style scoped lang="scss"></style>