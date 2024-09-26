import {ActionButton} from '../ActionButton/ActionButton_Class.js'
import {DocumentSvg} from '../DocumentSvg/DocumentSvg_Class.js'
import {SvgGroup} from '../DocumentSvg/SvgFigure/SvgElement/SvgGroup/SvgGroup_Class.js'
import {SvgPath} from '../DocumentSvg/SvgFigure/SvgElement/SvgPath/SvgPath_Class.js'
import {createSvgDocument} from './createCanvasDocumentFunctions.js'
import {dragElement} from '../../utils/htmlElementFunctions.js'
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
import {saveFigureData} from '../../../functions/tools/saveFigureData.js'
import {drawFigureFromData} from '../DocumentSvg/DocumentSvg_functions/drawFigure_NEW.js'
import {EjsModelDataHandler} from '../../utils/EjsModelDataHandler/EjsModelDataHandler_Class.js'
import {drawSavedFigure} from '../../../functions/drafting/drawSavedFigure.js'
import {HotkeyManager} from '../../utils/actionsAndEvents/HotKeyManager/HotkeyManager_Class.js'

function CanvasDocument_PRE_OOP(documentData, footer) {
    this.DOCUMENT_ELEMENT_NEWNAMES = {
        CANV_DOC: 'aDocument',
        HEADING: 'Pattern_Pc_',
        DOC_SVG: 'aDocumentSvg',
        // DOC_BTN_01: 'aDoc_btn_01_',
    }
    this.allCanvasDocs = footer.canvasDocumentClasses
    this.scaleValue = footer.scaleObject
    this.panElement = footer.panElement
    this.scaleObject = footer.scaleObject
    this.stringIncrementCount = footer.vars.stringIncrement
    this.cloneAndAppendTemplate(footer.documentTemplateContent, footer.panElement)
    this.canvasDocument_htmlElement = document.getElementById(documentData.A_DOCUMENT.elements.contentElementsData[0].id)
    this.canvasDocumentHeader_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + documentData.A_DOCUMENT.elements.contentElementsData[1].id)
    this.documentSvg_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + documentData.A_DOCUMENT.elements.contentElementsData[2].id)
    this.documentSvg_D3Element = d3.select(this.documentSvg_htmlElement)
    this.actionStates = {
        drawPathActive: false,
        addEndPointActive: false,
        addEndPointActive_curve: false,
        removeEndPointActive: false,
        drawParallelPathAcive: false,
        measurePathActive: false,
        saveFigureDataActive: false,
    }
    this.documentSvg = new DocumentSvg(this, this.documentSvg_D3Element, this.documentSvg_htmlElement, this.actionStates)






    //FIXME: currently always drawing to last canvDoc in array
    let hotkeyManager = new HotkeyManager(this)
    this.initializeHotkeys = function() {
        console.log('init_hotkeys_OLD')
        hotkeyManager.registerHotkey('F1', this.f1)
        hotkeyManager.registerHotkey('F2', this.f2)
        hotkeyManager.registerHotkey('F3', this.f3)
        hotkeyManager.registerHotkey('F4', this.f4)
        hotkeyManager.registerHotkey('F5', this.f5)
        // hotkeyManager.registerHotkey('Ctrl+t', this.test)
        // hotkeyManager.registerHotkey('Ctrl+n', this.newTest)
    }
    this.f1 = () => {
        console.log("F1_OLD")
        console.log(this.canvasDocument_htmlElement)
        drawSavedFigure(0, this.drawPathObj)
    }
    this.f2 = () => {
        console.log("F2_OLD")
        drawSavedFigure(1, this.drawPathObj)
    }
    this.f3 = () => {
        console.log("F3_OLD")
        drawSavedFigure(2, this.drawPathObj)
    }
    this.f4 = () => {
        console.log("F4_OLD")
        drawSavedFigure(3, this.drawPathObj)
    }
    this.f5 = () => {
        console.log("F5_OLD")
        drawSavedFigure(4, this.drawPathObj)
    }
    this.initializeHotkeys()
    this.cleanup = () => {hotkeyManager.cleanup()}
    this.restore = () => {hotkeyManager.restore()}







    this.setActions()
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


    this.canvDocumentActionElements = EjsModelDataHandler.grabModuleActionIds(documentData, "A_DOCUMENT")
    this.canvasDocActionBar01_btn01_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[0][0])
    this.canvasDocActionBar01_btn02_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[0][1])
    this.canvasDocActionBar01_btn03_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[0][2])
    this.canvasDocActionBar01_btn04_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[0][3])
    this.canvasDocActionBar01_btn05_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[0][4])
    this.canvasDocActionBar02_btn01_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[1][0])
    this.canvasDocActionBar02_btn02_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[1][1])
    this.canvasDocActionBar02_btn03_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[1][2])
    this.canvasDocActionBar02_btn04_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[1][3])
    this.canvasDocActionBar02_btn05_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[1][4])


    this.canvasDocument_htmlElement.addEventListener('click', () => {this.canvDocClick()})
    this.canvasDocActionBar01_btn01_htmlElement.addEventListener('click', () => {this.activateDrawPath()})
    this.canvasDocActionBar01_btn02_htmlElement.addEventListener('click', () => {this.activateAddEndPoint()})
    this.canvasDocActionBar01_btn03_htmlElement.addEventListener('click', () => {this.activateAddEndPoint_curve()})
    this.canvasDocActionBar01_btn04_htmlElement.addEventListener('click', () => {this.activateDrawParallelPath()})
    this.canvasDocActionBar01_btn05_htmlElement.addEventListener('click', () => {this.activateMeasurePath()})
    this.canvasDocActionBar02_btn01_htmlElement.addEventListener('click', () => {this.activateSaveFigureData()})
    this.canvasDocActionBar02_btn02_htmlElement.addEventListener('click', () => {this.saveSvgData()})
    this.canvasDocActionBar02_btn03_htmlElement.addEventListener('click', () => {this.activateRemoveEndPoint()})
    this.canvasDocActionBar02_btn04_htmlElement.addEventListener('click', () => {this.drawFigure(this.documentSvg)})
    this.canvasDocActionBar02_btn05_htmlElement.addEventListener('click', () => {this.drawSvg(this.documentSvg)})
}



CanvasDocument_PRE_OOP.prototype.canvDocClick = function() {
    // console.log("a")
    let thisCanvasDoc = this
    // NEWselectSvgDocument(thisCanvasDoc) // old
    selectSvgDocument(thisCanvasDoc)
}
CanvasDocument_PRE_OOP.prototype.activateDrawPath = function() {
    // console.log(1)
    NEWselectDrawPath(this)
}
CanvasDocument_PRE_OOP.prototype.activateAddEndPoint = function() {
    // console.log(2)
    console.log("Not currently in use.")
}
CanvasDocument_PRE_OOP.prototype.activateAddEndPoint_curve = function() {
    // console.log(3)
    NEWselectAddCurvePoint()
}
CanvasDocument_PRE_OOP.prototype.activateDrawParallelPath = function() {
    // console.log(4)
    NEWselectDrawParallelPath()
}
CanvasDocument_PRE_OOP.prototype.activateMeasurePath = function() {
    // console.log(5)
    NEWselectMeasurePath()
}
CanvasDocument_PRE_OOP.prototype.activateSaveFigureData = function() {
    // console.log(6)
    saveFigureData(this.documentSvg.scaleValue)
    console.log("In this 'older' version of things, the save figure function will save the most recently drawn figure on Svg.")
}
CanvasDocument_PRE_OOP.prototype.saveSvgData = function() {
    // console.log(7)
    console.log("Not currently in use.")
}
CanvasDocument_PRE_OOP.prototype.activateRemoveEndPoint = function() {
    // console.log(8)
    console.log("Not currently in use.")
}
CanvasDocument_PRE_OOP.prototype.drawFigure = function(docSvg) {
    // console.log(9)

    // this.documentSvg.drawSavedFigure(1)
    // this.documentSvg.drawSavedFigure(this, docSvg) // this will draw new way (hardcoded way)
    //FIXME: currently always drawing to last canvDoc in array
    drawSavedFigure(1, this.drawPathObj) // this will draw old way (f-key way)
}
CanvasDocument_PRE_OOP.prototype.drawSvg = function(docSvg) {
    // console.log(10)
    this.documentSvg.drawSavedSvg(this, docSvg)
}
// BTN ACTIONS

CanvasDocument_PRE_OOP.prototype.iterateCounters = function(vars){
    vars.stringIncrement++
    this.stringIncrementCount = vars.stringIncrement
}

CanvasDocument_PRE_OOP.prototype.cloneAndAppendTemplate = function(templateId, targetId) {
    targetId.appendChild(document.importNode(templateId, true))
}

// only really used in the old way. (can remover later)
CanvasDocument_PRE_OOP.prototype.setElementIds = function(canvDocId, headerInnerTxt, docSvgId, btn01Id) { // can place this in an existing method
    this.canvasDocument_htmlElement.id = changeStringIncrementally(canvDocId, this.stringIncrementCount)
    this.canvasDocumentHeader_htmlElement.innerText = changeStringIncrementally(headerInnerTxt, this.stringIncrementCount)
    this.documentSvg_htmlElement.id = changeStringIncrementally(docSvgId, this.stringIncrementCount)
    // this.canvasDocActionBar01_btn01_htmlElement.id = changeStringIncrementally(btn01Id, this.stringIncrementCount)
}

CanvasDocument_PRE_OOP.prototype.setActions = function() {
    placeElement(this.canvasDocument_htmlElement)
    // this.setElementIds(this.DOCUMENT_ELEMENT_NEWNAMES.CANV_DOC, this.DOCUMENT_ELEMENT_NEWNAMES.HEADING, this.DOCUMENT_ELEMENT_NEWNAMES.DOC_SVG, this.DOCUMENT_ELEMENT_NEWNAMES.DOC_BTN_01)
    this.setElementIds(this.DOCUMENT_ELEMENT_NEWNAMES.CANV_DOC, this.DOCUMENT_ELEMENT_NEWNAMES.HEADING, this.DOCUMENT_ELEMENT_NEWNAMES.DOC_SVG)
    // activateSvgDoc(this.canvasDocument_htmlElement) / old
    changeActiveStatus(this.canvasDocument_htmlElement)
    setGlobalSvgElementVars(this.canvasDocument_htmlElement.id, this.documentSvg_htmlElement.id, this.stringIncrementCount)
    dragElement(this.canvasDocument_htmlElement, this.scaleValue)
    setHotKeys(this.allCanvasDocs, this)
}

CanvasDocument_PRE_OOP.prototype.resizeAndCenterDocument = function() {
    let scaleValue = this.scaleValue.scaleLevel
    let panCanvas = this.panElement
    let canvasDocument = this.documentSvg.canvDocHtmlElement
    let documentSvgElement = this.documentSvg.HtmlElement
    let documentGroup = this.documentSvg.documentSvgGroup.newSvgGroup

    // Set documentSvgElement size to fit the PrimarySvgGroup
    // Get the documentGroup bounding box
    let documentGroupBBox = documentGroup.node().getBBox()
    // Set extra area around documentGroup
    let svgGroupBubble = 200
    // Set the documentSvgElement to the new size
    documentSvgElement.style.height = documentGroupBBox.height + svgGroupBubble
    documentSvgElement.style.width = documentGroupBBox.width + svgGroupBubble

    // Place canvasDocument in center of panCanvas
    // Get the panCanvas bounding rectangle
    let panCanvasRect = panCanvas.getBoundingClientRect()
    // Get the canvasDocument bounding rectangle
    let canvasDocRect = canvasDocument.getBoundingClientRect()
    // Calculate the panCanvas dimensions according to the ScaleValue (Zoom Level) then divide by 2 to find center
    let panCanvasScaledWidthCenter = (panCanvasRect.width / scaleValue) / 2
    let panCanvasScaledHeightCenter = (panCanvasRect.height / scaleValue) / 2
    // Calculate the canvasDocument dimensions according to the ScaleValue (Zoom Level) then divide by 2 to find center
    let canvDocScaledWidthCenter = (canvasDocRect.width / scaleValue) / 2
    let canvDocScaledHeightCenter =  (canvasDocRect.height / scaleValue) / 2

    //If panCanvas has been panned, find the amount needed to offset the canvasDoc to keep it in the center of the window
    let topPosition = panCanvas.offsetTop
    let leftPosition = panCanvas.offsetLeft
    let offsettop = 0
    let offsetleft = 0
    // Find the distance to move the canvasDocument by subtracting its center dimensions from the panCanvas dimensions
    let movetoleft = panCanvasScaledWidthCenter - canvDocScaledWidthCenter - offsetleft
    let movetotop = panCanvasScaledHeightCenter - canvDocScaledHeightCenter - offsettop
    // Set the Svg Element to the new Size
    canvasDocument.style.top = movetotop + 'px'
    canvasDocument.style.left = movetoleft + 'px'
}

function changeActiveStatus(element) {
    let activeClass = "a-document__container--active"
    document.querySelectorAll(".a-document__container").forEach(container => {
        container.classList.remove(activeClass)
    })
    element.classList.add(activeClass)
}

function selectSvgDocument(thisCanvasDoc) {
    if(!thisCanvasDoc.canvasDocument_htmlElement.classList.contains("a-document__container--active")) {
        console.log("Activating.")
        deactivateAllActionsOnPreviouslyActiveCanvDoc() //TODO: Will eventually need to build new way to handle if previously Active canvDoc had an active action
        // // finish draw path on previously active svgElement if drawPath was active
        if(a_canvas_globalVars.pressSvgElement) { // maybe find better trigger variable
            finishDrawPath(thisCanvasDoc.drawPathObj.previousDrawPathObj, thisCanvasDoc.documentSvg_D3Element, thisCanvasDoc.stringIncrementCount, false)
        }
        // activate current svgDocument
        changeActiveStatus(thisCanvasDoc.canvasDocument_htmlElement, thisCanvasDoc)
        setHotKeys(thisCanvasDoc.allCanvasDocs, thisCanvasDoc)
    } else {
        console.log("Already active.")
    }

    function deactivateAllActionsOnPreviouslyActiveCanvDoc() {
        console.log("Unfinished Build: deactivate actions of previously active canvDoc")
    }
}

function setHotKeys(canvDocs, thisDoc) {
    canvDocs.forEach(function(canvDoc) {
        canvDoc.cleanup()
    })
    thisDoc.restore()
}


// CanvasDocument_PRE_OOP.prototype.setClickEvents = function() {
//     let thisCanvasDoc = this

//     this.canvasDocument_htmlElement.onclick = function() {
//         NEWselectSvgDocument(thisCanvasDoc)
//     }
//     this.canvasDocActionBar01_btn01_htmlElement.onclick = function() {
//         NEWselectDrawPath(thisCanvasDoc) // OLD DRAW
//     }
//     this.canvasDocActionBar01_btn02_htmlElement.onclick = function() {
//         console.log(this)
//         NEWselectAddCurvePoint() // OLD
//     }
//     this.canvasDocActionBar01_btn03_htmlElement.onclick = function() {
//         console.log(this)
//         NEWselectDrawParallelPath() // OLD
//     }
//     this.canvasDocActionBar01_btn04_htmlElement.onclick = function() {
//         console.log(this)
//         NEWselectMeasurePath() // OLD
//     }
//     this.canvasDocActionBar02_btn02_htmlElement.onclick = function() {
//         console.log(this)
//     }
//     this.canvasDocActionBar02_btn01_htmlElement.onclick = function() {
//         console.log(this)
//         console.log("Click figure to save.")
//     }
//     this.canvasDocActionBar02_btn069_htmlElement.onclick = function() {
//         console.log(this)

//         saveSvgData(thisCanvasDoc.documentSvg.documentSvgFigures) // NEW
//     }
// }

export {
    CanvasDocument_PRE_OOP
}