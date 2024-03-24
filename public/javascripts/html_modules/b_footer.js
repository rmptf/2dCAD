// import {testFunction} from '../functions/dragDiv.js'
// b_footer_object.testFunction = testFunction

import {CanvasDocument} from '../functions/canvas/Classes/CanvasDocument_Class.js'

let bFooterElementIdsArray = JSON.parse(document.getElementById("bFooter_scriptId").dataset.json)

let bFooter_element = document.getElementById(bFooterElementIdsArray[0])
let bFooterActions_button_02 = document.getElementById(bFooterElementIdsArray[1])

// console.log(bFooter_element)
// console.log(bFooterActions_button_02)

bFooterActions_button_02.onclick = addClickEvent1

function addClickEvent1() {
    let newClass1 = new CanvasDocument('fuck', 'tits', 'goog')
    console.log(newClass1)
}