import {CanvasDocument} from '../CanvasDocument/CanvasDocument_Class.js'
import {CanvasDocument_PRE_REORG} from '../CanvasDocument/CanvasDocument_Class_PRE_REORG.js'
import {CanvasDocument_PRE_OOP} from '../CanvasDocument/CanvasDocument_Class_PRE_OOP.js'
import {EjsModelDataHandler} from '../../utils/EjsModelDataHandler/EjsModelDataHandler_Class.js'
import {HotkeyManager} from '../../utils/actionsAndEvents/HotKeyManager/HotkeyManager_Class.js'

function Footer(canvasClass, scaleClass, canvasData, footerData, documentData) {
    this.documentTemplateContent = canvasData.A_CANVAS.elements.contentElementsData[2].element.content
    this.canvasDocumentClasses = canvasClass.canvasADocuments
    this.canvasScaleClass = canvasClass.canvScaleClass
    this.scaleObject = scaleClass.scaleObject
    this.panElement = canvasData.A_CANVAS.elements.contentElementsData[1].element
    this.footerElement = footerData.B_FOOTER.elements.elementData.element
    this.footerActionElements = EjsModelDataHandler.grabModuleActionElements(footerData, "B_FOOTER")
    this.documentData = documentData
    this.vars = {
        stringIncrement: -1,
        previousDrawPathObj: undefined
    }

    this.hotkeyManager = new HotkeyManager(this)
    this.hotkeyManager.registerHotkey('Ctrl+;', () => this.newCanvDoc_NEW(this))
    this.hotkeyManager.registerHotkey("Ctrl+'", () => this.newCanvDoc_PRE_REORG(this))
    this.hotkeyManager.registerHotkey("Ctrl+Enter", () => this.newCanvDoc_OLD(this))

    this.footerActionBar01_btn01_htmlElement = this.footerActionElements[0][0]
    this.footerActionBar02_btn01_htmlElement = this.footerActionElements[1][0]
    this.footerActionBar02_btn02_htmlElement = this.footerActionElements[1][1]
    this.footerActionBar02_btn03_htmlElement = this.footerActionElements[1][2]
    this.footerActionBar03_btn01_htmlElement = this.footerActionElements[2][0]
    this.footerActionBar03_btn02_htmlElement = this.footerActionElements[2][1]
    this.footerActionBar03_btn03_htmlElement = this.footerActionElements[2][2]

    this.footerActionBar01_btn01_htmlElement.addEventListener('click', () => {this.test()})
    this.footerActionBar02_btn01_htmlElement.addEventListener('click', () => {this.createCanvasDocument()})
    this.footerActionBar02_btn02_htmlElement.addEventListener('click', () => {this.createCanvasDocument_PRE_REORG()})
    this.footerActionBar02_btn03_htmlElement.addEventListener('click', () => {this.createCanvasDocument_PRE_OOP()})
    this.footerActionBar03_btn01_htmlElement.addEventListener('click', () => {this.increaseCanvasScale()})
    this.footerActionBar03_btn02_htmlElement.addEventListener('click', () => {this.resetCanvasScale()})
    this.footerActionBar03_btn03_htmlElement.addEventListener('click', () => {this.decreaseCanvasScale()})

    // canvasClass.newReferenceLayer() //FIXME: Trying to get this to work first.
}

// HOTKEY ACTIONS
Footer.prototype.newCanvDoc_NEW = function() {
    console.log("new_CANV_DOC_NEW")
    this.createCanvasDocument()
}
Footer.prototype.newCanvDoc_PRE_REORG = function() {
    console.log("new_CANV_DOC_PRE_REORG")
    this.createCanvasDocument_PRE_REORG()
}
Footer.prototype.newCanvDoc_OLD = function() {
    console.log("new_CANV_DOC_OLD")
    this.createCanvasDocument_PRE_OOP()
}
// HOTKEY ACTIONS

// BTN ACTIONS
Footer.prototype.createCanvasDocument = function() {
    // console.log("3")
    console.log("NEW_WAY")
    this.iterateCounters()
    let newCanvasDoc = new CanvasDocument(this.documentData, this)
    this.canvasDocumentClasses.push(newCanvasDoc)
}
Footer.prototype.createCanvasDocument_PRE_REORG = function() {
    // console.log("2")
    console.log("PRE_REORG")
    this.iterateCounters()
    let newCanvasDoc = new CanvasDocument_PRE_REORG(this.documentData, this)
    this.canvasDocumentClasses.push(newCanvasDoc)
}
Footer.prototype.createCanvasDocument_PRE_OOP = function() {
    // console.log("3")
    console.log("PRE_OOP")
    this.iterateCounters()
    let newCanvasDoc = new CanvasDocument_PRE_OOP(this.documentData, this)
    this.canvasDocumentClasses.push(newCanvasDoc)
}
Footer.prototype.increaseCanvasScale = function() {
    // console.log("4")
    this.canvasScaleClass.increaseCanvasScale()
}
Footer.prototype.resetCanvasScale = function() {
    // console.log("5")
    this.canvasScaleClass.resetCanvasScale()
}
Footer.prototype.decreaseCanvasScale = function() {
    // console.log("6")
    this.canvasScaleClass.decreaseCanvasScale()
}
// BTN ACTIONS

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

