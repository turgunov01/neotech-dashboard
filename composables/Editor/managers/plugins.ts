import type { Editor, Plugin, TraitGetValueOptions } from "grapesjs";
import Swiper from "~/plugins/swiper/swiper";
import type { SwiperInterface } from "../interface/swiper";
import { TraitDomComponent, TraitsCreateElement, createElement } from "./traits";
import type { TraitsElementInterface } from "../interface/traits";
import { modelEvent, selectElement } from "../model/traits/events";

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
    return swiper(editor)
};

export function swiper(editor: Editor) {

    const options = {
        init: {
            type: "swiper",
            name: "Swiper",
            label: `
            <div class="swiper-init" style="display: flex; align-items: center; width: 100%; justify-content: space-between; gap: 10px; flex-wrap: wrap; border: 1px solid rgba(0,0,0,0.2); padding: 5px;">
                 <p class="swiper-on">Turn on Swiper mode</p>
                 <input type="checkbox" id="init" name="scales" />
            </div>
        `,
            style: {
                display: "flex",
                "flex-direction": "column",
                "row-gap": "20px"
            },
        }
    } as TraitsElementInterface

    editor.DomComponents.addType(options.init.type, TraitDomComponent(options.init))

    editor.TraitManager.addType(options.init.type, {
        noLabel: true,

        // Return a simple HTML string or an HTML element
        createInput({ trait }) {
            return new TraitsCreateElement(editor, options).createInput({ trait })
        },

        onEvent({ elInput, component }) {
            async function handle() {
                const swiper = await new Swiper(".swiper", params).init(editor)
            }

            return new TraitsCreateElement(editor, options).onEvent({ elInput, component, params, handle })
        },
    });

}