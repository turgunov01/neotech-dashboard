<template>
    <div :class="`element-item-${identificator}`" class="element">
        <div class="element-button">
            <div class="element-button-visual">
                <ComponentEditor v-model="element.button.locale[locale].text" :modules="true" />
            </div>
            <div class="element-button-labels">
                <label :for="`element-button-background-${identificator}`" class="element-button-label">
                    <p class="element-button-label-title">Выбор фона цвета кнопки
                    </p>
                    <div class="element-button-label-rect"
                        :style="{ backgroundColor: element.button.css ? element.button.css['background'] : '#ffffff' }">
                    </div>
                    <input :id="`element-button-background-${identificator}`" hidden type="color"
                        @input="color($event, 'background')" />
                </label>
                <label :for="`element-button-border-${identificator}`" class="element-button-label">
                    <p class="element-button-label-title">Выбор цвета контура кнопки
                    </p>
                    <div class="element-button-label-rect"
                        :style="{ background: element.button.css ? element.button.css['borderColor'] : '#ffffff' }">
                    </div>
                    <input :id="`element-button-border-${identificator}`" hidden type="color"
                        @input="color($event, 'borderColor')" />
                </label>
                <!-- <div class="element-button-linker">
                    <p class="element-button-linker-title">Открыть -</p>
                    <select :id="`element-button-route-${identificator}-${element.name}`"
                        @change="$emit('update:selected', $event, element)">
                        <option value="/" selected disabled>Выберите страницу
                        </option>
                        <option v-for="(  route, index  ) in list" :value="route">
                            {{ route.name }}
                        </option>
                    </select>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import ComponentEditor from '../ComponentEditor.vue';

const locale = getLanguage()
const emits = defineEmits(['update:color', 'update:selected'])

const props = defineProps({
    identificator: {
        required: true,
        type: String
    },
    element: {
        required: true,
        type: Object
    },
    list: {
        required: true,
        type: Array
    }
})


// Methods
const color = (e: any, value: any) => {
    let inputvalue = e.target.value

    if (!props.element.button.css) {
        props.element.button.css = {}
    }

    props.element.button.css[value] = inputvalue

}

</script>

<style scoped lang="scss">
.element {
    &-button {
        width: 100%;
        max-width: 60rem;
        border: .1rem solid #e5e5e5;
        padding: 2.4rem;
        border-radius: .4rem;

        &-visual {
            & input {
                outline: none !important;
            }

            & .editor {
                border: .1rem solid;
                padding: 1.5rem;
                border-radius: 1rem;
                text-align: center;
            }
        }

        &-labels {
            margin-top: 2.1rem;
            display: flex;
            flex-direction: column;
            row-gap: 1.2rem;
        }

        &-label {
            width: 100%;
            height: 100%;
            background: unset;

            &-rect {
                width: 1.8rem;
                height: 1.8rem;
                border: .1rem solid #e5e5e5;
                margin-top: .4rem;
            }

            &-title {
                font-size: 1.2rem;
                font-weight: 600;
                line-height: 130%;
                color: #8A98AC;
                letter-spacing: 0.1px;
            }
        }

        &-linker {
            display: flex;
            align-items: center;
            gap: .5rem;

            &-title {
                font-size: 1.5rem;
                line-height: 2.1rem;
                font-weight: 400;
            }

            & select {
                background: unset;
                border: unset;
                font-size: 1.6rem;
                width: max-content;

                & option {
                    color: #0054FF;
                }
            }

        }
    }
}
</style>