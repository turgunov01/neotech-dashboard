class Screenshot {
    constructor(private url: string) {
        this.url = url;
        this.init();
    }

    async init() {
        const response = await fetch(this.url, { method: "GET" });
        const data = await response;
        return data;
    }
}

export default Screenshot;