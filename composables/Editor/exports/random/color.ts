
export function getRandomColor() {
    const getRandomValue = () => Math.floor(Math.random() * 128) + 127; // Ensures values between 127 and 255

    const red = getRandomValue();
    const green = getRandomValue();
    const blue = getRandomValue();

    const toHex = (value: number) => value.toString(16).padStart(2, '0');

    const randomLightColor = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
    return randomLightColor;
}