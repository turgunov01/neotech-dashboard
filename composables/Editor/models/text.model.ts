import type { TextModel } from "~/interface/models/TextInterface";

export function buildTextModel() {
    return {
        isComponent: (element: HTMLElement) => element.tagName === 'INPUT',
        model: {
            defaults: {
                traits: [
                    // Strings are automatically converted to text types
                    'name', // Same as: { type: 'text', name: 'name' }
                    'placeholder',
                    {
                        type: 'select', // Type of the trait
                        name: 'type', // (required) The name of the attribute/property to use on component
                        label: 'Type', // The label you will see in Settings
                        options: [
                            { id: 'text', label: 'Text' },
                            { id: 'email', label: 'Email' },
                            { id: 'password', label: 'Password' },
                            { id: 'number', label: 'Number' },
                        ]
                    }, {
                        type: 'checkbox',
                        name: 'required',
                    }],
                // As by default, traits are bound to attributes, so to define
                // their initial value we can use attributes
                attributes: { type: 'text', required: true },
            },
        },
    } as TextModel;

}