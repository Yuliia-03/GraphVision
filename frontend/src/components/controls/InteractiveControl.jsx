import InteractiveButtonPanel from "./InteractiveButtonPanel"

export function createInteractiveControls(ControlComponent) {
    return <ControlComponent buttonComponent={InteractiveButtonPanel} />
}