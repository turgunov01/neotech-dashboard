export interface SwiperInterface {
    slideClass: string;
    slidesPerView?: number;
    padding?: number | 20,
    navigation: Navigation | null,
    spaceBetween?: number | 30,
    loop: boolean | false,
}

interface Autoplay {
    delay: number | 1000;
    disableOnInteraction: boolean | true;
    pauseOnMouseEnter: boolean | false;
    waitForTransition: boolean | true
}

interface Navigation {
    nextEl: string | null;
    prevEl: string | null;
}

interface Pagination {
    el: string | null;
    type: string,
    clickable: boolean | true;
    dynamicBullets: boolean | false;
}
