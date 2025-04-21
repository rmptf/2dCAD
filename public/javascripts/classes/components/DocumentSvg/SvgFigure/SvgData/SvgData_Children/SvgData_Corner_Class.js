// Child class using "Inheritance"
import {PathData} from '../SvgData_Class.js'

function PathDataCorner() {
    this.endPointElement = null

    // Call the constructor of the parent class
    PathData.call(this)
    this.arc.hidden = false
    this.dataChangeChecker = "Changed_At_PDCorner"
    this.interSectionSorter = "empty"
}

// Inherit methods from the parent class
PathDataCorner.prototype = Object.create(PathData.prototype)
PathDataCorner.prototype.constructor = PathDataCorner

// // Override the createSvgPath method
// PathDataCorner.prototype.createSvgPath = function() {
// }

PathDataCorner.createParallelPathDataCorner = function(parallelFigure, passedPathData, index) {
    let originalFigurePathDatas = parallelFigure.originalFigurePathDatas

    let pathData1 = new PathDataCorner()
    pathData1.setAllData(passedPathData[0])

    let pathData2 = new PathDataCorner()
    pathData2.setAllData(passedPathData[1])

    parallelFigure.parallelFigurePathDatas.splice(index, 0, [pathData1, pathData2])

    originalFigurePathDatas[index].children.parallel_pathDatas.pathData_west.addChildPathDataCorner(pathData1)
    originalFigurePathDatas[index].children.parallel_pathDatas.pathData_west.addChildPathDataCorner(pathData2)

    return [pathData1, pathData2]
}

export {
    PathDataCorner
}