import { FailedAlert, PushNotification } from "~/composables/Notification/list";

class Pages {
    private p_id: string;
    private p_name: string;

    constructor(id: string, name: string) {
        this.p_id = id;
        this.p_name = name;
    }

    async create() {
        const token = showStoreData("Authorization");
        const body = {
            name: this.p_name,
            html: `<p>New element in page: ${this.p_name}</p>`,
            css: `*{margin: 0;padding:0;box-sizing: border-box;}`,
            sections: [],
        };

        const options = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        };

        try {
            const response = await apiDataFetch(`${USER_FETCH_HOST}/constructor/projects/${this.p_id}/create/page`, options);
            const data = await response.json();
            if (data.error) return FailedAlert(data.error);
            PushNotification(data.message);
        } catch (error: any) {
            FailedAlert(error.message)
        }
    }
}

export default Pages;