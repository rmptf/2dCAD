import {ActionButton} from '../ActionButton/ActionButton_Class.js'
import {DocumentSvg} from '../DocumentSvg/DocumentSvg_Class.js'
import {SvgGroup} from '../DocumentSvg/SvgFigure/SvgElement/SvgGroup/SvgGroup_Class.js'
import {SvgPath} from '../DocumentSvg/SvgFigure/SvgElement/SvgPath/SvgPath_Class.js'
import {createSvgDocument} from './createCanvasDocumentFunctions.js'
import {dragElement} from '../../utils/htmlElementFunctions.js'
import {saveFigureData, saveSvgData} from '../DocumentSvg/DocumentSvg_functions/saveFigureData_NEW.js'
import {drawFigureFromData} from '../DocumentSvg/DocumentSvg_functions/drawFigure_NEW.js'

function CanvasDocument(fillerData, footer) {
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
    this.scaleValue = footer.scaleObject
    this.panElement = footer.panElement
    this.scaleObject = footer.scaleObject
    this.stringIncrementCount = footer.vars.stringIncrement
    this.cloneAndAppendTemplate(footer.documentTemplate, footer.panElement)
    this.canvasDocument_htmlElement = document.getElementById(footer.DOCUMENT_CONTAINER_ID) //FIXME: find a beter way using 'documentData'
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
    this.setElementIds( // only really used in the old way. (can remover later) FIXME: also used in new way for new canvDocs (but only necisary for canvDocumentId)
        this.DOCUMENT_ELEMENT_NEWNAMES.CANV_DOC,
        this.DOCUMENT_ELEMENT_NEWNAMES.HEADING,
        this.DOCUMENT_ELEMENT_NEWNAMES.DOC_SVG,
        this.DOCUMENT_ELEMENT_NEWNAMES.DOC_BTN_01
        )

        
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
    this.setActions()
    this.setClickEvents()

    // potential new way?
    // // Bind event listeners to methods
    // this.canvasDocActionBar01_btn01_htmlElement.addEventListener('click', this.activateDrawPath.bind(this))
    // this.canvasDocActionBar01_btn069_htmlElement.addEventListener('click', this.activateAddEndPoint.bind(this))
    // this.canvasDocActionBar01_btn02_htmlElement.addEventListener('click', this.activateAddEndPoint_curve.bind(this))
}

// function CanvasDocument(documentData, footer) { // FIXME: use later when fixing
//     this.DOCUMENT_ACTIONBAR_BTN_CONTS = {
//         BTN_CONT_01: {
//             BTN_01:'aDoc_btnCont01_btn01',
//             BTN_069:'aDoc_btnCont01_btn069',
//             BTN_02:'aDoc_btnCont01_btn02',
//             BTN_03:'aDoc_btnCont01_btn03',
//             BTN_04:'aDoc_btnCont01_btn04'
//         }, 
//         BTN_CONT_02: {
//             BTN_01:'aDoc_btnCont02_btn01',
//             BTN_069:'aDoc_btnCont02_btn069',
//             BTN_02:'aDoc_btnCont02_btn02',
//             BTN_03:'aDoc_btnCont02_btn03',
//             BTN_04:'aDoc_btnCont02_btn04',
//         }
//     }
//     this.DOCUMENT_ELEMENT_NEWNAMES = {
//         CANV_DOC: 'aDocument',
//         HEADING: 'Pattern_Pc_',
//         DOC_SVG: 'aDocumentSvg',
//         DOC_BTN_01: 'aDoc_btn_01_',
//     }

//     this.scaleValue = footer.scaleObject // fine
//     this.panElement = footer.panElement // fine
//     this.scaleObject = footer.scaleObject // fine
//     this.stringIncrementCount = footer.vars.stringIncrement // fine
//     this.cloneAndAppendTemplate(footer.documentTemplateContent, footer.panElement)
//     this.canvasDocument_htmlElement = document.getElementById(documentData.A_DOCUMENT.elements.contentElementsData[0].id)

//     this.canvasDocumentHeader_htmlElement = this.canvasDocument_htmlElement.children[0]
//     this.documentSvg_htmlElement = this.canvasDocument_htmlElement.children[4]
//     this.documentSvg_D3Element = d3.select(this.documentSvg_htmlElement)


//     this.canvasDocActionBar01_btn01_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_01.BTN_01)
//     this.canvasDocActionBar01_btn069_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_01.BTN_069)
//     this.canvasDocActionBar01_btn02_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_01.BTN_02)
//     this.canvasDocActionBar01_btn03_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_01.BTN_03)
//     this.canvasDocActionBar01_btn04_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_01.BTN_04)
//     this.canvasDocActionBar02_btn01_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_02.BTN_01)
//     this.canvasDocActionBar02_btn069_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_02.BTN_069)
//     this.canvasDocActionBar02_btn02_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_02.BTN_02)
//     this.canvasDocActionBar02_btn03_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_02.BTN_03)
//     this.canvasDocActionBar02_btn04_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.DOCUMENT_ACTIONBAR_BTN_CONTS.BTN_CONT_02.BTN_04)
//     this.setElementIds( // only really used in the old way. (can remover later)
//         this.DOCUMENT_ELEMENT_NEWNAMES.CANV_DOC,
//         this.DOCUMENT_ELEMENT_NEWNAMES.HEADING,
//         this.DOCUMENT_ELEMENT_NEWNAMES.DOC_SVG,
//         this.DOCUMENT_ELEMENT_NEWNAMES.DOC_BTN_01
//         )

        
//     this.actionStates = {
//         drawPathActive: false,
//         addEndPointActive: false,
//         addEndPointActive_curve: false,
//         removeEndPointActive: false,
//         drawParallelPathAcive: false,
//         measurePathActive: false,
//         saveFigureDataActive: false,
//     }
//     this.documentSvg = new DocumentSvg(this)
//     this.setActions()
//     // this.setClickEvents()

//     // potential new way?
//     // Bind event listeners to methods
//     this.canvasDocActionBar01_btn01_htmlElement.addEventListener('click', this.activateDrawPath.bind(this))
//     this.canvasDocActionBar01_btn069_htmlElement.addEventListener('click', this.activateAddEndPoint.bind(this))
//     this.canvasDocActionBar01_btn02_htmlElement.addEventListener('click', this.activateAddEndPoint_curve.bind(this))
//     this.canvasDocActionBar01_btn03_htmlElement.addEventListener('click', this.activateDrawParallelPath.bind(this))
//     this.canvasDocActionBar01_btn04_htmlElement.addEventListener('click', this.activateMeasurePath.bind(this))
//     this.canvasDocActionBar02_btn01_htmlElement.addEventListener('click', this.activateRemoveEndPoint.bind(this))
//     this.canvasDocActionBar02_btn069_htmlElement.addEventListener('click', this.activateSaveFigureData.bind(this))
//     this.canvasDocActionBar02_btn02_htmlElement.addEventListener('click', this.saveSvgData.bind(this))
// }







CanvasDocument.prototype.cloneAndAppendTemplate = function(templateElement, targetElement) {
    targetElement.appendChild(document.importNode(templateElement, true))
}

// potential new way?
CanvasDocument.prototype.activateDrawPath = function() {
    console.log(1)
    let thisCanvasDoc = this
    Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
    thisCanvasDoc.actionStates.drawPathActive = true
}

CanvasDocument.prototype.activateAddEndPoint = function() {
    console.log(2)
    let thisCanvasDoc = this
    Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
    thisCanvasDoc.actionStates.addEndPointActive = true
}

CanvasDocument.prototype.activateAddEndPoint_curve = function() {
    console.log(3)
    let thisCanvasDoc = this
    Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
    thisCanvasDoc.actionStates.addEndPointActive_curve = true
}

CanvasDocument.prototype.activateDrawParallelPath = function() {
    console.log(4)
    let thisCanvasDoc = this
    Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
    thisCanvasDoc.actionStates.drawParallelPathAcive = true // NEW
}

CanvasDocument.prototype.activateMeasurePath = function() {
    console.log(5)
    let thisCanvasDoc = this
    Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
    thisCanvasDoc.actionStates.measurePathActive = true // NEW
}

CanvasDocument.prototype.activateRemoveEndPoint = function() {
    console.log(6)
    let thisCanvasDoc = this
    Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
    thisCanvasDoc.actionStates.removeEndPointActive = true // NEW
}

CanvasDocument.prototype.activateSaveFigureData = function() {
    console.log(7)
    let thisCanvasDoc = this
    console.log("Click figure to save.")

    Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
    thisCanvasDoc.actionStates.saveFigureDataActive = true // NEW
}

CanvasDocument.prototype.saveSvgData = function() {
    console.log(8)
    let thisCanvasDoc = this
    saveSvgData(thisCanvasDoc.documentSvg.documentSvgFigures) // NEW
}

CanvasDocument.prototype.iterateCounters = function(vars){
    vars.stringIncrement++
    this.stringIncrementCount = vars.stringIncrement
}

// only really used in the old way. (can remover later)
CanvasDocument.prototype.setElementIds = function(canvDocId, headerInnerTxt, docSvgId, btn01Id) { // can place this in an existing method
    this.canvasDocument_htmlElement.id = changeStringIncrementally(canvDocId, this.stringIncrementCount)
    this.canvasDocumentHeader_htmlElement.innerText = changeStringIncrementally(headerInnerTxt, this.stringIncrementCount)
    this.documentSvg_htmlElement.id = changeStringIncrementally(docSvgId, this.stringIncrementCount)
    this.canvasDocActionBar01_btn01_htmlElement.id = changeStringIncrementally(btn01Id, this.stringIncrementCount)
}

CanvasDocument.prototype.setActions = function() {
    placeElement(this.canvasDocument_htmlElement) // make new 
    activateSvgDoc(this.canvasDocument_htmlElement) // make new
    dragElement(this.canvasDocument_htmlElement, this.scaleValue) // fine
}


CanvasDocument.prototype.setClickEvents = function() {
    let thisCanvasDoc = this

    this.canvasDocument_htmlElement.onclick = function() {
        NEWselectSvgDocument(thisCanvasDoc) // make new
    }
    this.canvasDocActionBar01_btn01_htmlElement.onclick = function() {
        Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
        thisCanvasDoc.actionStates.drawPathActive = true // NEW DRAW
    }
    this.canvasDocActionBar01_btn069_htmlElement.onclick = function() {
        Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
        thisCanvasDoc.actionStates.addEndPointActive = true // NEW
    }
    this.canvasDocActionBar01_btn02_htmlElement.onclick = function() {
        Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
        thisCanvasDoc.actionStates.addEndPointActive_curve = true // NEW
    }
    this.canvasDocActionBar01_btn03_htmlElement.onclick = function() {
        Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
        thisCanvasDoc.actionStates.drawParallelPathAcive = true // NEW
    }
    this.canvasDocActionBar01_btn04_htmlElement.onclick = function() {
        Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
        thisCanvasDoc.actionStates.measurePathActive = true // NEW
    }
    this.canvasDocActionBar02_btn02_htmlElement.onclick = function() {
        Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
        thisCanvasDoc.actionStates.removeEndPointActive = true // NEW
    }
    this.canvasDocActionBar02_btn01_htmlElement.onclick = function() {
        console.log("Click figure to save.")

        Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
        thisCanvasDoc.actionStates.saveFigureDataActive = true // NEW
    }
    this.canvasDocActionBar02_btn069_htmlElement.onclick = function() {
        saveSvgData(thisCanvasDoc.documentSvg.documentSvgFigures) // NEW
    }
}

CanvasDocument.prototype.resizeAndCenterDocument = function() {
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
    // let offsettop = (topPosition + (2500 * scaleValue)) / 2
    // let offsetleft = (leftPosition + (2500 * scaleValue)) / 2
    // let offsettop = ((topPosition / scaleValue) + 2500) / 2
    // let offsetleft = ((leftPosition / scaleValue) + 2500) / 2
    // let offsettop = topPosition + (2500 * scaleValue)
    // let offsetleft = leftPosition + (2500 * scaleValue)
    // let offsettop = topPosition + 2500
    // let offsetleft = leftPosition + 2500

    // console.log("oskdfosdkfoskf")
    // console.log(offsettop)
    // console.log(offsetleft)
    // console.log(scaleValue)


    // Find the distance to move the canvasDocument by subtracting its center dimensions from the panCanvas dimensions
    let movetoleft = panCanvasScaledWidthCenter - canvDocScaledWidthCenter - offsetleft
    let movetotop = panCanvasScaledHeightCenter - canvDocScaledHeightCenter - offsettop
    // Set the Svg Element to the new Size
    canvasDocument.style.top = movetotop + 'px'
    canvasDocument.style.left = movetoleft + 'px'
}


//TODO: These all need finishing
function changeStringIncrementally(origString, stringIncrement123) {
    let newString = origString + stringIncrement123
    return newString
}

function activateSvgDoc(element) {
    let activeClass = "a-document__container--active";
    document.querySelectorAll(".a-document__container").forEach(container => {
        container.classList.remove(activeClass)
    })
    element.classList.add(activeClass)
}

function placeElement(canvDocumentElement) {
    canvDocumentElement.style.top = 'calc(50% - 250px)'
    canvDocumentElement.style.left = 'calc(50% - 250px)'
    let toPixelWidth = canvDocumentElement.offsetTop
    let toPixelHeight = canvDocumentElement.offsetTop
    canvDocumentElement.style.top = toPixelWidth + 'px'
    canvDocumentElement.style.left = toPixelHeight + 'px'
}

function NEWselectSvgDocument(thisCanvasDoc) {
    // console.log(thisCanvasDoc)
    if(!thisCanvasDoc.canvasDocument_htmlElement.classList.contains("a-document__container--active")) {
        console.log("Activating.")

        //TODO: check if needed for new way
        // // finish draw path on previously active svgElement if drawPath was active
        // if(a_canvas_globalVars.pressSvgElement) { // maybe find better trigger variable
        //     finishDrawPath(thisCanvasDoc.drawPathObj.previousDrawPathObj, thisCanvasDoc.documentSvg_D3Element, thisCanvasDoc.stringIncrementCount, false)
        // }

        // activate current svgDocument
        activateSvgDoc(thisCanvasDoc.canvasDocument_htmlElement)
    } else {
        console.log("Already active.")
    }
}

export {
    CanvasDocument
}