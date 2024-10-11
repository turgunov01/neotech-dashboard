import { type Editor } from "grapesjs";

import type { TraitManagerInterface } from "../interface/traits";
import { DomTrait } from "./elements";



export async function ButtonPluginsHandler(editor: Editor) {
    const routes = ref([] as any);

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
                routes.value.push({ name: item.name, value: item.route })
            })
        })

    const init = {
        type: "button",
        name: "BUTTON",
        label: `<div style="display: flex; align-items: center; justify-content: space-between; padding: 5px 15px;">
                    <p style="width: 100%; height: 100%;">Ссылка</p>
                    <select class="link-select" style="width: 100%; height: 100%; border: 1px solid black; text-align: center; color: black!important;">
                        ${routes.value.map((option: any) => `<option value="${option.value}">${option.name}</option>`).join('')}
                    </select>
                </div>
        `,
    } as TraitManagerInterface;

    editor.DomComponents.addType(init.type, DomTrait(init));

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

