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

//TODO: / FIXME:
// THIS FILES NOT USED AFTER MERGE FROM PROJECT ORG ON 11-13
// NOW USED IN JSs - classes - components - Canvas - Canvas_Class.js
// can prog delete this file now?
console.log("MAIN BRANCH")
console.log("-merged project-org on 11-13")
console.log("MAIN BRANCH")
console.log("'git checkout project-organization' to get back to proj-org branch")