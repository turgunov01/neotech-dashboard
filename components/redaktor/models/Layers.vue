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
                            <button @click="toggleEdit(element.id)">edit name</button>
                        </div>
                        <div class="view" :class="`edit-modal edit-modal-name-${element.id}`"
                            @click="closeModal($event)">
                            <div class="view-container">
                                <div class="view-container-input">
                                    <input type="text" v-model="element.name">
                                </div>
                                <button class="view-button" @click="$emit('save')">Сохранить</button>
                            </div>
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
    },
    editModel: {
        required: true,
        type: Boolean
    }
})

const emits = defineEmits(['open', 'save'])

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

const toggleEdit = async (index: Number) => {
    const item = document.querySelector(`.edit-modal-name-${index}`)
    const items = document.querySelectorAll(".edit-modal")

    items.forEach((block: any) => {
        block.classList.remove('active')
    })
    const menus = document.querySelectorAll(".context-menu")
    menus.forEach(menu => {
        menu.classList.remove('active')
    })

    item?.classList.add('active')
}

const closeModal = (event: any) => {
    event.target.classList.remove('active')
}

onMounted(() => {
    window.onscroll = () => {
        const layer = document.querySelector(".layers-container")
        const top = layer?.getBoundingClientRect().top

        if(window.scrollY > 130) {
            layer?.classList.add("fixed")
        } else {
            layer?.classList.remove("fixed")
        }
    }
})

</script>
<style lang="scss" scoped>
@import '../../../src/assets/scss/pages.scss';


.edit-modal {
    display: none;

    &.active {
        display: flex
    }
}

.view-button {
    text-align: center;
}
</style>