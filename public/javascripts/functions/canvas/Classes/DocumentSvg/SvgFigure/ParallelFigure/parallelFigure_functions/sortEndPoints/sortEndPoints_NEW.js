// import {getDistance} from '../../../math/mathFunctions.js'
// import {
//     arcIntersection_allArcSegments_everyIndex_firstAction,
//     arcIntersection_firstArcSegment_everyIndex_firstAction,
//     arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc,
//     arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc,
//     arcIntersection_firstArcSegment_fistIndex,
//     arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc,
//     arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc,
//     arcIntersection_secondArcSegment_everyIndex_firstAction,
//     arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected,
//     arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected,
//     arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc,
//     arcIntersection_secondArcSegment_lastIndex,
//     arcIntersection_secondArcSegment_everyIndex_lastAction,
//     disconnectedArcIntersection_thisIndexIsPathToArc,
//     disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc,
//     disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc,
//     disconnectedArcIntersection_thisIndexIsArcToArc,
//     disconnectedArcIntersection_prevIndexIsArcToArc,
//     disconnectedArcIntersection_prevIndexIsArcToPath,
//     disconnectedArcIntersection_skipThisIndex,
//     arcIntersection_allArcSegments_everyIndex_lastAction,
// } from './sortEndPoints_functions/handleIntersections/handleIntersectionsWithArc.js'

// import {
//     noArcIntersection_setPerpRefEndPointsToParallelProjections,
//     noArcIntersection_firstPos,
//     noArcIntersection_firstPos_nextIndexIsArc,
//     noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isFirstSegment,
//     noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isSecondSegment,
//     noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_bothSegments,
//     noArcIntersection_notFirstPos_notLastPos_prevIndexIsArc,
//     noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArv_nextIndexIsArc,
//     noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isFirstSegment,
//     noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isSecondSegment,
//     noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_bothSegments,
//     noArcIntersection_notFirstPos_lastPos_prevIndexIsArc,
//     noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction
// } from './sortEndPoints_functions/handleIntersections/handleIntersectionsNoArc.js'

// import {updateSVG_highlight_1_point_01, updateSVG_highlight_1_point_02, updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01, updateSVG_highlight_2_points_1_line_01, updateSVG_highlight_2_points_1_line_02} from '../../../animate/updateSvg_forTesting/updateSvg_forTests_testing_largeArcFlag.js'
// import {findLineMidpoint} from '../../../math/mathFunctions.js'
// import {updateSVG_highlight_1_point_01, updateSVG_highlight_1_point_02} from '../../../animate/updateSvg_forTesting/updateSvg_forTests_testing_largeArcFlag.js'


// function sortEndpoints(
//     targetEndPoints,
//     refEndPointsPerp,
//     refEndPointsBase,
//     documentFigureCount,
//     self,
//     index,
//     parallelPathObject,
//     skipperCheckers
// ) {
//     if (targetEndPoints[index][1].arc.exist === true) {
//         sort_endPoint_withArc(
//             targetEndPoints,
//             refEndPointsPerp,
//             refEndPointsBase,
//             documentFigureCount,
//             self,
//             index,
//             parallelPathObject,
//             skipperCheckers
//         )
//     } else {
//         sort_endPoint_noArc(
//             targetEndPoints,
//             refEndPointsPerp,
//             refEndPointsBase,
//             self,
//             index,
//             parallelPathObject
//         )
//     }
// }

// function sort_endPoint_withArc(
//     targetEndPoints,
//     refEndPointsPerp,
//     refEndPointsBase,
//     documentFigureCount,
//     self,
//     index,
//     parPathObj,
//     skipperCheckers
// ) {
//     const isJoiner = (newIndex) => targetEndPoints[newIndex][1].arc.joiner === true
//     const joinerType = (newIndex, code) => targetEndPoints[newIndex][1].arc.joiner === true && targetEndPoints[newIndex][1].arc.joinerSide === code
//     const arcExist = (newIndex) => targetEndPoints[newIndex][1].arc.exist === true
//     const firstPosition = (newIndex) => (newIndex) === 0
//     const lastPosition = (newIndex) => newIndex === targetEndPoints.length - 1
//     const includes = (list, newIndex) => list.includes(targetEndPoints[newIndex][1].arc.joinerSide)
//     let arcRadiusObject = []
//     arcRadiusObject.parDistAndDir

//     // TODO: Orgnazine Better
//     if(!firstPosition(index)) {
//         switch(true) {
//             case isJoiner(index):
//             case isJoiner(index - 1):
//                 handleDisconnectedArcIntersection()
//                 break
//             default:
//                 handleDefaultArcIntersection()
//         }
//     } else if (firstPosition(index)) {
//         switch(true) {
//             case isJoiner(index):
//             // case isJoiner(index - 1):
//                 handleDisconnectedArcIntersection()
//                 break
//             default:
//                 handleDefaultArcIntersection()
//         }
//     }


//     function handleDefaultArcIntersection() {
//         // 1
//         arcIntersection_allArcSegments_everyIndex_firstAction(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self) // TODO: (Set_arcRad)
//         switch(true) {
//             case parPathObj.parallelPathSegmentCounter_FIRST === 0:
//                 handleFirctArcSegment()
//                 break
//             default:
//                 handleSecondArcSegment()
//         }
//         // Final
//         arcIntersection_allArcSegments_everyIndex_lastAction(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self)
//     }

//     function handleFirctArcSegment() {
//         // 2
//         arcIntersection_firstArcSegment_everyIndex_firstAction(parPathObj)
//         switch(true) {
//             case !firstPosition(index):
//                 arcExist(index - 1) ?
//                     // 3
//                     arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) :
//                     // 4
//                     arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj);
//                 break
//             // 5
//             default: arcIntersection_firstArcSegment_fistIndex(targetEndPoints, refEndPointsBase, index, arcRadiusObject)
//         }
//         if(!firstPosition(index)) {
//             switch(true) {
//                 // 6_A
//                 case arcExist(index + 1): arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(targetEndPoints, parPathObj, index, self); break
//                 // 6_B
//                 default: arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
//             }
//         }
//     }



//     function handleSecondArcSegment() {
//         // 7
//         arcIntersection_secondArcSegment_everyIndex_firstAction(targetEndPoints, refEndPointsBase, index, arcRadiusObject, parPathObj, self)
//         switch(true) {
//             case !lastPosition(index):
//                 if(arcExist(index + 1)) {
//                     if(!includes(["AAA", "BBB", "CCC"], index + 1)) {
//                         // 8_A
//                         arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
//                     } else {
//                         // 8_B
//                         arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
//                     }
//                 } else {
//                     // 9
//                     arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
//                 }
//                 break
//                 // 10
//             default: arcIntersection_secondArcSegment_lastIndex(targetEndPoints, refEndPointsBase, index, arcRadiusObject, self)
//         }
//         // 11
//         arcIntersection_secondArcSegment_everyIndex_lastAction(targetEndPoints, parPathObj, index, self)
//     }

//     function handleDisconnectedArcIntersection() {
//         switch(true) {
//             // 1_Joiner
//             case joinerType(index, "AAA"): disconnectedArcIntersection_thisIndexIsPathToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj); break
//             case joinerType(index - 1, "AAA"): 
//                 arcExist(index + 1) ?
//                     // 2_A_Joiner
//                     disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self) // TODO: (Set_arcRad)
//                     :
//                     // 2_B_Joiner
//                     disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
//                 break
//             // 3_Joiner
//             case joinerType(index, "CCC"): disconnectedArcIntersection_thisIndexIsArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, arcRadiusObject); break
//             // 4_Joiner
//             case joinerType(index - 1, "CCC"):
//                 disconnectedArcIntersection_prevIndexIsArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, arcRadiusObject); // TODO: (Set_arcRad)
//                 break
//             // 5_Joiner
//             case joinerType(index, "BBB"): disconnectedArcIntersection_prevIndexIsArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj); break
//             // 6_Joiner
//             case skipperCheckers.skipperChecker_Arc: disconnectedArcIntersection_skipThisIndex(parPathObj)
//         }
//     }
// }



// function sortEndpoints(figure) {
//     if (targetEndPoints[index][1].arc.exist === true) {
//         sort_endPoint_withArc(figure)
//     } else {
//         sort_endPoint_noArc(figure)
//     }
// }

function sort_endPoint_withArc(figure) {
    let thisIndex = figure.parallelPathObject.index
    let parallelPathDatas = thisFigure.parallelPathDatas_globalRef

    const isJoiner = (targetIndex) => parallelPathDatas[targetIndex][1].arc.joiner === true
    const joinerType = (targetIndex, code) => parallelPathDatas[targetIndex][1].arc.joiner === true && parallelPathDatas[targetIndex][1].arc.joinerSide === code
    const arcExist = (targetIndex) => parallelPathDatas[targetIndex][1].arc.exist === true
    const firstPosition = (targetIndex) => (targetIndex) === 0
    const lastPosition = (targetIndex) => targetIndex === parallelPathDatas.length - 1
    const includes = (list, targetIndex) => list.includes(parallelPathDatas[targetIndex][1].arc.joinerSide)
    let arcRadiusObject = [] //FIXME: will have to place this somewhere
    arcRadiusObject.parDistAndDir //FIXME: will have to place this somewhere

    // TODO: Orgnazine Better
    if(!firstPosition(thisIndex)) {
        switch(true) {
            case isJoiner(thisIndex):
            case isJoiner(thisIndex - 1):
                handleDisconnectedArcIntersection()
                break
            default:
                handleDefaultArcIntersection()
        }
    } else if (firstPosition(thisIndex)) {
        switch(true) {
            case isJoiner(thisIndex):
            // case isJoiner(thisIndex - 1):
                handleDisconnectedArcIntersection()
                break
            default:
                handleDefaultArcIntersection()
        }
    }


    function handleDefaultArcIntersection() {
        // 1
        arcIntersection_allArcSegments_everyIndex_firstAction(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self) // TODO: (Set_arcRad)
        switch(true) {
            case parPathObj.parallelPathSegmentCounter_FIRST === 0:
                handleFirctArcSegment()
                break
            default:
                handleSecondArcSegment()
        }
        // Final
        arcIntersection_allArcSegments_everyIndex_lastAction(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self)
    }

    function handleFirctArcSegment() {
        // 2
        arcIntersection_firstArcSegment_everyIndex_firstAction(parPathObj)
        switch(true) {
            case !firstPosition(index):
                arcExist(index - 1) ?
                    // 3
                    arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) :
                    // 4
                    arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj);
                break
            // 5
            default: arcIntersection_firstArcSegment_fistIndex(targetEndPoints, refEndPointsBase, index, arcRadiusObject)
        }
        if(!firstPosition(index)) {
            switch(true) {
                // 6_A
                case arcExist(index + 1): arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(targetEndPoints, parPathObj, index, self); break
                // 6_B
                default: arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
            }
        }
    }



    function handleSecondArcSegment() {
        // 7
        arcIntersection_secondArcSegment_everyIndex_firstAction(targetEndPoints, refEndPointsBase, index, arcRadiusObject, parPathObj, self)
        switch(true) {
            case !lastPosition(index):
                if(arcExist(index + 1)) {
                    if(!includes(["AAA", "BBB", "CCC"], index + 1)) {
                        // 8_A
                        arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
                    } else {
                        // 8_B
                        arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
                    }
                } else {
                    // 9
                    arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
                }
                break
                // 10
            default: arcIntersection_secondArcSegment_lastIndex(targetEndPoints, refEndPointsBase, index, arcRadiusObject, self)
        }
        // 11
        arcIntersection_secondArcSegment_everyIndex_lastAction(targetEndPoints, parPathObj, index, self)
    }

    function handleDisconnectedArcIntersection() {
        switch(true) {
            // 1_Joiner
            case joinerType(index, "AAA"): disconnectedArcIntersection_thisIndexIsPathToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj); break
            case joinerType(index - 1, "AAA"): 
                arcExist(index + 1) ?
                    // 2_A_Joiner
                    disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self) // TODO: (Set_arcRad)
                    :
                    // 2_B_Joiner
                    disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
                break
            // 3_Joiner
            case joinerType(index, "CCC"): disconnectedArcIntersection_thisIndexIsArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, arcRadiusObject); break
            // 4_Joiner
            case joinerType(index - 1, "CCC"):
                disconnectedArcIntersection_prevIndexIsArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, arcRadiusObject); // TODO: (Set_arcRad)
                break
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
    const isJoiner = (newIndex) => targetEndPoints[newIndex][1].arc.joiner === true
    const joinerType = (newIndex, code) => targetEndPoints[newIndex][1].arc.joiner === true && targetEndPoints[newIndex][1].arc.joinerSide === code
    let thisIsArcToPath = false

    if(index > 1) {
        if(isJoiner(index - 1) && joinerType(index, "BBB")) {
            thisIsArcToPath = true
        } else {
            thisIsArcToPath = false
        }
    } 
    
    if(thisIsArcToPath === false) {
        const arcExist = (newIndex) => targetEndPoints[newIndex][1].arc.exist === true
        const firstPosition = (newIndex) => (newIndex) === 0
        const lastPosition = (newIndex) => newIndex === targetEndPoints.length - 1
        let pathDatasOutside = getRefPointAtIndexIfNotFiller(refEndPointsBase, index, parPathObj) // TODO: Fix like fixed in addSvgElement.js
        let parallelProjections = calcParallelProjections(pathDatasOutside[0].coords, pathDatasOutside[1].coords, parPathObj.parallelDistance)
    
        // AA_FIRST_ALL
        noArcIntersection_setPerpRefEndPointsToParallelProjections(refEndPointsPerp, parallelProjections, index)

        if (firstPosition(index)) {
            // A
            noArcIntersection_firstPos(targetEndPoints, index, {x: parallelProjections.thisPointX, y: parallelProjections.thisPointY})
            if(targetEndPoints.length !== 1) {
                if(arcExist(index + 1)) {
                    // B
                    noArcIntersection_firstPos_nextIndexIsArc(targetEndPoints, index, {x: parallelProjections.nextPointX, y: parallelProjections.nextPointY})
                }
            }
        }

        if (!firstPosition(index) && !lastPosition(index)) {
            if(!arcExist(index - 1)) {
                if( parPathObj.parallelPathSegmentCounter_SECOND === 0) {
                    // C (DC)
                    noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isFirstSegment(targetEndPoints, index, refEndPointsPerp)
                } else {
                    // D (C+)
                    noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isSecondSegment(targetEndPoints, index, refEndPointsPerp)
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
    
        // TODO: Orgnazine Better
        checkForAndRunLastPosition()
        function checkForAndRunLastPosition() {
            if (lastPosition(index)) {
                if(!firstPosition(index)) {
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
                        // TODO: fix this
                        let prevJoiner = false
                        if(isJoiner(index - 1)) {
                            prevJoiner = true
                        }
                        noArcIntersection_notFirstPos_lastPos_prevIndexIsArc(targetEndPoints, parPathObj, index, self, prevJoiner) // empty
                        return;
                    }
                }
                // M (Ia)
                noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction(targetEndPoints, index, {x: parallelProjections.nextPointX, y: parallelProjections.nextPointY})
            }
        }
    }
}

export {
    sortEndpoints,
    sort_endPoint_withArc,
    sort_endPoint_noArc
}




function getRefPointAtIndexIfNotFiller(refEndPointsBase, index, parPathObj) {
    let thisPathDataOutside
    let nextPathDataOutside
    let fillerAdder = 0
    let nextFillerAdder = 0
    const isFiller = (newIndex) => refEndPointsBase[newIndex] === "filler"

    if (isFiller(index) && !isFiller(index + 1)){
        fillerAdder = 1
    }
    if (isFiller(index) && isFiller(index + 1)){
        fillerAdder = -1
    }
    if (isFiller(index + 1)){
        nextFillerAdder = 1
    }

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

    return [thisPathDataOutside, nextPathDataOutside]
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
function calcArcParDistance(arcRadiusObject, nextRefEndPointBase, distance) {
    arcRadiusObject.parDistAndDir = (nextRefEndPointBase.arc.sweepFlag === 0) ? distance : distance * -1
    let nextArcToCenterTotalDistance = getDistance(nextRefEndPointBase.coords.x, nextRefEndPointBase.coords.y, nextRefEndPointBase.arc.center.x, nextRefEndPointBase.arc.center.y)
    let nextArcToCenterMinusPointerToArcFromArc1 = nextArcToCenterTotalDistance - arcRadiusObject.parDistAndDir
    return nextArcToCenterMinusPointerToArcFromArc1
}



































// Priority Issues
// FIXED
// some shapes need a function to set the correct large arc flag
// exampless: F1, F2, F3, F4

// FIXED
// a problem with the fix for above:
// the arc setter runs before interset points are set, doesnt always, but would eventaully have an effect on the arc set
// haave to set them to run after all intersectors run

// FIXED (different problem and solution as below but fixed.)
// arc 2 arc not connected isnt working correctly on some shapes, need to handle the first and second arcs from the SECOND shape
// (similar to wobble line on arc 2 arc shapes connected)
// example: F2

// FIXED
// big shapes having errors when moving parallel line too fast

// FIXED
// Fixed the above 2 issues, but the fix has caused error in arc at first index

// FIXME: 
// some shapes still dont set arc flag correctly

// FIXME:
// some jiggly shape in large blob, marked in shaves shapes





// FIXME: (might be another file)
// parallel paths on multiple shapes on one doc dont work correctly

// Small Issues
// FIXME:
// in shape arc 2 arc; when the original path two arce overlap, the parallel line picks the incorrect arc intersection to follow
// also affects add filler shape
// example: F3


// FIXED
// Joiner paths dont go in correct direction
// FIXED
// Mostly fixed above, but still not perfect for shape with a2a and sweep flags go to one direction
// example: F8
// FIXED
// Mostly fixed above but not accounting for fillers
// exmaple: F8
// FIXED
// parallel path doesnt work perfectly (doesnt go above and below line correctly just below or just above) when path point1 and path point2 are horizontally parellel with each other (and potentially when they are vertically parellel with each other)
// FIXED
// curve on last path doesnt work
// FIXED
// curve on first path doesnt work
// FIXED
// Fixed part of above but curve on first path not connected doesnt work.
// FIXED
// 1 path doesnt work
// FIXED
// in some arc - arc shapes, the arc - arc connection will not find the correct circle intersection to follow
// example F6
// FIXED
// in some arc - arc shapes, if the connection is too smooth it will create a wobbly intersection while dragging par path
// example F9
// FIXED
// fixed jiggling from above but causing errors on multiple a2as with no contact
// example F10
// FIXED
// curve on second to last point causes bug on las point when it has a joiner (arc - joiner - path)
// FIXED
// Cant make arc - path - arc. Need arc - path - path - arc currently. Specifically: arc(with filler) - path - arc (with filler) not working.
// FIXED
// in some arc - arc shapes, when the arcs are ver close to being not connected, if you click secondary path on the side of origPath that makes the two arcs not connected, the parallelpath will start with a non connected shape and ruin the counting of each point
// example: F8 shape