import {DocumentSvg} from './DocumentSvg_Class.js'
import {SvgGroup} from './SvgGroup_Class.js'
import {SvgPath} from './SvgPath_Class.js'
import {createSvgDocument} from '../svgDocument.js'

function CanvasDocument() {
    // Class Elements
    this.drawPathObj = {
        self: [], // moving
        m1: '',
        isDown: false,
        isDown2: false,
        originalFigureCount: 0,
        secondaryPathCount: 0,
    }
    this.svgDocumentD3Elements = {
        documentSvgD3: undefined
    }
    this.documentSvg = new DocumentSvg(this.svgDocumentD3Elements.documentSvgD3)

    this.runCreateSvgDocument()
}

CanvasDocument.prototype.runCreateSvgDocument = function() {
    createSvgDocument(this, this.drawPathObj)
}

export {
    CanvasDocument
}
































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