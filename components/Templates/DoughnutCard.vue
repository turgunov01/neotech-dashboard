<template>
    <div class="dash-canvas">
        <Loader :height="'100%'" :has-background="false" v-if="!loaded" />
        <canvas class="dougnut-card" ref="canvas"></canvas>
    </div>
    <div class="dash-results" v-if="loaded">
        <div class="dash-result" v-for="(item, index) in calculations" :key="index">
            <div class="dash-result-name">
                <span class="dash-result-icon" :style="{
                    backgroundColor: (item as any).color,
                }"></span>
                <p class="dash-result-text"> {{ (item as any).device_type }} </p>
            </div>
            <p class="dash-result-percen"> {{ (item as any).percent }} </p>
        </div>
    </div>
    <h4 class="dash-block-nodata" v-if="!calculations.length">No data available!</h4>
</template>

<script setup lang="ts">
import { Chart, DoughnutController, ArcElement, Tooltip, Legend, type ChartItem, type ChartConfiguration } from 'chart.js'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

const canvas = ref();
const loaded = ref(false);

const config = {
    type: 'doughnut',
    data: {
        labels: [],
        datasets: [{
            label: 'My Test Dataset',
            data: [],
            backgroundColor: [],
            hoverOffset: 0
        }]
    },
} as ChartConfiguration

interface Device {
    device_type: string;
    visits: number;
    color: string
}

const calculations = ref([])

const getDevices = async () => {
    function countUniqueIPs(dataArray: any) {
        const uniqueIPs = new Set();

        dataArray.forEach((item: any) => {
            uniqueIPs.add(item.ip);
        });

        return uniqueIPs.size;
    }

    function calculateDeviceTypePercentages(dataArray: { device_type: string; visits: number, color: string }[]) {
        // Step 1: Calculate the total number of visits
        const totalVisits = dataArray.reduce((sum, item) => sum + item.visits, 0);

        // Step 2: Calculate the percentage for each device type
        dataArray.forEach(item => {
            (item as any).percent = ((item.visits * 100) / totalVisits).toFixed(2) + '%';
        });

        return dataArray;
    }

    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem("Authorization")}`,
        }
    }

    await apiDataFetch(`${uri}/stats/devices`, options)
        .then(response => response.json())
        .then(async response => {
            const devices = calculateDeviceTypePercentages(response?.devices)

            config.data.labels = devices.map((device: any) => device.device_type);

            for (let i = 0; i < devices.length; i++) {
                const color = getRandomColor();
                (((config as ChartConfiguration).data.datasets as any)[0].backgroundColor[i]) = color;
                devices[i].color = color;

                config.data.datasets[0].data.push(devices[i].visits);

                calculations.value.push(devices[i] as never)
            }


        })

}


const controller = async () => {
    await getDevices();
    const ctx = (canvas.value as HTMLCanvasElement).getContext('2d')
    new Chart(ctx as ChartItem, config)
}

onMounted(async () => {
    await controller();
    loaded.value = true
})
</script>

<style scoped lang="scss">
.dash {
    &-canvas {
        width: 35rem !important;
        height: 35rem !important;
        padding: 2.4rem;
    }

    &-results {
        width: 100%;
        padding: 2.4rem;
        display: flex;
        flex-direction: column;
        row-gap: 1.8rem;

        &>div {
            display: flex;
            align-items: center;
            justify-content: space-between;

            &>div {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1.2rem;
            }

            & span {
                width: 1.3rem;
                height: 1.3rem;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }

    &-block {
        &-nodata {
            position: absolute;
            left: 0;
            top: 7.29rem;
            width: 100%;
            height: calc(100% - 7.29rem);
            background: rgba(255, 255, 255);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3.2rem;
            line-height: 100%;
            font-weight: 700;
        }
    }
}
</style>