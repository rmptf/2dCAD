// Child class using "Inheritance"
import {PathData} from '../SvgData_Class.js'

function PathDataParallel() {
    this.endPointElement = null

    this.children = {
        childCount: 0,
        corner_pathDatas: []
    }

    // Call the constructor of the parent class
    PathData.call(this)
}

// Inherit methods from the parent class
PathDataParallel.prototype = Object.create(PathData.prototype)
PathDataParallel.prototype.constructor = PathDataParallel

// // Override the createSvgPath method
// PathDataParallel.prototype.createSvgPath = function() {
// }

PathDataParallel.prototype.addChildPathDataCorner = function(pathData) {
    this.children.corner_pathDatas.push(pathData)
    this.children.childCount = this.children.childCount + 1
}

PathDataParallel.prototype.removeChildPathDataCorner = function() {
    // console.log("ASSSSER")
    // console.log(this.children.corner_pathDatas[0].endPointElement)
    let objectToRemove = this.children.corner_pathDatas[0]
    this.children.corner_pathDatas[0].endPointElement.remove()
    this.children.corner_pathDatas.shift()
    this.children.childCount = this.children.childCount - 1
    
    return objectToRemove
}

PathDataParallel.prototype.removeChildPathDataCorners = function() {
    console.log(this)
    this.children.corner_pathDatas.splice(0, 2)
    this.children.childCount = this.children.childCount - 2
}

// Static Function: dont need to create new instance of Class to use
PathDataParallel.createParallelPathDatas = function(originalFigurePathDatas) {
    let parallelFigurePathDatas = []

    for (let i = 0; i < originalFigurePathDatas.length - 1; i++) {
            // Retrieve coordinates for the current and next path data
            let thisOriginalFigurePathData = originalFigurePathDatas[i]
            let nextOriginalFigurePathData = originalFigurePathDatas[i + 1]
            let thisPlugItIn = {coords: { x: thisOriginalFigurePathData.coords.x, y: thisOriginalFigurePathData.coords.y }, arc: { ...thisOriginalFigurePathData.arc }}
            let nextPlugItIn = {coords: { x: nextOriginalFigurePathData.coords.x, y: nextOriginalFigurePathData.coords.y }, arc: { ...nextOriginalFigurePathData.arc }}

            // Assign correct direction to pathData
            if (!thisOriginalFigurePathData.arc.exist) {
                if (nextOriginalFigurePathData.arc.exist) {
                    nextPlugItIn.arc.side = "west";
                    thisPlugItIn.arc = { ...nextPlugItIn.arc }
                    nextPlugItIn.arc.side = "east";
                }
            } else {
                if (!nextOriginalFigurePathData.arc.exist) {
                    thisPlugItIn.arc = { ...nextPlugItIn.arc }
                } else {
                    thisPlugItIn.arc.side = "west";
                    nextPlugItIn.arc.side = "east";
                }
            }

            let newPathData01 = new PathDataParallel()
            let newPathData02 = new PathDataParallel()
            newPathData01.setAllData(thisPlugItIn)
            newPathData02.setAllData(nextPlugItIn)
            parallelFigurePathDatas.push([newPathData01, newPathData02])

            originalFigurePathDatas[i].addChildPathDataBase('pathData_west', newPathData01)
            originalFigurePathDatas[i + 1].addChildPathDataBase('pathData_east', newPathData02)

            // originalFigurePathDatas[i + 1].consoleLogTest()
            // console.log([newPathData01, newPathData02])
        }

        return parallelFigurePathDatas
}

export {
    PathDataParallel
}