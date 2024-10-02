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
                <h1 class="stats-calculator">{{ views }}</h1>
            </section>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    views: {
        type: Number,
        default: 0
    }
})
</script>

<style scoped></style>