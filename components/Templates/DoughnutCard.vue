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
                <p class="dash-result-text"> {{ (item as any).name }} </p>
            </div>
            <p class="dash-result-percen"> {{ (item as any).percent }} </p>
        </div>
    </div>
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

const calculations = ref([])

const getDevices = async () => {
    function countUniqueIPs(dataArray: any) {
        const uniqueIPs = new Set();

        dataArray.forEach((item: any) => {
            uniqueIPs.add(item.ip);
        });

        return uniqueIPs.size;
    }

    function calculateDeviceTypePercentages(dataArray: any) {
        const deviceCounts = {} as any;

        dataArray.forEach((item: any) => {
            if (deviceCounts[item.device_type]) {
                deviceCounts[item.device_type]++;
            } else {
                deviceCounts[item.device_type] = 1;
            }
        })

        const totalCount = dataArray.length;

        // Convert to array of objects with percentage
        const devicePercentages = Object.keys(deviceCounts).map(deviceType => {
            return {
                name: deviceType,
                percent: ((deviceCounts[deviceType] / totalCount) * 100) + '%',
            };
        });

        return devicePercentages;
    }

    // Calculate total number of entries


    interface Device {
        device_type: string,
        visits: number | 0,
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
            const devices = response?.devices;

            config.data.labels = devices.map((device: Device) => device.device_type);

            for (let i = 0; i < devices.length; i++) {
                const color = getRandomColor() as String;
                (((config as ChartConfiguration).data.datasets as any)[0].backgroundColor[i]) = color;
                await apiDataFetch(`${uri}/stats/devices/${devices[i].device_type}`, options)
                    .then(data => data.json())
                    .then(data => {
                        const filter = data;

                        const uniqueIPs = countUniqueIPs(filter);
                        const devicePercentages = calculateDeviceTypePercentages(filter);

                        devicePercentages.forEach(device => {
                            (device as any).color = color;
                            calculations.value.push(device as never)
                        })

                        config.data.datasets[0].data.push(uniqueIPs);
                    })
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
}
</style>