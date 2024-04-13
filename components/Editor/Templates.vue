<template>
    <div class="element-selector">
        <div class="element-draggable" v-if="element">
            <TextComponent v-if="element.component === 'Title' || element.component === 'Text'"
                @update="$emit('update')" :element="element" :identificator="identificator" />
            <SliderComponent :element="element" :identificator="identificator"
                v-else-if="element.component === 'Slider'" />
            <ButtonComponent v-else-if="element.component === 'Button'"
                @update:color="$emit('update:color', $event, element.button.backgroundColor)"
                :identificator="identificator" :element="element" :list="list" />
            <ImageComponent v-else-if="element.component === 'Image'" :element="element"
                :identificator="identificator" />
            <ColumnComponent v-else-if="element.component === 'Column'" :element="element"
                :identificator="identificator" />
        </div>
    </div>
</template>

<script setup>
import ButtonComponent from './templates/ButtonComponent.vue';
import ColumnComponent from './templates/ColumnComponent.vue';
import ImageComponent from './templates/ImageComponent.vue';
import SliderComponent from './templates/SliderComponent.vue';
import TextComponent from './templates/TextComponent.vue';

const locale = getLanguage()
const emits = defineEmits(['update', 'upload', 'update:color'])

const $router = useRouter()

const Route = ref({
    pathname: $router.currentRoute.value.path,
    id: $router.currentRoute.value.params.id
})

const props = defineProps({
    identificator: {
        required: true,
        type: Number
    },
    element: {
        required: true,
        type: Object
    },
})

const list = ref([])

</script>

<style scoped lang="scss">
.element {
    &-selector {
        width: 100%;
    }

    &-draggable {
        width: 100%;
    }
}
</style>