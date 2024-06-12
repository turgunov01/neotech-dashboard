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
                opacity: loaded && activeElementType == 0 ? 1 : 0,
                transition: '300ms',
                display: loaded && activeElementType == 0 ? 'flex' : 'none'
            }">
                <div class="insert-cards"></div>
            </div>
            <div class="templates" :style="{
                opacity: loaded && activeElementType == 1 ? 1 : 0,
                transition: '300ms',
                display: loaded && activeElementType == 1 ? 'flex' : 'none'
            }">
                <div class="templates-cards">
                    <button class="templates-card" draggable>
                        <img src="../../assets/constructor/inserts/text.svg" class="templates-card-image" alt="">
                    </button>
                    <button class="templates-card" draggable>
                        <img src="../../assets/constructor/inserts/center.svg" class="templates-card-image" alt="">
                    </button>
                    <button class="templates-card" draggable>
                        <img src="../../assets/constructor/inserts/form.svg" class="templates-card-image" alt="">
                    </button>
                    <button class="templates-card" draggable>
                        <img src="../../assets/constructor/inserts/logo.svg" class="templates-card-image" alt="">
                    </button>
                    <button class="templates-card" draggable>
                        <img src="../../assets/constructor/inserts/translations.svg" class="templates-card-image" alt="">
                    </button>
                    <button class="templates-card" draggable>
                        <img src="../../assets/constructor/inserts/input.svg" class="templates-card-image" alt="">
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

const activeElementType = ref(0)

const loaded = ref(true)

const toggle = (index: Number) => {
    try {
        loaded.value = false;
        (activeElementType.value as any) = index
    } catch (err) {
        alert(err)
    } finally {
        setTimeout(() => {
            loaded.value = true
        }, 1000);
    }
}

onMounted(() => {
    loaded.value = false
    setTimeout(() => {
        loaded.value = true
    }, 2000);
})

</script>


<style scoped lang="scss"></style>