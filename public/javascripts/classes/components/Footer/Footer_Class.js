import {CanvasDocument} from '../CanvasDocument/CanvasDocument_Class.js'
import {CanvasDocument_PRE_OOP} from '../CanvasDocument/CanvasDocument_Class_PRE_OOP.js'
import {EjsModelDataHandler} from '../../utils/EjsModelDataHandler/EjsModelDataHandler_Class.js'
import {HotkeyManager} from '../../utils/actionsAndEvents/HotKeyManager/HotkeyManager_Class.js'

function Footer(canvasClass, scaleClass, canvasData, footerData, documentData) {
    this.documentTemplateContent = canvasData.A_CANVAS.elements.contentElementsData[2].element.content
    this.canvasDocumentClasses = canvasClass.canvasDocuments
    this.canvasScaleClass = canvasClass.canvScaleClass
    this.scaleObject = scaleClass.scaleObject
    this.panElement = canvasData.A_CANVAS.elements.contentElementsData[1].element
    this.footerElement = footerData.B_FOOTER.elements.elementData.element
    this.footerActionElements = EjsModelDataHandler.grabModuleActions(footerData, "B_FOOTER")
    this.documentData = documentData
    this.vars = {
        stringIncrement: -1,
        previousDrawPathObj: undefined
    }


    // let hotkeyManager = new HotkeyManager(this)
    // this.initializeHotkeys = function() {
    //     console.log('init_hotkeys_FOOTER')
    //     hotkeyManager.registerHotkey('Ctrl+n', this.newCanvDoc_NEW)
    //     hotkeyManager.registerHotkey('Ctrl+m', this.newCanvDoc_OLD)
    // }
    // this.newCanvDoc_NEW = () => {
    //     console.log("new_CANV_DOC_NEW")
    //     this.createCanvasDocument()
    // }
    // this.newCanvDoc_OLD = () => {
    //     console.log("new_CANV_DOC_OLD")
    //     this.createCanvasDocument_PRE_OOP()
    // }
    // this.initializeHotkeys()
    // this.cleanup = () => {hotkeyManager.cleanup()}
    // this.restore = () => {hotkeyManager.restore()}


    this.footerActionBar01_btn01_htmlElement = this.footerActionElements[0][0]
    this.footerActionBar02_btn01_htmlElement = this.footerActionElements[1][0]
    this.footerActionBar02_btn02_htmlElement = this.footerActionElements[1][1]
    this.footerActionBar03_btn01_htmlElement = this.footerActionElements[2][0]
    this.footerActionBar03_btn02_htmlElement = this.footerActionElements[2][1]
    this.footerActionBar03_btn03_htmlElement = this.footerActionElements[2][2]

    this.footerActionBar01_btn01_htmlElement.addEventListener('click', () => {this.test()})
    this.footerActionBar02_btn01_htmlElement.addEventListener('click', () => {this.createCanvasDocument()})
    this.footerActionBar02_btn02_htmlElement.addEventListener('click', () => {this.createCanvasDocument_PRE_OOP()})
    this.footerActionBar03_btn01_htmlElement.addEventListener('click', () => {this.increaseCanvasScale()})
    this.footerActionBar03_btn02_htmlElement.addEventListener('click', () => {this.resetCanvasScale()})
    this.footerActionBar03_btn03_htmlElement.addEventListener('click', () => {this.decreaseCanvasScale()})
}

Footer.prototype.test = function() {
    // EJS element has 'onclick' value set
    console.log("test")
}
Footer.prototype.createCanvasDocument = function() {
    console.log("2")
    this.iterateCounters()
    let newCanvasDoc = new CanvasDocument(this.documentData, this)
    this.canvasDocumentClasses.push(newCanvasDoc)
}
Footer.prototype.createCanvasDocument_PRE_OOP = function() {
    console.log("3")
    this.iterateCounters()
    let newCanvasDoc = new CanvasDocument_PRE_OOP(this.documentData, this)
    this.canvasDocumentClasses.push(newCanvasDoc)
}
Footer.prototype.increaseCanvasScale = function() {
    console.log("4")
    this.canvasScaleClass.increaseCanvasScale()
}
Footer.prototype.resetCanvasScale = function() {
    console.log("5")
    this.canvasScaleClass.resetCanvasScale()
}
Footer.prototype.decreaseCanvasScale = function() {
    console.log("6")
    this.canvasScaleClass.decreaseCanvasScale()
}
Footer.prototype.iterateCounters = function(){
    this.vars.stringIncrement++
}

export {
    Footer
}



// // Component function that uses HotkeyManager
// function Component() {
//     const hotkeyManager = new HotkeyManager();

//     this.initializeHotkeys = function() {
//         hotkeyManager.registerHotkey('Ctrl', this.save);
//         // hotkeyManager.registerHotkey('Ctrl+S', this.save);
//         hotkeyManager.registerHotkey('Ctrl+P', this.print);
//     };

//     this.save = function() {
//         console.log('Saving document...');
//     };

//     this.print = function() {
//         console.log('Printing document...');
//     };

//     this.initializeHotkeys();

//     this.cleanup = function() {
//         hotkeyManager.cleanup();
//     };
// }

// // Example usage
// const component = new Component();

// // // Simulate Ctrl+S and Ctrl+P keypresses
// // document.dispatchEvent(new KeyboardEvent('keydown', { key: 'S', ctrlKey: true }));  // Should log 'Saving document...'
// // document.dispatchEvent(new KeyboardEvent('keydown', { key: 'P', ctrlKey: true }));  // Should log 'Printing document...'

// // Cleanup when finished
// component.cleanup();







// OLD EJS WAY
// function Footer(canvasElement, canvasDocument, scaleClass, panClass, footerElement, actionButtons) {
//     this.DOCUMENT_TEMPLATE_ID = 'aCanvasTemplate'
//     this.DOCUMENT_CONTAINER_ID = 'aDocumentContainer'
//     this.canvasClass_canvasElement = canvasElement
//     this.documentTemplate = document.getElementById(this.DOCUMENT_TEMPLATE_ID).content
//     this.canvasDocumentClasses = canvasDocument
//     this.canvasScaleClass = scaleClass
//     this.scaleObject = scaleClass.scaleObject
//     this.panElement = panClass.canvasPanElement
//     this.footerElement = footerElement
//     this.documentData = "fillerData" // filler data

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

