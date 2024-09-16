import {CanvasDocument} from '../CanvasDocument/CanvasDocument_Class.js'
import {CanvasDocument_PRE_OOP} from '../CanvasDocument/CanvasDocument_Class_PRE_OOP.js'
import {EjsModelDataHandler} from '../../utils/EjsModelDataHandler/EjsModelDataHandler_Class.js'

// function Footer(canvasElement, canvasDocument, scaleClass, panClass, footerElement, actionButtons) {
//     this.DOCUMENT_TEMPLATE_ID = 'aCanvasTemplate'
//     this.DOCUMENT_CONTAINER_ID = 'aDocumentContainer'
//     this.canvasClass_canvasElement = canvasElement
//     this.documentTemplate = document.getElementById(this.DOCUMENT_TEMPLATE_ID).content
//     this.canvasClass_canvasDocuments = canvasDocument
//     this.canvasScale_Class = scaleClass
//     this.scaleClass_scaleObject = scaleClass.scaleObject
//     this.panElement = panClass.canvasPanElement
//     this.footerElement = footerElement

//     this.vars = {
//         stringIncrement: -1,
//         previousDrawPathObj: undefined
//     }

//     this.footerActionBar01_btn01_htmlElement = actionButtons[0]
//     this.footerActionBar01_btn02_htmlElement = actionButtons[1]
//     this.footerActionBar01_btn03_htmlElement = actionButtons[2]
//     this.footerActionBar01_btn04_htmlElement = actionButtons[3]
//     this.footerActionBar01_btn05_htmlElement = actionButtons[4]
//     this.footerActionBar01_btn02b_htmlElement = actionButtons[5]

//     this.footerActionBar01_btn01_htmlElement.addEventListener('click', this.test.bind(this))
//     this.footerActionBar01_btn02_htmlElement.addEventListener('click', this.createCanvasDocument.bind(this))
//     this.footerActionBar01_btn03_htmlElement.addEventListener('click', this.increaseCanvasScale.bind(this))
//     this.footerActionBar01_btn04_htmlElement.addEventListener('click', this.resetCanvasScale.bind(this))
//     this.footerActionBar01_btn05_htmlElement.addEventListener('click', this.decreaseCanvasScale.bind(this))
//     this.footerActionBar01_btn02b_htmlElement.addEventListener('click', this.createCanvasDocument_PRE_OOP.bind(this))
// }

function Footer(canvasClass, canvasData, footerData, documentData) {
    this.DOCUMENT_CONTAINER_ID = 'aDocumentContainer' //FIXME: canvas document is using but maybe find better way
    this.documentTemplateContent = canvasData.A_CANVAS.elements.contentElementsData[2].element.content
    this.canvasClass_canvasDocuments = canvasClass.canvasDocuments
    this.canvasScale_Class = canvasClass.canvScaleClass
    this.scaleClass_scaleObject = canvasClass.scaleObject
    this.panElement = canvasData.A_CANVAS.elements.contentElementsData[1].element
    this.footerElement = footerData.B_FOOTER.elements.elementData.element
    this.footerActionElements = EjsModelDataHandler.grabModuleActions(footerData, "B_FOOTER")
    this.documentData = documentData



    console.log("As")
    console.log(canvasClass.canvScaleClass)

    this.vars = {
        stringIncrement: -1,
        previousDrawPathObj: undefined
    }

    this.footerActionBar01_btn01_htmlElement = this.footerActionElements[0][0]
    this.footerActionBar01_btn02_htmlElement = this.footerActionElements[0][1]
    this.footerActionBar01_btn02b_htmlElement = this.footerActionElements[0][2]
    this.footerActionBar01_btn03_htmlElement = this.footerActionElements[0][3]
    this.footerActionBar01_btn04_htmlElement = this.footerActionElements[0][4]
    this.footerActionBar01_btn05_htmlElement = this.footerActionElements[0][5]

    this.footerActionBar01_btn01_htmlElement.addEventListener('click', this.test.bind(this))
    this.footerActionBar01_btn02_htmlElement.addEventListener('click', this.createCanvasDocument.bind(this))
    this.footerActionBar01_btn02b_htmlElement.addEventListener('click', this.createCanvasDocument_PRE_OOP.bind(this))
    this.footerActionBar01_btn03_htmlElement.addEventListener('click', this.increaseCanvasScale.bind(this))
    this.footerActionBar01_btn04_htmlElement.addEventListener('click', this.resetCanvasScale.bind(this))
    this.footerActionBar01_btn05_htmlElement.addEventListener('click', this.decreaseCanvasScale.bind(this))
}

Footer.prototype.test = function() {
    // EJS element has 'onclick' value set
    console.log("test")
}
Footer.prototype.createCanvasDocument = function() {
    console.log("1")
    let thisClass = this
    thisClass.iterateCounters()
    // let newCanvasDoc = new CanvasDocument(thisClass)
    let newCanvasDoc = new CanvasDocument(this.documentData, thisClass)
    thisClass.canvasClass_canvasDocuments.push(newCanvasDoc)
}
Footer.prototype.increaseCanvasScale = function() {
    console.log("2")
    this.canvasScale_Class.increaseCanvasScale()
}
Footer.prototype.resetCanvasScale = function() {
    console.log("3")
    this.canvasScale_Class.resetCanvasScale()
}
Footer.prototype.decreaseCanvasScale = function() {
    console.log("4")
    this.canvasScale_Class.decreaseCanvasScale()
}
Footer.prototype.createCanvasDocument_PRE_OOP = function() {
    console.log("5")
    let thisClass = this
    thisClass.iterateCounters()
    let newCanvasDoc = new CanvasDocument_PRE_OOP(thisClass)
    thisClass.canvasClass_canvasDocuments.push(newCanvasDoc)
}

Footer.prototype.iterateCounters = function(){
    this.vars.stringIncrement++
}

export {
    Footer
}






















// 1 cropped jacket
// - pinstriped
// 2 pants
// - pant in picture
// 1 shorts
// - not too tight
// - kinda like the runwayt pciture


// jakcet:
// not too m uch construction



// pants:


// smaples 
// double pleatd pants
// cropped blazed
// ()

// fabric ref avail for all


// fit model is very small
// 5'7
// 0-00


// adelina
// wears 4.5 inch heal 
// add an inch to that


// timeline:
// final samples end of the month


// nancy tunrs things around 1-2 days



// a.c.h.
// canada inc
// submit bill on friday or monday morning
// send invoices befor tuesday

