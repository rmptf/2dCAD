let thisIsArcToPath = false
if(index > 1) {
    // check if this point is a no contact arc to path
    if(targetEndPoints[index - 1][1].arc.joiner === true && targetEndPoints[index][1].arc.joinerSide === "BBB") {
        console.log("Dont_run_check_straight_path")
        thisIsArcToPath = true
    } else {
        thisIsArcToPath = false
    }
} 

if(thisIsArcToPath === false) {
    let fillerAdder = 0
    let nextFillerAdder = 0

    if(refEndPointsBase[index] === "filler" && refEndPointsBase[index + 1] != "filler") {
        fillerAdder = 1
    }

    if(refEndPointsBase[index] === "filler" && refEndPointsBase[index + 1] === "filler") {
        fillerAdder = -1
    }

    if(refEndPointsBase[index + 1] === "filler") {
        nextFillerAdder = 1
    }

    let thisPathDataOutside
    let nextPathDataOutside

    if (parPathObj.removeornot_allParData === true) {
        thisPathDataOutside = refEndPointsBase[index + fillerAdder]
        nextPathDataOutside = refEndPointsBase[index + 1 + nextFillerAdder]
    } else {
        let thisRemoveIndex = parPathObj.removeStartIndex
        let nextRemoveIndex = thisRemoveIndex + 1

        if(index <= thisRemoveIndex) {
            thisPathDataOutside = refEndPointsBase[index + fillerAdder]
            nextPathDataOutside = refEndPointsBase[index + 1 + nextFillerAdder]
        }

        else if(index >= nextRemoveIndex) {
            thisPathDataOutside = refEndPointsBase[index + 1 + fillerAdder]
            nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]
        }

        else {
            console.log("Not_Handled_RemoveIndex")
        }
    }

    // AA_FIRST_ALL
    let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parPathObj.parallelDistance)
    refEndPointsPerp[index][0].x = parallelProjections.thisPointX
    refEndPointsPerp[index][0].y = parallelProjections.thisPointY
    refEndPointsPerp[index][1].x = parallelProjections.nextPointX
    refEndPointsPerp[index][1].y = parallelProjections.nextPointY




    findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke()
    function findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke() {
        const arcExist = (newIndex) => targetEndPoints[newIndex][1].arc.exist === true
        const firstPosition = (newIndex) => (newIndex) === 0
        const lastPosition = (newIndex) => newIndex === targetEndPoints.length - 1

        if (firstPosition(index)) {
            // A
            noArcIntersection_firstPos(targetEndPoints, index, parallelProjections.thisPointX)
            if(arcExist(index + 1)) {
                // B
                noArcIntersection_firstPos_nextIndexIsArc(targetEndPoints, index, parallelProjections.nextPointX)
            }
        }

        else if (!lastPosition(index)) {
            if(!arcExist(index - 1)) {
                if( parPathObj.parallelPathSegmentCounter_SECOND === 0) {
                    // C (DC)
                    noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isFirstSegment(targetEndPoints, index, refEndPointsPerp)
                } else {
                    // D (C+)
                    noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isSecondSegment(targetEndPoints, index, targetEndPoints, refEndPointsPerp)
                }
                // E (DC After)
                noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_bothSegments(parPathObj)
            } else {
                // F (E)
                noArcIntersection_notFirstPos_notLastPos_prevIndexIsArc()
                // empty
            }
            if(arcExist(index + 1) && !arcExist(index - 1)) {
                // G (F)
                noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArv_nextIndexIsArc(targetEndPoints, index, parallelProjections.nextPointX)
            }
        }

        else if(lastPosition(index)) {
            if(!arcExist(index - 1)) {
                if( parPathObj.parallelPathSegmentCounter_SECOND === 0) {
                    // H (Ga)
                    noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isFirstSegment(targetEndPoints, index, refEndPointsPerp)
                } else {
                    // J (G+)
                    noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isSecondSegment(targetEndPoints, index, refEndPointsPerp)
                }
                // K (G After)
                noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_bothSegments(parPathObj)
            } else {
                // L (H)
                noArcIntersection_notFirstPos_lastPos_prevIndexIsArc()
                // empty
            }
            // M (Ia)
            noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction(targetEndPoints, index, parallelProjections.nextPointX)
        }
    }
}







function noArcIntersection_firstPos(targetEndPoints, index, thisParallelProjection) {
    // A
    console.log("A_ooo")
    setTargetEndPoints(targetEndPoints, index, thisParallelProjection, 0)
}
function noArcIntersection_firstPos_nextIndexIsArc(targetEndPoints, index, nextParallelProjection) {
    // B
    console.log("B_ooo")
    setTargetEndPoints(targetEndPoints, index, nextParallelProjection, 1)
}
function noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isFirstSegment(targetEndPoints, index, refEndPointsPerp) {
    // C
    console.log("C_ooo")
    calculateAndSetIntersectionPoints(targetEndPoints, index, [refEndPointsPerp[index - 1], false], [refEndPointsPerp[index], false])
}
function noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isSecondSegment(targetEndPoints, index, refEndPointsPerp) {
    // D
    console.log("D_ooo")
    calculateAndSetIntersectionPoints(targetEndPoints, index, [targetEndPoints[index - 1], true], [refEndPointsPerp[index], false])
}
function noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_bothSegments(parPathObj) {
    // E
    console.log("E_ooo")
    parPathObj.parallelPathSegmentCounter_SECOND = 0
}
function noArcIntersection_notFirstPos_notLastPos_prevIndexIsArc() {
    // F
    console.log("F_ooo")
    // Empry
}
function noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArv_nextIndexIsArc(targetEndPoints, index, nextParallelProjection) {
    // G
    console.log("G_ooo")
    setTargetEndPoints(targetEndPoints, index, nextParallelProjection, 1)
}
function noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isFirstSegment(targetEndPoints, index, refEndPointsPerp) {
    // H
    console.log("H_ooo")
    calculateAndSetIntersectionPoints(targetEndPoints, index, [refEndPointsPerp[index - 1], false], [refEndPointsPerp[index], false])
}
function noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isSecondSegment(targetEndPoints, index, refEndPointsPerp) {
    // J
    console.log("J_ooo")
    calculateAndSetIntersectionPoints(targetEndPoints, index, [targetEndPoints[index - 1], true], [refEndPointsPerp[index], false])
}
function noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_bothSegments(parPathObj) {
    // K
    console.log("K_ooo")
    parPathObj.parallelPathSegmentCounter_SECOND = 0
}
function noArcIntersection_notFirstPos_lastPos_prevIndexIsArc() {
    // L
    console.log("L_ooo")
    // Empry
}
function noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction(targetEndPoints, index, nextParallelProjection) {
    // M
    console.log("M_ooo")
    setTargetEndPoints(targetEndPoints, index, nextParallelProjection, 1)
}




// AA_FIRST_ALL
function calculateAndSetParallelProjectionPoints() {
    let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parPathObj.parallelDistance)
    refEndPointsPerp[index][0].x = parallelProjections.thisPointX
    refEndPointsPerp[index][0].y = parallelProjections.thisPointY
    refEndPointsPerp[index][1].x = parallelProjections.nextPointX
    refEndPointsPerp[index][1].y = parallelProjections.nextPointY
}
// C
// D
// H
// J
function calculateAndSetIntersectionPoints(targetData, index, parallelEndPointsI, parallelEndPointsII) {
    let intersectionPoint =  findIntersectingPointTwoFormats(parallelEndPointsI, parallelEndPointsII)
    targetData[index - 1][1].coords.x = intersectionPoint.x
    targetData[index - 1][1].coords.y = intersectionPoint.y
    targetData[index][0].coords.x = intersectionPoint.x
    targetData[index][0].coords.y = intersectionPoint.y
}
// A
// B
// G
// M
function setTargetEndPoints(targetData, index, referenceCoords, side) {
    targetData[index][side].coords.x = referenceCoords
    targetData[index][side].coords.y = referenceCoords
}
// E
// K
// parPathObj.parallelPathSegmentCounter_SECOND = 0
























































// // A_FIRST_ALL
// let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parPathObj.parallelDistance)
// refEndPointsPerp[index][0].x = parallelProjections.thisPointX
// refEndPointsPerp[index][0].y = parallelProjections.thisPointY
// refEndPointsPerp[index][1].x = parallelProjections.nextPointX
// refEndPointsPerp[index][1].y = parallelProjections.nextPointY

// // A
// targetEndPoints[index][0].coords.x = parallelProjections.thisPointX
// targetEndPoints[index][0].coords.y = parallelProjections.thisPointY

// // B
// targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
// targetEndPoints[index][1].coords.y = parallelProjections.nextPointY

// // C
// let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = parallelPathDatasIntersectingPoint.y
// targetEndPoints[index][0].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = parallelPathDatasIntersectingPoint.y

// // D
// let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(targetEndPoints[index - 1][0].coords.x, targetEndPoints[index - 1][0].coords.y, targetEndPoints[index - 1][1].coords.x, targetEndPoints[index - 1][1].coords.y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = parallelPathDatasIntersectingPoint.y
// targetEndPoints[index][0].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = parallelPathDatasIntersectingPoint.y

// // E
// parPathObj.parallelPathSegmentCounter_SECOND = 0

// // F
// // Empty

// // G
// targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
// targetEndPoints[index][1].coords.y = parallelProjections.nextPointY

// // H
// let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = parallelPathDatasIntersectingPoint.y
// targetEndPoints[index][0].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = parallelPathDatasIntersectingPoint.y

// // J
// let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(targetEndPoints[index - 1][0].coords.x, targetEndPoints[index - 1][0].coords.y, targetEndPoints[index - 1][1].coords.x, targetEndPoints[index - 1][1].coords.y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = parallelPathDatasIntersectingPoint.y
// targetEndPoints[index][0].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = parallelPathDatasIntersectingPoint.y

// // K
// parPathObj.parallelPathSegmentCounter_SECOND = 0

// // L
// // Empty

// // M
// targetEndPoints[index][1].coords.x = parallelProjections.nextPointX
// targetEndPoints[index][1].coords.y = parallelProjections.nextPointY