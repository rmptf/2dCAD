import {DocumentSvg} from '../DocumentSvg_Class.js'
import {SvgGroup} from '../SvgGroup_Class.js'
import {SvgPath} from '../SvgPath_Class.js'
import {createSvgDocument} from './createCanvasDocumentFunctions.js'
import {
    changeStringIncrementally,
    activateSvgDoc,
    setGlobalSvgElementVars,
    dragElement,
    placeElement,
    NEWselectSvgDocument,
    NEWselectDrawPath,
    NEWsvgClick,
} from './createCanvasDocumentFunctions.js'

function CanvasDocument() {
    this.stringIncrementCount = undefined
    this.canvasDocument_htmlElement = null
    this.canvasDocumentHeader_htmlElement = null
    this.documentSvg_htmlElement = null
    this.documentSvg_D3Element = null
    this.documentSvgActionBtn01_htmlElement = null
    this.documentSvg = null

    this.drawPathObj = {
        self: [], // moving
        m1: '',
        isDown: false,
        isDown2: false,
        originalFigureCount: 0,
        secondaryPathCount: 0,
        previousDrawPathObj: null
    }

    // this.runCreateSvgDocument() // orig
    // this.documentSvgD3 = null
    // this.documentSvg = new DocumentSvg(this.documentSvgD3)
}

// CanvasDocument.prototype.runCreateSvgDocument = function() { // orig
//     createSvgDocument(this, this.drawPathObj)
// }

CanvasDocument.prototype.createDocSvg = function() {
    let newDocumentSvg = new DocumentSvg(this.documentSvg_D3Element)
    newDocumentSvg.NEWcreateSvgGroups()

    this.documentSvg = newDocumentSvg
}

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
    activateSvgDoc(this.canvasDocument_htmlElement)
    setGlobalSvgElementVars(this.canvasDocument_htmlElement.id, this.documentSvg_htmlElement.id, this.stringIncrementCount)
    dragElement(this.canvasDocument_htmlElement)
}

CanvasDocument.prototype.setClickEvents = function() {
    let thisCanvasDoc = this
    this.canvasDocument_htmlElement.onclick = function() {
        NEWselectSvgDocument(thisCanvasDoc)
    }
    this.documentSvgActionBtn01_htmlElement.onclick = function() {
        NEWselectDrawPath(thisCanvasDoc)
    }
}

export {
    CanvasDocument
}