export async function listing() {
    const arrayOfpages = [
        {
            name: "first",
            id: 1,
            required: true,
        },
        {
            name: "second",
            id: 2,
            required: true,
        },
        {
            name: "third",
            id: 1,
            required: true,
        },

    ]


    return arrayOfpages
}

export default listing()