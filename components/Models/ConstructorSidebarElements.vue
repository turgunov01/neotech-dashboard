<template>
    <div class="aside-container">
        <div class="aside-buttons">
            <button class="aside-button" :class="active === 0 ? 'active' : ''" @click="toggle(0)">
                <p class="aside-button-name">Вставка</p>
            </button>
            <button class="aside-button" :class="active === 1 ? 'active' : ''" @click="toggle(1)">
                <p class="aside-button-name">Страницы</p>
            </button>
        </div>
        <div class="aside-content">
            <div class="aside-content-switcher" :class="active === 1 ? 'active' : ''">
                <div class="insert">
                    <div class="insert-cards" ref="cards"></div>
                </div>
            </div>
            <div class="aside-content-switcher" :class="active === 0 ? 'active' : ''">
                <!-- <ConstructorSidebarPages /> -->
                <p>1</p>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

const active = ref(0)

const toggle = (index: Number) => {
    (active as any).value = index
}

</script>


<style scoped lang="scss"></style>