import type { Editor, Plugin, TraitGetValueOptions } from "grapesjs";
import Swiper from "~/plugins/swiper/swiper";
import type { SwiperInterface } from "../interface/swiper";


export function Plugins(editor: Editor) {
    return swiper(editor)
};

export function swiper(editor: Editor) {
    editor.DomComponents.addType('swiper', {
        isComponent: el => el?.classList?.contains("swiper"),
        model: {
            defaults: {
                traits: [
                    {
                        type: 'href-next',
                        name: 'href',
                        label: 'New href',
                    },
                ]
            }
        }
    });

    editor.TraitManager.addType('href-next', {
        noLabel: true,

        // Return a simple HTML string or an HTML element
        createInput({ trait }) {
            const traitOpts = trait.get('options') || [];
            const options = traitOpts.length ? traitOpts : [
                { id: 'url', name: 'URL' },
                { id: 'email', name: 'Email' },
            ];

            const el = document.createElement('div');

            el.classList.add("swiper-trait")

            el.innerHTML = `
               <p class="swiper-on">Turn on Swiper mode</p>
               <input type="checkbox" id="scales" name="scales" />
            `

            return el;
        },

        // onEvent({ elInput, component }) {

        // },

        onUpdate({ elInput, component }) {
            const input = elInput.querySelector('input');
            const options = {
                slidesPerView: 3,
                spaceBetween: 30,
            } as SwiperInterface

            const css = editor.Css

            if (input?.checked) {
                const swiper = new Swiper('.swiper', options)
            }

            (input as HTMLInputElement).addEventListener('change', async (event) => {
                if ((event.target as HTMLInputElement).checked) {
                    const swiper = new Swiper('.swiper', options).init(editor)
                } else {
                    return
                }
            });
        },
    });

}