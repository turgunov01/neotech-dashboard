<template>
    <div class="element-event">
        <button class="pages-button" @click="$emit('position')">+</button>

        <div class="element-event-left">
            <button class="element-event-save" @click="savePage">Сохранить</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const emits = defineEmits(['save', 'position'])

const props = defineProps({
    data: {
        required: true,
        type: Array
    }
})

const $router = useRouter()

const Route = ref({
    pathname: $router.currentRoute.value.path,
    id: $router.currentRoute.value.params.id,
    query: $router.currentRoute.value.query.block
})

const savePage = async () => {
    const index = props.data[Number(Route.value.id)]
    await postIndexData(`/pages/${Route.value.id}/update?block=${Route.value.query}`, JSON.stringify(index))
    setTimeout(() => {
        location.reload()
    }, 300);
}
</script>

<style scoped lang="scss">
.element {
    &-event {
        margin-left: 3.2rem;

        &-save {
            background: #E2F0FD;
            color: #0054FF;
            font-size: 1.5rem;
            line-height: 2.1rem;
            width: 100%;
            max-width: 16rem;
            height: 4rem;
            border-radius: .4rem;
            border: none;
            margin-top: 2rem;
        }
    }
}

.pages {

    &-button {
        cursor: pointer;
        width: 100%;
        max-width: 5rem;
    }
}
</style>