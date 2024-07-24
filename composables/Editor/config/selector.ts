import type { Editor, RichTextEditorAction } from "grapesjs";
import { EditorPublish } from "../methods/sync/publish";

export function customRTE(editor: Editor) {
    let selected: any;

    editor.on("rte:enable", () => {
        selected = editor.getSelected()?.getEl();
        const rte = editor.RichTextEditor;

        const parameters = {
            fontSize: [
                {
                    value: "По умолчанию",
                    index: null,
                    selected: true
                },
                {
                    value: "Текст маленький",
                    index: 2
                },
                {
                    value: "Текст средний",
                    index: 3
                },
                {
                    value: "Текст большой ",
                    index: 4
                },
                {
                    value: "Под заголовок",
                    index: 6
                },
                {
                    value: "Заголовок",
                    index: 7
                },
            ]
        }

        rte.actions?.forEach(config => {
            rte.remove((config as RichTextEditorAction).name)
            rte.remove("wrap")
            rte.remove("strikethrough")
            rte.remove("link")
            rte.remove("italic")
            rte.remove("underline")
        });

        rte.add('fontSize', {
            icon: `<select class="gjs-field" style="width: max-content !important; border: unset !important; background: white !important; padding: 5px; height: 100%;">
                    ${parameters.fontSize.map((value, index) => `<option value="${value.index}" ${value.selected ? 'selected' : ''}>${value.value}</option>`)
                    .join('')}
                </select>`,
            attributes: { style: "width: max-content !important; border: unset !important;" },
            event: 'change',
            result: (rte, action) => {
                const value = parseInt((((action.btn as any) as HTMLElement).firstChild as HTMLSelectElement).selectedOptions[0].value);
                const calculated = value * 10

                editor.Components.getById(selected.id).addStyle({ 'font-size': `${calculated}px`, 'line-height': '100%' })
            },
            // update: (rte, action) => {
            //     editor.Components.getById(selected.id).removeStyle('font-size')
            //     editor.Components.getById(selected.id).removeStyle('line-height')

            //     const value = parseInt((((action.btn as any) as HTMLElement).firstChild as HTMLSelectElement).selectedOptions[0].value);
            //     const calculated = value * 10

            //     editor.Components.getById(selected.id).addStyle({ 'font-size': `${calculated}`, 'line-height': '100%' })
            // },
        })

        rte.add("fontFamily", {
            icon: `
                <select class="gjs-field" style="width: max-content!important; border: unset!important; background: white!important; padding: 5px; height: 100%;">
                    <option value="Arial">Arial</option>
                    <option value="Verdana">Verdana</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Courier New">Courier New</option>
                </select>
            `,
            attributes: { style: "width: max-content !important; border: unset!important;" },
            event: 'change',
            result: (rte, action) => {
                const value = (((action.btn as any) as HTMLElement).children[0] as HTMLSelectElement).value;

                selected.style.fontFamily = value
                editor.Components.getById(selected.id).addStyle({ 'font-family': value })

            },
            // update: (rte, action) => {
            //     const value = (((action.btn as any) as HTMLElement).children[0] as HTMLSelectElement).value;

            //     selected.style.fontFamily = value
            //     editor.Components.getById(selected.id).addStyle({ 'font-family': value })
            // },
        })

        rte.add("fontSizeNumeric", {
            icon: `
                <select class="gjs-field" style="width: 40px!important; border: unset!important; background: white!important; padding: 5px; height: 100%;">
                    ${Array.from({ length: 100 }, (_, i) => i)
                    .filter(i => i % 2 === 0)
                    .map(i => `<option value="${i}">${i}</option>`)
                    .join('')}
                </select>
            `,
            attributes: {
                style: "width: 40px; height: 40px"
            },
            result(rte, action) {
                const value = (action.btn as HTMLSelectElement).value;
                editor.Components.getById(selected.id).removeStyle('font-size')
                editor.Components.getById(selected.id).addStyle({ 'font-size': `${value}px` })
            },
        })

        rte.add("bold", {
            icon: `
                <label class="toggle-bold" for="toggle-bold" style="width: 40px; height: 100%; display: flex; align-items: center; justify-content: center; background: white; border-radius: 6px;">
                    <svg width="10" height="11" viewBox="0 0 10 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.45824 2.87994C9.45824 3.45263 9.24532 3.93721 8.81948 4.33369C8.39363 4.73016 7.75487 5.03853 6.90318 5.2588C7.91639 5.43501 8.67264 5.75439 9.1719 6.21695C9.67117 6.6795 9.9208 7.27789 9.9208 8.0121C9.9208 8.83442 9.59774 9.48053 8.95164 9.95043C8.30553 10.4203 7.23357 10.6553 5.73578 10.6553H0.361328V9.8403C0.904647 9.8403 1.26441 9.75586 1.44062 9.58699C1.61683 9.41812 1.70494 9.08405 1.70494 8.58479V2.63765C1.70494 2.15307 1.62051 1.82267 1.45164 1.64646C1.28277 1.47025 0.919331 1.38215 0.361328 1.38215V0.545141L4.30406 0.43501H4.87675C6.65354 0.43501 7.86133 0.655273 8.50009 1.0958C9.13886 1.53633 9.45824 2.13104 9.45824 2.87994ZM4.39217 1.33809V4.81827H4.9208C5.46412 4.81827 5.87528 4.68978 6.15428 4.43281C6.43328 4.17583 6.57278 3.73163 6.57278 3.10021C6.57278 2.63031 6.48468 2.25586 6.30846 1.97686C6.13225 1.69786 5.90465 1.52165 5.62565 1.44823C5.34664 1.3748 4.93548 1.33809 4.39217 1.33809ZM4.87675 5.74338H4.39217V8.62884C4.39217 8.90784 4.42153 9.12077 4.48027 9.26761C4.53901 9.41445 4.65281 9.5356 4.82168 9.63104C4.99055 9.72649 5.22917 9.77422 5.53754 9.77422C6.00744 9.77422 6.36353 9.60535 6.60582 9.26761C6.84811 8.92987 6.96926 8.4306 6.96926 7.76981C6.96926 7.22649 6.89216 6.80432 6.73798 6.50329C6.58379 6.20226 6.37087 6.00035 6.09921 5.89756C5.82755 5.79477 5.42006 5.74338 4.87675 5.74338Z" fill="#8A98AC"/>
                    </svg>
                    <input type="checkbox" id="toggle-bold" class="toggle-checkbox" hidden />
                </label>
            `,
            attributes: {
                style: " width: 40px; "
            },
            result: (rte, action) => {
                const checked = (((action as any).btn as HTMLElement).querySelector(`input[type="checkbox"]#toggle-bold`) as HTMLInputElement).checked;
                if (checked) {
                    editor.Components.getById(selected.id).addStyle("font-weight", "bold");
                } else {
                    editor.Components.getById(selected.id).removeStyle("font-weight");
                }
            },
        })

        rte.add("italic", {
            icon: `
                <label class="toggle-italic" for="toggle-italic" style="width: 40px; height: 100%; display: flex; align-items: center; justify-content: center; background: white; border-radius: 6px;">
                    <svg width="5" height="12" viewBox="0 0 5 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4.02273 0.363636L2.09091 12H0.681818L2.61364 0.363636H4.02273Z" fill="#8A98AC"/>
                    </svg>
                    <input type="checkbox" id="toggle-italic" class="toggle-checkbox" hidden />
                </label>
            `,
            attributes: {
                style: "width: 40px;"
            },
            result: (rte, action) => {
                const checked = (((action as any).btn as HTMLElement).querySelector(`input[type="checkbox"]#toggle-italic`) as HTMLInputElement).checked;
                if (checked) {
                    editor.Components.getById(selected.id).addStyle("font-style", "italic");
                } else {
                    editor.Components.getById(selected.id).removeStyle("font-style");
                }
            },
        })

        rte.add('link', {
            icon: `
                <span style="width: 40px; height: 100%; display: flex; align-items: center; justify-content: center; background: white; border-radius: 6px;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="10" viewBox="0 0 18 10" fill="none">
                        <path d="M5.625 1.25H5.25C3.17893 1.25 1.5 2.92893 1.5 5C1.5 7.07107 3.17893 8.75 5.25 8.75H6.75C8.82107 8.75 10.5 7.07107 10.5 5M12.375 8.75H12.75C14.8211 8.75 16.5 7.07107 16.5 5C16.5 2.92893 14.8211 1.25 12.75 1.25H11.25C9.17893 1.25 7.5 2.92893 7.5 5" stroke="#919192" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            `,
            attributes: { title: 'Link', style: "width: 40px;" },
            // Example on how to wrap selected content
            result: rte => rte.insertHTML(`<a href="#">${rte.selection()}</a>`)
        });

        rte.add("color", {
            icon: `
                <input type="color" value="#000" class="color-picker" style="width: 100%; height: 100%;" >
            `,
            attributes: {
                style: "width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center;"
            },
            event: "change",
            result(rte, action) {
                const color = ((action.btn as HTMLElement).firstElementChild as HTMLInputElement).value;
                editor.Components.getById(selected.id).removeStyle("color");
                editor.Components.getById(selected.id).addStyle("color", `${color} !important`);
            },
        })
    })

    editor.on("rte:disable", () => {
        selected = null;

        const rte = editor.RichTextEditor;
        rte.actions?.forEach(async config => {
            await rte.remove((config as RichTextEditorAction).name)
            await rte.remove("wrap")
            await rte.remove("strikethrough")
            await rte.remove("link")
            await rte.remove("italic")
            await rte.remove("underline")
            await rte.remove("bold")
        });
    })
}
