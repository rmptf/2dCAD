// Child class using "Inheritance"
import {PathData} from '../SvgData_Class.js'

function PathDataPrimary() {
    this.endPointElement = null

    this.children = {
        childCount: 0,
        parallel_pathDatas: {
            pathData_west: null,
            pathData_east: null,
        }
    }
    this.hide = false

    // Call the constructor of the parent class
    PathData.call(this)
    this.dataChangeChecker = "Changed_At_PDPrimary"
}

// Inherit methods from the parent class
PathDataPrimary.prototype = Object.create(PathData.prototype)
PathDataPrimary.prototype.constructor = PathDataPrimary

// // Override the createSvgPath method
// PathDataPrimary.prototype.createSvgPath = function() {
// }

PathDataPrimary.prototype.addChildPathDataBase = function(side, pathData) {
    this.children.parallel_pathDatas[side] = pathData
    this.children.childCount = this.children.childCount + 1
}

export {
    PathDataPrimary
}