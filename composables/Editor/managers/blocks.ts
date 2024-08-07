import type { Block } from "grapesjs";

export async function getLabels(component: any) {
    (component as any).blockManager = {
        appendTo: '.insert-cards',
        blocks: []
    }


    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`
        }
    }

    await apiDataFetch(`${uri}/components/app`, options)
        .then(response => response.json())
        .then(response => {
            const data = response;
            data.forEach((cmp: Block) => {
                component.blockManager.blocks.push(cmp)
            });
        })

    // console.log(component.blockManager.blocks)
}