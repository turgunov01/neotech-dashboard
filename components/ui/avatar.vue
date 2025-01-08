<script lang="ts" setup>
const props = defineProps({
    class: {
        required: true,
        type: String
    }
})
</script>

<template>
    <div :class="class">
        <img src="https://picsum.photos/200" alt="Avatar image">
    </div>
</template>
