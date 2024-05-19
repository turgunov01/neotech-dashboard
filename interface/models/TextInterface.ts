export interface TextModel {
    isComponent: (element: HTMLElement) => boolean;
    model: {
        defaults: {
            traits: (string | Trait)[]; // Union type for traits
            attributes: {
                type: string;
                required: boolean;
            };
        };
    };
}

interface Trait {
    type: string;
    name: string;
    label?: string;
    options?: { id: string; label: string }[];
}

