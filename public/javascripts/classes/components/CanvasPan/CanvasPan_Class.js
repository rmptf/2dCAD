import {dragElement} from "../../utils/htmlElementFunctions.js"

function CanvasPan(canvasPanElement, scaleObject) {
    this.canvasPanElement = canvasPanElement
    this.scaleClass_scaleObject = scaleObject

    dragElement(this.canvasPanElement, this.scaleClass_scaleObject)
}

export {
    CanvasPan
}