import {dragElement} from "../../utils/htmlElementFunctions.js"

function CanvasPan(scaleObject, canvasPanElement) {
    this.scaleClass_scaleObject = scaleObject
    this.canvasPanElement = canvasPanElement
    console.log('pooper')
    console.log(scaleObject)
    console.log(canvasPanElement)
}

CanvasPan.prototype.setEvents = function(element) {
    dragElement(element, this.scaleClass_scaleObject)
}

export {
    CanvasPan
}