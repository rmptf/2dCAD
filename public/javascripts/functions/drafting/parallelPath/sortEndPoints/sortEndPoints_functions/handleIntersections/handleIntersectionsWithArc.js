import {handleArcToArcIntersection, handlePathToArcIntersection, handleArcToPathIntersection} from '../../sortEndPoints_functions/intersections_contact.js'
import {handlePathToArcIntersectionNoContact, handleArcToPathIntersectionNoContact, handleArcToArcIntersectionNoContact} from '../../sortEndPoints_functions/intersections_noContact.js'
import {findIntersectingPointSIMPLER, findPointAlongSlopeAtDistance} from '../../../drawParallelPath_functions/parallelPathFunctions.js'

// done
function arcIntersection_allArcSegments_everyIndex_firstAction(parPathObj) {
    console.log("1_ooo")
    parPathObj.parallelPathSegmentCounter_FIRST = parPathObj.parallelPathSegmentCounter_FIRST + 1
}
// done
function arcIntersection_firstArcSegment_everyIndex_firstAction(parPathObj) {
    // 2
    console.log("2_ooo")
    parPathObj.parallelPathSegmentCounter_FIRST = parPathObj.parallelPathSegmentCounter_FIRST + 1
}
// done
function arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc() {
    // 3
    console.log("3_ooo")
    // empty
}
// done
function arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    // 4
    console.log("4_ooo")
    handleArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj.collectIndicesOfIntersections, parPathObj.pathToArchIndexArray, parPathObj.pathToArcCounter, "p2a")
}
// done
function arcIntersection_firstArcSegment_fistIndex(targetEndPoints, refEndPointsBase, index, handleArcsObject) {
    // 5
    console.log("5_ooo")
    setPerpendicularPoints(targetEndPoints, refEndPointsBase, index, index + 1, handleArcsObject, 0, false)
}
// done
function arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(targetEndPoints, index) {
    // 6_A
    console.log("6_A_ooo")
    setThisPathDataAsPreviousPathData(targetEndPoints, index)
}
// done
function arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    // 6_B
    console.log("6_B_ooo")
    skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, 1)
    handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj.collectIndicesOfIntersections, parPathObj.arcToPathIndexArray, parPathObj.arcToPathCounter)
}


// done
function arcIntersection_secondArcSegment_everyIndex_firstAction(targetEndPoints, refEndPointsBase, index, handleArcsObject) {
    // 7
    console.log("7_ooo")
    setPerpendicularPoints(targetEndPoints, refEndPointsBase, index, index + 1, handleArcsObject, 0, true)
}
// done
function arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    // 8
    console.log("8_ooo")
    handleArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj.collectIndicesOfIntersections, parPathObj.arcToArcIndexArray, parPathObj.arcToArcCounter, "a2a")
}
// done
function arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    // 9
    console.log("9_ooo")
    skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, 1)
    handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj.collectIndicesOfIntersections, parPathObj.arcToPathIndexArray, parPathObj.arcToPathCounter)
}
// done
function arcIntersection_secondArcSegment_lastIndex(targetEndPoints, refEndPointsBase, index, handleArcsObject) {
    // 10
    console.log("10_ooo")
    setPerpendicularPoints(targetEndPoints, refEndPointsBase, index + 1, index + 1, handleArcsObject, 1, false)
}
// done
function arcIntersection_secondArcSegment_everyIndex_lastAction(parPathObj) {
    // 11
    console.log("11_ooo")
    parPathObj.parallelPathSegmentCounter_FIRST = -1
}


// done
function disconnectedArcIntersection_thisIndexIsPathToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    // 1_Joiner
    console.log("1_Joiner_ooo")
    parPathObj.pathToArcCounter += 1
    handlePathToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index)
    parPathObj.parallelPathSegmentCounter_FIRST = 0
}
// done
function disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc(parPathObj) {
    // 2_A_Joiner
    console.log("2_A_Joiner_ooo")
    parPathObj.parallelPathSegmentCounter_FIRST = 0
}
// done
function disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    // 2_B_Joiner
    console.log("2_B_Joiner_ooo")
    skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, 1)
    handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj.collectIndicesOfIntersections, parPathObj.arcToPathIndexArray, parPathObj.arcToPathCounter)
}
// done
function disconnectedArcIntersection_thisIndexIsArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    // 3_Joiner
    console.log("3_Joiner_ooo")
    parPathObj.arcToArcCounter += 1
    handleArcToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index-1)
    parPathObj.parallelPathSegmentCounter_FIRST = 0
}
// done
function disconnectedArcIntersection_prevIndexIsArcToArc(parPathObj) {
    // 4_Joiner
    console.log("4_Joiner_ooo")
    parPathObj.parallelPathSegmentCounter_FIRST = 0
}
// done
function disconnectedArcIntersection_prevIndexIsArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    // 5_Joiner
    console.log("5_Joiner_ooo")
    skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, 0)
    handleNOIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index)
    parPathObj.parallelPathSegmentCounter_SECOND = 1
}
// done
function disconnectedArcIntersection_skipThisIndex(parPathObj) {
    // 6_Joiner
    console.log("6_Joiner_ooo")
    parPathObj.parallelPathSegmentCounter_FIRST = 0
}










// done except names
function setPerpendicularPoints(targetEndPoints, refEndPointsBase, thisIndex, nextIndex, handleArcsObject, target, setPrevious) {
    let thisPathData = refEndPointsBase[thisIndex]
    let nextPathData = refEndPointsBase[nextIndex]
    let thisParallelPathData = targetEndPoints[thisIndex][target]

    let parallelAnchorPoints = findPointAlongSlopeAtDistance([thisPathData.coords.x, thisPathData.coords.y], [nextPathData.arc.center.x, nextPathData.arc.center.y], handleArcsObject.baseArcToCursorDist)
    thisParallelPathData.coords.x = parallelAnchorPoints[0]
    thisParallelPathData.coords.y = parallelAnchorPoints[1]

    if (setPrevious) {
        let prevParallelPathData = targetEndPoints[thisIndex - 1][1]
        prevParallelPathData.coords.x = parallelAnchorPoints[0]
        prevParallelPathData.coords.y = parallelAnchorPoints[1]
    }
}

// done except names
function skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, offset) {
    let fillerAdder = 0
    let nextFillerAdder = 0

    if (refEndPointsBase[index + 2] === "filler") {
        fillerAdder = fillerAdder + 0
        nextFillerAdder = nextFillerAdder + 1
    }

    let thisPathDataOutside = refEndPointsBase[index + offset + fillerAdder]
    let nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]

    let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parPathObj.parallelDistance)

    targetEndPoints[index + 1][0].coords.x = parallelProjections.thisPointX
    targetEndPoints[index + 1][0].coords.y = parallelProjections.thisPointY
    targetEndPoints[index + 1][1].coords.x = parallelProjections.nextPointX
    targetEndPoints[index + 1][1].coords.y = parallelProjections.nextPointY

    console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

    parPathObj.arcToPathCounter += 1
}

// done
function handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount1, self, index, collectIdecies, arcIndexArray, arcShapeCounter) {
    if (collectIdecies === true) {
        arcIndexArray.push(index + 1)
    }
    handleArcToPathIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount1, self, index, arcIndexArray, arcShapeCounter)

    if (targetEndPoints[index + 1][1].arc.joiner) {
        arcShapeCounter -= 1
    }
}

// done
function handleNOIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index) {
    handleArcToPathIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index - 1)
}

// double chck this
function handleArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, collectIdecies, arcIndexArray, arcShapeCounter, arcShape) {
    arcShapeCounter += 1

    if (collectIdecies === true) {
        arcIndexArray.push(index);
    }

    switch (arcShape) {
        case "p2a":
            handlePathToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, arcIndexArray, arcShapeCounter);
            break
        case "a2a":
            handleArcToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, arcIndexArray, arcShapeCounter);
            break
        default:
            console.log("no shape")
            break
    }
}

// done
function setThisPathDataAsPreviousPathData(targetEndPoints, index) {
    let prevParallelPathData = targetEndPoints[index - 1][1]
    let thisParallelPathData = targetEndPoints[index][1]
    if(thisParallelPathData.arc.joiner) {
        thisParallelPathData.coords.x = prevParallelPathData.coords.x
        thisParallelPathData.coords.y = prevParallelPathData.coords.y
    }
}










// TODO: (in two places at once rn, find a place for it)
// Write a good comment to describe this function
function calcParallelProjections(thisPathDataCoords, nextPathDataCoords, parallelDistance) {
    let thisPathDataCoordsX = thisPathDataCoords.x
    let thisPathDataCoordsY = thisPathDataCoords.y
    let nextPathDataCoordsX = nextPathDataCoords.x
    let nextPathDataCoordsY = nextPathDataCoords.y

    // Calculate the angle and sine/cosine values
    const angle = Math.atan2(thisPathDataCoordsY - nextPathDataCoordsY, thisPathDataCoordsX - nextPathDataCoordsX)
    const sinValue = Math.sin(angle)
    const cosValue = Math.cos(angle)

    // Function to calculate projected anchor points based on input coordinates and parallel distance
    let calcProjection = (coordVal, trigRatio, distance, subtract) => subtract ? coordVal - (distance * trigRatio) : coordVal + (distance * trigRatio)

    // Calculate the anchor points
    return {
        thisPointX: calcProjection(thisPathDataCoordsX, sinValue, parallelDistance, true),
        thisPointY: calcProjection(thisPathDataCoordsY, cosValue, parallelDistance, false),
        nextPointX: calcProjection(nextPathDataCoordsX, sinValue, parallelDistance, true),
        nextPointY: calcProjection(nextPathDataCoordsY, cosValue, parallelDistance, false)
    }
}










export {
    arcIntersection_allArcSegments_everyIndex_firstAction,
    arcIntersection_firstArcSegment_everyIndex_firstAction,
    arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc,
    arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc,
    arcIntersection_firstArcSegment_fistIndex,
    arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc,
    arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc,
    arcIntersection_secondArcSegment_everyIndex_firstAction,
    arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected,
    arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc,
    arcIntersection_secondArcSegment_lastIndex,
    arcIntersection_secondArcSegment_everyIndex_lastAction,
    disconnectedArcIntersection_thisIndexIsPathToArc,
    disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc,
    disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc,
    disconnectedArcIntersection_thisIndexIsArcToArc,
    disconnectedArcIntersection_prevIndexIsArcToArc,
    disconnectedArcIntersection_prevIndexIsArcToPath,
    disconnectedArcIntersection_skipThisIndex,
}

























// function arcIntersection_allArcSegments_everyIndex_firstAction() {
//     console.log("1_ooo")
//     parPathObj.parallelPathSegmentCounter_FIRST = parPathObj.parallelPathSegmentCounter_FIRST + 1
// }
// function arcIntersection_firstArcSegment_everyIndex_firstAction() {
//     // 2
//     console.log("2_ooo")
//     parPathObj.parallelPathSegmentCounter_FIRST = parPathObj.parallelPathSegmentCounter_FIRST + 1
// }
// function arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc() {
//     // 3
//     console.log("3_ooo")
//     // empty
// }
// function arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc() {
//     // 4
//     console.log("4_ooo")
//     handleArcIntersection(parPathObj.collectIndicesOfIntersections, parPathObj.pathToArchIndexArray, parPathObj.pathToArcCounter, "p2a", targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index)
// }
// function arcIntersection_firstArcSegment_fistIndex(){
//     // 5
//     console.log("5_ooo")
//     setPerpendicularPoints(refEndPointsBase, targetEndPoints, handleArcsObject, index, index + 1, 0, false)
// }
// function arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc() {
//     // 6_A
//     console.log("6_A_ooo")
//     setThisPathDataAsPreviousPathData(targetEndPoints, index)
// }
// function arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc() {
//     // 6_B
//     console.log("6_B_ooo")
//     skipFillersAndSetParallelProjections(refEndPointsBase, targetEndPoints, index, 1, parPathObj.parallelDistance, parPathObj)
//     handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj.collectIndicesOfIntersections, parPathObj.arcToPathIndexArray, parPathObj.arcToPathCounter)
// }



// function arcIntersection_secondArcSegment_everyIndex_firstAction() {
//     // 7
//     console.log("7_ooo")
//     setPerpendicularPoints(refEndPointsBase, targetEndPoints, handleArcsObject, index, index + 1, 0, true)
// }
// function arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected() {
//     // 8
//     console.log("8_ooo")
//     handleArcIntersection(parPathObj.arcToArcIndexArray, parPathObj.arcToArcCounter, "a2a", targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index)
// }
// function arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc() {
//     // 9
//     console.log("9_ooo")
//     skipFillersAndSetParallelProjections(refEndPointsBase, targetEndPoints, index, 1, parPathObj.parallelDistance, parPathObj)
//     handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj.collectIndicesOfIntersections, parPathObj.arcToPathIndexArray, parPathObj.arcToPathCounter)
// }
// function arcIntersection_secondArcSegment_lastIndex() {
//     // 10
//     console.log("10_ooo")
//     setPerpendicularPoints(refEndPointsBase, targetEndPoints, handleArcsObject, index + 1, index + 1, 1, false)
// }
// function arcIntersection_secondArcSegment_everyIndex_lastAction() {
//     // 11
//     console.log("11_ooo")
//     parPathObj.parallelPathSegmentCounter_FIRST = -1
// }



// function disconnectedArcIntersection_thisIndexIsPathToArc() {
//     // 1_Joiner
//     console.log("1_Joiner_ooo")
//     parPathObj.pathToArcCounter += 1
//     handlePathToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index)
//     parPathObj.parallelPathSegmentCounter_FIRST = 0
// }
// function disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc() {
//     // 2_A_Joiner
//     console.log("2_A_Joiner_ooo")
//     parPathObj.parallelPathSegmentCounter_FIRST = 0
// }
// function disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc() {
//     // 2_B_Joiner
//     console.log("2_B_Joiner_ooo")
//     skipFillersAndSetParallelProjections(refEndPointsBase, targetEndPoints, index, 1, parPathObj.parallelDistance, parPathObj)
//     handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj.collectIndicesOfIntersections, parPathObj.arcToPathIndexArray, parPathObj.arcToPathCounter)
// }
// function disconnectedArcIntersection_thisIndexIsArcToArc() {
//     // 3_Joiner
//     console.log("3_Joiner_ooo")
//     parPathObj.arcToArcCounter += 1
//     handleArcToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index-1)
//     parPathObj.parallelPathSegmentCounter_FIRST = 0
// }
// function disconnectedArcIntersection_prevIndexIsArcToArc() {
//     // 4_Joiner
//     console.log("4_Joiner_ooo")
//     parPathObj.parallelPathSegmentCounter_FIRST = 0
// }
// function disconnectedArcIntersection_prevIndexIsArcToPath() {
//     // 5_Joiner
//     console.log("5_Joiner_ooo")
//     skipFillersAndSetParallelProjections(refEndPointsBase, targetEndPoints, index, 0, parPathObj.parallelDistance, parPathObj)
//     handleNOIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index)
//     parPathObj.parallelPathSegmentCounter_SECOND = 1
// }
// function disconnectedArcIntersection_skipThisIndex() {
//     // 6_Joiner
//     console.log("6_Joiner_ooo")
//     parPathObj.parallelPathSegmentCounter_FIRST = 0
// }