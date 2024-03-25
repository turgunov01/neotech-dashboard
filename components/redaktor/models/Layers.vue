<template>
    <div class="layers">
        <div class="layers-container">
            <draggable :list="list.blocks" class="layers-list">
                <template #item="{ element, index }">
                    <li class="layers-item" @contextmenu.prevent="contextmenu(element.id)"
                        :class="Number($router.currentRoute.value.query.block) == index ? 'active' : ''">
                        <nuxt-link @click="refresh()" :to="`${$router.currentRoute.value.path}?block=${index}`">
                            {{ element.name }}
                        </nuxt-link>
                        <img src="../../../src/assets/burger.svg" alt="">
                        <div :id="`layers-context-menu-${index}`" class="context-menu">
                            <button @click="deleteBlock(element.id)">delete</button>
                        </div>
                    </li>
                </template>
            </draggable>
            <button class="layers-button" @click="$emit('open')">Добавить блок</button>
        </div>
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
import draggable from 'vuedraggable';
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
    await postIndexData(`/pages/${$router.currentRoute.value.params.id}`, JSON.stringify(object))
        .then(response => response.json())
        .then((response: any) => {
            console.log(response.message)
            props.model = false
            setTimeout(() => {
                location.reload()
            }, 300);
        })
}

const contextmenu = (index: Number) => {
    const context = document.querySelector(`#layers-context-menu-${index}`)
    const menus = document.querySelectorAll(".context-menu")
    menus.forEach(menu => {
        menu.classList.remove('active')
    })
    if (context) {
        context.classList.add("active")
    }
}

const deleteBlock = async (index: Number) => {
    await apiDeleteFetch(`/pages/${$router.currentRoute.value.params.id}/block/${index}`)
        .then((response: Response | any) => response.json())
        .then((response: Response | any) => {
            const data = response

            const menus = document.querySelectorAll(".context-menu")
            menus.forEach(menu => {
                menu.classList.remove('active')
            })

            setTimeout(() => {
                location.reload()
            }, 300);
        })
}



</script>
<style lang="scss" scoped>
@import '../../../src/assets/scss/pages.scss'
</style>