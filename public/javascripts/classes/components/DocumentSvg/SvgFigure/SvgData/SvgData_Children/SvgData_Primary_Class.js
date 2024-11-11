// Child class using "Inheritance"
import {PathData} from '../SvgData_Class.js'

function PathDataPrimary() {
    this.endPointElement = null

    this.children = {
        parallelPathDatas: {
            childCount: 0,
            base: {
                west: null,
                east: null,
            }
        }
    }

    this.childCount2 = 0
    this.children2 = {
        pathData_west: null,
        pathData_east: null,
    }

    // Call the constructor of the parent class
    PathData.call(this)
    console.log(this)
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