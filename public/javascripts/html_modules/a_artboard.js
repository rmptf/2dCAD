console.log("artboard.js old")

import {Canvas} from '../classes/components/Canvas/Canvas_Class.js'
import {Footer} from '../classes/components/Footer/Footer_Class.js'

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

let newCanvas = new Canvas(aCanvas_element, aCanvas_scale_element, aCanvas_pan_element, bFooterActions_button_02, bFooterActions_button_03, bFooterActions_button_04, bFooterActions_button_05)
let newFooter = new Footer(newCanvas.canvasElement, newCanvas.canvasDocuments, newCanvas.canvScaleClass, newCanvas.canvasPanClass, bFooter_element, bFooterActions_button_02)

// i think this eventually needs to be turned into a class. It wasnt because it is outside of the 'canvas' scope
// but i want to go further than that now