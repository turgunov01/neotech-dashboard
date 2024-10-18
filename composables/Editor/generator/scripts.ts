const scripts: string[] = ['~/composables/Editor/config/swiper/scripts.js'];
const styles: string[] = ['~/composables/Editor/config/swiper/swiper.css'];

export function canvasProps() {
    return { scripts: scripts, styles: styles };
}