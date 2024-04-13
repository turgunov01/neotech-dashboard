<template>
    <div class="pages" v-if="loaded">
        <div class="pages-wrapper">
            <div class="pages-container">
                <h1 class="pages-title">{{ (list[Number(Route.id)] as any).name }}</h1>
                <Locales />
            </div>
            <div class="pages-content">
                <EditorModelsLayers :list="list[Number(Route.id)]" :edit-model="editModel" />
                <div class="pages-editor"
                    v-if="(list[Number(Route.id)] as any).blocks && (list[Number(Route.id)] as any).blocks.length">
                    <div class="pages-editor-drag">
                        <draggable :list="(list[Number(Route.id)] as any).blocks[Route.query as any].components"
                            handle=".burger">
                            <template #item="{ element, index }" class="element">
                                <div class="element-selector">
                                    <img src="../../../src/assets/burger.svg" class="burger"
                                        @click="toggleModal($event)" alt="">
                                    <FloatingDeleteMenu :identificator="index" @delete="deleteNode(index, $event)"
                                        @close="closeDeleteModal" />
                                    <EditorTemplates :identificator="index" :element="element"
                                        @update="updateClass($event, element)" />
                                </div>
                            </template>
                        </draggable>
                    </div>
                    <AddBlock :data="list" @position="position" />
                </div>
            </div>
        </div>
    </div>
    <FloatingMenu :top="asideTop" :left="asideLeft" :list="list" @convert="opened = !opened" v-if="opened" />
</template>

<script lang="ts" setup>
import draggable from 'vuedraggable';
// Using references to use dynamic variables
import FloatingMenu from '~/components/Editor/models/FloatingMenu.vue';
import FloatingDeleteMenu from '~/components/Editor/models/FloatingDeleteMenu.vue';

const locale = getLanguage()

const loaded = ref(false)

// Neccessary components' variables
const list = ref([])
const layers = ref([])
const $router = useRouter()
const opened = ref(false)

const deleteModal = ref(false)

const lang = getLanguage()

const fileInput = ref(null)

// Draggable component
const component = defineComponent(draggable)

// Route information for using in the component
const Route = ref({
    id: $router.currentRoute.value.params.id,
    path: $router.currentRoute.value.path,
    query: $router.currentRoute.value.query.block,
})


// Opens the modal window which creates a new block inside of the Route.value.layers and declares it in blocks list.
// Pushes immediately into server
const model = ref(false)
const editModel = ref(false)

// Get all data by route and by default for editing
const getData = async () => {
    await getIndexData("/pages/")
        .then((response: any) => response.json())
        .then((response: Response | any) => {
            response.data.pages.forEach((pages: Object | any) => {
                list.value.push(pages as never);
            })

            // console.log(list.value[Route.value.id].blocks[Route.value.query].components)
            return
        })

    await currentComponent()
}

const currentComponent = async () => {
    await getIndexData(`/pages/${Route.value.id}`)
        .then((response: Response | any) => response.json())
        .then((response: Response | any) => {
            const data = response

            const component = data.page

            try {
                if ($router.currentRoute.value.query.block) return
                $router.push({ path: $router.currentRoute.value.path, query: { block: 0 } })
                setTimeout(() => {
                    location.reload()
                }, 300);
            } catch (err) {
                console.log(err)
            }

        })
        .catch((error: Error | any) => {
            if (error) console.log(error)
        })
}

// Toggling the delete window
const toggleModal = (e: MouseEvent | any) => {
    deleteModal.value = !deleteModal.value
    if (deleteModal.value === true) {
        const modals = document.querySelectorAll(".element-delete-request")

        modals.forEach((modal: any) => {
            modal.classList.remove("active")
        })

        e.target.nextSibling.classList.add("active")
    } else {
        const modals = document.querySelectorAll(".element-delete-request")

        modals.forEach((modal: any) => {
            modal.classList.remove("active")
        })
    }
}

const closeDeleteModal = () => {
    deleteModal.value = !deleteModal.value

    const modals = document.querySelectorAll(".element-delete-request")
    modals.forEach((modal: any) => {
        modal.classList.remove("active")
    })
}

// Add Class to block
const updateClass = (e: MouseEvent | any, fields: Object | any) => {
    fields.css = []
    fields.css.push(e.target.id)
}

// aside positioning on active\clicked

// Aside positions for further deletion of the components 
const asideTop = ref("0")
const asideLeft = ref("0")

// Function which calculates the position and the distances for aside
const position = () => {
    const button = document.querySelector(".pages-button")

    const rect = button?.getBoundingClientRect()

    asideTop.value = `${((rect?.top ?? 0) + 40) / 10}rem`
    asideLeft.value = `${(rect?.left ?? 0) / 10}rem`
    opened.value = !opened.value
}



// GET select value
const selected = (e: MouseEvent | any, element: Object | any) => {
    const value = e.target.value
    element.button.route = value
}


// Deleting component 
const deleteNode = async (val: Number | any, e: MouseEvent | any) => {
    const array = (list.value[Number(Route.value.id)] as any).blocks[Number(Route.value.query)].components.filter((item: any, index: number) => index !== val);

    (list.value[Number(Route.value.id)] as any).blocks[Number(Route.value.query)].components = array
    try {
        await postIndexData(`/pages/${Route.value.id}/update?block=${Route.value.query}`, JSON.stringify(list.value[parseInt(Route.value.id as any)]));
    }
    catch (error) {
        console.log(error)
        return
    }
    finally {
        setTimeout(() => {
            location.reload()
        }, 300);
    }
}

// Change localization on the localStorage
const openParams = (index: number, event: EventTarget | any) => {
    const element = document.querySelector(`.element-item-${index}`)
    const modal = element?.querySelector(`.element-column-context`)
    modal?.classList.add("opened")


    const top = event.clientY
    const left = event.clientX

    console.log(top, left)

}

onMounted(async () => {
    await getData()

    if (!(list.value[Number(Route.value.id)] as any).blocks[(Route.value.query as never)]) {
        $router.push({ path: $router.currentRoute.value.path, query: { block: 0 } })
        setTimeout(() => {
            location.reload()
        }, 300);
    }

    loaded.value = true
})
</script>

<style lang="scss" scoped>
@import '../../../src/assets/scss/pages.scss';

.pages {
    &-container {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}

.element {

    &-selector {
        position: relative;
    }
}
</style>