<template>
    <div class="stats">
        <div class="stats-container">
            <header class="stats-header">
                <h4 class="stats-heading">Время провождения на сайте</h4>
                <!-- <div class="stats-header-buttons">
                    <button class="stats-header-button active">За день</button>
                    <button class="stats-header-button">За месяц</button>
                    <button class="stats-header-button">За год</button>
                </div> -->
            </header>
            <section class="stats-detail">
                <h1 class="stats-calculator"> {{ time }} </h1>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps({
    time: {
        type: String,
        default: "00:00"
    }
})
</script>

<style scoped lang="scss">
.stats {
    &-heading {
        max-width: 45%;
        width: 100%;
    }

    &-header {
        align-items: flex-start;
    }
}
</style>