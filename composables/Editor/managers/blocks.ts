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

    await apiDataFetch(`${uri}/components/templates`, options)
        .then(response => response.json())
        .then(response => {
            const data = response;

            (data as Response | any).forEach((block: Object) => {
                (component as any).blockManager.blocks.push(block);
            });

        })
}