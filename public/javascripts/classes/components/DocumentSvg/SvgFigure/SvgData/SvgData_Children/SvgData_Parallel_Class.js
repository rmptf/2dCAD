// Child class using "Inheritance"
import {PathData} from '../SvgData_Class.js'

function PathDataParallel() {
    // Call the constructor of the parent class
    PathData.call()

    this.children = {
        parallelPathDatasCorners: {
            childCount: -1,
            corner: {
                corner_NAME: null,
            }
        }
    }
}

// Inherit methods from the parent class
PathDataParallel.prototype = Object.create(SvgPath.prototype)
PathDataParallel.prototype.constructor = PathDataParallel

// // Override the createSvgPath method
// PathDataParallel.prototype.createSvgPath = function() {
// }

PathDataParallel.prototype.addChildPathDataCorner = function(pathData) {
    this.children.parallelPathDatas.corner.push(pathData)
    this.children.parallelPathDatas.childCount = this.children.parallelPathDatas.childCount + 1
}

export {
    PathDataParallel
}