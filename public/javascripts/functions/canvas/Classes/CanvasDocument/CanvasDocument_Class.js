import {DocumentSvg} from '../DocumentSvg_Class.js'
import {SvgGroup} from '../SvgGroup_Class.js'
import {SvgPath} from '../SvgPath_Class.js'
import {createSvgDocument} from './canvasDocumentFunctions.js'
import {changeStringIncrementally, placeElement} from './canvasDocumentFunctions.js'

function CanvasDocument() {
    // this.runCreateSvgDocument() // orig
    this.stringIncrementCount = undefined
    this.canvasDocument_htmlElement = null
    this.canvasDocumentHeader_htmlElement = null
    this.documentSvg_htmlElement = null
    this.documentSvg_D3Element = null
    this.documentSvgActionBtn01_htmlElement = null

    this.drawPathObj = {
        self: [], // moving
        m1: '',
        isDown: false,
        isDown2: false,
        originalFigureCount: 0,
        secondaryPathCount: 0,
    }

    this.documentSvg = new DocumentSvg(this.documentSvg_D3Element)
}

// CanvasDocument.prototype.runCreateSvgDocument = function() { // orig
//     createSvgDocument(this, this.drawPathObj)
// }

CanvasDocument.prototype.iterateCounters = function(vars){
    vars.stringIncrement++
    this.stringIncrementCount = vars.stringIncrement
}

CanvasDocument.prototype.cloneAndAppendTemplate = function(templateId, targetId) {
    let canvDocTemplate = document.getElementById(templateId).content
    let targetContainer = document.getElementById(targetId)
    targetContainer.appendChild(document.importNode(canvDocTemplate, true))
}

CanvasDocument.prototype.setVars = function(canvasDocId, svgAction01Id) {
    this.canvasDocument_htmlElement = document.getElementById(canvasDocId)
    this.canvasDocumentHeader_htmlElement = this.canvasDocument_htmlElement.children[0]
    this.documentSvg_htmlElement = this.canvasDocument_htmlElement.children[4]
    this.documentSvg_D3Element = d3.select(this.documentSvg_htmlElement)
    this.documentSvgActionBtn01_htmlElement = document.getElementById(svgAction01Id)
}

CanvasDocument.prototype.setElementParams = function(canvDocId, headerInnerTxt, docSvgId, btn01Id) { // can place this in an existing method
    this.canvasDocument_htmlElement.id = changeStringIncrementally(canvDocId, this.stringIncrementCount)
    this.canvasDocumentHeader_htmlElement.innerText = changeStringIncrementally(headerInnerTxt, this.stringIncrementCount)
    this.documentSvg_htmlElement.id = changeStringIncrementally(docSvgId, this.stringIncrementCount)
    this.documentSvgActionBtn01_htmlElement.id = changeStringIncrementally(btn01Id, this.stringIncrementCount)
}

CanvasDocument.prototype.setActions = function() {
    placeElement(this.canvasDocument_htmlElement)
    //...
}

CanvasDocument.prototype.setClickEvents = function() {
    this.canvasDocument_htmlElement.onclick = selectSvgDocument
    function selectSvgDocument() {
        console.log("clicki_clacki")
    }
    //...
}

export {
    CanvasDocument
}