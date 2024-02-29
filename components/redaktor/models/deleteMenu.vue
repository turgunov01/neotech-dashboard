<template>
    <div class="menu">
        <div class="menu-container">
            <p class="menu-title"> Уверены, что хотите удалить блок - {{ menu.name }} </p>
            <button class="menu-button" @click="$emit('delete', menu.id)">
                Да, уверен
            </button>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    menu: {
        required: true,
        type: Object
    }
})
</script>
<style lang="scss" scoped>

.menu {
    position: fixed;
    width: 100%;
    max-width: 30rem;

    &-title {
        font-size: 1.5rem;
        font-weight: 500;
    }
}
    
</style>