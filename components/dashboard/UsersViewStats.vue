<template>
    <div class="stats">
        <div class="stats-container">
            <header class="stats-header">
                <h4 class="stats-heading">Посещаемость</h4>
                <!-- <div class="stats-header-buttons">
                    <button class="stats-header-button active">За день</button>
                    <button class="stats-header-button">За месяц</button>
                    <button class="stats-header-button">За год</button>
                </div> -->
            </header>
            <section class="stats-detail">
                <h1 class="stats-calculator">{{ visits }}</h1>
                <span class="stats-calculator-name">просмотр страниц</span>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { apiDataFetch, uri } from "~/composables/exports"

const visits = ref(0)

const request = async () => {
    const options = {
        ...ParamsInit("GET"),
    }
    await apiDataFetch(`${uri}/api/stats?type=views`, options)
        .then(response => response.json())
        .then(response => {
            visits.value = response.views
        })
}


onMounted(() => {
    request()
})


</script>

<style scoped></style>