// import {describeComplexPath} from '../../DocumentSvg_functions/documentSvg_animations/animation_functions/svgElementCalculationsNEW.js'
import {calculateArcAndDescribePath, describeComplexPath} from '../../DocumentSvg_functions/documentSvg_animations/animation_functions/svgElementCalculationsNEW.js'

function PathData() {
    this.coords = {
        x: null,
        y: null
    }
    this.arc = {
        exist: false,
        radius: null,
        rotation: null,
        arcFlag: null,
        sweepFlag: null,
        side: undefined,
        center: {
            x: null,
            y: null
        },
        startAngle: null,
        joiner: null,
        joinerSide: undefined,
    }
    // this.svgElement_secondaryPath_descriptionAttr = undefined
    // this.svgElement_secondaryPath_descriptionAttr = undefined


    // this.svgElements = []
    // this.associatedDatas = [
    //     parallelPathDatas = {
    //         east: "poop",
    //         west: "crap",
    //         corners: {
    //         }
    //     }
    // ]

    this.childPathDatas = {
        childCount: -1,
        base: {
            west: null,
            east: null,
        },
        corner: null
    }
}

PathData.prototype.consoleLogTest = function() {
    console.log("OPD_TEST")
    console.log(this)
}

PathData.prototype.addChildPathDataBase = function(side, pathData) {
    this.childPathDatas[side] = pathData
    this.childPathDatas.childCount = this.childPathDatas.childCount + 1
}

PathData.prototype.addChildPathDataCorner = function(pathData) {
    this.childPathDatas.corner.push(pathData)
    this.childPathDatas.childCount = this.childPathDatas.childCount + 1
}

PathData.prototype.setCoordinateData = function(xCoord, yCoord) {
    this.coords.x = xCoord
    this.coords.y = yCoord
}

PathData.prototype.setAllData = function(data) {
    const { coords, arc } = data
    this.coords = { ...coords }
    this.arc = { ...arc }
}

PathData.prototype.initiateCurvePoint = function(side) {
    this.arc = {
        exist: true,
        radius: 0,
        rotation: 0,
        arcFlag: 0,
        sweepFlag: 0,
        side: side,
        center: {
            x: 0,
            y: 0
        },
        startAngle: 0,
        joiner: false,
        joinerSide: undefined,
    }
}

PathData.prototype.terminateCurvePoint = function() {
    this.arc = {
        exist: false,
        radius: "null",
        rotation: null,
        arcFlag: null,
        sweepFlag: null,
        side: undefined,
        center: {
            x: null,
            y: null
        },
        startAngle: null,
        joiner: null,
        joinerSide: undefined,
    }
}

// PathData.prototype.describeSvgAttribute_primaryPath = function () {
//     let svgElementAttr_d = calculateArcAndDescribePath()
//     this.
// }

// PathData.prototype.describeSvgAttribute_secondaryPath = function(prevPathData, thisPathData) {
//     let svgElementAttr_d = describeComplexPath([prevPathData, thisPathData])
//     this.svgElement_secondaryPath_descriptionAttr = svgElementAttr_d
//     return svgElementAttr_d
// }

// // Static Function: dont need to create new instance of Class to use
// EjsModelDataHandler.grabModuleActionElements = function(data, modelName) {
//     let actionElements = []
//     data[modelName].actions.forEach((container) => {
//         let actionContainers = []
//         container.forEach((actionElement) => {
//             actionContainers.push(actionElement.element)
//         })
//         actionElements.push(actionContainers)
//     })
//     return actionElements
// }







// FIXME: this might be in the wrong place, and might need cleaning up. I just removed it from a sep file
// Static Function: dont need to create new instance of Class to use
// function createParallelPathDatas(originalFigurePathDatas) {
PathData.createParallelPathDatas = function(originalFigurePathDatas) {
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

            let newPathData01 = new PathData()
            let newPathData02 = new PathData()
            newPathData01.setAllData(thisPlugItIn)
            newPathData02.setAllData(nextPlugItIn)
            parallelFigurePathDatas.push([newPathData01, newPathData02])

            originalFigurePathDatas[i + 1].addChildPathDataBase('west', newPathData01)
            originalFigurePathDatas[i + 1].addChildPathDataBase('east', newPathData02)
            originalFigurePathDatas[i + 1].consoleLogTest()
            // console.log([newPathData01, newPathData02])
        }


        let snapshot = [...parallelFigurePathDatas]
        console.log("hererere")
        console.log(snapshot)
        console.log(parallelFigurePathDatas)

        return parallelFigurePathDatas
}








export {
    PathData
}