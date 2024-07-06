export interface FormInterface {
    id: string,
    name: string,
    type: string;
    label: string;
    placeholder: string;
    interation: FormHandlerInterface;
}

interface FormHandlerInterface {
    form: FormInterface,
    handler: (event: Event | any) => HTMLFormElement;
    from: string;
    to: FormAddressInterface;
}

interface FormAddressInterface {
    url: string;
    method: string;
    value: string;
    from: string;
}

