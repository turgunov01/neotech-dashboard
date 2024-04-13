<template>
    <div class="layers">
        <div class="layers-container">
            <draggable :list="(list as any).blocks" class="layers-list">
                <template #item="{ element, index }">
                    <li class="layers-item" @contextmenu.prevent="contextmenu(element.id)"
                        :class="Number($router.currentRoute.value.query.block) == index ? 'active' : ''">
                        <nuxt-link @click="refresh()" :to="`${$router.currentRoute.value.path}?block=${index}`">
                            {{ element.name }}
                        </nuxt-link>
                        <img src="../../../src/assets/burger.svg" alt="">
                        <div :id="`layers-context-menu-${index}`" @mouseenter="staycontext($event)"
                            @mouseleave="removecontext($event)" class="context-menu">
                            <button class="delete" @click="deleteBlock(element.id)">delete</button>
                            <button class="edit" @click="toggleEdit(element.id)">edit</button>
                            <div class="context-menu-parameters">
                                <label :for="`context-menu-parameter-${index}`" class="context-menu-parameter">
                                    <input :checked="element.published" type="checkbox"
                                        :id="`context-menu-parameter-${index}`" @change="published(element.id, $event)">
                                    <p :class="`context-menu-parameter-${index}-span`">Показ</p>
                                </label>
                            </div>
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
            <button class="layers-button" @click="open()">Добавить блок</button>
        </div>
    </div>
    <div class="view" v-if="model === true" @click.self="open()">
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
    editModel: {
        required: true,
        type: Boolean
    }
})

const model = ref(false)

const emits = defineEmits(['save'])

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

const open = () => {
    model.value = !model.value
}

const update = async () => {
    await postIndexData(`/pages/${$router.currentRoute.value.params.id}`, JSON.stringify(object))

    setTimeout(() => {
        location.reload()
    }, 300);
}

const contextmenu = (index: Number) => {
    const context = document.querySelector(`#layers-context-menu-${index}`)
    const menus = document.querySelectorAll(".context-menu")
    menus.forEach(menu => {
        menu.classList.remove('active')
    })
    context?.classList.toggle("active")
}

const staycontext = (e: any) => {
    if (e) {
        e.target.classList.add('active')
    }
}

const removecontext = (e: any) => {
    setTimeout(() => {
        e.target.classList.remove('active')
    }, 4000);
}

const published = (value: any, event: any) => {
    const isChecked = event.target.checked

        (props.list as any).blocks[value].published = true ? false : true;
    (props.list as any).blocks[value].archived = false ? true : false;

    console.log((props.list as any).blocks[value])
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

        if (window.scrollY > 130) {
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

.context {
    &-menu {

        & button {
            text-transform: uppercase;
            cursor: pointer;
            height: 100%;
            border-radius: unset;
            transition: 300ms;

            &:not(:first-of-type) {
                border-top: .1rem solid #e5e5e5;
            }

            &:hover {
                background: #e5e5e5;
            }

            &.delete {
                color: red;
            }

            &.edit {
                color: black
            }
        }

        &-parameters {
            padding: 0;
        }

        &-parameter {
            display: flex;
            border-top: .1rem solid #e5e5e5;
            align-items: center;
            justify-content: flex-start;
            gap: .5rem;
            border-radius: unset;
            padding: 1rem;

            & input {
                width: max-content;
            }

            & p {
                padding: 0;
            }
        }
    }
}
</style>