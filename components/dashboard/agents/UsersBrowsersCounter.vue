<template>
    <div class="stats" v-if="loaded">
        <div class="stats-container">
            <header class="stats-header">
                <h4 class="stats-heading">Браузеры</h4>
                <!-- <div class="stats-header-buttons">
                    <button class="stats-header-button active">За день</button>
                    <button class="stats-header-button">За месяц</button>
                    <button class="stats-header-button">За год</button>
                </div> -->
            </header>
            <section class="lines">
                <div class="line" v-for="(agent, index) in agents" :key="index"
                    :title="`Browser: ${(agent as any).name}`" :style="{
        width: `100%`,
        backgroundColor: (agent as any).color,
        maxWidth: `${(agent as any).percentage}%`
    }">

                    <div class="line-info">
                        <p class="line-info-name" :style="{ background: `${(agent as any).color}` }">
                            {{ (agent as any).browser.name }}
                        </p>
                        <p class="line-info-name"> {{ (results as any)[index].percentage }}% </p>
                    </div>
                </div>
            </section>
            <div class="results">
                <div class="result" v-for="(result, index) in results" :key="index">
                    <div class="result-static" style="display: flex; align-items: center;">
                        <div class="result-rectangle" :style="{ background: `${(result as any).color}` }"></div>
                        <p class="result-agent"> {{ (agents[index] as any).browser.name }} </p>
                    </div>
                    <p class="result-percentage"> {{ (result as any).percentage }}% </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const results: Array<any> = []
const agents = ref([])
const loaded = ref(false)

async function getBrowsers() {
    await apiDataFetch(`${uri}/api/users/browsers`, ParamsInit("GET"))
        .then(response => response.json())
        .then(response => {
            response.browsers.forEach((item: Object) => {
                agents.value.push(item as never)
            })
        })
}


const percentageCounter = () => {
    const totalCount = agents.value.reduce((total, agent) => total + (agent as any).count, 0);
    agents.value.forEach(agent => {
        const item = {
            name: (agent as any).name,
            percentage: ((agent as any).count / totalCount * 100).toFixed(2),
            color: (agent as any).color
        };
        results.push(item)
    });
}

onMounted(async () => {
    await getBrowsers()
    await percentageCounter()
    loaded.value = true
})


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