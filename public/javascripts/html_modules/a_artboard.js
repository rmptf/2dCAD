import {Canvas} from '../functions/canvas/Classes/Canvas_Class.js'
import {CanvasScale} from '../functions/canvas/Classes/CanvasScale_Class.js'
import {CanvasPan} from '../functions/canvas/Classes/CanvasPan_Class.js'
import {Footer} from '../functions/canvas/Classes/Footer_Class.js'

let aArtboardElementIdsArray = JSON.parse(document.getElementById("aArtboard_scriptId").dataset.json)
let aCanvas_element = document.getElementById(aArtboardElementIdsArray[0])
let aCanvas_scale_element = document.getElementById(aArtboardElementIdsArray[1])
let aCanvas_pan_element = document.getElementById(aArtboardElementIdsArray[2])
let bFooter_element = document.getElementById(aArtboardElementIdsArray[3])
let bFooterActions_button_01 = document.getElementById(aArtboardElementIdsArray[4])
let bFooterActions_button_02 = document.getElementById(aArtboardElementIdsArray[5])
let bFooterActions_button_03 = document.getElementById(aArtboardElementIdsArray[6])
let bFooterActions_button_04 = document.getElementById(aArtboardElementIdsArray[7])
let bFooterActions_button_05 = document.getElementById(aArtboardElementIdsArray[8])

let newCanvas = new Canvas(aCanvas_element, aCanvas_scale_element, bFooterActions_button_03, bFooterActions_button_04, bFooterActions_button_05, aCanvas_pan_element)
// let newCanvasScale = new CanvasScale(aCanvas_scale_element, bFooterActions_button_03, bFooterActions_button_04, bFooterActions_button_05)
// newCanvasScale.setClickEvents()
// let newCanvasPan = new CanvasPan(aCanvas_pan_element, newCanvas.panObject)
// newCanvasPan.setEvents(newCanvasPan.canvasPan)
let newFooter = new Footer(newCanvas, bFooter_element, bFooterActions_button_02)
newFooter.setClickEvents(bFooterActions_button_02)