export async function getFonts() {
    const fonts = [] as string[];
    const options = {
        method: "GET",
        headers: {
            "Content-Language": "en",
        }
    }

    await fetch(`https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyA0nikYs9HaClqwA846NYa9QRNsPCr5jUs`, options)
        .then(response => response.json())
        .then(response => {
            (response.items as string[]).forEach(item => {
                fonts.push((item as any).family)
            })
        })

    return fonts
}