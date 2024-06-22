export interface PanelInterface {
    id: string | 'some-panel';
    className: string | 'some-class',
    command: Function | null,
    attributes: PanelAttributes | false,
    active: Boolean | false,
}

interface PanelAttributes {
    title: string
}