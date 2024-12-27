import type { Editor } from "grapesjs";

class subComponentHandlerMods {
    constructor(private _editor: Editor, private current: { currentRegion: string, currentTarget: HTMLElement }) {
        this._editor = _editor;
        this.current = current;

    }

    init(projectSubcomponents: HTMLElement, cards: HTMLCollection) {
        Array.from(cards).forEach((card: any) => {
            const isAlreadySet = card.dataset.listenerSet === "true";
            if (!isAlreadySet) {
                card.addEventListener(
                    "click",
                    () => {
                        const htmlContent = card.getAttribute("data-html");
                        if (htmlContent) {
                            const blockId = this.current.currentTarget?.getAttribute("id");
                            const components = this._editor.getWrapper()?.find(`#${blockId}`);

                            if (components?.length) {
                                const component = components[0];

                                if (this.current.currentRegion === "top") {
                                    component.collection.add(
                                        {
                                            tagName: "div",
                                            attributes: { class: "new-block" },
                                            content: htmlContent,
                                        },
                                        { at: component.index() }
                                    );
                                } else if (this.current.currentRegion === "bottom") {
                                    component.collection.add(
                                        {
                                            tagName: "div",
                                            attributes: { class: "new-block" },
                                            content: htmlContent,
                                        },
                                        { at: component.index() + 1 }
                                    );
                                }
                            }

                            projectSubcomponents.classList.remove("active");
                        }
                    },
                    { once: true }
                );
                card.dataset.listenerSet = "true";
            }
        });
    }
}

export default subComponentHandlerMods;