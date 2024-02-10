<template>
    <div class="button">
        <input type="text" class="button-name" :value="data.text">
    </div>
</template>
<script lang="ts" setup>

const props = defineProps({
    data: {
        required: true,
        type: Object
    }
})

</script>
<style lang="">
    
</style>