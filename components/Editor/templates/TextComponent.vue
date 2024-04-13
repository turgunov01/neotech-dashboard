<template>
    <div :class="`element-item-${identificator}`" class="element"
        v-if="element.component == 'Title' || element.component == 'Text'">
        <EditorComponentEditor v-model="element.locale[getLanguage()].text" :modules="true"
            @class="$emit('update', $event, element)" />
    </div>
</template>

<script lang="ts" setup>

const emits = defineEmits(['update'])

const props = defineProps({
    element: {
        required: true,
        type: Object
    },
    identificator: {
        required: true,
        type: Number
    },
})


</script>

<style scoped>
/* Your styles go here */
</style>