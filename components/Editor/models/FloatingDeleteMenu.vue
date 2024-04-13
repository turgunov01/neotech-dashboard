<template>
    <aside class="element-delete-request">
        <p class="element-request-text">
            Удалить блок?
        </p>
        <div class="element-request-buttons">
            <button class="element-request-button" @click="$emit('delete', identificator, $event)">Да</button>
            <button class="element-request-button" @click="$emit('close')">Нет</button>
        </div>
    </aside>
</template>

<script lang="ts" setup>
const emits = defineEmits(['delete', 'close'])

const props = defineProps({
    identificator: {
        type: Number,
        required: true,
    }
})



</script>

<style lang="scss" scoped>
.element {
    &-request {
        &-buttons {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            width: 100%;
            margin-top: 1rem;

            & button {
                width: 10rem;
                height: 4rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                font-size: 1.5rem;
                line-height: 110%;
                font-weight: 500;
                border-radius: .4rem;

                &:nth-of-type(1) {
                    background: #E2F0FD;
                    color: #0054FF;
                }

                &:nth-of-type(2) {
                    background: #FBE9EA;
                    color: #FF3F3F;
                }

                &.active {
                    background: #F1F9FE;
                    color: #0054FF;
                    font-size: 1.5rem;
                    font-weight: 500;
                    line-height: 2.1rem;
                }
            }
        }
    }

    &-delete {
        &-request {
            top: 0;
            left: 3rem;
            display: none;
            position: absolute;
            box-shadow: 0 0 .4rem rgba(0, 0, 0, 0.2);
            z-index: 100;

            &.active {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                row-gap: 2rem;
                background: white;
                padding: 2rem;
            }
        }
    }

}
</style>