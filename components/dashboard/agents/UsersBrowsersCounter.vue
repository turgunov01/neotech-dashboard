<template>
    <div class="stats">
        <div class="stats-container">
            <header class="stats-header">
                <h4 class="stats-heading">Браузеры</h4>
                <div class="stats-header-buttons">
                    <button class="stats-header-button active">За день</button>
                    <button class="stats-header-button">За месяц</button>
                    <button class="stats-header-button">За год</button>
                </div>
            </header>
            <section class="lines">
                <div class="line" v-for="(agent, index) in results" :key="index" :title="`Browser: ${agent.name}`" :style="{
                    width: `100%`,
                    backgroundColor: agent.color,
                    maxWidth: `${agent.percentage}%`
                }">

                    <div class="line-info">
                        <p class="line-info-name" :style="{ background: `${agent.color}` }">{{ agent.name }}</p>
                        <p class="line-info-name"> {{ agent.percentage }}% </p>
                    </div>
                </div>
            </section>
            <div class="results">
                <div class="result" v-for="(result, index) in results" :key="index">
                    <div class="result-static">
                        <div class="result-rectangle" :style="{ background: `${result.color}` }"></div>
                        <p class="result-agent"> {{ result.name }} </p>
                    </div>
                    <p class="result-percentage"> {{ result.percentage }}% </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const agents = [
    {
        name: "Chrome",
        count: 100,
        color: "#365BA7",
    },
    {
        name: "Safari",
        count: 50,
        color: "#EA654A",
    },
    {
        name: "Firefox",
        count: 30,
        color: "#A2CB71",
    },
    {
        name: "Edge",
        count: 20,
        color: "#9E59B3",
    },
    {
        name: "Opera",
        count: 10,
        color: "#85B4E3",
    },
    {
        name: "Yandex",
        count: 5,
        color: "#F3F1ED",
    },
    {
        name: "IE",
        count: 1,
        color: "#00BCD4",
    }
]
const results = ref([])

const percentageCounter = () => {
    const totalCount = agents.reduce((total, agent) => total + agent.count, 0);
    agents.forEach(agent => {
        const item = {
            name: agent.name,
            percentage: (agent.count / totalCount * 100).toFixed(2),
            color: agent.color
        };
        results.value.push(item)
    });
}

percentageCounter()

</script>

<style lang="scss" scoped>
.stats {
    &-container {
        justify-content: flex-start;
        max-height: unset;
        padding-bottom: 2.4rem;
    }
}

.line-info-name:last-of-type {
    color: black;
}
</style>