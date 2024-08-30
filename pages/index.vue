<template>
    <div class="dash">
        <div class="dash-header">
            <h2 class="dash-heading">Статистика</h2>
            <div class="dash-header-buttons">
                <div class="dash-header-button-dates">
                    <button class="dash-header-button-date">За день</button>
                    <button class="dash-header-button-date">За месяц</button>
                    <button class="dash-header-button-date">За год</button>
                </div>
            </div>
        </div>
        <Dashboard />
    </div>
</template>


<script lang="ts" setup>
import Dashboard from '~/components/Collector/Dashboard.vue'
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