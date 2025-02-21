// Child class using "Inheritance"
import {PathData} from '../SvgData_Class.js'

function PathDataParallel() {
    this.endPointElement = null

    this.children = {
        childCount: 0,
        corner_pathDatas: []
    }

    this.cornerPath_REF = null
    this.cornerShape = "basisCorner" //TODO: will set on build not here

    this.largeArcFlagSetter = null

    // Call the constructor of the parent class
    PathData.call(this)
    this.dataChangeChecker = "Changed_At_PDParallel"
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

// PathDataParallel.prototype.removeChildCornerPath = function() {
//     this.children.corner_pathDatas[1].cornerPath_REF.remove()
//     // this.children.corner_pathDatas[1].cornerPath_REF.shift()
//     let referenceElement = this.children.corner_pathDatas[1].cornerPath_REF
//     return referenceElement
// }

// PathDataParallel.prototype.removeChildCornerPathData = function() {
//     this.children.corner_pathDatas[0].endPointElement.remove() //TODO: Maybe do here maybe not, currently at removePointsandPaths
//     this.children.corner_pathDatas.shift()
//     this.children.childCount = this.children.childCount - 1
//     let referenceElement = this.children.corner_pathDatas[0].endPointElement
//     return referenceElement
// }




// This will be for future use: will sort thrugh which type of corner is drawn on figure
PathDataParallel.prototype.removeChildCornerElements = function() {
    let referenceElements = null
    switch(true) {
        case this.cornerShape === "basisCorner":
            referenceElements = this.removeBasisCornerElements()
            break;
        case this.cornerShape === "FakeCornerShape":
            console.log("This will never run, no 'FakeCornerShape'")
            break;
        default:
            console.log("NO_SHAPE")
        }
        return referenceElements
}

// PathDataParallel.prototype.removeChildCornerPath = function() {
//     let referenceElement_Path = this.children.corner_pathDatas[1].cornerPath_REF
//     this.children.corner_pathDatas[1].cornerPath_REF.remove()
//     // this.children.corner_pathDatas[1].cornerPath_REF = null
//     return referenceElement_Path
// }

// This is for future use too: each type of corner will be removed in its own way
PathDataParallel.prototype.removeBasisCornerElements = function() {
    let referenceElement_Path = this.children.corner_pathDatas[1].cornerPath_REF
    this.children.corner_pathDatas[1].cornerPath_REF.remove()
    // this.children.corner_pathDatas[1].cornerPath_REF.shift()

    let referenceElement_PathData = this.children.corner_pathDatas[0].endPointElement
    // let referenceElement_PathData_02 = this.children.corner_pathDatas[1].endPointElement
    this.children.corner_pathDatas[1].endPointElement.remove()
    this.children.corner_pathDatas[0].endPointElement.remove()
    this.children.corner_pathDatas.shift()
    this.children.corner_pathDatas.shift()
    this.children.childCount = this.children.childCount - 2
    // this.children.childCount = this.children.childCount - 1

    return [referenceElement_Path, referenceElement_PathData]
    // return referenceElement_PathData_01
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