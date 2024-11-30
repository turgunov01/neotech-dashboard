import type { Editor } from "grapesjs";
import Swiper from "../config/swiper/scripts";


export function swiperPreset(editor: Editor) {

    editor.on('canvas:frame:load', () => {
        const swiperContainers = editor.Canvas.getDocument().querySelectorAll('.swiper');

        swiperContainers.forEach(container => {
            console.log(container)
            new Swiper(".swiper", {
                loop: false,
                autoplay: {
                    delay: 1000,
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        centeredSlides: true,
                    },

                    570: {
                        slidesPerView: 1.5,
                    },

                    800: {
                        slidesPerView: 2,
                        centeredSlides: false,
                    },

                    1000: {
                        slidesPerView: 3,
                        centeredSlides: false,
                    }
                },
            });
        });
    });

}