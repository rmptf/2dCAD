import {dragElement} from '../htmlElementFunctions.js'
function CanvasPan(parentClass, canvasPanElement) {
    this.topLevelParentClass = parentClass
    this.canvasPanElement = canvasPanElement
}

CanvasPan.prototype.setEvents = function(element) {
    dragElement(element, this.topLevelParentClass.canvScaleClass.scaleObject)
}

export {
    CanvasPan
}