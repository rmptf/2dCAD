import {getDistance} from '../../../math/mathFunctions.js'
import {
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
} from './sortEndPoints_functions/handleIntersections/handleIntersectionsWithArc.js'

import {
    noArcIntersection_setPerpRefEndPointsToParallelProjections,
    noArcIntersection_firstPos,
    noArcIntersection_firstPos_nextIndexIsArc,
    noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isFirstSegment,
    noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isSecondSegment,
    noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_bothSegments,
    noArcIntersection_notFirstPos_notLastPos_prevIndexIsArc,
    noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArv_nextIndexIsArc,
    noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isFirstSegment,
    noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isSecondSegment,
    noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_bothSegments,
    noArcIntersection_notFirstPos_lastPos_prevIndexIsArc,
    noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction
} from './sortEndPoints_functions/handleIntersections/handleIntersectionsNoArc.js'

function sortEndpoints(
    targetEndPoints,
    refEndPointsPerp,
    refEndPointsBase,
    documentFigureCount,
    self,
    index,
    parallelPathObject,
    skipperCheckers
) {
    if (targetEndPoints[index][1].arc.exist === true) {
        sort_endPoint_withArc(
            targetEndPoints,
            refEndPointsPerp,
            refEndPointsBase,
            documentFigureCount,
            self,
            index,
            parallelPathObject,
            skipperCheckers
        )
    } else {
        sort_endPoint_noArc(
            targetEndPoints,
            refEndPointsPerp,
            refEndPointsBase,
            self,
            index,
            parallelPathObject
        )
    }
}

// FIXME:
// path to arc wasnt working correct after the first path switched up code there but untested
// FIXME:
// curve on first path doesnt work
// FIXME:
// curve on second to last point causes bug on las point when it has a joiner
// FIXME:
// parallel path doesnt work perfectly when path point1 and path point2 are horizontally parellel with each other (and potentially when they are vertically parellel with each other)
// FIXME:

function sort_endPoint_withArc(
    targetEndPoints,
    refEndPointsPerp,
    refEndPointsBase,
    documentFigureCount,
    self,
    index,
    parPathObj,
    skipperCheckers
) {
    // let baseArcToCursorDist
    let handleArcsObject = []
    handleArcsObject.baseArcToCursorDist

    // handle any path / arc interaction no filler
    if(refEndPointsBase[index] !== "filler") {
        if(refEndPointsBase[index + 1] !== "filler"){
            console.log("CHECKER_111")
            targetEndPoints[index][1].arc.radius = calcArcParDistance(handleArcsObject, refEndPointsBase[index + 1], parPathObj.parallelDistance)
        }
    }
    // handle arc / arc interaction with filler
    if(refEndPointsBase[index] === "filler" && refEndPointsBase[index - 1].arc.exist === true && refEndPointsBase[index - 2].arc.exist === true) {
        if(refEndPointsBase[index + 1] !== "filler"){
            console.log("CHECKER_222")
            targetEndPoints[index][1].arc.radius = calcArcParDistance(handleArcsObject, refEndPointsBase[index + 1], parPathObj.parallelDistance)
        }
    }

    const isJoiner = (newIndex) => targetEndPoints[newIndex][1].arc.joiner === true
    const joinerType = (newIndex, code) => targetEndPoints[newIndex][1].arc.joiner === true && targetEndPoints[newIndex][1].arc.joinerSide === code
    const arcExist = (newIndex) => targetEndPoints[newIndex][1].arc.exist === true
    const firstPosition = (newIndex) => (newIndex) === 0
    const lastPosition = (newIndex) => newIndex === targetEndPoints.length - 1
    const includes = (list, newIndex) => list.includes(targetEndPoints[newIndex][1].arc.joinerSide)
    
    switch(true) {
        case isJoiner(index):
        case isJoiner(index - 1):
            handleDisconnectedArcIntersection()
            break
        default:
            handleDefaultArcIntersection()
    }
    
    function handleDefaultArcIntersection() {
        // 1
        arcIntersection_allArcSegments_everyIndex_firstAction(parPathObj)
        switch(true) {
            case parPathObj.parallelPathSegmentCounter_FIRST === 0:
                handleFirctArcSegment()
                break
            default:
                handleSecondArcSegment()
        }
    }
    
    function handleFirctArcSegment() {
        // 2
        arcIntersection_firstArcSegment_everyIndex_firstAction(parPathObj)
        switch(true) {
            case !firstPosition(index):
                arcExist(index - 1) ?
                    // 3
                    arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc() :
                    // 4
                    arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj);
                break
            // 5
            default: arcIntersection_firstArcSegment_fistIndex(targetEndPoints, refEndPointsBase, index, handleArcsObject)
        }
        switch(true) {
            // 6_A
            case arcExist(index + 1): arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(targetEndPoints, index); break
            // 6_B
            default: arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
        }
    }
    
    function handleSecondArcSegment() {
        // 7
        arcIntersection_secondArcSegment_everyIndex_firstAction(targetEndPoints, refEndPointsBase, index, handleArcsObject)
        switch(true) {
            case !lastPosition(index):
                if(arcExist(index + 1)) {
                    if(!includes(["AAA", "BBB", "CCC"], index + 1)) {
                        // 8
                        arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
                    }
                } else {
                    // 9
                    arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
                }
                break
                // 10
            default: arcIntersection_secondArcSegment_lastIndex(targetEndPoints, refEndPointsBase, index, handleArcsObject)
        }
        // 11
        arcIntersection_secondArcSegment_everyIndex_lastAction(parPathObj)
    }
    
    function handleDisconnectedArcIntersection() {
        switch(true) {
            // 1_Joiner
            case joinerType(index, "AAA"): disconnectedArcIntersection_thisIndexIsPathToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj); break
            case joinerType(index - 1, "AAA"): 
                arcExist(index + 1) ?
                    // 2_A_Joiner
                    disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc(parPathObj) :
                    // 2_B_Joiner
                    disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj);
                break
            // 3_Joiner
            case joinerType(index, "CCC"): disconnectedArcIntersection_thisIndexIsArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj); break
            // 4_Joiner
            case joinerType(index - 1, "CCC"): disconnectedArcIntersection_prevIndexIsArcToArc(parPathObj); break
            // 5_Joiner
            case joinerType(index, "BBB"): disconnectedArcIntersection_prevIndexIsArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj); break
            // 6_Joiner
            case skipperCheckers.skipperChecker_Arc: disconnectedArcIntersection_skipThisIndex(parPathObj)
        }
    }
}






function sort_endPoint_noArc(
    targetEndPoints,
    refEndPointsPerp,
    refEndPointsBase,
    self,
    index,
    parPathObj
) {
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

        let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parPathObj.parallelDistance)

        // AA_FIRST_ALL
        noArcIntersection_setPerpRefEndPointsToParallelProjections(refEndPointsPerp, parallelProjections, index)

        findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke()
        function findParallelPathIntersectingPoint_fixedvisualbug_arcsbroke() {
            const arcExist = (newIndex) => targetEndPoints[newIndex][1].arc.exist === true
            const firstPosition = (newIndex) => (newIndex) === 0
            const lastPosition = (newIndex) => newIndex === targetEndPoints.length - 1

            if (firstPosition(index)) {
                // A
                noArcIntersection_firstPos(targetEndPoints, index, {x: parallelProjections.thisPointX, y: parallelProjections.thisPointY})
                if(arcExist(index + 1)) {
                    // B
                    noArcIntersection_firstPos_nextIndexIsArc(targetEndPoints, index, {x: parallelProjections.nextPointX, y: parallelProjections.nextPointY})
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
                    noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArv_nextIndexIsArc(targetEndPoints, index, {x: parallelProjections.nextPointX, y: parallelProjections.nextPointY})
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
                noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction(targetEndPoints, index, {x: parallelProjections.nextPointX, y: parallelProjections.nextPointY})
            }
        }
    }
}

export {
    sortEndpoints
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

// TODO: keep here or move?
// Working on this function (not 100% sure what it does)
function calcArcParDistance(handleArcsObject, nextRefEndPointBase, distance) {
    handleArcsObject.baseArcToCursorDist = (nextRefEndPointBase.arc.sweepFlag === 0) ? distance : distance * -1
    let nextArcToCenterTotalDistance = getDistance(nextRefEndPointBase.coords.x, nextRefEndPointBase.coords.y, nextRefEndPointBase.arc.center.x, nextRefEndPointBase.arc.center.y)
    let nextArcToCenterMinusPointerToArcFromArc1 = nextArcToCenterTotalDistance - handleArcsObject.baseArcToCursorDist
    return nextArcToCenterMinusPointerToArcFromArc1
}