import type { Editor } from "grapesjs";
import type { Autoplay, SwiperInterface } from "~/composables/Editor/interface/swiper";

export class Swiper {
    private container: HTMLIFrameElement;
    private carousel: HTMLIFrameElement;
    private elements: HTMLIFrameElement;

    private editor: Editor | any;

    [variable: string]: any;


    constructor(container: string, options: SwiperInterface) {
        const frame = document?.querySelector(".gjs-frame") as HTMLIFrameElement;
        this.container = frame.contentWindow?.document.querySelector(container) as HTMLIFrameElement
        this.carousel = (this.container as HTMLIFrameElement).querySelector(".swiper-wrapper") as HTMLIFrameElement
        this.elements = (this.carousel as HTMLIFrameElement).childNodes as HTMLElement[] | any;
        this.currentPosition = 0

        this.options = options;
    }

    public init(editor: Editor) {
        this.setSwiper(editor);
        this.setWrapper(editor);
        this.setCarousel(editor);

        this.setNavigation(editor);

        if (this.options.autoplay) {
            this.setAutoplay()
        }
    }

    private setSwiper(editor: Editor) {
        const manager = {
            "margin-right": "auto",
            "margin-left": "auto",
            "position": "relative",
            "overflow": "hidden",
            "list-style": "none",
            "padding": "0",
            "z-index": "1",
        }

        for (const key in manager) {
            if (Object.prototype.hasOwnProperty.call(manager, key)) {
                this.container.style[key as any] = manager[key as never]
            }
        }
    }

    private setWrapper(editor: Editor) {

        const manager = {
            position: "relative",
            width: "100%",
            height: "100%",
            "z-index": "1",
            display: "flex",
            transition: this.options.speed
        }

        this.editor = editor;
        this.editor.Css.setRule(`.swiper-wrapper`, { ...manager })
    }

    private setCarousel(editor: Editor) {
        const counter = ((parseInt("100%") / this.options.slidesPerView));

        editor.Css.setRule(".swiper-slide", { flex: `0 0 calc(${counter}%)`, 'min-height': "300px", padding: "30px" })
    }

    private setNavigation(editor: Editor) {
        this.setNextButton()
        this.setPrevButton()
    }

    private setNextButton() {
        const button = document.createElement("button");
        button.classList.add("swiper-button-next");
        button.innerHTML = "NEXT";


        button.addEventListener("click", () => {
            this.currentPosition -= 1;
            this.next();
        });

        if (this.carousel.childNodes.length > 3) {
            this.container.appendChild(button);
        }
    }

    private setPrevButton() {
        const button = document.createElement("button");
        button.classList.add("swiper-button-prev");
        button.innerHTML = "PREV";

        const translate = (100 / this.options.slidesPerView) * this.currentPosition

        button.addEventListener("click", () => {
            this.prev()
            this.currentPosition += 1;
            this.carousel.style.transform = `translateX(${translate}%)`;
            console.log(this.currentPosition);
        });

        if (this.carousel.childNodes.length > 3) {
            this.container.appendChild(button);
        }
    }

    private setAutoplay() {
        this.autoplay = {
            delay: this.options.autoplay.delay || 1000,
            disableOnInteraction: this.options.autoplay.disableOnInteraction || true,
            pauseOnMouseEnter: this.options.autoplay.pauseOnMouseEnter || false,
            waitForTransition: this.options.autoplay.waitForTransition || true,
        } as Autoplay

        setInterval(() => {
            this.next();
        }, this.options.autoplay.delay)
    }

    private next() {
        const removed = this.carousel.childNodes[0]
        this.carousel.removeChild(removed)
        this.carousel.appendChild(removed)
    }

    private prev() {
        const removed = this.carousel.lastChild;

        this.carousel.removeChild(removed as HTMLIFrameElement)
        this.carousel.insertBefore(removed as HTMLIFrameElement, this.carousel.firstChild)
    }
}

export default Swiper;