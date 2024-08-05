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

        });

    await apiDataFetch(`${uri}/components/customs`, options)
        .then(res => res.json())
        .then(res => {
            const data = res;

            data.forEach(async (item: string, index: number) => {
                const name = item.replace("components/html//", "");
                console.log(name)

                const config = {
                    id: index,
                    tagName: 'section',
                    label: name,
                    content: item,
                    removable: true,
                    draggable: true,
                    copyable: true,
                    style: {},
                    attributes: {},
                    category: "Кастомные блоки"
                }


                await apiDataFetch(`${uri}/components/customs/${name}`, options)
                    .then(response => response.json())
                    .then(response => {
                        config.content = response.content;
                    });


                (component as any).blockManager.blocks.push(config);

            })

            console.log(data);
        })
}