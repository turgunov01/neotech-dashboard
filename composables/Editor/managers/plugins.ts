import type { Editor } from "grapesjs";
import type { SwiperInterface } from "../interface/swiper";

import { FormDomTrait, SwiperDomTrait, SwiperTraitsHandler } from "./traits";

import type { TraitManagerInterface } from "../interface/traits";

import { FormTraitsHandler as FormTraitController } from "./traits";

const params = {
    slidesPerView: 3,
    spaceBetween: 30,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 1000,
    }
} as SwiperInterface

export function Plugins(editor: Editor) {
    const arr = [SwiperPluginsHandler(editor), FormTraitsHandler(editor)]
    return arr
};

export async function SwiperPluginsHandler(editor: Editor) {
    const init = {
        type: "swiper",
        name: "Swiper",
        label: `
            <div class="swiper-init" style="display: flex; align-items: center; width: 100%; justify-content: space-between; gap: 10px; flex-wrap: wrap; border: 1px solid rgba(0,0,0,0.2); padding: 5px;">
                <p class="swiper-on">Инициализация</p>
                <input type="checkbox" checked id="init" style="width: 20px !important; color: black; border-bottom: 1px solid;" name="calculate" />
            </div>
            <div class="swiper-autoplay" style="display: flex; align-items: center; width: 100%; justify-content: space-between; gap: 10px; flex-wrap: wrap; border: 1px solid rgba(0,0,0,0.2); padding: 5px;">
                <div class="autoplay-init" style="display: flex; align-items: center; width: 100%; justify-content: space-between;">
                    <p class="swiper-autoplay">Автоскролл</p>
                    <input type="checkbox" checked id="autoplay" style="width: 20px !important; color: black; border-bottom: 1px solid;" name="calculate" />    
                </div>
                <div class="autoplay-delay" style="display: none; align-items: center; width: 100%; justify-content: space-between; border-top: 1px solid; padding-top: 5px;">
                    <p class="swiper-autoplay-delay">Задержка (ms)</p>
                    <input type="number" checked id="autoplay-delay" style="width: 75px !important; color: black; border-bottom: 1px solid;" name="calculate" />    
                </div>
            </div>
            <div class="swiper-slidesPerView" style="display: flex; align-items: center; width: 100%; justify-content: space-between; gap: 10px; flex-wrap: wrap; border: 1px solid rgba(0,0,0,0.2); padding: 5px;">
                <p class="swiper-on">Количество слайдов</p>
                <input type="number" id="slidesPerView" style="width: 50px !important; color: black; border-bottom: 1px solid;" name="calculate" />
            </div>
            <div class="swiper-navigation" style="display: flex; align-items: center; width: 100%; justify-content: space-between; gap: 10px; flex-wrap: wrap; border: 1px solid rgba(0,0,0,0.2); padding: 5px;">
                <p class="swiper-on">Навигации</p>
                <input type="checkbox" id="navigation" style="width: 20px !important; color: black; border-bottom: 1px solid;" name="calculate" />
            </div>
        `,
        style: {
            display: "flex",
            "flex-direction": "column",
            "row-gap": "20px"
        },
    } as TraitManagerInterface

    editor.DomComponents.addType(init.type, SwiperDomTrait(init))
    editor.TraitManager.addType(init.type, {
        noLabel: true,

        createInput({ trait }) {
            return new SwiperTraitsHandler(init, editor).createInput({ trait })
        },

        onEvent({ elInput, component }) {
            return new SwiperTraitsHandler(init, editor).onEvent({ elInput, component, params })
        },

        onUpdate({ elInput, component }) {
            return new SwiperTraitsHandler(init, editor).onUpdate({ elInput, component })
        }
    })


}

export function FormTraitsHandler(editor: Editor) {
    const form = {
        type: "input",
        name: "INPUT",
        label: `
            <div class="form-sender-input" style="width: 100%;">
                 <p class="form-sender-title" style="opacity: 0.5;">CRM Url</p>
                 <input type="text" id="crm-nest" value="${uri}/api/messages" placeholder="${uri}/api/messages" class="input-crm-url" style="width: 100% !important; color: black; border-bottom: 1px solid;" name="calculate" />
            </div>
            <div class="form-sender-input" style="width: 100%;">
                 <p class="form-sender-title" style="font-size: 18px; opacity: 0.5;">Кастомизация кнопки</p>
                <div class="button-handler-events">
                    <label for="buttonHasEvent" class="button-handler-event" style="display: flex; align-items: center; padding: 10px 0; border-top: 1px solid black; border-bottom: 1px solid black;">
                        <p class="button-clip-title" style="line-height: 100%;">Событие отправки включить/выключить</p>
                        <input type="checkbox" id="buttonHasEvent" class="button-clip-event" />
                    </label>
                </div>
            </div>
        `,
        style: {
            display: "flex",
            "flex-direction": "column",
            "row-gap": "20px"
        },
    } as TraitManagerInterface

    editor.DomComponents.addType('input', FormDomTrait(form));

    editor.TraitManager.addType("input", {
        noLabel: true,

        createInput({ trait }) {
            return new FormTraitController(form, editor).createInput({ trait })
        },

        onEvent({ elInput, component }) {
            return new FormTraitController(form, editor).onEvent({ elInput, component })
        },

        onUpdate({ elInput, component }) {
            return new FormTraitController(form, editor).onUpdate({ elInput, component })
        }
    })

    return form
}