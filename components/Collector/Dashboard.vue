<template>
    <div class="dash-blocks">
        <div class="dash-block">
            <UsersViewStats />
        </div>
        <div class="dash-block">
            <UsersTimerStats />
        </div>
    </div>
    <div class="dash-blocks">
        <div class="dash-block">
            <UsersFormCount />
            <UsersBrowsersCounter />
        </div>
        <div class="dash-block">
            <UsersRouteActivity />
        </div>
    </div>
</template>


<script lang="ts" setup>
import UsersViewStats from '~/components/dashboard/UsersViewStats.vue'
import UsersTimerStats from '~/components/dashboard/UsersTimerStats.vue'
import UsersFormCount from '~/components/dashboard/UsersFormCount.vue'
import UsersBrowsersCounter from '~/components/dashboard/agents/UsersBrowsersCounter.vue'
import UsersRouteActivity from '~/components/dashboard/history/UsersRouteActivity.vue'
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