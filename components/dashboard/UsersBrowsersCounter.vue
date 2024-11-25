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
                <div class="line" v-for="(agent, index) in agents" style="color: white !important;" :key="index"
                    :title="`Browser: ${(agent as any).browser}`" :style="{
                        width: `${(agent as any)?.percentage}`,
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
                <div class="result" v-for="(result, index) in agents" :key="index">
                    <div class="result-static" style="display: flex; align-items: center;">
                        <div class="result-rectangle" :style="{ background: `${(result as any).color}` }"></div>
                        <p class="result-agent"> {{ (result as any).browser }} </p>
                    </div>
                    <p class="result-percentage"> {{ (result as any).percentage }} </p>
                </div>
            </div>
        </div>
    </div>
    <div class="dash-block-nodata" v-if="props.agents.length === 0">No data available!</div>
</template>

<script setup lang="ts">

const props = defineProps({
    agents: {
        type: Array,
        required: true,
        default: []
    }
})

onMounted(async () => {
})


</script>

<style lang="scss" scoped>
.stats {
    width: 100%;

    &-container {
        justify-content: flex-start;
        max-height: unset;
        padding-bottom: 2.4rem;
        border: unset !important;
    }
}

.line-info-name:last-of-type {
    color: black;
}

.dash-block-nodata {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.2rem;
    line-height: 100%;
    font-weight: 700;
    color: black
}
</style>