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
                <h1 class="stats-calculator"> {{ timer }} </h1>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
function formatSecondsToMinutes(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

const timer = ref("")

onMounted(async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
    }

    await apiDataFetch(`${uri}/api/stats`, options)
        .then(response => response.json())
        .then(response => {
            const totalTime = formatSecondsToMinutes(response.timer);
            timer.value = totalTime;
        })

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