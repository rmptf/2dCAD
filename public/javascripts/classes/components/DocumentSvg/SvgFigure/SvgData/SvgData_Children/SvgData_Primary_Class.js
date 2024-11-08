// Child class using "Inheritance"
import {PathData} from '../SvgData_Class.js'

function PathDataPrimary() {
    this.children = {
        parallelPathDatas: {
            childCount: -1,
            base: {
                west: null,
                east: null,
            }
        }
    }

    // Call the constructor of the parent class
    PathData.call(this)
}

// Inherit methods from the parent class
PathDataPrimary.prototype = Object.create(PathData.prototype)
PathDataPrimary.prototype.constructor = PathDataPrimary

// // Override the createSvgPath method
// PathDataPrimary.prototype.createSvgPath = function() {
// }

PathDataPrimary.prototype.addChildPathDataBase = function(side, pathData) {
    this.children.parallelPathDatas[side] = pathData
    this.children.parallelPathDatas.childCount = this.children.parallelPathDatas.childCount + 1
}

export {
    PathDataPrimary
}