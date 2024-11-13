// Child class using "Inheritance"
import {PathData} from '../SvgData_Class.js'

function PathDataCorner() {
    this.endPointElement = null

    // Call the constructor of the parent class
    PathData.call(this)
    this.dataChangeChecker = "Changed_At_PDCorner"
}

// Inherit methods from the parent class
PathDataCorner.prototype = Object.create(PathData.prototype)
PathDataCorner.prototype.constructor = PathDataCorner

// // Override the createSvgPath method
// PathDataCorner.prototype.createSvgPath = function() {
// }

PathDataCorner.prototype.addChildPathDataCorner = function(pathData) {
    console.log('corner')
}

//FIXME: right here: about to add corners to parpathdata obj
PathDataCorner.createParallelPathDataCorner = function(parallelFigure, passedPathData, index) {
    let originalFigurePathDatas = parallelFigure.originalFigurePathDatas

    let pathData1 = new PathDataCorner()
    pathData1.setAllData(passedPathData[0])


    let pathData2 = new PathDataCorner()
    pathData2.setAllData(passedPathData[1])


    parallelFigure.parallelFigurePathDatas.splice(index, 0, [pathData1, pathData2])


    // TODO: RIght ehre - not correct order (have to fix later when using originalPathData to loop at draw parallel)
    // parallelFigure.parallelFigurePathDatas[index - 0][0].addChildPathDataCorner(pathData1)
    // parallelFigure.parallelFigurePathDatas[index - 0][1].addChildPathDataCorner(pathData2)
    originalFigurePathDatas[index].children.parallel_pathDatas.pathData_west.addChildPathDataCorner(pathData1)
    originalFigurePathDatas[index].children.parallel_pathDatas.pathData_west.addChildPathDataCorner(pathData2)
    
    // console.log("ioajsfoijsofisdjfois")
    // console.log(originalFigurePathDatas[index].children.parallel_pathDatas.pathData_west)
    // console.log(originalFigurePathDatas[index].children.parallel_pathDatas.pathData_east)

    return [pathData1, pathData2]
}

export {
    PathDataCorner
}