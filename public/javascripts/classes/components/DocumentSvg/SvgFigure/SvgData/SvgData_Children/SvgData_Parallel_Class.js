// Child class using "Inheritance"
import {PathData} from '../SvgData_Class.js'

function PathDataParallel() {
    this.children = {
        parallelPathDatasCorners: {
            childCount: -1,
            corner: {
                corner_NAME: null,
            }
        }
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
    this.children.parallelPathDatas.corner.push(pathData)
    this.children.parallelPathDatas.childCount = this.children.parallelPathDatas.childCount + 1
}


// FIXME: this might be in the wrong place, and might need cleaning up. I just removed it from a sep file
// Static Function: dont need to create new instance of Class to use
// function createParallelPathDatas(originalFigurePathDatas) {
PathDataParallel.createParallelPathDatas = function(originalFigurePathDatas) {
    let parallelFigurePathDatas = []

    for (let i = 0; i < originalFigurePathDatas.length - 1; i++) {
            // Retrieve coordinates for the current and next path data
            let thisOriginalFigurePathData = originalFigurePathDatas[i]
            let nextOriginalFigurePathData = originalFigurePathDatas[i + 1]
            let thisPlugItIn = {coords: { x: thisOriginalFigurePathData.coords.x, y: thisOriginalFigurePathData.coords.y }, arc: { ...thisOriginalFigurePathData.arc }}
            let nextPlugItIn = {coords: { x: nextOriginalFigurePathData.coords.x, y: nextOriginalFigurePathData.coords.y }, arc: { ...nextOriginalFigurePathData.arc }}

            // Assign correct direction to pathData
            // This currently works perfectly but its possible the originalFigure_data_pathData...'s arc.side is calculated incorrectly. (Might need to change this if I fix that)
            // It might be correct above because it calculates correctly. Maybe I forgot how west and east works, might need to figure that out and set the below accordingly
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

            originalFigurePathDatas[i + 1].addChildPathDataBase('west', newPathData01)
            originalFigurePathDatas[i + 1].addChildPathDataBase('east', newPathData02)
            originalFigurePathDatas[i + 1].consoleLogTest()
            // console.log([newPathData01, newPathData02])
        }


        // let snapshot = [...parallelFigurePathDatas]
        // console.log("hererere")
        // console.log(snapshot)
        // console.log(parallelFigurePathDatas)

        return parallelFigurePathDatas
}

//FIXME: right here: about to add corners to parpathdata obj
PathDataParallel.createParallelPathData = function(parallelFigure, passedPathData, index) {
    let pathData1 = new PathDataParallel()
    pathData1.setAllData(passedPathData[0])

    let pathData2 = new PathDataParallel()
    pathData2.setAllData(passedPathData[1])

    parallelFigure.parallelFigurePathDatas.splice(index, 0, [pathData1, pathData2])
}

export {
    PathDataParallel
}