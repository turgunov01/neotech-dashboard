<template>
    <div class="stats">
        <div class="stats-container">
            <header class="stats-header">
                <h4 class="stats-heading">Заявка на форму</h4>
                <!-- <div class="stats-header-buttons">
                    <button class="stats-header-button active">За день</button>
                    <button class="stats-header-button">За месяц</button>
                    <button class="stats-header-button">За год</button>
                </div> -->
            </header>
            <section class="stats-detail">
                <h1 class="stats-calculator"> {{ messages }} </h1>
                <span class="stats-calculator-name">раз</span>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
import { apiDataFetch, uri } from "~/composables/exports"

const messages = ref(0)

const request = async () => {
    const options = {
        ...customHeaders("GET"),
    }
    await apiDataFetch(`${uri}/api/messages`, options)
        .then(response => response.json())
        .then(response => {
            response.messages.forEach((message: Object) => {
                messages.value += 1
            })
        })
}


onMounted(() => {
    request()
})
</script>

<style scoped lang="scss"></style>