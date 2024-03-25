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

    // Class Extenstions
    this.DocumentSvg = undefined

    // Class Builders
    this.runCreateSvgDocument()
    this.runCreateDocumentSvg()
}

CanvasDocument.prototype.runCreateSvgDocument = function() {
    createSvgDocument(this, this.drawPathObj)
}

CanvasDocument.prototype.runCreateDocumentSvg = function() {
    this.DocumentSvg = new DocumentSvg(this.svgDocumentD3Elements.documentSvgD3)
}



// CanvasDocument.prototype.runNewPath = function() {
//     let newPath = new SvgPath('path1', 'path2')
//     this.paths.push(newPath)
// }

// function CanvasDocument(name, name2, name3) {
//     // tests egs
//     this.name = name
//     this.name2 = name2
//     this.name3 = this.testFunction(name3)
//     this.paths = []
//     // tests egs

//     this.drawPathObj = {
//         // self: [], // refactoring this (will need to change all usecases... many)
//         m1: '',
//         isDown: false,
//         isDown2: false,
//         originalFigureCount: 0,
//         secondaryPathCount: 0,
//     }

//     this.documentSvgAndData = {
//         svgGroups: {
//             primary: undefined,
//             secondary: []
//         },
//         svgElements: {
//             svgGroups: {},
//             svgElements: {
//                 originalFigure: {
//                     paths: {},
//                     endPoints: {}
//                 },
//                 secondaryFigure: {
//                     paths: {}
//                 },
//                 parallelFigure: {}
//             }
//         },
//         data: {
//             originalFigure: [],
//             secondaryFigure: [],
//             parallelFigure: []
//         },
//     }

//     this.runCreateSvgDocument(this.drawPathObj)
// }

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