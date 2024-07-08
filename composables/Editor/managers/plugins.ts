import type { Component, ComponentAdd, Editor, Traits } from "grapesjs";
import type { SwiperInterface } from "../interface/swiper";

import { FormDomTrait, SwiperDomTrait, SwiperTraitsHandler } from "./traits";

import type { TraitManagerInterface } from "../interface/traits";

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
    const arr = [SwiperPluginsHandler(editor)]
    return arr
};

export function SwiperPluginsHandler(editor: Editor) {
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