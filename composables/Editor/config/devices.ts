import type { Editor } from "grapesjs";
import type { DeviceInterface } from "../interface/devices";

class Device {
    private editor: Editor;

    constructor(editor: Editor) {
        this.editor = editor;
    }

    init() {
        const collections = this.editor.Devices.getDevices()
        collections.forEach((device: any, index: number) => {
            this.editor.Devices.remove(device.toJSON().id)
        })

        return true
    }

    remove(params: DeviceInterface) {
        const collection = { ...params } as DeviceInterface

        this.editor.Devices.add(collection)
    }
}