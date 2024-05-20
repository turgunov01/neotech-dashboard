export function onComponentAdd(model: any) {
    console.log(`'Global hook: component:create' ${model}`)
}

export function onComponentRemove(model: any) {
    console.log(`'Global hook: component:remove' ${model}`)
}
