import {CanvasDocument} from '../Classes/CanvasDocument/CanvasDocument_Class.js'

function Footer(canvasClass, footer, button) {
    this.topLevelParentClass = canvasClass
    this.footerElement = footer
    this.buttonClickEvent = button
    this.vars = {
        stringIncrement: -1,
        previousDrawPathObj: undefined
    }
}

Footer.prototype.iterateCounters = function(){
    this.vars.stringIncrement++
}

// old way, call from within the class
Footer.prototype.setClickEvents = function(element) {
    let thisClass = this
    element.onclick = function() {
        thisClass.iterateCounters()
        let newCanvasDoc = new CanvasDocument(thisClass.topLevelParentClass, thisClass.vars)
        newCanvasDoc.cloneAndAppendTemplate('aCanvasTemplate', 'aCanvasPanLayer')
        newCanvasDoc.setVars('aDocumentContainer', ['aDoc_btnCont01_btn01', 'aDoc_btnCont01_btn02', 'aDoc_btnCont01_btn03', 'aDoc_btnCont01_btn04'], ['aDoc_btnCont02_btn01'])
        newCanvasDoc.createDocSvg()
        newCanvasDoc.setElementParams('aDocument', 'Pattern_Pc_', 'aDocumentSvg', 'aDoc_btn_01_')
        newCanvasDoc.setActions()
        newCanvasDoc.setClickEvents()
        thisClass.topLevelParentClass.canvasDocuments.push(newCanvasDoc)
    }
}

// // new way, call from topLevel
// Footer.prototype.setClickEvents = function(element) {
//     let thisClass = this
//     element.onclick = function() {
//         thisClass.topLevelParentClass.createCanvDocClass
//     }
// }

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

