<template>
    <div class="hst" v-if="loaded">
        <!-- <div class="hst-layer">
            <div class="hst-layer-container">
                <p class="hst-layer-title">В разработке</p>
            </div>
        </div> -->

        <div class="hst-container">
            <header class="stats-header">
                <h4 class="stats-heading">Регионы</h4>
                <!-- <div class="stats-header-buttons">
                    <button class="stats-header-button active">За день</button>
                    <button class="stats-header-button">За месяц</button>
                    <button class="stats-header-button">За год</button>
                </div> -->
            </header>
            <section class="hst-section">
                <ul class="hst-list">
                    <li class="hst-item" v-for="(hst, index) in history">
                        <div class="hst-item-info">
                            <img :src="(hst as any).flag" width="30" height="15" alt="">
                            <p class="hst-item-name">{{ (hst as any).country }}</p>
                        </div>
                        <p class="hst-item-views">{{ (hst as any).visitors }}</p>
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const history = ref([])
const loaded = ref(false);

const regions = async () => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    }

    await apiDataFetch(`${uri}/users/regions`, options)
        .then(response => response.json())
        .then(response => {
            const data = response.data;

            const result = data.reduce((acc: any, curr: any) => {
                const existingCountry = acc.find((item: any) => item.country === curr.country);

                if (existingCountry) {
                    existingCountry.visitors += 1;
                } else {
                    acc.push({
                        country: curr.country,
                        visitors: 1,
                        flag: curr.flag
                    });
                }

                return acc;
            }, []);

            result.forEach((item: any) => {
                history.value.push(item as never)
            })

            console.log(result)
        })
}

onMounted(async () => {
    await regions();
    loaded.value = true;
})

</script>

<style lang="scss" scoped>
.stats {
    &-header {
        border-bottom: .1rem solid #e5e5e5;
        padding: 2.4rem;
    }
}

.hst {
    position: relative;
    border: 1px solid #e5e5e5;

    &-layer {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;

        &-list {
            padding: 2rem !important;
        }

        &-container {
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.75);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        &-title {
            font-size: 32px;
            font-weight: 600;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            text-transform: uppercase;
        }
    }

    &-item {
        padding: 2rem 0 0;
    }
}
</style>