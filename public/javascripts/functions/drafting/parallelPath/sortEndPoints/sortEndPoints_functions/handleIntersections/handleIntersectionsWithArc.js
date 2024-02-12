import {handleArcToArcIntersection, handlePathToArcIntersection, handleArcToPathIntersection} from '../../sortEndPoints_functions/intersections_contact.js'
import {handlePathToArcIntersectionNoContact, handleArcToPathIntersectionNoContact, handleArcToArcIntersectionNoContact} from '../../sortEndPoints_functions/intersections_noContact.js'
import {findPointAlongSlopeAtDistance} from '../../../drawParallelPath_functions/parallelPathFunctions.js'
import {getDistance} from '../../../../../math/mathFunctions.js'

// done
function arcIntersection_allArcSegments_everyIndex_firstAction(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject) {
    // 1
    console.log("1_all")
    parPathObj.parallelPathSegmentCounter_FIRST = parPathObj.parallelPathSegmentCounter_FIRST + 1
    setArcRadius(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, "arcRad_1") // TODO: (Set_arcRad)
}
// done
function arcIntersection_firstArcSegment_everyIndex_firstAction(parPathObj) {
    // 2
    console.log("2_seg1_first_all")
    parPathObj.parallelPathSegmentCounter_FIRST = parPathObj.parallelPathSegmentCounter_FIRST + 1
}
// done
function arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    // 3
    console.log("3_seg1")
    // old
    // empty
    // new
    handleArcIntersectionArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
}
// done
function arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    // 4
    console.log("4_seg1")
    handleArcIntersectionPathToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
}
// done
function arcIntersection_firstArcSegment_fistIndex(targetEndPoints, refEndPointsBase, index, arcRadiusObject) {
    // 5
    console.log("5_seg1")
    setPerpendicularPoints(targetEndPoints, refEndPointsBase, index, index, index + 1, arcRadiusObject, 0, false)
}
// done
function arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(targetEndPoints, index) {
    // 6_A
    console.log("6_A_seg1")
    setThisPathDataAsPreviousPathData(targetEndPoints, index)
}
// done
function arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    // 6_B
    console.log("6_B_seg1")
    skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, 1)
    handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
}


// done
function arcIntersection_secondArcSegment_everyIndex_firstAction(targetEndPoints, refEndPointsBase, index, arcRadiusObject) {
    // 7
    console.log("7_seg2_first_all")
    setPerpendicularPoints(targetEndPoints, refEndPointsBase, index, index, index + 1, arcRadiusObject, 0, true)
}
// done
function arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    // 8
    console.log("8_seg2")
    // old
    // handleArcIntersectionArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
    // new
    // empty
}
// done
function arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    // 9
    console.log("9_seg2")
    skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, 1)
    handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
}
// done
function arcIntersection_secondArcSegment_lastIndex(targetEndPoints, refEndPointsBase, index, arcRadiusObject) {
    // 10
    console.log("10_seg2")
    setPerpendicularPoints(targetEndPoints, refEndPointsBase, index, index + 1, index + 1, arcRadiusObject, 1, false)
}
// done
function arcIntersection_secondArcSegment_everyIndex_lastAction(parPathObj) {
    // 11
    console.log("11_seg2_last_all")
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
function disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject) {
    // 2_A_Joiner
    console.log("2_A_Joiner_ooo")
    parPathObj.parallelPathSegmentCounter_FIRST = 0
    setArcRadius(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, "arcRad_2AJ") // TODO: (Set_arcRad)
}
// done
function disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    // 2_B_Joiner
    console.log("2_B_Joiner_ooo")
    skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, 1)
    handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
}
// done
function disconnectedArcIntersection_thisIndexIsArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    // 3_Joiner
    console.log("3_Joiner_ooo")
    // TODO: // I removed this, test all variations, check if keep or remove from over places
    // TODO: // Why did i remove this? I need it now for arcToArcCounter (turned back on)
    parPathObj.arcToArcCounter += 1
    handleArcToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index-1)
    parPathObj.parallelPathSegmentCounter_FIRST = 0
}
// done
function disconnectedArcIntersection_prevIndexIsArcToArc(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject) {
    // 4_Joiner
    console.log("4_Joiner_ooo")
    parPathObj.parallelPathSegmentCounter_FIRST = 0
    setArcRadius(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, "arcRad_4J") // TODO: (Set_arcRad)
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















function setArcRadius(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, logId) {
    // console.log(logId)
    targetEndPoints[index][1].arc.radius = calcArcParDistance(arcRadiusObject, refEndPointsBase[index + 1], parPathObj.parallelDistance)
}

function setPerpendicularPoints(targetEndPoints, refEndPointsBase, targetIndex, refIndex, arcRefIndex, arcRadiusObject, target, setPrevious) {
    let targetPathData = targetEndPoints[targetIndex][target]
    let refPathData = refEndPointsBase[refIndex]
    let refArcCenter = refEndPointsBase[arcRefIndex]

    let newParallelPosition = findPointAlongSlopeAtDistance([refPathData.coords.x, refPathData.coords.y], [refArcCenter.arc.center.x, refArcCenter.arc.center.y], arcRadiusObject.parDistAndDir)
    targetPathData.coords.x = newParallelPosition[0]
    targetPathData.coords.y = newParallelPosition[1]

    if (setPrevious) {
        let prevParallelPathData = targetEndPoints[targetIndex - 1][1]
        prevParallelPathData.coords.x = newParallelPosition[0]
        prevParallelPathData.coords.y = newParallelPosition[1]
    }
}

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

    // console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

    parPathObj.arcToPathCounter += 1
}


// TODO: can these three be one?
function handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount1, self, index, parPathObj) {
    if (parPathObj.collectIndicesOfIntersections === true) {
        parPathObj.arcToPathIndexArray.push(index + 1)
    }

    // handleArcToPathIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount1, self, index, parPathObj.arcToPathIndexArray, parPathObj.arcToPathCounter, parPathObj)
    handleArcToPathIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount1, self, index, parPathObj)

    if (targetEndPoints[index + 1][1].arc.joiner) {
        parPathObj.arcToPathCounter -= 1
    }
}

function handleArcIntersectionPathToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    parPathObj.pathToArcCounter += 1

    if (parPathObj.collectIndicesOfIntersections === true) {
        parPathObj.pathToArchIndexArray.push(index);
    }

    // handlePathToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj.pathToArchIndexArray, parPathObj.pathToArcCounter)
    handlePathToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
}

function handleArcIntersectionArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    parPathObj.arcToArcCounter += 1

    if (parPathObj.collectIndicesOfIntersections === true) {
        parPathObj.arcToArcIndexArray.push(index);
    }

    // handleArcToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj.arcToArcIndexArray, parPathObj.arcToArcCounter)
    handleArcToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
}

function handleNOIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index) {
    handleArcToPathIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index - 1)
}

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

// TODO: (in two places at once rn, find a place for it)
function calcArcParDistance(arcRadiusObject, nextRefEndPointBase, distance) {
    arcRadiusObject.parDistAndDir = (nextRefEndPointBase.arc.sweepFlag === 0) ? distance : distance * -1
    let nextArcToCenterTotalDistance = getDistance(nextRefEndPointBase.coords.x, nextRefEndPointBase.coords.y, nextRefEndPointBase.arc.center.x, nextRefEndPointBase.arc.center.y)
    let nextArcToCenterMinusPointerToArcFromArc1 = nextArcToCenterTotalDistance - arcRadiusObject.parDistAndDir
    return nextArcToCenterMinusPointerToArcFromArc1
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