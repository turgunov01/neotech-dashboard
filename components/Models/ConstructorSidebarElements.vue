<template>
    <div class="aside-container">
        <div class="aside-buttons">
            <button class="aside-button" title="Refresh" :class="activeElementType == 1 ? '' : 'active'"
                @click="toggle(0)">
                <p class="aside-button-name">Шаблоны</p>
            </button>
            <!-- <button class="aside-button changeBlockManager" :class="activeElementType == 0 ? '' : 'active'" @click="toggle(1)">
                <p class="aside-button-name">Блоки</p>
            </button> -->
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
                <div class="templates-cards" v-for="item in blocks" v-if="blocks.length > 0">
                    <div class="template-card" :draggable="(item as any).draggable" v-html="(item as any).label"
                        :inner-h-t-m-l="(item as any).content"></div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup lang="ts">

const activeElementType = ref(0)

const loaded = ref(true)

const blocks = ref([])

const toggle = (index: number) => {
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