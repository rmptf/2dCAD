import {ActionButton} from '../ActionButton_Class.js'
import {DocumentSvg} from '../DocumentSvg/DocumentSvg_Class.js'
import {SvgGroup} from '../DocumentSvg/SvgFigure/SvgElement/SvgGroup/SvgGroup_Class.js'
import {SvgPath} from '../DocumentSvg/SvgFigure/SvgElement/SvgPath/SvgPath_Class.js'
import {createSvgDocument} from './createCanvasDocumentFunctions.js'
import {dragElement} from '../../htmlElementFunctions.js'
import {
    changeStringIncrementally,
    activateSvgDoc,
    setGlobalSvgElementVars,
    placeElement,
    NEWselectSvgDocument,
    NEWselectDrawPath,
    NEWselectAddCurvePoint,
    NEWselectDrawParallelPath,
    NEWselectMeasurePath,
} from './createCanvasDocumentFunctions.js'
import {saveFigureData} from '../../../tools/saveFigureData.js'

function CanvasDocument(scaleObject, passedVars) {
    this.scaleClass_scaleObject = scaleObject
    this.stringIncrementCount = passedVars.stringIncrement
    this.canvasDocument_htmlElement = null
    this.canvasDocumentHeader_htmlElement = null
    this.documentSvg_htmlElement = null
    this.documentSvg_D3Element = null
    this.canvasDocActionBar01_btn01_htmlElement = null
    // this.canvasDocActionBar01_btn01_htmlElement = new ActionButton('aDoc_btnCont01_btn01', NEWselectSvgDocument, this)
    this.canvasDocActionBar01_btn02_htmlElement = null
    this.canvasDocActionBar01_btn03_htmlElement = null
    this.canvasDocActionBar01_btn04_htmlElement = null
    this.canvasDocActionBar02_btn01_htmlElement = null
    this.documentSvg = null

    this.actionStates = {
        drawPathActive: false,
        addCurvePointActive: false,
        drawParallelPathAcive: false,
        measurePathActive: false
    }

    // this.pathDrawingData = {
    //     m1: null,
    //     isDown: false,
    //     figureCount: 0,
    //     currentFigure: null,
    //     secondaryPathCount: 0,
    //     previouslPathDrawingData: null
    // }

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
    let newDocumentSvg = new DocumentSvg(this, this.documentSvg_D3Element, this.documentSvg_htmlElement, this.actionStates)

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

CanvasDocument.prototype.setVars = function(canvasDocId, svgActionBar01Ids, svgActionBar02Ids) {
    this.canvasDocument_htmlElement = document.getElementById(canvasDocId)
    this.canvasDocumentHeader_htmlElement = this.canvasDocument_htmlElement.children[0]
    this.documentSvg_htmlElement = this.canvasDocument_htmlElement.children[4]
    this.documentSvg_D3Element = d3.select(this.documentSvg_htmlElement)
    this.canvasDocActionBar01_btn01_htmlElement = document.getElementById(svgActionBar01Ids[0])
    this.canvasDocActionBar01_btn02_htmlElement = document.getElementById(svgActionBar01Ids[1])
    this.canvasDocActionBar01_btn03_htmlElement = document.getElementById(svgActionBar01Ids[2])
    this.canvasDocActionBar01_btn04_htmlElement = document.getElementById(svgActionBar01Ids[3])
    this.canvasDocActionBar02_btn01_htmlElement = document.getElementById(svgActionBar02Ids[0])
}

CanvasDocument.prototype.setElementParams = function(canvDocId, headerInnerTxt, docSvgId, btn01Id) { // can place this in an existing method
    this.canvasDocument_htmlElement.id = changeStringIncrementally(canvDocId, this.stringIncrementCount)
    this.canvasDocumentHeader_htmlElement.innerText = changeStringIncrementally(headerInnerTxt, this.stringIncrementCount)
    this.documentSvg_htmlElement.id = changeStringIncrementally(docSvgId, this.stringIncrementCount)
    this.canvasDocActionBar01_btn01_htmlElement.id = changeStringIncrementally(btn01Id, this.stringIncrementCount)
}

CanvasDocument.prototype.setActions = function() {
    placeElement(this.canvasDocument_htmlElement)
    activateSvgDoc(this.canvasDocument_htmlElement)
    setGlobalSvgElementVars(this.canvasDocument_htmlElement.id, this.documentSvg_htmlElement.id, this.stringIncrementCount)
    dragElement(this.canvasDocument_htmlElement, this.scaleClass_scaleObject)
}

CanvasDocument.prototype.setClickEvents = function() {
    let thisCanvasDoc = this
    this.canvasDocument_htmlElement.onclick = function() {
        NEWselectSvgDocument(thisCanvasDoc)
    }
    this.canvasDocActionBar01_btn01_htmlElement.onclick = function() {
        // NEWselectDrawPath(thisCanvasDoc) // OLD DRAW
        thisCanvasDoc.actionStates.drawPathActive = true // NEW DRAW
    }
    this.canvasDocActionBar01_btn02_htmlElement.onclick = function() {
        console.log(this)
        NEWselectAddCurvePoint()
    }
    this.canvasDocActionBar01_btn03_htmlElement.onclick = function() {
        console.log(this)
        NEWselectDrawParallelPath()
    }
    this.canvasDocActionBar01_btn04_htmlElement.onclick = function() {
        console.log(this)
        NEWselectMeasurePath()
    }
    this.canvasDocActionBar02_btn01_htmlElement.onclick = function() {
        console.log(this)
        saveFigureData()
    }
}

export {
    CanvasDocument
}