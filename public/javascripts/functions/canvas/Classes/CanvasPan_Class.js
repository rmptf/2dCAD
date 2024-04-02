import {dragElement} from '../htmlElementFunctions.js'

function CanvasPan(scaleObject, canvasPanElement) {
    this.scaleClass_scaleObject = scaleObject
    this.canvasPanElement = canvasPanElement
}

CanvasPan.prototype.setEvents = function(element) {
    dragElement(element, this.scaleClass_scaleObject)
}

export {
    CanvasPan
}