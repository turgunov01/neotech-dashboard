import type { Editor } from "grapesjs"
import { config } from "../mechanism/config"
import { buildEditor } from "../callbacks/on:publish"

export async function pendingLaunch(editor: Editor) {
    await config(editor)
    await buttonPublishHandler(editor)
    await buildEditor(editor)
}