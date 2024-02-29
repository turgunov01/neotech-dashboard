<template>
    <div class="layers">
        <div class="layers-container">
            <ul class="layers-list">
                <li class="layers-item" v-for="(item, index) in list"
                    :class="Number($router.currentRoute.value.query.block) == index ? 'active' : ''">
                    <nuxt-link @click="refresh()" :to="`${$router.currentRoute.value.path}?block=${item.id}`">{{ item.name
                    }}</nuxt-link>
                </li>
            </ul>
            <button class="layers-button" @click="$emit('open')">Добавить блок</button>
        </div>
        <!-- <redaktor-models-delete-menu :menu="" /> -->
    </div>
    <div class="view" v-if="model" @click.self="$emit('open')">
        <div class="view-container">
            <div class="view-container-input">
                <input type="text" v-model="object.name">
            </div>
            <button class="view-button" @click="update">Добавить</button>
        </div>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps({
    list: {
        type: Array,
        required: true
    },
    model: {
        required: true,
        type: Boolean
    }
})

const emits = defineEmits(['open'])

const $router = useRouter()

const object = {
    name: "Новый блок",
    components: []
}

const refresh = () => {
    setTimeout(() => {
        location.reload()
    }, 300);
}


const update = async () => {
    await postIndexData(`${$router.currentRoute.value.path}`, JSON.stringify(object))
        .then(response => response.json())
        .then((response: any) => {
            console.log(response.message)
            props.model = false
            setTimeout(() => {
                location.reload()
            }, 300);
        })
}



</script>
<style lang="scss" scoped>
@import '../../../src/assets/scss/pages.scss'
</style>