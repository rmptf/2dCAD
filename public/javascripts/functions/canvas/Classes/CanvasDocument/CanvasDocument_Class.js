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
// import {saveFigureData} from '../../../tools/saveFigureData.js'
import {saveFigureData, saveSvgData} from '../DocumentSvg/DocumentSvg_functions/saveFigureData_NEW.js'
import {drawFigureFromData} from '../DocumentSvg/DocumentSvg_functions/drawFigure_NEW.js'


function CanvasDocument(footer) {
    this.DOCUMENT_ACTIONBAR_BTN_CONTS = {
        BTN_CONT_01: {
            BTN_01:'aDoc_btnCont01_btn01',
            BTN_069:'aDoc_btnCont01_btn069',
            BTN_02:'aDoc_btnCont01_btn02',
            BTN_03:'aDoc_btnCont01_btn03',
            BTN_04:'aDoc_btnCont01_btn04'
        }, 
        BTN_CONT_02: {
            BTN_01:'aDoc_btnCont02_btn01',
            BTN_069:'aDoc_btnCont02_btn069',
            BTN_02:'aDoc_btnCont02_btn02',
            BTN_03:'aDoc_btnCont02_btn03',
            BTN_04:'aDoc_btnCont02_btn04',
        }
    }
    this.DOCUMENT_ELEMENT_NEWNAMES = {
        CANV_DOC: 'aDocument',
        HEADING: 'Pattern_Pc_',
        DOC_SVG: 'aDocumentSvg',
        DOC_BTN_01: 'aDoc_btn_01_',
    }
    this.scaleClass_scaleObject = footer.scaleClass_scaleObject
    this.stringIncrementCount = footer.vars.stringIncrement
    this.cloneAndAppendTemplate(footer.documentTemplate, footer.panElement)
    this.canvasDocument_htmlElement = document.getElementById(footer.DOCUMENT_CONTAINER_ID)
    this.canvasDocumentHeader_htmlElement = this.canvasDocument_htmlElement.children[0]
    this.documentSvg_htmlElement = this.canvasDocument_htmlElement.children[4]
    this.documentSvg_D3Element = d3.select(this.documentSvg_htmlElement)
    this.canvasDocActionBar01_btn01_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_01.BTN_01)
    this.canvasDocActionBar01_btn069_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_01.BTN_069)
    this.canvasDocActionBar01_btn02_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_01.BTN_02)
    this.canvasDocActionBar01_btn03_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_01.BTN_03)
    this.canvasDocActionBar01_btn04_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_01.BTN_04)
    this.canvasDocActionBar02_btn01_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_02.BTN_01)
    this.canvasDocActionBar02_btn069_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_02.BTN_069)
    this.canvasDocActionBar02_btn02_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_02.BTN_02)
    this.canvasDocActionBar02_btn03_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_02.BTN_03)
    this.canvasDocActionBar02_btn04_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_02.BTN_04)
    this.setElementIds( // only really used in the old way. (can remover later)
        this.DOCUMENT_ELEMENT_NEWNAMES.CANV_DOC,
        this.DOCUMENT_ELEMENT_NEWNAMES.HEADING,
        this.DOCUMENT_ELEMENT_NEWNAMES.DOC_SVG,
        this.DOCUMENT_ELEMENT_NEWNAMES.DOC_BTN_01
        )
    this.actionStates = {
        // documentSvgActionStates: {
        //     drawPathActive: false,
        // },
        // secondaryPathActionStates: {
        //     addEndPointActive: false,
        //     addEndPointActive_curve: false,
        //     drawParallelPathAcive: false,
        //     measurePathActive: false,
        //     saveFigureDataActive: false,
        // },
        // endPointActionStates: {
        //     removeEndPointActive: false,
        // },
        drawPathActive: false,
        addEndPointActive: false,
        addEndPointActive_curve: false,
        removeEndPointActive: false,
        drawParallelPathAcive: false,
        measurePathActive: false,
        saveFigureDataActive: false,
    }
    this.documentSvg = new DocumentSvg(this, this.documentSvg_D3Element, this.documentSvg_htmlElement, this.actionStates)
    this.setActions()
    this.setClickEvents()

    // OLD WAY OF DRAW
    // OLD WAY OF DRAW
    this.drawPathObj = {
        self: [], // moving
        m1: '',
        isDown: false,
        isDown2: false,
        originalFigureCount: 0,
        secondaryPathCount: 0,
        previousDrawPathObj: null
    }
    // OLD WAY OF DRAW
    // OLD WAY OF DRAW
}

CanvasDocument.prototype.iterateCounters = function(vars){
    vars.stringIncrement++
    this.stringIncrementCount = vars.stringIncrement
}

CanvasDocument.prototype.cloneAndAppendTemplate = function(templateId, targetId) {
    targetId.appendChild(document.importNode(templateId, true))
}

// only really used in the old way. (can remover later)
CanvasDocument.prototype.setElementIds = function(canvDocId, headerInnerTxt, docSvgId, btn01Id) { // can place this in an existing method
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
        NEWselectDrawPath(thisCanvasDoc) // OLD DRAW

        // Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
        // thisCanvasDoc.actionStates.drawPathActive = true // NEW DRAW
    }
    this.canvasDocActionBar01_btn069_htmlElement.onclick = function() {
        Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
        thisCanvasDoc.actionStates.addEndPointActive = true // NEW
    }
    this.canvasDocActionBar01_btn02_htmlElement.onclick = function() {
        // console.log(this)
        NEWselectAddCurvePoint() // OLD

        // Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
        // thisCanvasDoc.actionStates.addEndPointActive_curve = true // NEW
    }
    this.canvasDocActionBar01_btn03_htmlElement.onclick = function() {
        // console.log(this)
        NEWselectDrawParallelPath() // OLD

        // Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
        // thisCanvasDoc.actionStates.drawParallelPathAcive = true // NEW
    }
    this.canvasDocActionBar01_btn04_htmlElement.onclick = function() {
        // console.log(this)
        NEWselectMeasurePath() // OLD

        // Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
        // thisCanvasDoc.actionStates.measurePathActive = true // NEW
    }
    this.canvasDocActionBar02_btn02_htmlElement.onclick = function() {
        // console.log(this)

        Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
        thisCanvasDoc.actionStates.removeEndPointActive = true // NEW
    }
    this.canvasDocActionBar02_btn01_htmlElement.onclick = function() {
        // console.log(this)

        Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
        thisCanvasDoc.actionStates.saveFigureDataActive = true // NEW
    }
    this.canvasDocActionBar02_btn069_htmlElement.onclick = function() {
        // console.log(this)

        saveSvgData(thisCanvasDoc.documentSvg.documentSvgFigures) // NEW
    }
}

export {
    CanvasDocument
}