import type { Editor, Plugin, TraitGetValueOptions } from "grapesjs";
import Swiper from "~/plugins/swiper/swiper";
import type { SwiperInterface } from "../interface/swiper";


export function Plugins(editor: Editor) {
    return swiper(editor)
};

export function swiper(editor: Editor) {
    editor.DomComponents.addType('swiper', {
        isComponent: element => element?.classList?.contains('swiper'),
        model: {
            defaults: {
                traits: [
                    {
                        type: 'swiper',
                        name: 'href',
                        label: 'New href',
                    },
                ]
            }
        }
    });

    editor.TraitManager.addType('swiper', {
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

        onEvent({ elInput, component }) {
        },

        onUpdate({ elInput, component }) {
            const input = elInput.querySelector('input');
            console.log(component)
            const options = {
                slidesPerView: 3,
                spaceBetween: 30,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                },
                autoplay: {
                    delay: 3000,
                }
            } as SwiperInterface



            (input as HTMLInputElement).addEventListener('change', async (event) => {
                const swiper = new Swiper('.swiper', options).init(editor)
            });
        },
    });

}