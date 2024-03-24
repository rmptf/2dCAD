import {SvgGroup} from './SvgGroup_Class.js'
import {SvgPath} from './SvgPath_Class.js'
import {createSvgDocument} from '../svgDocument.js'

function CanvasDocument(name, name2, name3) {
    // tests egs
    this.name = name
    this.name2 = name2
    this.name3 = this.testFunction(name3)
    this.paths = []
    // tests egs

    this.drawPathObj = undefined

    this.documentSvgAndData = undefined

    this.runCreateSvgDocument(this.drawPathObj)
}

CanvasDocument.prototype.testFunction = function(testVar) {
    return testVar
}

CanvasDocument.prototype.runCreateSvgDocument = function(drawPathObj) {
    createSvgDocument(this, drawPathObj)
}

CanvasDocument.prototype.runNewPath = function() {
    let newPath = new SvgPath('path1', 'path2')
    this.paths.push(newPath)
}

CanvasDocument.prototype.printClass = function() {
    console.log(this)
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