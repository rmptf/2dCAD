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

    // A_FIRST_ALL
    let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parPathObj.parallelDistance)
    refEndPointsPerp[index][0].x = parallelProjections.thisPointX
    refEndPointsPerp[index][0].y = parallelProjections.thisPointY
    refEndPointsPerp[index][1].x = parallelProjections.nextPointX
    refEndPointsPerp[index][1].y = parallelProjections.nextPointY

















    findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke()

    function findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke() {
        const arcExist = (newIndex) => targetEndPoints[newIndex][1].arc.exist === true
        const firstPosition = (newIndex) => (index) === 0
        const lastPosition = (newIndex) => newIndex === targetEndPoints.length - 1

        if (firstPosition(index)) {
            // A
            noArcIntersection_firstPos()
            if(arcExist(index + 1)) {
                // B
                noArcIntersection_firstPos_nextIndexIsArc()
            }
        }

        else if (!lastPosition(index)) {
            if(!arcExist(index - 1)) {
                if( parPathObj.parallelPathSegmentCounter_SECOND === 0) {
                    // C (DC)
                    noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isFirstSegment()
                } else {
                    // D (C+)
                    noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isSecondSegment()
                }
                // E (DC After)
                noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_bothSegments()
            } else {
                // F (E)
                noArcIntersection_notFirstPos_notLastPos_prevIndexIsArc()
                // empty
            }
            if(arcExist(index + 1) && !arcExist(index - 1)) {
                // G (F)
                noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArv_nextIndexIsArc()
            }
        }

        else if(lastPosition(index)) {
            if(!arcExist(index - 1)) {
                if( parPathObj.parallelPathSegmentCounter_SECOND === 0) {
                    // H (Ga)
                    noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isFirstSegment()
                } else {
                    // J (G+)
                    noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isSecondSegment()
                }
                // K (G After)
            } else {
                // L (H)
                noArcIntersection_notFirstPos_lastPos_prevIndexIsArc()
                // empty
            }
            // M (Ia)
            noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction()
        }
    }
}






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





// A_FIRST_ALL
function calculateAndSetParallelProjectionPoints() {
    let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parPathObj.parallelDistance)
    refEndPointsPerp[index][0].x = parallelProjections.thisPointX
    refEndPointsPerp[index][0].y = parallelProjections.thisPointY
    refEndPointsPerp[index][1].x = parallelProjections.nextPointX
    refEndPointsPerp[index][1].y = parallelProjections.nextPointY
}




// A
setTargetEndPoints(targetEndPoints, index, 0, parallelProjections.thisPointX)
// B
setTargetEndPoints(targetEndPoints, index, 1, parallelProjections.nextPointX)
// G
setTargetEndPoints(targetEndPoints, index, 1, parallelProjections.nextPointX)
// M
setTargetEndPoints(targetEndPoints, index, 1, parallelProjections.nextPointX)

function setTargetEndPoints(targetData, index, side, referenceCoords) {
    targetData[index][side].coords.x = referenceCoords
    targetData[index][side].coords.y = referenceCoords
}


// E
// K
parPathObj.parallelPathSegmentCounter_SECOND = 0











// C
// D
// H
// J
// findIntersectingPointSIMPLER(refEndPointsPerp[index-1], refEndPointsPerp[index])
refEndPointsPerp[index-1][0].y
targetEndPoints[index - 1][0].coords.x

function calculateAndSetIntersectionPoints(targetData, index, intersectDataI, intersectDataII) {
    let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1], refEndPointsPerp[index])
    // let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
    targetEndPoints[index - 1][1].coords.x = parallelPathDatasIntersectingPoint.x
    targetEndPoints[index - 1][1].coords.y = parallelPathDatasIntersectingPoint.y
    targetEndPoints[index][0].coords.x = parallelPathDatasIntersectingPoint.x
    targetEndPoints[index][0].coords.y = parallelPathDatasIntersectingPoint.y
}



// let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = parallelPathDatasIntersectingPoint.y
// targetEndPoints[index][0].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = parallelPathDatasIntersectingPoint.y

// // J
// let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = parallelPathDatasIntersectingPoint.y
// targetEndPoints[index][0].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = parallelPathDatasIntersectingPoint.y


// let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(targetEndPoints[index - 1][0].coords.x, targetEndPoints[index - 1][0].coords.y, targetEndPoints[index - 1][1].coords.x, targetEndPoints[index - 1][1].coords.y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = parallelPathDatasIntersectingPoint.y
// targetEndPoints[index][0].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = parallelPathDatasIntersectingPoint.y


// let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(refEndPointsPerp[index-1][0].x, refEndPointsPerp[index-1][0].y, refEndPointsPerp[index-1][1].x, refEndPointsPerp[index-1][1].y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = parallelPathDatasIntersectingPoint.y
// targetEndPoints[index][0].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = parallelPathDatasIntersectingPoint.y


// let parallelPathDatasIntersectingPoint = findIntersectingPointSIMPLER(targetEndPoints[index - 1][0].coords.x, targetEndPoints[index - 1][0].coords.y, targetEndPoints[index - 1][1].coords.x, targetEndPoints[index - 1][1].coords.y, refEndPointsPerp[index][0].x, refEndPointsPerp[index][0].y, refEndPointsPerp[index][1].x, refEndPointsPerp[index][1].y)
// targetEndPoints[index - 1][1].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index - 1][1].coords.y = parallelPathDatasIntersectingPoint.y
// targetEndPoints[index][0].coords.x = parallelPathDatasIntersectingPoint.x
// targetEndPoints[index][0].coords.y = parallelPathDatasIntersectingPoint.y