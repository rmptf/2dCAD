import {findLineMidpoint, getDistance, isGreaterThan} from "../../../../../../functions/math/mathFunctions.js"
import {ReferenceFigure} from "../../ReferenceFigure/ReferenceFigure_Class.js"

function LargeArcFlagSetter(parallelFigure) {
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.originalFigurePathDatas_plusFillers = parallelFigure.originalFigurePathDatas_plusFillers
    // this.parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    this.parallelFigureObj = parallelFigure.parallelFigureObject
    //old
    // this.index = null
    this.iterationCounter = 0
    this.startSide = null
    let svgFigure = parallelFigure.svgFigure

    // Add ReferenceFigures
    this.referenceFigure_01 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_01.addCircle({palette: 4, circRad: 10, fillClr: 2}, 1)
    this.referenceFigure_01.addCircle({palette: 4, circRad: 10, fillClr: 2}, 2)
    this.referenceFigure_01.addLine({palette: 4, strkWdth: 1, strkClr: 2, dshArray: 5})

    this.referenceFigure_02 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_02.addCircle({palette: 4, circRad: 5, fillClr: 3}, 1)
    this.referenceFigure_02.addCircle({palette: 4, circRad: 5, fillClr: 3}, 2)
    this.referenceFigure_02.addLine({palette: 4, strkWdth: 1, strkClr: 3, dshArray: 5})

    this.referenceFigure_03 = new ReferenceFigure(svgFigure, false) // not working rn
    this.referenceFigure_03.addPath({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 2}, 1)
    this.referenceFigure_03.addPath({palette: 2, strkWdth: 2, strkClr: 2, dshArray: 5}, 2)
    this.referenceFigure_03.addPath({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 5}, 3)
    this.referenceFigure_03.addPath({palette: 2, strkWdth: 5, strkClr: 2, dshArray: 'none'}, 4)


    // NEW FLIP FLAP SHIT
    this.referenceFigure_01_A = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_01_A.addCircle({palette: 1, circRad: 3, fillClr: 4}, 1)

    this.referenceFigure_02_A = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_02_A.addCircle({palette: 1, circRad: 15, fillClr: 2}, 1)

    this.referenceFigure_03_A = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_03_A.addLine({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 5})

    this.referenceFigure_04_A = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_04_A.addCircle({palette: 1, circRad: 15, fillClr: 4}, 1)
}


LargeArcFlagSetter.prototype.setLargeArcFlag = function(indexModifier, runOrNot, index) {
    console.log("ARCFLAG_FLIPPER_RUNNING__________")
    let modifiedIndex = index + indexModifier

    let parallelEndPoint_start = this.originalFigurePathDatas[modifiedIndex].children.parallel_pathDatas.pathData_west
    let parallelEndPoint_end = this.originalFigurePathDatas[modifiedIndex + 1].children.parallel_pathDatas.pathData_east
    let midPointBetweenEndPoints = findLineMidpoint(parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y, parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y)

    this.referenceFigure_01.runFunctions([[parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y], [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y]])
    this.referenceFigure_02.runFunctions([midPointBetweenEndPoints, [parallelEndPoint_end.arc.center.x, parallelEndPoint_end.arc.center.y]])
    this.referenceFigure_03.runFunctions([[parallelEndPoint_start, parallelEndPoint_end]])

    if(runOrNot === true) {
        let crossedSides = setArcCenterAxisLine(parallelEndPoint_start, parallelEndPoint_end, midPointBetweenEndPoints, [parallelEndPoint_end.arc.center.x, parallelEndPoint_end.arc.center.y], this)
        if(this.iterationCounter === 0) {
            this.startSide = crossedSides
        }
        if(crossedSides !== this.startSide) {
            flipFlagAndFunction(parallelEndPoint_end)
            this.startSide = crossedSides
        } 
    }

    function flipFlagAndFunction(targetEndPoint) {
        targetEndPoint.arc.arcFlag = +!targetEndPoint.arc.arcFlag
    }

    if(this.iterationCounter < 10) {
        this.iterationCounter = this.iterationCounter + 1
    }
}

function setArcCenterAxisLine(arcBaseStart, arcBaseFinish, arcBaseMidPoint, circleCenter, thisFigure) {
    // Existing line coordinates
    const x1 = arcBaseStart.coords.x
    const y1 = arcBaseStart.coords.y
    const x2 = arcBaseFinish.coords.x
    const y2 = arcBaseFinish.coords.y

    // New point the parallel line should pass through
    const px = circleCenter[0], py = circleCenter[1]

    // Calculate the shift vector
    const dx = x2 - x1 // Difference in x
    const dy = y2 - y1 // Difference in y

    // New line's points by translating the original points
    // const arcCenterAxisStart = [px, py]
    // const arcCenterAxisFinish = [(px + dx), (py + dy)]
    //TODO: Should i try to change the length of the line to have a minumul or be logner in general?
    const arcCenterAxisStart = [(px - (dx/2)), (py - (dy/2))]
    const arcCenterAxisFinish = [(px + (dx/2)), (py + (dy/2))]

    thisFigure.referenceFigure_01_A.runFunctions([arcBaseMidPoint])
    thisFigure.referenceFigure_02_A.runFunctions([circleCenter])
    thisFigure.referenceFigure_03_A.runFunctions([arcCenterAxisStart, arcCenterAxisFinish])
    thisFigure.referenceFigure_04_A.runFunctions([arcBaseMidPoint])

    return checkWhenPointHasCrossedAxis(arcCenterAxisStart, arcCenterAxisFinish, arcBaseMidPoint, thisFigure)
}

function checkWhenPointHasCrossedAxis(axisStartCoords, axisFinishCoords, pointCoords, thisFigure) {
        // Vector from start to end of the path
        const pathVectorX = axisFinishCoords[0] - axisStartCoords[0]
        const pathVectorY = axisFinishCoords[1] - axisStartCoords[1]
      
        // Vector from start of path to the point
        const pointVectorX = pointCoords[0] - axisStartCoords[0]
        const pointVectorY = pointCoords[1] - axisStartCoords[1]

         // Compute the cross product
         const crossProduct = pathVectorX * pointVectorY - pathVectorY * pointVectorX;

         // Return the side based on the cross product
        if (crossProduct > 0) {
            thisFigure.referenceFigure_04_A.changeCircleColor(4,1)
            console.log("NO_CROSSED_AXIS______")
            return true
        } else if (crossProduct < 0) {
            thisFigure.referenceFigure_04_A.changeCircleColor(1,4)
            console.log("CROSS_AXIS______")
            console.log(thisFigure.index)
            return false
        } else {
            // return "ONPATH_______.";
        }
}


export {
    LargeArcFlagSetter
}



