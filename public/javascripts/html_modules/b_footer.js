import {CanvasDocument} from '../functions/canvas/Classes/CanvasDocument_Class.js'

let bFooterElementIdsArray = JSON.parse(document.getElementById("bFooter_scriptId").dataset.json)
let bFooter_element = document.getElementById(bFooterElementIdsArray[0])
let bFooterActions_button_02 = document.getElementById(bFooterElementIdsArray[1])

bFooterActions_button_02.onclick = addClickEvent1

function addClickEvent1() {
    let newCanvas = new CanvasDocument()
    console.log(newCanvas)
}