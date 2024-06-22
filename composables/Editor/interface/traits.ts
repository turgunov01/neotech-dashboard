export interface TraitsInterface {
    tagName: string;
    details: {
        isComponent: any,
        model: {
            defaults: {
                type: string;
                label: string;
                name: string;
                unit: string | any;
                step: number | any;
                value: string | any;
                default: string | any;
                placeholder: string | any;
                category: string | any;
                changeProp: boolean | any;
                options: never[];
            }
        }
    }
}