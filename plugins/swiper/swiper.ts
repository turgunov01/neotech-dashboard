import { Component, Editor } from "grapesjs";
import type { SwiperInterface } from "~/composables/Editor/interface/swiper";

export class Swiper {
    [variable: string]: any

    constructor(private container: HTMLIFrameElement, private editor: Editor, private params: SwiperInterface) {
        this.container = container as HTMLIFrameElement;
        this.wrapper = this.container.firstChild as HTMLIFrameElement;
        this.editor = editor as Editor;

        this.params = params;

        this.currentIndex = 0;
    }

    init() {
        this.carousel(this.params.slidesPerView as number)
    }

    carousel(number: number) {
        this.number = number;
        const wrapper = (this.wrapper as HTMLIFrameElement);
        const elements = wrapper.childNodes;

        const counter = `calc(100 / ${number})`

        elements.forEach((el: any) => {
            el.style.flex = `0 0 ${counter}`

            // const className = `.swiper[data-swiper=${this.container.id}] .swiper-slide`
            // this.editor.Css.addRules(`${className} {flex: 0 0 ${counter}}`)
        })
    }

    generate() {
        const nextButton = document.createElement("button");
        nextButton.classList.add(this.params.navigation?.nextEl as string);
        nextButton.innerHTML = "Next";
        this.container.appendChild(nextButton);

        const prevButton = document.createElement("button");
        prevButton.classList.add(this.params.navigation?.prevEl as string);
        prevButton.innerHTML = "Prev";
        this.container.appendChild(prevButton);
    }

    destroy() {
        const nextButton = this.container.querySelector(".swiper-button-next");
        const prevButton = this.container.querySelector(".swiper-button-prev");

        nextButton?.remove()
        prevButton?.remove()

    }

    next() {
        const nextButton = this.container.querySelector(".swiper-button-next");
        nextButton?.addEventListener("click", () => {
            this.wrapper.style.transform = "translateX(-33%)"
        })
    }

    autoplay() {
        setInterval(() => {
            this.wrapper.style.transform = "translateX(-33%)"
        }, this.params.autoplay.delay)
    }
}

export default Swiper