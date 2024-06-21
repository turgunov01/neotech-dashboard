import type { SwiperInterface } from "~/composables/Editor/interface/swiper";

export class Swiper {
    [variable: string]: any
    private container: any;
    private slides: HTMLElement[];
    private currentIndex: number = 0;
    private slidesPerView: number;
    private padding: number = 20;
    private spaceBetween: number = 0;
    private loop: boolean = false;

    constructor(options: SwiperInterface) {
        this.container = document.querySelector(options.container) as HTMLElement
        this.slides = Array.from(document.querySelectorAll(options.slideClass));
        this.slidesPerView = options.slidesPerView || 1;
        this.spaceBetween = options.spaceBetween || 0
        this.navigation = {
            nextEl: document.querySelector(options.navigation?.nextEl as string) || null,
            prevEl: document.querySelector(options.navigation?.prevEl as string) || null,
        }
        this.position = 0
        this.loop = options.loop || false

        this.init()
    }

    init() {
        this.generate();
    }

    private generate() {
        window.addEventListener('load', () => {
            const key = 3; // Key value

            if (this.container && this.slides.length) {
                const containerWidth = this.container.clientWidth;
                const width = (containerWidth / key) - this.padding;
                this.options = width

                this.slides.forEach((slide: HTMLElement, index) => {
                    slide.style.width = `${width}px`
                    slide.classList.remove('swiper-slide-active')
                });

                this.slides[this.currentIndex].classList.add('swiper-slide-active');
            }

            ((this.container as HTMLElement).querySelector(".swiper-wrapper") as HTMLElement).style.gap = `${this.spaceBetween}px`;
            ((this.container as HTMLElement).querySelector(".swiper-wrapper") as HTMLElement).style.transition = `300ms`
        });
    }

    next() {
        this.currentIndex++;

        if (this.currentIndex == (this.slides.length - 2)) {
            this.currentIndex = 0;
        }

        this.slides.forEach(slide => {
            slide.classList.remove('swiper-slide-active')
        })


        this.slides[this.currentIndex].classList.add('swiper-slide-active')


        let wrapper = (this.container as HTMLElement).querySelector(".swiper-wrapper") as HTMLElement
        wrapper.style.transform = `translate3d(${-this.currentIndex * (this.options + this.spaceBetween)}px, 0px, 0px)`
    }

    prev() {
        this.currentIndex--;

        if (this.currentIndex < 0) {
            this.currentIndex = this.slides.length - 3
        }

        this.slides.forEach(slide => {
            slide.classList.remove('swiper-slide-prev')
            slide.classList.remove('swiper-slide-active')
            slide.classList.remove('swiper-slide-next')
        })

        this.slides[this.currentIndex].classList.add('swiper-slide-active')


        let wrapper = (this.container as HTMLElement).querySelector(".swiper-wrapper") as HTMLElement
        wrapper.style.transform = `translate3d(${-this.currentIndex * (this.options + this.spaceBetween)}px, 0px, 0px)`
    }

    private loopNext() {

    }

}

export default Swiper;