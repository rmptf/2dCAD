import {CanvasScale} from '../CanvasScale/CanvasScale_Class.js'
import {CanvasPan} from '../CanvasPan/CanvasPan_Class.js'

function Canvas(canvasElement, aCanvas_scale_element, aCanvas_pan_element, bFooterActions_button_02, bFooterActions_button_03, bFooterActions_button_04, bFooterActions_button_05) {
    this.canvasElement = canvasElement
    this.vars = {
        stringIncrement: -1,
        previousDrawPathObj: undefined
    }
    this.scaleObject = {}
    this.panObject = {}
    this.canvScaleClass = new CanvasScale(aCanvas_scale_element, bFooterActions_button_03, bFooterActions_button_04, bFooterActions_button_05)
    this.canvScaleClass.setClickEvents()
    this.canvasPanClass = new CanvasPan(this.canvScaleClass.scaleObject, aCanvas_pan_element)
    this.canvasPanClass.setEvents(aCanvas_pan_element)
    this.canvasDocuments = []
}

export {
    Canvas
}

console.log("ORIGIN BRANCH")
console.log("PROJECT-ORGANIZATION BRANCH")