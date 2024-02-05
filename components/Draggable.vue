<template>
    <draggable :list="list" item-key="id">
        <template #item="{ element }">
            <Text :data="element" @toggle="$emit('toggle', $event)" />
        </template>
    </draggable>
</template>
  
<script setup lang="ts">
import draggable from 'vuedraggable';

import Column from '~/components/redaktor/blocks/Column.vue';
import Image from '~/components/redaktor/blocks/Image.vue';
import Text from '~/components/redaktor/blocks/Text.vue';
import Title from '~/components/redaktor/blocks/Title.vue';

const emits = defineEmits(['toggle'])

const props = defineProps({
    list: {
        required: true,
        type: Array,
    },
    data: {
        required: true,
        type: Object
    }
})

</script>
<style scoped>
.buttons {
    margin-top: 35px;
}

.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
</style>