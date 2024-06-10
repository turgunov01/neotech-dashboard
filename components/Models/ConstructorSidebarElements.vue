<template>
    <div class="aside-container">
        <div class="aside-buttons">
            <button class="aside-button" :class="activeElementType == 1 ? '' : 'active'" @click="toggle(0)">
                <p class="aside-button-name">Шаблоны</p>
            </button>
            <button class="aside-button" :class="activeElementType == 0 ? '' : 'active'" @click="toggle(1)">
                <p class="aside-button-name">Блоки</p>
            </button>
        </div>
        <div class="aside-content">
            <Loader v-if="!loaded" :height="'10rem'" />
            <div class="insert" :style="{
                opacity: loaded ? 1 : 0,
                transition: '1s'
            }">
                <div class="insert-cards"></div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

const activeElementType = ref(0)

const loaded = ref(true)

const toggle = (index: Number) => {
    (activeElementType.value as any) = index
}

onMounted(() => {
    loaded.value = false
    setTimeout(() => {
        loaded.value = true
    }, 2000);
})

</script>


<style scoped lang="scss"></style>