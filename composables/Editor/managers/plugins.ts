import { Component, Traits, type Editor } from "grapesjs";

import { ButtonDomTrait, SwiperDomTrait } from "./traits";

import type { TraitManagerInterface } from "../interface/traits";

import { customRTE } from "../config/selector";


export function Plugins(editor: Editor) {
    const arr = [SwiperPluginsHandler(editor), ButtonPluginsHandler(editor), customRTE(editor)]
    return arr
};

export async function SwiperPluginsHandler(editor: Editor) {
    const init = {
        type: "swiper",
        name: "Swiper",
        label: ``,
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
            return init.label;
        },
        onEvent({ elInput, component }) { },

        onUpdate({ elInput, component }) {
            const selected = editor.getSelected()?.toJSON();
            const device = editor.DeviceManager.getSelected()?.toJSON().priority;

            const props = {
                count: device == 0 ? 3 : device <= 1000 ? 2 : 1,
                spaceBetween: 30,
            }

            if (selected?.type === init.type) {
                const element = editor.Components.getById(selected?.attributes?.id);
                const wrapper = element.components().toJSON();
                const components = wrapper[0].components.toJSON();

                components.forEach((cmp: Component, index: number) => {
                    const element = editor.Components.getById(cmp.attributes.id);
                    element.removeStyle("width")
                    element.addStyle({ width: `calc((100% / ${props.count}) - ${props.spaceBetween / 2}px)` })
                })
            }

            editor.getSelected()?.setAttributes({ style: "overflow: hidden" });

        }
    })
}

export async function ButtonPluginsHandler(editor: Editor) {
    const routes = [] as any;
    const options = await {
        method: "GET",
        headers: {
            "Content-Language": "ru-RU",
            Authorization: `${sessionStorage.getItem("Authorization")}`,
        }
    }

    await apiDataFetch(`${uri}/constructor/web`, options)
        .then(response => response.json())
        .then(response => {
            response.forEach((item: any) => {
                routes.push({ name: item.name, value: item.route })
            })
        })

    const init = {
        type: "button",
        name: "Button",
        label: `<div style="display: flex; align-items: center; justify-content: space-between; padding: 5px 15px;">
                    <p style="width: 100%; height: 100%;">Ссылка</p>
                    <select class="link-select" style="width: 100%; height: 100%; border: 1px solid black; text-align: center; color: black!important;">
                        ${routes.map((option: any) => `<option value="${option.value}">${option.name}</option>`).join('')}
                    </select>
                </div>
        `,
    } as TraitManagerInterface;

    editor.DomComponents.addType(init.type, ButtonDomTrait(init));

    editor.TraitManager.addType(init.type, {
        noLabel: true,

        createInput({ trait }) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = init.label;
            return wrapper;
        },

        onEvent({ elInput, component }) {
        },

        async onUpdate({ elInput, component }) {
            const selector = elInput.querySelector('.link-select') as HTMLInputElement;

            if (selector) {
                const button = editor.getSelected()?.getEl();

                if (button && button.hasAttribute("link")) {
                    const link = button.getAttribute("link") as string;
                    const options = selector.childNodes;

                    options.forEach((option: any) => {
                        if (option.value === link) {
                            option.setAttribute("selected", "true")
                        }
                    })
                }

                selector.addEventListener("input", () => {
                    const link = selector.value;

                    // button?.setAttribute("link", link)
                    const element = editor.getSelected();
                    element?.setAttributes({ link: link })
                })
            }
        },
    });
}
