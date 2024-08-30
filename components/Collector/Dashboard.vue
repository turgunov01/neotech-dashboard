<template>
    <div class="dash-blocks" v-if="loaded">
        <div class="dash-block">
            <DashboardUsersViewStats :views="analytics.views" />
        </div>
        <div class="dash-block">
            <DashboardUsersCalculate />
        </div>
        <div class="dash-block">
            <DashboardUsersTImerStats :time="analytics.time" />
        </div>
        <div class="dash-block">
            <DashboardUsersFormCount :messages="analytics.messages" />
        </div>

    </div>
    <div class="dash-blocks" v-if="loaded">
        <div class="dash-block screen50">
            <DashboardAgentsUsersBrowsersCounter :agents="analytics.browsers" />
            <DoughnutCard />
        </div>
        <div class="dash-block screen50">
            <DashboardHistoryUsersRouteActivity />
        </div>
    </div>
</template>


<script lang="ts" setup>
import DoughnutCard from '../Templates/DoughnutCard.vue';

const loaded = ref(false);

function formatSecondsToMinutes(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
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

const views = async () => {
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
        }
    }

    await apiDataFetch(USER_FETCH_HOST + "/stats/views", options)
        .then(response => response.json())
        .then(response => {
            analytics.views = response.views;
        })
}

const timeline = async () => {
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
        }
    }

    await apiDataFetch(USER_FETCH_HOST + "/stats/timeline", options)
        .then(response => response.json())
        .then(response => {
            analytics.time = formatSecondsToMinutes(response.timeout);
        })
}

const messages = async () => {
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
        }
    }

    await apiDataFetch(USER_FETCH_HOST + "/messages/all", options)
        .then(response => response.json())
        .then(response => {
            analytics.messages = response.messages;
        })
}

const browsers = async () => {
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`,
        }
    }

    await apiDataFetch(USER_FETCH_HOST + "/stats/browsers", options)
        .then(response => response.json())
        .then(response => {
            response.browsers.forEach((item: any) => {
                analytics.browsers.push(item as never)
            })
        })
}


onMounted(async () => {
    await Promise.all(
        [views(), timeline(), messages(), browsers()]
    )

    loaded.value = true;

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

        &.screen50 {
            max-width: calc(100% / 2 - .8rem);
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