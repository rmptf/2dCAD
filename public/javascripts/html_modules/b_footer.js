import {CanvasDocument} from '../functions/canvas/Classes/CanvasDocument/CanvasDocument_Class.js'

let bFooterElementIdsArray = JSON.parse(document.getElementById("bFooter_scriptId").dataset.json)
let bFooter_element = document.getElementById(bFooterElementIdsArray[0])
let bFooterActions_button_02 = document.getElementById(bFooterElementIdsArray[1])

bFooterActions_button_02.onclick = addClickEvent1

let vars = {
    stringIncrement: 0,
    previousDrawPathObj: undefined
}

function addClickEvent1() {
    let newCanvasDoc = new CanvasDocument()
    newCanvasDoc.iterateCounters(vars)
    newCanvasDoc.cloneAndAppendTemplate('aCanvasTemplate', 'aCanvasPanLayer')
    newCanvasDoc.setVars('aDocumentContainer', 'aDoc_btn_01')
    newCanvasDoc.setElementParams('aDocument', 'Pattern_Pc_', 'aDocumentSvg', 'aDocumentActionsButton01_')
    newCanvasDoc.setActions()
    newCanvasDoc.setClickEvents()

    // console.log(newCanvasDoc)
}