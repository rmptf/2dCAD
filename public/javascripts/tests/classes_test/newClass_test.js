// class Path {
//     constructor(svgCount, figureCount, secondaryPaths) {
//         this.parentId = svgCount
//         this.id = figureCount
//         this.secondaryPaths = secondaryPaths
//         this.drawPathObj = {
//             self: [],
//             m1: '',
//             isDown: false,
//             isDown2:false,
//             secondaryPathCount: 0
//         }
//     }
// }

// var pathOne = new Path(0, 0, 69)
// console.log(pathOne)


import {drawPathFunction} from '../../functions/drafting/drawPath.js'

function Path(svgCount, figureCount, secondaryPaths) {
    this.parentId = svgCount
    this.id = figureCount
    this.secondaryPaths = secondaryPaths
    this.event = ""
    this.drawPathObj = {
        self: [],
        m1: '',
        isDown: false,
        isDown2:false,
        secondaryPathCount: 0
    }
}

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

export {
    Path
}