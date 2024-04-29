<template>
    <div class="dash">
        <h2 class="dash-heading">Статистика</h2>
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

.dash-blocks {
    margin-top: 3.2rem;
    display: flex;
    justify-content: space-between;
}

.dash-block {
    width: 100%;
    max-width: calc((100% / 2) - 1.6rem);
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