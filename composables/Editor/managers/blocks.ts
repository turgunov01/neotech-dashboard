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
            console.log(response)
            response.forEach((item: any) => {

                (component as any).blockManager.blocks.push({
                    tagName: "section",
                    label: `<img src="${item.label}" alt="${item.name}">`,
                    category: "Блоки",
                    content: item.html
                });
            });

        })

    await apiDataFetch(`${uri}/components/collect`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
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
