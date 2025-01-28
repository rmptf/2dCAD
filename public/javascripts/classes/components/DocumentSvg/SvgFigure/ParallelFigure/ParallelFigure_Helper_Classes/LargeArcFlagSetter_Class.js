import {findLineMidpoint, getDistance, isGreaterThan} from "../../../../../../functions/math/mathFunctions.js"
import {ReferenceFigure} from "../../ReferenceFigure/ReferenceFigure_Class.js"

function LargeArcFlagSetter(parallelFigure) {
// function LargeArcFlagSetter(parallelFigure, index) {
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
    this.referenceFigure_01 = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_01.addCircle({palette: 4, circRad: 10, fillClr: 2}, 1)
    this.referenceFigure_01.addCircle({palette: 4, circRad: 10, fillClr: 2}, 2)
    this.referenceFigure_01.addLine({palette: 4, strkWdth: 1, strkClr: 2, dshArray: 5})

    this.referenceFigure_02 = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_02.addCircle({palette: 4, circRad: 5, fillClr: 3}, 1)
    this.referenceFigure_02.addCircle({palette: 4, circRad: 5, fillClr: 3}, 2)
    this.referenceFigure_02.addLine({palette: 4, strkWdth: 1, strkClr: 3, dshArray: 5})

    this.referenceFigure_03 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_03.addPath({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 2}, 1)
    this.referenceFigure_03.addPath({palette: 2, strkWdth: 2, strkClr: 2, dshArray: 5}, 2)
    this.referenceFigure_03.addPath({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 5}, 3)
    this.referenceFigure_03.addPath({palette: 2, strkWdth: 5, strkClr: 2, dshArray: 'none'}, 4)


    // this.referenceFigure_04 = new ReferenceFigure(svgFigure, false)
    // this.referenceFigure_04.addCircle({palette: 3, circRad: 10, fillClr: 2}, 1)
    // this.referenceFigure_04.addCircle({palette: 3, circRad: 10, fillClr: 2}, 2)
    // this.referenceFigure_04.addLine({palette: 3, strkWdth: 1, strkClr: 2, dshArray: 5})

    // this.referenceFigure_05 = new ReferenceFigure(svgFigure, false)
    // this.referenceFigure_05.addCircle({palette: 3, circRad: 5, fillClr: 3}, 1)
    // this.referenceFigure_05.addCircle({palette: 3, circRad: 5, fillClr: 3}, 2)
    // this.referenceFigure_05.addLine({palette: 3, strkWdth: 1, strkClr: 3, dshArray: 5})

    // this.referenceFigure_06 = new ReferenceFigure(svgFigure, false)
    // this.referenceFigure_06.addPath({palette: 3, strkWdth: 1, strkClr: 3, dshArray: 2}, 1)
    // this.referenceFigure_06.addPath({palette: 4, strkWdth: 2, strkClr: 2, dshArray: 5}, 2)
    // this.referenceFigure_06.addPath({palette: 3, strkWdth: 1, strkClr: 3, dshArray: 5}, 3)
    // this.referenceFigure_06.addPath({palette: 4, strkWdth: 5, strkClr: 2, dshArray: 'none'}, 4)


    // NEW FLIP FLAP SHIT
    this.referenceFigure_01_A = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_01_A.addCircle({palette: 1, circRad: 3, fillClr: 4}, 1)

    this.referenceFigure_02_A = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_02_A.addCircle({palette: 1, circRad: 15, fillClr: 2}, 1)

    this.referenceFigure_03_A = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_03_A.addLine({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 5})

    this.referenceFigure_04_A = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_04_A.addCircle({palette: 1, circRad: 15, fillClr: 4}, 1)

    // // // NEW FLIP FLAP SHIT
    // this.referenceFigure_01_B = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_01_B.addCircle({palette: 2, circRad: 3, fillClr: 4}, 1)

    // this.referenceFigure_02_B = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_02_B.addCircle({palette: 2, circRad: 15, fillClr: 2}, 1)

    // this.referenceFigure_03_B = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_03_B.addLine({palette: 2, strkWdth: 1, strkClr: 3, dshArray: 5})

    // this.referenceFigure_04_B = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_04_B.addCircle({palette: 2, circRad: 15, fillClr: 4}, 1)

    // // NEW FLIP FLAP SHIT
    // this.referenceFigure_01_C = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_01_C.addCircle({palette: 3, circRad: 3, fillClr: 4}, 1)

    // this.referenceFigure_02_C = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_02_C.addCircle({palette: 3, circRad: 15, fillClr: 2}, 1)

    // this.referenceFigure_03_C = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_03_C.addLine({palette: 3, strkWdth: 1, strkClr: 3, dshArray: 5})

    // this.referenceFigure_04_C = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_04_C.addCircle({palette: 3, circRad: 15, fillClr: 4}, 1)

    // // NEW FLIP FLAP SHIT
    // this.referenceFigure_01_D = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_01_D.addCircle({palette: 4, circRad: 3, fillClr: 4}, 1)

    // this.referenceFigure_02_D = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_02_D.addCircle({palette: 4, circRad: 15, fillClr: 2}, 1)

    // this.referenceFigure_03_D = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_03_D.addLine({palette: 4, strkWdth: 1, strkClr: 3, dshArray: 5})

    // this.referenceFigure_04_D = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_04_D.addCircle({palette: 4, circRad: 15, fillClr: 4}, 1)
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
        // let crossedPoints = hasPathFlippedDirection()
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

function hasPathFlippedDirection(prevStart, prevEnd, currStart, currEnd) {
    // Vectors for the two segments
    const prevVectorX = prevEnd.x - prevStart.x;
    const prevVectorY = prevEnd.y - prevStart.y;
    const currVectorX = currEnd.x - currStart.x;
    const currVectorY = currEnd.y - currStart.y;
  
    // Compute the cross product of the two vectors
    const crossProduct = prevVectorX * currVectorY - prevVectorY * currVectorX;
  
    // Return the sign of the cross product
    return crossProduct;
  }
  
  // Helper function to detect if there's a sign flip
  function detectSignFlip(crossProduct1, crossProduct2) {
    return (crossProduct1 > 0 && crossProduct2 < 0) || (crossProduct1 < 0 && crossProduct2 > 0);
  }


// function setArcCenterAxisLine(arcBaseStart, arcBaseFinish, arcBaseMidPoint, circleCenter, thisFigure) {
//     // Existing line coordinates
//     const x1 = arcBaseStart.coords.x
//     const y1 = arcBaseStart.coords.y
//     const x2 = arcBaseFinish.coords.x
//     const y2 = arcBaseFinish.coords.y

//     // New point the parallel line should pass through
//     const px = circleCenter[0], py = circleCenter[1]

//     // Calculate the shift vector
//     const dx = x2 - x1 // Difference in x
//     const dy = y2 - y1 // Difference in y

//     // New line's points by translating the original points
//     // const arcCenterAxisStart = [px, py]
//     // const arcCenterAxisFinish = [(px + dx), (py + dy)]
//     const arcCenterAxisStart = [(px - (dx/2)), (py - (dy/2))]
//     const arcCenterAxisFinish = [(px + (dx/2)), (py + (dy/2))]

//     // if(thisFigure.index === 0) {
//         thisFigure.referenceFigure_01_A.runFunctions([arcBaseMidPoint])
//         thisFigure.referenceFigure_02_A.runFunctions([circleCenter])
//         thisFigure.referenceFigure_03_A.runFunctions([arcCenterAxisStart, arcCenterAxisFinish])
//         thisFigure.referenceFigure_04_A.runFunctions([arcBaseMidPoint])
//     // }
//     // if(thisFigure.index === 1) {
//     //     thisFigure.referenceFigure_01_B.runFunctions([arcBaseMidPoint])
//     //     thisFigure.referenceFigure_02_B.runFunctions([circleCenter])
//     //     thisFigure.referenceFigure_03_B.runFunctions([arcCenterAxisStart, arcCenterAxisFinish])
//     //     thisFigure.referenceFigure_04_B.runFunctions([arcBaseMidPoint])
//     // }
//     // if(thisFigure.index === 2) {
//     //     thisFigure.referenceFigure_01_C.runFunctions([arcBaseMidPoint])
//     //     thisFigure.referenceFigure_02_C.runFunctions([circleCenter])
//     //     thisFigure.referenceFigure_03_C.runFunctions([arcCenterAxisStart, arcCenterAxisFinish])
//     //     thisFigure.referenceFigure_04_C.runFunctions([arcBaseMidPoint])
//     // }
//     // if(thisFigure.index === 3) {
//     //     thisFigure.referenceFigure_01_D.runFunctions([arcBaseMidPoint])
//     //     thisFigure.referenceFigure_02_D.runFunctions([circleCenter])
//     //     thisFigure.referenceFigure_03_D.runFunctions([arcCenterAxisStart, arcCenterAxisFinish])
//     //     thisFigure.referenceFigure_04_D.runFunctions([arcBaseMidPoint])
//     // }

//     return checkWhenPointHasCrossedAxis(arcCenterAxisStart, arcCenterAxisFinish, arcBaseMidPoint, thisFigure)
// }

// function checkWhenPointHasCrossedAxis(axisStartCoords, axisFinishCoords, pointCoords, thisFigure) {
//         // Vector from start to end of the path
//         const pathVectorX = axisFinishCoords[0] - axisStartCoords[0]
//         const pathVectorY = axisFinishCoords[1] - axisStartCoords[1]
      
//         // Vector from start of path to the point
//         const pointVectorX = pointCoords[0] - axisStartCoords[0]
//         const pointVectorY = pointCoords[1] - axisStartCoords[1]

//          // Compute the cross product
//          const crossProduct = pathVectorX * pointVectorY - pathVectorY * pointVectorX;

//          // Return the side based on the cross product
//         if (crossProduct > 0) {
//             // if(thisFigure.index === 0) {
//                 thisFigure.referenceFigure_04_A.changeCircleColor(4,1)
//             // }
//             // if(thisFigure.index === 1) {
//             //     thisFigure.referenceFigure_04_B.changeCircleColor(4,1)
//             // }
//             // if(thisFigure.index === 2) {
//             //     thisFigure.referenceFigure_04_C.changeCircleColor(4,1)
//             // }
//             // if(thisFigure.index === 3) {
//             //     thisFigure.referenceFigure_04_D.changeCircleColor(4,1)
//             // }
//             console.log("NO_CROSSED_AXIS______")
//             return true
//         } else if (crossProduct < 0) {
//             // if(thisFigure.index === 0) {
//                 thisFigure.referenceFigure_04_A.changeCircleColor(1,4)
//             // }
//             // if(thisFigure.index === 1) {
//             //     thisFigure.referenceFigure_04_B.changeCircleColor(1,4)
//             // }
//             // if(thisFigure.index === 2) {
//             //     thisFigure.referenceFigure_04_C.changeCircleColor(1,4)
//             // }
//             // if(thisFigure.index === 3) {
//             //     thisFigure.referenceFigure_04_D.changeCircleColor(1,4)
//             // }
//             console.log("CROSS_AXIS______")
//             console.log(thisFigure.index)
//             return false
//         } else {
//             // return "ONPATH_______.";
//         }
// }






// LargeArcFlagSetter.prototype.setLargeArcFlag = function(indexModifier, runOrNot) {
//     console.log("ARCFLAG_FLIPPER_RUNNING__________")
//     let modifiedIndex = this.index + indexModifier
//     let fillerCounter = this.originalFigurePathDatas_plusFillers.slice(0, modifiedIndex + 1).filter(x => x === 'filler').length //FIXME: might be an easier way to acomplish this. (counts fillers behind)

//     //old
//     // let parallelEndPoint_start = this.parallelFigurePathDatas[modifiedIndex][0]
//     // let parallelEndPoint_end = this.parallelFigurePathDatas[modifiedIndex][1]
//     //new
//     let parallelEndPoint_start = this.originalFigurePathDatas[modifiedIndex].children.parallel_pathDatas.pathData_west
//     let parallelEndPoint_end = this.originalFigurePathDatas[modifiedIndex + 1].children.parallel_pathDatas.pathData_east
//     let midPointBetweenEndPoints = findLineMidpoint(parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y, parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y)

//     this.parallelFigureObj.counterOfArcsAsTheyArrive = this.parallelFigureObj.counterOfArcsAsTheyArrive + 1

//     if(this.index === 2) {
//         setArcCenterAxisLine(parallelEndPoint_start, parallelEndPoint_end, midPointBetweenEndPoints, [parallelEndPoint_end.arc.center.x, parallelEndPoint_end.arc.center.y], this)
//     }

//     if(runOrNot === true) {
//         // if(this.index === 2) {
//         //     console.log("THE_ONE_IM_WORKING_ON")
//         //     console.log(this.originalFigurePathDatas[this.index])
//         //     console.log(this.index)
//         //     console.log(parallelEndPoint_start)
//         //     console.log(parallelEndPoint_end)
//         // }
//         console.log("CHECK_FOR_FLIPPED_ARCFLAG__________")
//         if(this.parallelFigureObj.iterationCounter === 1) {
//             let midPointX_isGreaterThan_arcCenterX = isGreaterThan(midPointBetweenEndPoints[0], parallelEndPoint_end.arc.center.x)
//             let midPointY_isGreaterThan_arcCenterY = isGreaterThan(midPointBetweenEndPoints[1], parallelEndPoint_end.arc.center.y)
//             // console.log(midPointX_isGreaterThan_arcCenterX)
//             if(this.index === 2) {
//                 this.setter_01 = midPointX_isGreaterThan_arcCenterX
//                 this.setter_02 = midPointY_isGreaterThan_arcCenterY
//             }
//             this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive] = {
//                 startPosX1_isGreaterThan_startPosX2: midPointX_isGreaterThan_arcCenterX,
//                 startPosY1_isGreaterThan_startPosY2: midPointY_isGreaterThan_arcCenterY
//             }
//             // if(this.index === 2) {
//             //     console.log('SETTING_SETTERS')
//             //     console.log(midPointX_isGreaterThan_arcCenterX)
//             //     console.log(midPointY_isGreaterThan_arcCenterY)
//             // }
//         }
//         let flipFlag = this.detectCrossover(midPointBetweenEndPoints, [parallelEndPoint_end.arc.center.x, parallelEndPoint_end.arc.center.y], [this.setter_01, this.setter_02])
//         const flipFlagAndFunction = (flipFlag, targetEndPoint) => {
//             if (flipFlag) {
//                 targetEndPoint.arc.arcFlag = +!targetEndPoint.arc.arcFlag
//                 console.log("FLIPPING_ARCFLAG__________")
//             }
//         }
//         flipFlagAndFunction(flipFlag, parallelEndPoint_end)
//         updateReferenceFigures(modifiedIndex, fillerCounter, parallelEndPoint_start, parallelEndPoint_end, midPointBetweenEndPoints, this)
//     } else {
//         console.log("DONT_CHECK_FOR_FLIPPED_ARCFLAG__________")
//     }
// }

// LargeArcFlagSetter.prototype.detectCrossover = function(movingPoint, stationaryPoint, startPositions) {
//     let x1 = movingPoint[0]
//     let y1 = movingPoint[1]
//     let x2 = stationaryPoint[0]
//     let y2 = stationaryPoint[1]
//     let currentPos_x1GreaterThanX2 = isGreaterThan(x1, x2)
//     let currentPos_Y1GreaterThanY2 = isGreaterThan(y1, y2)
//     let flipFlag = false
//     // if(this.index === 2) {
//     //     console.log("POOOOOOPER")
//     //     console.log("X: " + currentPos_x1GreaterThanX2, startPositions[0])
//     //     console.log("Y: " + currentPos_Y1GreaterThanY2, startPositions[1])
//     // }





//     // console.log(this.parallelFigureObj.arrayOfArcFlagsInitPos)
//     // console.log(this.parallelFigureObj.counterOfArcsAsTheyArrive)

//     // FIXME: PROblem is somehwere about here, one side is crossing and the other is not but cant do ||
//     // FIXME: THIS ISSUE IS BEING CAUSES BECUASE THE X AND Y AXIS TRUE / FALSE TRIGGERS ARE BEING ACTIONE BEFORE IT PASSES THE MARK
//     if(this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive].startPosX1_isGreaterThan_startPosX2 !== currentPos_x1GreaterThanX2 && this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive].startPosY1_isGreaterThan_startPosY2 !== currentPos_Y1GreaterThanY2) {
//         console.log("YES_CROSSOVER__________")
//         // if(this.index === 2) {
//         //     console.log("CURRENT_POS_IS_GREATER_THAN_MOVING")
//         //     console.log(currentPos_x1GreaterThanX2)
//         //     console.log(currentPos_x1GreaterThanX2)
//         // }
//         flipFlag = true
//         this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive].startPosX1_isGreaterThan_startPosX2 = !this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive].startPosX1_isGreaterThan_startPosX2
//         this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive].startPosY1_isGreaterThan_startPosY2 = !this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive].startPosY1_isGreaterThan_startPosY2

//         // if(this.index === 2) {
//         //     console.log('RE_SETTING_SETTERS')
//         //     console.log(this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive].startPosX1_isGreaterThan_startPosX2)
//         //     console.log(this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive].startPosY1_isGreaterThan_startPosY2)
//         //     this.setter_01 = this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive].startPosX1_isGreaterThan_startPosX2
//         //     this.setter_02 = this.parallelFigureObj.arrayOfArcFlagsInitPos[this.parallelFigureObj.counterOfArcsAsTheyArrive].startPosY1_isGreaterThan_startPosY2
//         // }

//         return flipFlag
//     } else {
//         console.log("NO_CROSSOVER__________")
//         // if(this.index === 2) {
//         //     console.log("CURRENT_POS_IS_GREATER_THAN_MOVING")
//         //     console.log(currentPos_x1GreaterThanX2)
//         //     console.log(currentPos_x1GreaterThanX2)
//         // }
//     }
//     return flipFlag
// }

// function updateReferenceFigures(index, fillerCounter, parallelEndPoint_start, parallelEndPoint_end, midPointBetweenEndPoints, thisClass) {
//     if(index === 2) {
//         thisClass.referenceFigure_01.runFunctions([[parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y], [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y]])
//         thisClass.referenceFigure_02.runFunctions([midPointBetweenEndPoints, [parallelEndPoint_end.arc.center.x, parallelEndPoint_end.arc.center.y]])
//         thisClass.referenceFigure_03.runFunctions([[parallelEndPoint_start, parallelEndPoint_end]])
//     }
//     if(index === 3) {
//         thisClass.referenceFigure_04.runFunctions([[parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y], [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y]])
//         thisClass.referenceFigure_05.runFunctions([midPointBetweenEndPoints, [parallelEndPoint_end.arc.center.x, parallelEndPoint_end.arc.center.y]])
//         thisClass.referenceFigure_06.runFunctions([[parallelEndPoint_start, parallelEndPoint_end]])
//     }
// }

export {
    LargeArcFlagSetter
}



