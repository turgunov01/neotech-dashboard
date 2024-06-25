import type { Editor } from "grapesjs";

export function componentHandler(editor: Editor) {
    editor.Components.addType('link', {
        model: {
            defaults: {
                traits: [
                    {
                        type: 'href-next',
                        name: 'href',
                        label: 'New href',
                    },
                ]
            }
        }
    });

    editor.Traits.addType('href-next', {
        // Expects as return a simple HTML string or an HTML element
        createInput({ trait }) {
            // Here we can decide to use properties from the trait
            const traitOpts = trait.get('options') || [];
            const options = traitOpts.length ? traitOpts : [
                { id: 'url', label: 'URL' },
                { id: 'email', label: 'Email' },
            ];

            // Create a new element container and add some content
            const el = document.createElement('div');
            el.innerHTML = `
            <select class="href-next__type">
              ${options.map(opt => `<option value="${opt.id}">${opt.label}</option>`).join('')}
            </select>
            <div class="href-next__url-inputs">
              <input class="href-next__url" placeholder="Insert URL"/>
            </div>
            <div class="href-next__email-inputs">
              <input class="href-next__email" placeholder="Insert email"/>
              <input class="href-next__email-subject" placeholder="Insert subject"/>
            </div>
          `;

            // Let's make our content interactive
            const inputsUrl = el.querySelector('.href-next__url-inputs');
            const inputsEmail = el.querySelector('.href-next__email-inputs');
            const inputType = el.querySelector('.href-next__type');
            inputType?.addEventListener('change', ev => {
                switch ((ev as any).target.value) {
                    case 'url':
                        (inputsUrl as any).style.display = '';
                        (inputsEmail as any).style.display = 'none';
                        break;
                    case 'email':
                        (inputsUrl as any).style.display = 'none';
                        (inputsEmail as any).style.display = '';
                        break;
                }
            });

            return el;
        },
    });
}