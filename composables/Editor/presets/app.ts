import type { Editor } from "grapesjs";
import { swiperPreset as swiper } from "./swiper";


export function presetHandler(editor: Editor) {
    swiper(editor);
}