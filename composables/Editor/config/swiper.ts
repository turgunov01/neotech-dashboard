import Swiper from "swiper"

export function customSwiper(name: string) {
    const frame = document.querySelector(".gjs-frame") as HTMLIFrameElement;
    const element = frame?.contentWindow?.document.querySelector(`.${name}`);

    const swiper = new Swiper(`.${element?.classList[0]}`, {
        breakpoints: {
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            768: {

                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
        },
        loop: true,
    })

    swiper.init();

    console.log(swiper);
}