<template>
    <div class="stats">
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
                <div class="line" v-for="(agent, index) in browsers" style="color: white !important;" :key="index"
                    :title="`Browser: ${(agent as any)}`" :style="{
                        width: `${(results[index] as any)?.percentage}%`,
                        backgroundColor: (agent as any)?.color,
                    }">
                    <div class="line-info">
                        <p class="line-info-name" :style="{ background: `${(agent as any)?.color}` }">
                            {{ (agent as any).browser }}
                        </p>
                        <p class="line-info-name"> {{ (agent as any).visits }} </p>
                    </div>
                </div>
            </section>
            <div class="results">
                <div class="result" v-for="(result, index) in results" :key="index">
                    <div class="result-static" style="display: flex; align-items: center;">
                        <div class="result-rectangle" :style="{ background: `${(result as any).color}` }"></div>
                        <p class="result-agent"> {{ (result as any).name }} </p>
                    </div>
                    <p class="result-percentage"> {{ (result as any).percentage }}% </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    agents: {
        type: Array,
        required: true,
        default: []
    }
})

const browsers = ref([]) as any;

async function getPlatforms() {
    await apiDataFetch(`${uri}/stats/platforms`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("Authorization")}`,
            "Content-Type": "application/json"
        }
    }).then(response => response.json()).then(response => {
        const data = response;
        data.forEach((item: any, index: number) => {
            item.color = "";
            item.color = getRandomColor();
            browsers.value.push(item as never);
        })

    })
}

const results = ref([])

const percentageCounter = () => {
    const totalCount = browsers.value.reduce((total: any, agent: any) => total + (agent as any).visits, 0);
    browsers.value.forEach((agent: any) => {
        const item = {
            name: (agent as any).browser,
            percentage: parseInt(((agent as any).visits / (totalCount as any) * 100).toFixed(2)),
            color: (agent as any).color
        };

        results.value.push(item as never)
    });

}

onMounted(async () => {
    await getPlatforms()

    percentageCounter()
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