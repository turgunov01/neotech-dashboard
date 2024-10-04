import type { Block, BlockManagerConfig, Editor } from "grapesjs";

export async function getLabels(component: any) {
    (component as any).blockManager = {
        appendTo: '.insert-cards',
        blocks: []
    }


    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`
        }
    }

    await apiDataFetch(`${uri}/components/blocks`, options)
        .then(response => response.json())
        .then(response => {
            response.forEach((item: any) => {
                const object = {
                    tagName: "button",
                    label: `<img src="${item.label}" alt="${item.name}">`,
                    category: "Блоки",
                    content: item.html
                } as any;

                if (item.html.includes("button")) {
                    object.tagName = "button"
                } else if (item.html.includes("input")) {
                    object.tagName = "input"
                } else if (item.html.includes("img")) {
                    object.tagName = "img"
                } else if (item.html.includes("select")) {
                    object.tagName = "select"
                } else if (item.html.includes("textarea")) {
                    object.tagName = "textarea"
                }


                (component as any).blockManager.blocks.push(object);
            });

        })

    await apiDataFetch(`${uri}/components/collect`, options)
        .then(response => response.json())
        .then(response => {
            response.forEach((item: any) => {

                (component as any).blockManager.blocks.push({
                    tagName: "section",
                    label: `<img src="${item.label}" alt="${item.name}">`,
                    category: "Шаблоны",
                    content: item.html
                });
            });

        })

    // console.log(component.blockManager.blocks)
}
