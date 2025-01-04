<template>
    <div class="dash-blocks">
        <div class="dash-block">
            <UiLoader :height="'100%'" :has-background="false" v-if="!loaded" />
            <UsersViewStats :views="stats.views" :style="{
                opacity: loaded ? 1 : 0,
                transition: 'all 500ms ease',
            }" />
        </div>
        <div class="dash-block">
            <UiLoader :height="'100%'" :has-background="false" v-if="!loaded" />
            <UsersCalculate :count="stats.users" :style="{
                opacity: loaded ? 1 : 0,
                transition: 'all 500ms ease',
                transitionDelay: '100ms'
            }" />
        </div>
        <div class="dash-block">
            <UiLoader :height="'100%'" :has-background="false" v-if="!loaded" />
            <UsersTImerStats :time="stats.time" :style="{
                opacity: loaded ? 1 : 0,
                transition: 'all 500ms ease',
                transitionDelay: '100ms'
            }" />
        </div>
        <div class="dash-block">
            <UiLoader :height="'100%'" :has-background="false" v-if="!loaded" />
            <UsersFormCount :messages="stats.messages" :style="{
                opacity: loaded ? 1 : 0,
                transition: 'all 500ms ease',
                transitionDelay: '100ms'
            }" />
        </div>

    </div>
    <div class="dash-blocks">
        <div class="dash-block screen50">
            <div class="dash-block-nest">
                <UsersBrowsersCounter v-if="loaded" :agents="stats.browsers" />
            </div>
            <div class="dash-block-nest">
                <h4 class="dash-block-nest-title">Устройства</h4>
                <DoughnutCard :data="stats.devices" v-if="loaded" />
            </div>
        </div>
        <div class="dash-block screen50">
            <!-- <div class="dash-block-nest">
                <UsersRouteActivity v-if="loaded" />
            </div> -->
            <div class="dash-block-nest">
                <RegionController v-if="loaded" :statistics="[]" />
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import RegionController from '../analytics/user/regions.vue';
import UsersBrowsersCounter from '../analytics/user/browser.vue';
import UsersCalculate from '../analytics/user/user.vue';
import UsersFormCount from '../analytics/user/form.vue';
import UsersTImerStats from '../analytics/user/timer.vue';
import UsersViewStats from '../analytics/user/views.vue';
import DoughnutCard from '../Templates/DoughnutCard.vue';

import Loader from '../ui/loader.vue';

const $router = useRouter();
const loaded = ref(false);

const stats = {
    views: 0,
    users: 0,
    time: "0",
    messages: [],
    browsers: [] as { browser: string; visits: number; percentage: string, color: string }[],
    devices: [] as any,
}

const all = async () => {
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
        }
    }

    await apiDataFetch(USER_FETCH_HOST + `/stats/all?date=${$router.currentRoute.value.query.date}`, options)
        .then(response => response.json())
        .then(response => {
            const data = response;
            var time = 0;

            // Views

            stats.views += data.length;

            // Users
            const users = new Set();

            data.forEach((item: any) => {
                users.add(item.unique_id);

                time += item.timeout;
            })

            // Timeline 
            stats.time = numbersToDateString(time);

            stats.users += users.size;

            // Browser

            const browserCounts: Record<string, number> = {};

            data.forEach((item: { browser: string }) => {
                const browserName = item.browser;
                browserCounts[browserName] = (browserCounts[browserName] || 0) + 1;
            });

            const totalVisits = Object.values(browserCounts).reduce((sum, count) => sum + count, 0);
            const getRandomHexColor = () =>
                `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0")}`;


            Object.entries(browserCounts).forEach(([browser, visits]) => {
                stats.browsers.push({
                    browser,
                    visits,
                    percentage: ((visits / totalVisits) * 100).toFixed(2) + "%",
                    color: getRandomHexColor()
                });
            });

            // Devices

            const deviceCounts: Record<string, number> = {};

            data.forEach((item: { device: string }) => {
                const deviceName = item.device;
                deviceCounts[deviceName] = (deviceCounts[deviceName] || 0) + 1;
            });

            const totalDevices = Object.values(deviceCounts).reduce((sum, count) => sum + count, 0);

            Object.entries(deviceCounts).forEach(([device, visits]) => {
                stats.devices.push({
                    device,
                    visits,
                    percentage: ((visits / totalDevices) * 100),
                    color: getRandomHexColor()
                });
            });

        })

    await apiDataFetch(USER_FETCH_HOST + "/messages/all", options)
        .then(response => response.json())
        .then(response => {
            const data = response;
            data.forEach((item: any) => {
                stats.messages.push(item as never);
            });
        })
}


// const messages = async () => {
//     const options = {
//         method: "GET",
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("Authorization")}`,
//         }
//     }

//     await apiDataFetch(USER_FETCH_HOST + `/messages/all${query ? $router.currentRoute.value.fullPath : ''}`, options)
//         .then(response => response.json())
//         .then(response => {
//             if (response.messages.length > 0) {
//                 response.messages.forEach((msg: any) => {
//                     analytics.messages.push(msg as never)
//                 })
//             } else {
//                 analytics.messages = response.messages;
//             }
//         })
// }



onMounted(async () => {
    if (!$router.currentRoute.value.query.date) {
        $router.push({ path: '/', query: { date: "today" } });
    }

    await setTimeout(async () => {
        await all();
        // await timeline();
        // await messages();

        setTimeout(() => {
            loaded.value = true;
        }, 1000);
    }, 500);


})

</script>

<style scoped lang="scss">
.dash,
.dash-blocks {
    width: 100%;
}

.dash {
    &-header {
        border: .1rem solid #e5e5e5;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &-blocks {
        margin-top: 3.2rem;
        display: flex;
        justify-content: space-between;
    }

    &-block {
        width: 100%;
        max-width: calc((100% / 4) - 1.2rem);
        position: relative;

        &.screen50 {
            max-width: calc(100% / 2 - .8rem);
            display: flex;
            align-items: center;
            flex-direction: column;
            gap: 2.4rem;
            width: 100%;
        }

        &-nest {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            position: relative;
            border: 1px solid #E5E5E5;

            &-title {
                width: 100%;
                padding: 2.4rem;
                font-size: 1.6rem;
                line-height: 2.4rem;
                border-bottom: .1rem solid #e5e5e5;
            }
        }
    }

    &-pie {
        &-chart {
            width: 30rem !important;
            height: 30rem !important;
            display: flex !important;
            align-items: center;
            justify-content: center;
        }
    }

    &-heading {
        font-size: 2rem;
        line-height: 3rem;
        font-weight: 500;
        width: 100%;
        padding: 2.4rem;
    }
}
</style>