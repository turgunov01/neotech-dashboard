import type { Component, Components, Editor } from "grapesjs";

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
                            const components = this._editor.getWrapper()?.find(`#${blockId}`) as any;

                            if (components?.length) {
                                const component = components[0] as Component;


                                // component.parent()?.collection.add(
                                //     {
                                //         content: htmlContent,
                                //         draggable: true,
                                //         copyable: true,
                                //         removable: true,
                                //         editable: true,
                                //     },
                                //     { at: component.index() + (this.current.currentRegion === 'bottom' ? 1 : 0) }
                                // );

                                component.parent()?.append(htmlContent)[component.index() + (this.current.currentRegion === 'bottom' ? 1 : 0)];

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