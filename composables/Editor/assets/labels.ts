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
        const options = {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("Authorization")}`
            }
        }

        // await apiDataFetch(USER_FETCH_HOST + "/components/", options)
        //     .then(response => response.json())
        //     .then(response => {
        //         const data = response;
        //         console.log(data)
        //         data.forEach((item: any) => {
        //             if (item.components.length) {
        //                 item.components.forEach((cmp: any, cmpIndex: number) => {

        //                     const blockId = `${item.name}-${cmpIndex}`;

        //                     cmp.label = `
        //                         <div class="components-card-preview" style="background: black; border-top-left-radius: 4px; border-top-right-radius: 4px; display: flex; flex-direction: column; align-items: center; padding: 10px; gap: 2px;">
        //                             <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
        //                                 <div class="components-card-icons" style="display: flex; align-items: center; justify-content: space-between; gap: 2px;">
        //                                     <i style="width: 5px !important; height: 5px !important; background: white; border-radius: 50% !important; display: flex; align-items: center; justify-content: center;"></i>
        //                                     <i style="width: 5px !important; height: 5px !important; background: white; border-radius: 50% !important; display: flex; align-items: center; justify-content: center;"></i>
        //                                     <i style="width: 5px !important; height: 5px !important; background: white; border-radius: 50% !important; display: flex; align-items: center; justify-content: center;"></i>
        //                                 </div>
        //                                 <span class="components-card-title text-sm" style="color: white !important; font-size: 12px !important;">header:${cmpIndex + 1}</span>
        //                             </div>
        //                             <img src="${cmp.label}" alt="">
        //                         </div>
        //                     `;

        //                     (component as any).blockManager.blocks.push(cmp)
        //                 });
        //             }
        //         });
        //     })
    } catch (error) {
        console.error("Error fetching data:", error);
    }


}