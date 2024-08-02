<template>
    <div class="dash-blocks" v-if="loaded">
        <div class="dash-block">
            <UsersViewStats :views="analytics.views" />
        </div>
        <div class="dash-block">
            <UsersTimerStats :time="analytics.time" />
        </div>
    </div>
    <div class="dash-blocks" v-if="loaded">
        <div class="dash-block">
            <UsersFormCount :messages="analytics.messages" />
            <UsersBrowsersCounter :agents="analytics.browsers" />
        </div>
        <div class="dash-block">
            <UsersRouteActivity />
        </div>
    </div>
</template>


<script lang="ts" setup>
import UsersViewStats from '~/components/dashboard/UsersViewStats.vue'
import UsersTimerStats from '../dashboard/UsersTImerStats.vue'
import UsersFormCount from '~/components/dashboard/UsersFormCount.vue'
import UsersBrowsersCounter from '~/components/dashboard/agents/UsersBrowsersCounter.vue'
import UsersRouteActivity from '~/components/dashboard/history/UsersRouteActivity.vue'

const loaded = ref(false);

function formatSecondsToMinutes(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

interface Browser {
    name: string,
    value: 0,
    color: string
}

const analytics = {
    views: 0,
    time: "00:00",
    browsers: [],
    routes: [],
    messages: []
}

const statistics = async () => {
    interface stats {
        id: number,
        ip: string,
        browser: Browser[],
        os: string,
        timestamp: string,
        date: string,
        visits: number,
        interval: number
    };

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem('Authorization')}`,
        }
    }

    await apiDataFetch(`${uri}/stats/all`, options)
        .then(response => response.json())
        .then(response => {
            const data = response.data;

            const sumTimer = ref(0)

            data.forEach((stat: stats) => {
                analytics.views += stat.visits;
                sumTimer.value += stat.interval;

                const browser = {
                    browser: stat.browser,
                    visits: stat.visits,
                    color: getRandomColor()
                }

                analytics.browsers.push(browser as never);
            });

            analytics.time = formatSecondsToMinutes(sumTimer.value);
        })

    await apiDataFetch(`${uri}/messages/all`, options)
        .then(response => response.json())
        .then(response => {
            const data = response.data;
            analytics.messages = data;
        })
}
 
onMounted(async () => {
    await statistics();
    loaded.value = true;
})

</script>

<style scoped lang="scss">
.dash,
.dash-blocks {
    width: 100%;
}



.dash-blocks {
    margin-top: 3.2rem;
    display: flex;
    justify-content: space-between;
}

.dash-block {
    width: 100%;
    max-width: calc((100% / 2) - 1.6rem);
    display: flex;
    flex-direction: column;
    row-gap: 3.2rem;
}

.dash-heading {
    font-size: 2rem;
    line-height: 3rem;
    font-weight: 500;
    width: 100%;
    padding: 2.4rem;
    border: .1rem solid #e5e5e5;
}
</style>