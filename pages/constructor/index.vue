<template>
    <div class="wrapper">
        <aside class="aside">
            <ConstructorSidebarElements />
        </aside>
        <div class="demo">
            <div class="demo-page">
                <div class="demo-container">
                    <Constructor />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Constructor from '~/components/Constructor.vue';
import ConstructorSidebarElements from '../../components/Models/ConstructorSidebarElements.vue'

const component = ref({
    name: "Logo",
    id: 1,
    content: {
        type: "img",
        param: "svg",
        url: "http://localhost:3000/_nuxt/assets/icons/logo.svg"
    },
    class: ['logo', 'nav-logo', 'header-logo'],
    animation: [null],
})


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

.demo-container {
    width: 100% !important;
}


.wrapper {
    display: flex;
}
</style>