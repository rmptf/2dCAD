// import {drawPathFunction} from '../../functions/drafting/drawPath.js'

// function Path(svgCount, figureCount, secondaryPaths) {
//     this.parentId = svgCount
//     this.id = figureCount
//     this.secondaryPaths = secondaryPaths
//     this.event = ""
//     this.drawPathObj = {
//         self: [],
//         m1: '',
//         isDown: false,
//         isDown2:false,
//         secondaryPathCount: 0
//     }
// }

// Path.prototype.printClass = function() {
//     console.log(this)
// }

// Path.prototype.setEvent = function(event) {
//     this.event = event
//     this.printClass()
// }

// Path.prototype.drawPathFunction123 = function() {
//     drawPathFunction(this)
// }

function CanvasDocument(name, name2) {
    // this.canvasDocumentHtmlElement = getCanvasDocumentHtmlElement()
    // this.svgElementsDataObject = ['place_holder']
    // this.canvasDocumentSvgActionsObject = ['place_holder']
    this.name = name
    this.name2 = name2
}

// CanvasDocument.prototype.getCanvasDocumentHtmlElement = function(element) {
//     console.log(this)
//     let htmlElement = element
//     return htmlElement
// }


export {
    // Path,
    CanvasDocument
}