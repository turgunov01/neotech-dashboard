<template>
    <div class="dash-blocks">
        <div class="dash-block">
            <Loader :height="'100%'" :has-background="false" v-if="!loaded" />
            <DashboardUsersViewStats :views="analytics.views" :style="{
                opacity: loaded ? 1 : 0,
                transition: 'all 500ms ease',
            }" />
        </div>
        <div class="dash-block">
            <Loader :height="'100%'" :has-background="false" v-if="!loaded" />
            <DashboardUsersCalculate :style="{
                opacity: loaded ? 1 : 0,
                transition: 'all 500ms ease',
                transitionDelay: '100ms'
            }" />
        </div>
        <div class="dash-block">
            <Loader :height="'100%'" :has-background="false" v-if="!loaded" />
            <DashboardUsersTImerStats :time="analytics.time" :style="{
                opacity: loaded ? 1 : 0,
                transition: 'all 500ms ease',
                transitionDelay: '100ms'
            }" />
        </div>
        <div class="dash-block">
            <Loader :height="'100%'" :has-background="false" v-if="!loaded" />
            <DashboardUsersFormCount :messages="analytics.messages" :style="{
                opacity: loaded ? 1 : 0,
                transition: 'all 500ms ease',
                transitionDelay: '100ms'
            }" />
        </div>

    </div>
    <div class="dash-blocks">
        <div class="dash-block screen50">
            <div class="dash-block-nest">
                <UsersBrowsersCounter v-if="loaded" :agents="analytics.browsers" />
            </div>
            <div class="dash-block-nest">
                <h4 class="dash-block-nest-title">Устройства</h4>
                <DoughnutCard />
            </div>
        </div>
        <div class="dash-block screen50">
            <div class="dash-block-nest">
                <UsersRouteActivity v-if="loaded" />
            </div>
            <div class="dash-block-nest">
                
            </div>
        </div>
    </div>
</template>


<script lang="ts" setup>
import UsersBrowsersCounter from '../dashboard/UsersBrowsersCounter.vue';
import UsersRouteActivity from '../dashboard/UsersRouteActivity.vue';
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