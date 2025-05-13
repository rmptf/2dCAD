// import {DocumentSvg} from '../DocumentSvg/DocumentSvg_Class.js'
// import {EjsModelDataHandler} from '../../utils/EjsModelDataHandler/EjsModelDataHandler_Class.js'
// import {HotkeyManager} from '../../utils/actionsAndEvents/HotKeyManager/HotkeyManager_Class.js'
// import {dragElement} from '../../utils/htmlElementFunctions.js'
// import {saveFigureData, saveSvgData} from '../DocumentSvg/DocumentSvg_functions/saveFigureData_NEW.js'

function ReferenceLayer(canvasData) {
    this.canvasElement = canvasData.A_CANVAS.elements.elementData.element
    this.documentTemplateContent = canvasData.A_CANVAS.elements.contentElementsData[3].element.content
    this.cloneAndAppendTemplate(this.documentTemplateContent, this.canvasElement)






    // this.canvasDocument_htmlElement = document.getElementById(documentData.A_DOCUMENT.elements.contentElementsData[0].id)
    // this.canvasDocumentHeader_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + documentData.A_DOCUMENT.elements.contentElementsData[1].id)
    // this.documentSvg_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + documentData.A_DOCUMENT.elements.contentElementsData[2].id)
    // this.documentSvg_D3Element = d3.select(this.documentSvg_htmlElement)



    // // CANVAS TEMPLATE 01
    // console.log(canvasData.A_CANVAS.elements.contentElementsData[2].element.content)
    // // CANVAS TEMPLATE 02
    // console.log(canvasData.A_CANVAS.elements.contentElementsData[3].element.content)
}

export {
    ReferenceLayer
}

ReferenceLayer.prototype.cloneAndAppendTemplate = function(templateElement, targetElement) {
    targetElement.appendChild(document.importNode(templateElement, true))
}




// function CanvasDocument(documentData, footer) {
//     this.DOCUMENT_ELEMENT_NEWNAMES = {
//         CANV_DOC: 'aDocument_',
//         HEADING: 'Pattern_Pc_',
//     }
//     this.allCanvasDocs = footer.canvasDocumentClasses
//     this.scaleValue = footer.scaleObject
//     this.panElement = footer.panElement
//     this.scaleObject = footer.scaleObject
//     this.stringIncrementCount = footer.vars.stringIncrement
//     this.cloneAndAppendTemplate(footer.documentTemplateContent, footer.panElement)
//     this.canvasDocument_htmlElement = document.getElementById(documentData.A_DOCUMENT.elements.contentElementsData[0].id)
//     this.canvasDocumentHeader_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + documentData.A_DOCUMENT.elements.contentElementsData[1].id)
//     this.documentSvg_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + documentData.A_DOCUMENT.elements.contentElementsData[2].id)
//     this.documentSvg_D3Element = d3.select(this.documentSvg_htmlElement)
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

//     this.hotkeyManager = new HotkeyManager(this)
//     this.hotkeyManager.registerHotkey('F1', () => this.f1(this))
//     this.hotkeyManager.registerHotkey('F2', () => this.f2(this))
//     this.hotkeyManager.registerHotkey('F3', () => this.f3(this))
//     this.hotkeyManager.registerHotkey('F4', () => this.f4(this))
//     this.hotkeyManager.registerHotkey('F5', () => this.f5(this))
//     this.hotkeyManager.registerHotkey('Ctrl+,', () => this.ctrlComma(this))

//     this.setActions()

//     this.canvDocumentActionElements = EjsModelDataHandler.grabModuleActionIds(documentData, "A_DOCUMENT")
//     this.canvasDocActionBar01_btn01_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[0][0])
//     this.canvasDocActionBar01_btn02_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[0][1])
//     this.canvasDocActionBar01_btn03_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[0][2])
//     this.canvasDocActionBar01_btn04_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[0][3])
//     this.canvasDocActionBar01_btn05_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[0][4])
//     this.canvasDocActionBar02_btn01_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[1][0])
//     this.canvasDocActionBar02_btn02_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[1][1])
//     this.canvasDocActionBar02_btn03_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[1][2])
//     this.canvasDocActionBar02_btn04_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[1][3])
//     this.canvasDocActionBar02_btn05_htmlElement = this.canvasDocument_htmlElement.querySelector('#' + this.canvDocumentActionElements[1][4])
    
//     this.canvasDocument_htmlElement.addEventListener('click', () => {this.canvDocClick()})
//     this.canvasDocActionBar01_btn01_htmlElement.addEventListener('click', () => {this.activateDrawPath()})
//     this.canvasDocActionBar01_btn02_htmlElement.addEventListener('click', () => {this.activateAddEndPoint()})
//     this.canvasDocActionBar01_btn03_htmlElement.addEventListener('click', () => {this.activateAddEndPoint_curve()})
//     this.canvasDocActionBar01_btn04_htmlElement.addEventListener('click', () => {this.activateDrawParallelPath()})
//     this.canvasDocActionBar01_btn05_htmlElement.addEventListener('click', () => {this.activateMeasurePath()})
//     this.canvasDocActionBar02_btn01_htmlElement.addEventListener('click', () => {this.activateSaveFigureData()})
//     this.canvasDocActionBar02_btn02_htmlElement.addEventListener('click', () => {this.saveSvgData()})
//     this.canvasDocActionBar02_btn03_htmlElement.addEventListener('click', () => {this.activateRemoveEndPoint()})
//     this.canvasDocActionBar02_btn04_htmlElement.addEventListener('click', () => {this.drawFigure(this.documentSvg)})
//     this.canvasDocActionBar02_btn05_htmlElement.addEventListener('click', () => {this.drawSvg(this.documentSvg)})
// }

// // HOTKEY ACTIONS
// CanvasDocument.prototype.f1 = function () {
//     // console.log("F1_NEW")
//     this.documentSvg.drawSavedFigure(0)
// }
// CanvasDocument.prototype.f2 = function () {
//     // console.log("F2_NEW")
//     this.documentSvg.drawSavedFigure(1)
// }
// CanvasDocument.prototype.f3 = function () {
//     // console.log("F3_NEW")
//     this.documentSvg.drawSavedFigure(2)
// }
// CanvasDocument.prototype.f4 = function () {
//     // console.log("F4_NEW")
//     this.documentSvg.drawSavedFigure(3)
// }
// CanvasDocument.prototype.f5 = function () {
//     // console.log("F5_NEW")
//     this.documentSvg.drawSavedFigure(4)
// }
// CanvasDocument.prototype.ctrlComma = function () {
//     console.log("Ctrl+Comma_NEW")
//     console.log("Click figure to star drawing parallel line.")
//     this.activateDrawParallelPath()
// }
// // HOTKEY ACTIONS

// // BTN ACTIONS
// CanvasDocument.prototype.canvDocClick = function() {
//     // console.log("a")
//     selectSvgDocument(this)
// }
// CanvasDocument.prototype.activateDrawPath = function() {
//     // console.log(1)
//     let thisCanvasDoc = this
//     Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
//     thisCanvasDoc.actionStates.drawPathActive = true
// }
// CanvasDocument.prototype.activateAddEndPoint = function() {
//     // console.log(2)
//     let thisCanvasDoc = this
//     Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
//     thisCanvasDoc.actionStates.addEndPointActive = true
// }
// CanvasDocument.prototype.activateAddEndPoint_curve = function() {
//     // console.log(3)
//     let thisCanvasDoc = this
//     Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
//     thisCanvasDoc.actionStates.addEndPointActive_curve = true
// }
// CanvasDocument.prototype.activateDrawParallelPath = function() {
//     // console.log(4)
//     let thisCanvasDoc = this
//     Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
//     thisCanvasDoc.actionStates.drawParallelPathAcive = true // NEW
// }
// CanvasDocument.prototype.activateMeasurePath = function() {
//     // console.log(5)
//     let thisCanvasDoc = this
//     Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
//     thisCanvasDoc.actionStates.measurePathActive = true // NEW
// }
// CanvasDocument.prototype.activateSaveFigureData = function() {
//     // console.log(6)
//     let thisCanvasDoc = this
//     console.log("Click figure to save.")
//     Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
//     thisCanvasDoc.actionStates.saveFigureDataActive = true // NEW
// }
// CanvasDocument.prototype.saveSvgData = function() {
//     console.log(7)
//     let thisCanvasDoc = this
//     console.log(thisCanvasDoc.documentSvg.documentSvgFigures)
//     saveSvgData(thisCanvasDoc.documentSvg.documentSvgFigures) // NEW
// }
// CanvasDocument.prototype.activateRemoveEndPoint = function() {
//     // console.log(8)
//     let thisCanvasDoc = this
//     Object.keys(thisCanvasDoc.actionStates).forEach(function(state){ thisCanvasDoc.actionStates[state] = false })
//     thisCanvasDoc.actionStates.removeEndPointActive = true // NEW
// }
// CanvasDocument.prototype.drawFigure = function() {
//     // console.log(9)
//     this.documentSvg.drawSavedFigure(1)
// }
// CanvasDocument.prototype.drawSvg = function(docSvg) {
//     // console.log(10)
//     this.documentSvg.drawSavedSvg(this, docSvg)
// }
// // BTN ACTIONS

// CanvasDocument.prototype.cloneAndAppendTemplate = function(templateElement, targetElement) {
//     targetElement.appendChild(document.importNode(templateElement, true))
// }

// CanvasDocument.prototype.setActions = function() {
//     // placeElement(this.canvasDocument_htmlElement) // Dont need
//     this.setElementIdAndData(this.DOCUMENT_ELEMENT_NEWNAMES.CANV_DOC, this.DOCUMENT_ELEMENT_NEWNAMES.HEADING)
//     this.resizeAndCenterDocument()
//     changeActiveStatus(this.canvasDocument_htmlElement, this)
//     dragElement(this.canvasDocument_htmlElement, this.scaleValue)
//     changeHotKeyActivation(this)
// }

// CanvasDocument.prototype.setElementIdAndData = function(canvDocId, headerInnerTxt) {
//     this.canvasDocument_htmlElement.id = changeStringIncrementally(canvDocId, this.stringIncrementCount) // The incrimental change isn't necessary for functionality, but doest help with maintaining unique Id's
//     this.canvasDocumentHeader_htmlElement.innerText = changeStringIncrementally(headerInnerTxt, this.stringIncrementCount)
// }

// CanvasDocument.prototype.resizeAndCenterDocument = function() {
//     let scaleValue = this.scaleValue.scaleLevel
//     let panCanvas = this.panElement
//     let canvasDocument = this.documentSvg.canvDocHtmlElement
//     let documentSvgElement = this.documentSvg.HtmlElement
//     let documentGroup = this.documentSvg.documentSvgGroup.newSvgGroup


//     // Set documentSvgElement size to fit the PrimarySvgGroup
//     // Get the documentGroup bounding box
//     let documentGroupBBox = documentGroup.node().getBBox()
//     // Set extra area around documentGroup
//     let svgGroupBubble = 500
//     // Set the documentSvgElement to the new size
//     documentSvgElement.style.height = documentGroupBBox.height + svgGroupBubble
//     documentSvgElement.style.width = documentGroupBBox.width + svgGroupBubble

//     // Place canvasDocument in center of panCanvas
//     // Get the panCanvas bounding rectangle
//     let panCanvasRect = panCanvas.getBoundingClientRect()
//     // Get the canvasDocument bounding rectangle
//     let canvasDocRect = canvasDocument.getBoundingClientRect()
//     // Calculate the panCanvas dimensions according to the ScaleValue (Zoom Level) then divide by 2 to find center
//     let panCanvasScaledWidthCenter = (panCanvasRect.width / scaleValue) / 2
//     let panCanvasScaledHeightCenter = (panCanvasRect.height / scaleValue) / 2
//     // Calculate the canvasDocument dimensions according to the ScaleValue (Zoom Level) then divide by 2 to find center
//     let canvDocScaledWidthCenter = (canvasDocRect.width / scaleValue) / 2
//     let canvDocScaledHeightCenter =  (canvasDocRect.height / scaleValue) / 2


//     //If panCanvas has been panned, find the amount needed to offset the canvasDoc to keep it in the center of the window
//     let topPosition = panCanvas.offsetTop
//     let leftPosition = panCanvas.offsetLeft
//     let offsettop = 0
//     let offsetleft = 0
//     // let offsettop = (topPosition + (2500 * scaleValue)) / 2
//     // let offsetleft = (leftPosition + (2500 * scaleValue)) / 2
//     // let offsettop = ((topPosition / scaleValue) + 2500) / 2
//     // let offsetleft = ((leftPosition / scaleValue) + 2500) / 2
//     // let offsettop = topPosition + (2500 * scaleValue)
//     // let offsetleft = leftPosition + (2500 * scaleValue)
//     // let offsettop = topPosition + 2500
//     // let offsetleft = leftPosition + 2500

//     // console.log("oskdfosdkfoskf")
//     // console.log(offsettop)
//     // console.log(offsetleft)
//     // console.log(scaleValue)

//     // Find the distance to move the canvasDocument by subtracting its center dimensions from the panCanvas dimensions
//     let movetoleft = panCanvasScaledWidthCenter - canvDocScaledWidthCenter - offsetleft
//     let movetotop = panCanvasScaledHeightCenter - canvDocScaledHeightCenter - offsettop
//     // Set the Svg Element to the new Size
//     canvasDocument.style.top = movetotop + 'px'
//     canvasDocument.style.left = movetoleft + 'px'
// }

// function changeActiveStatus(element) {
//     let activeClass = "a-document__container--active--REORG"
//     document.querySelectorAll(".a-document__container").forEach(container => {
//         container.classList.remove(activeClass)
//     })
//     element.classList.add(activeClass)
// }

// function selectSvgDocument(thisCanvasDoc) {
//     if(!thisCanvasDoc.canvasDocument_htmlElement.classList.contains("a-document__container--active--REORG")) {
//         console.log("Activating.")
//         deactivateAllActionsOnPreviouslyActiveCanvDoc() //TODO: Will eventually need to build new way to handle if previously Active canvDoc had an active action
//         // activate current svgDocument
//         changeActiveStatus(thisCanvasDoc.canvasDocument_htmlElement, thisCanvasDoc)
//         changeHotKeyActivation(thisCanvasDoc)
//     } else {
//         console.log("Already active.")
//     }
//     function deactivateAllActionsOnPreviouslyActiveCanvDoc() {
//         console.log("Unfinished Build: deactivate actions of previously active canvDoc")
//     }
// }

// function changeHotKeyActivation(thisDoc) {
//     let allCanvDocs = thisDoc.allCanvasDocs
//     allCanvDocs.forEach(function(canvDoc) {
//         canvDoc.hotkeyManager.cleanup()
//     })
//     thisDoc.hotkeyManager.restore()
// }

// function changeStringIncrementally(origString, stringIncrementCount) {
//     let newString = origString + stringIncrementCount
//     return newString
// }

// export {
//     CanvasDocument
// }

// Dont use any more
// function placeElement(canvDocumentElement) {
//     canvDocumentElement.style.top = 'calc(50% - 250px)'
//     canvDocumentElement.style.left = 'calc(50% - 250px)'
//     let toPixelWidth = canvDocumentElement.offsetTop
//     let toPixelHeight = canvDocumentElement.offsetTop
//     canvDocumentElement.style.top = toPixelWidth + 'px'
//     canvDocumentElement.style.left = toPixelHeight + 'px'
// }