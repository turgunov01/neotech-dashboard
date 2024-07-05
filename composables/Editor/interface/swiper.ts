export interface SwiperInterface {
    slidesPerView?: number;
    padding?: number | 20,
    navigation: SwiperNavigation | null,
    spaceBetween?: number | 30,
    loop: boolean | false,
    speed: number | 1000,
    autoplay: Autoplay,
}

export interface Autoplay {
    delay: number | 1000;
    disableOnInteraction: boolean | true;
    pauseOnMouseEnter: boolean | false;
    waitForTransition: boolean | true
}

export interface SwiperNavigation {
    nextEl: string | null;
    prevEl: string | null;
}

interface Pagination {
    el: string | null;
    type: string,
    clickable: boolean | true;
    dynamicBullets: boolean | false;
}

export interface SwiperCssOptions {
    width: string | "100%";
    height: string | "auto";
    overflow: string | "hidden";
    position: string | "relative";
}
