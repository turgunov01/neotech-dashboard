import type { Editor } from "grapesjs"
import { EditorPublish } from "../methods/sync/publish"
import type { Container } from "../interface/container"
import { translation } from "../i18n/locales"
import { getSwipersConfigs } from "../model/traits/events"


async function AssetManager(editor: Editor) {
    const options = {
        method: "GET",
        headers: {
            "Content-Language": "ru-RU",
            Authorization: `${sessionStorage.getItem("Authorization")}`,
        }
    }

    const assets = ref([])

    try {
        await apiDataFetch(`${uri}/api/uploads`, options)
            .then(response => response.json())
            .then(response => {
                response.data.uploads.forEach((item: any, index: number) => {
                    const asset = {
                        type: item.type ? item.type : "image",
                        src: item.url,
                        width: 100,
                        height: 100,
                        name: item.origin,
                    }

                    assets.value.push(asset as never)
                })
            })

    } catch (err) {
        alert(err)
    }

    await editor.AssetManager.add(assets.value)
    return assets.value
}

export async function buildEditor(editor: Editor) {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("Authorization")}`
        }
    }

    const $router = useRouter().currentRoute.value;

    await setTimeout(async () => {
        try {
            if ($router.query.id) {
                await apiDataFetch(`${uri}/constructor/single/${$router.query.id}`, options)
                    .then(response => response.json())
                    .then(response => {
                        const page: Container = {
                            id: response.id,
                            name: response.name,
                            route: response.route,
                            sections: response.sections,
                            html: response.html,
                            css: response.css,
                        }

                        editor.setComponents(page.sections);
                        editor.Css.addRules(page.css);
                        return;
                    })
            } else {
                await apiDataFetch(`${uri}/constructor/web`, options)
                    .then(response => response.json())
                    .then(response => {
                        const page: Container = {
                            id: response[0].id,
                            name: response[0].name,
                            route: response[0].route,
                            sections: response[0].sections,
                            html: response[0].html,
                            css: response[0].css,
                        }

                        useRouter().push({ query: { id: page.id } })

                        editor.setComponents(page.sections);
                        editor.Css.addRules(page.css);
                        return;
                    })
            }

        } catch (err: Error | any) {
            FailedAlert(err.message);
            setTimeout(() => {
                location.reload();
            }, 3000);
        }
    }, 1000);
}

function buttonPublishHandler(editor: Editor) {
    const button = document.querySelector(".frame.publish")

    button?.addEventListener("click", async () => {
        const components = editor.getComponents().toJSON()

        if (components.length === 0) return alert("You can't publish empty page!")

        return new EditorPublish(editor).sync()
        // await publish(element)
    })
}

export async function run(editor: Editor) {
    getSwipersConfigs(editor);
    await buildEditor(editor)
    buttonPublishHandler(editor)
    editor.I18n.setMessages(translation)
    editor.I18n.setLocale('ru');

    editor.on('asset:add', (asset) => {
        if (asset.get('type') === 'image') { // Проверяем, что это изображение
            const img = new Image();
            img.src = asset.get('src'); // Получаем ссылку на изображение

            img.onload = () => {
                if (img.width > 300) {
                    // Удаляем изображение из asset manager, если его ширина > 300px
                    editor.AssetManager.remove(asset);
                    alert('Изображение слишком широкое. Максимальная ширина — 300px.');
                }
            };
        }
    });
}
