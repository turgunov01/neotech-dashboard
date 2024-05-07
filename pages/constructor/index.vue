<template>
    <div class="wrapper">
        <aside class="aside">
            <ConstructorSidebarElements />
        </aside>
        <div class="demo">
            <div class="demo-container">
                <div class="demo-page">
                    <div class="demo-container">
                        <TestComponent />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import TestComponent from '~/components/TestComponent.vue';
import ConstructorSidebarElements from '../../components/Models/ConstructorSidebarElements.vue'

</script>


<style scoped lang="scss">
h1,
h2,
h3,
h4,
h5,
h6,
p,
span {
    color: #344054 !important;
}


.wrapper {
    display: flex;
}
</style>