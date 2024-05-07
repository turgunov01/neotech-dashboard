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
            <div v-if="active === 0">
                <ConstructorSidebarInsert />
            </div>
            <div v-else-if="active === 1">
                <!-- <ConstructorSidebarPages /> -->
                <p>1</p>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">
import ConstructorSidebarInsert from './ConstructorSidebarInsert.vue';

const active = ref(0)

const toggle = (index: Number) => {
    (active as any).value = index
}

</script>


<style scoped lang="scss"></style>