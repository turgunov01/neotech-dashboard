<template>
    <div class="modal" ref="modal" v-if="close">
        <div class="modal-container">
            <input type="text" placeholder="Название блока" v-model="input" class="modal-input">
            <button class="modal-button" @click="update(input), $emit('modal')">Сохранить</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const toast = useToast()
const modal = ref("modal")
const input = ref("")

const props = defineProps({
    list: {
        required: true,
        type: Array,
        default: []
    },
    close: {
        required: true,
        type: Boolean,
        default: false,
    }
})

const emits = defineEmits(['modal'])


const update = async (value: string) => {
    const object = {
        id: props.list.length,
        components: [],
        name: value
    }

    props.list.push(object)

    await postIndexData("/pages/index/block", JSON.stringify(object))
        .then(response => response.json())
        .then(response => {
            const data = response

            toast.add({
                id: 'Updated',
                title: data.message,
                icon: 'i-heroicons-check-circle',
                timeout: 3000,
            })
        })


}


</script>

<style scoped lang="scss">
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;


    &-container {
        width: 30rem;
        height: 15rem;
        background-color: #fff;
        border-radius: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        padding: 2rem;
        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    }

    &-input {
        width: 100%;
        padding: 1rem;
        border: none;
        border-bottom: .1rem solid #E2F0FD;
        outline: none;
        font-size: 1.5rem;
        font-weight: 500;
        color: #0054FF;
    }

    &-button {
        width: 100%;
        max-width: 25rem;
        height: 4rem;
        border-radius: .4rem;
        border: none;
        outline: none;
        cursor: pointer;
        background-color: #E2F0FD;
        color: #0054FF;
        font-size: 1.6rem !important;
    }



}
</style>