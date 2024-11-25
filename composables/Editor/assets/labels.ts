export async function getLabels(component: any) {
    (component as any).blockManager = {
        blocks: []
    }

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Authorization")}`
        }
    }

    try {
        const response = await apiDataFetch(`${uri}/components/types`, options);
        const data = await response.json();

        for (const item of data) {
            const type = item.replace("components/", "");

            const categoryResponse = await apiDataFetch(`${uri}/components/category/${type}`, options);
            const cmps = await categoryResponse.json();

            for (const cmp of cmps) {
                const componentItem = {
                    tagName: cmp.tagName,
                    label: `<img src="${uri}/uploads/${cmp.label}">`,
                    content: cmp.content,
                    category: cmp.category
                };

                component.blockManager.blocks.push(componentItem);
            }
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }


}