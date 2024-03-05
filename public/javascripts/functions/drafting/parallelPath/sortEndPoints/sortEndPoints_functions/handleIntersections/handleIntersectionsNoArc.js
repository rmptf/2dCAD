import {findIntersectingPointTwoFormats, findIntersectingPointSIMPLER} from '../../../drawParallelPath_functions/parallelPathFunctions.js'
import {findLineMidpoint} from '../../../../../math/mathFunctions.js'
import {
    updateSVG_highlight_1_point_01,
    updateSVG_highlight_1_point_02,

    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01,
    updateSVG_highlight_2_points_1_line_01_A,
    updateSVG_highlight_2_points_1_line_01_B,
    
    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02,
    updateSVG_highlight_2_points_1_line_02_A,
    updateSVG_highlight_2_points_1_line_02_B,

    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_03,
    updateSVG_highlight_2_points_1_line_03_A,
    updateSVG_highlight_2_points_1_line_03_B,

    updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_04,
    updateSVG_highlight_2_points_1_line_04_A,
    updateSVG_highlight_2_points_1_line_04_B,
} from '../../../../../animate/updateSvg_forTesting/updateSvg_forTests_testing_largeArcFlag.js'

function noArcIntersection_setPerpRefEndPointsToParallelProjections(refEndPointsPerp, parallelProjections, index) {
    // AA_First_All
    calculateAndSetParallelProjectionPoints(refEndPointsPerp, parallelProjections, index)
}
function noArcIntersection_firstPos(targetEndPoints, index, parallelProjections) {
    // A
    console.log("A_ooo")
    setTargetEndPoints(targetEndPoints, index, parallelProjections, 0)
}
function noArcIntersection_firstPos_nextIndexIsArc(targetEndPoints, index, parallelProjections) {
    // B
    console.log("B_ooo")
    setTargetEndPoints(targetEndPoints, index, parallelProjections, 1)
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
function noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArv_nextIndexIsArc(targetEndPoints, index, parallelProjections) {
    // G
    console.log("G_ooo")
    setTargetEndPoints(targetEndPoints, index, parallelProjections, 1)
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
function noArcIntersection_notFirstPos_lastPos_prevIndexIsArc(targetEndPoints, parPathObj, index, self, prevJoiner) {
    // L
    console.log("L_ooo")
    // Empty

    // RIGHTHERE
    // RIGHTHERE
    
    // NEW_STUFF_ARCFLAG

    // if(!prevJoiner) {
    //     setLargeArcFlag(targetEndPoints, parPathObj, index, self)
    // }


    // RIGHTHERE
    // RIGHTHERE
}
function noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction(targetEndPoints, index, parallelProjections) {
    // M
    console.log("M_ooo")
    setTargetEndPoints(targetEndPoints, index, parallelProjections, 1)
}


// AA_FIRST_ALL
function calculateAndSetParallelProjectionPoints(refEndPointsPerp, parallelProjections, index) {
    refEndPointsPerp[index][0].x = parallelProjections.thisPointX
    refEndPointsPerp[index][0].y = parallelProjections.thisPointY
    refEndPointsPerp[index][1].x = parallelProjections.nextPointX
    refEndPointsPerp[index][1].y = parallelProjections.nextPointY
}
// C, D, H, J
function calculateAndSetIntersectionPoints(targetData, index, parallelEndPointsI, parallelEndPointsII) {
    let intersectionPoint =  findIntersectingPointTwoFormats(parallelEndPointsI, parallelEndPointsII)
    targetData[index - 1][1].coords.x = intersectionPoint.x
    targetData[index - 1][1].coords.y = intersectionPoint.y
    targetData[index][0].coords.x = intersectionPoint.x
    targetData[index][0].coords.y = intersectionPoint.y
}
// A, B, G, M
function setTargetEndPoints(targetData, index, referenceCoords, side) {
    targetData[index][side].coords.x = referenceCoords.x
    targetData[index][side].coords.y = referenceCoords.y
}
// E, K
// parPathObj.parallelPathSegmentCounter_SECOND = 0

export {
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
}




// RIGHTHERE
// RIGHTHERE



function setLargeArcFlag(targetEndPoints, parPathObj, index, self) {
    // console.log("set_arcflag_TurnedOFF")
    console.log("RUNNING_ARCFLAG_FLIPPERCHECKER")

    let prevTargetEndPoint = targetEndPoints[index - 2][1]
    let thisTargetEndPoint = targetEndPoints[index - 1][1]
    let midPointBetweenInts = findLineMidpoint(prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y, thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y)

    parPathObj.counter_INSIDE_shape = parPathObj.counter_INSIDE_shape + 1

    if(parPathObj.iterationCounter === 1) {
        // console.log("Should_be_FIRST_endPointSort_iteration")
        parPathObj.newARCFLAG_stuff_new.push(parPathObj.counter_INSIDE_shape)
        parPathObj.newARCFLAG_stuff[parPathObj.counter_INSIDE_shape] = {
            startPos_x1GreaterThanX2: isGreaterThan(midPointBetweenInts[0], thisTargetEndPoint.arc.center.x),
            startPos_y1GreaterThanY2: isGreaterThan(midPointBetweenInts[1], thisTargetEndPoint.arc.center.y)
        }
    }


    // console.log(parPathObj.newARCFLAG_stuff)
    // console.log(parPathObj.newARCFLAG_stuff[parPathObj.counter_INSIDE_shape])
    // console.log(parPathObj.newARCFLAG_stuff[parPathObj.counter_INSIDE_shape].startPos_x1GreaterThanX2)
    // console.log(parPathObj.counter_INSIDE_shape)

    let flipFlag = detectCrossover(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], parPathObj, index)

    const flipFlagAndFunction = (flipFlag, endPOINT) => {
        if (flipFlag) {
            endPOINT.arc.arcFlag = +!endPOINT.arc.arcFlag
        }
    }

    flipFlagAndFunction(flipFlag, thisTargetEndPoint)







    // if(index === 2) {
    //     updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_01([prevTargetEndPoint, thisTargetEndPoint], self)
    //     updateSVG_highlight_2_points_1_line_01_A([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], self)
    //     updateSVG_highlight_2_points_1_line_01_B(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], self)
    // }

    // if(index === 3) {
    //     updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_02([prevTargetEndPoint, thisTargetEndPoint], self)
    //     updateSVG_highlight_2_points_1_line_02_A([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], self)
    //     updateSVG_highlight_2_points_1_line_02_B(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], self)
    // }

    // if(index === 4 || index === 5) {
    //     updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_03([prevTargetEndPoint, thisTargetEndPoint], self)
    //     updateSVG_highlight_2_points_1_line_03_A([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], self)
    //     updateSVG_highlight_2_points_1_line_03_B(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], self)
    // }

    // if(index === 5 || index === 6) {
    //     updateSVG_highlight_1_path_3ways_arcFlag_sweepFlag_variations_04([prevTargetEndPoint, thisTargetEndPoint], self)
    //     updateSVG_highlight_2_points_1_line_04_A([prevTargetEndPoint.coords.x, prevTargetEndPoint.coords.y], [thisTargetEndPoint.coords.x, thisTargetEndPoint.coords.y], self)
    //     updateSVG_highlight_2_points_1_line_04_B(midPointBetweenInts, [thisTargetEndPoint.arc.center.x, thisTargetEndPoint.arc.center.y], self)
    // }
}

function detectCrossover(movingPoint, stationaryPoint, parPathObj, index) {
    let x1 = movingPoint[0]
    let y1 = movingPoint[1]
    let x2 = stationaryPoint[0]
    let y2 = stationaryPoint[1]
    let currentPos_x1GreaterThanX2 = isGreaterThan(x1, x2)
    let currentPos_Y1GreaterThanY2 = isGreaterThan(y1, y2)
    let flipFlag = false

    // console.log("CHECK123 X_Start: _" + parPathObj.newARCFLAG_stuff[parPathObj.counter_INSIDE_shape].startPos_x1GreaterThanX2 + "_ X_Now: _" + currentPos_x1GreaterThanX2 + "_")
    // console.log("CHECK123 Y_Start: _" + parPathObj.newARCFLAG_stuff[parPathObj.counter_INSIDE_shape].startPos_y1GreaterThanY2 + "_ Y_Now: _" + currentPos_Y1GreaterThanY2 + "_")

    if(parPathObj.newARCFLAG_stuff[parPathObj.counter_INSIDE_shape].startPos_x1GreaterThanX2 !== currentPos_x1GreaterThanX2 && parPathObj.newARCFLAG_stuff[parPathObj.counter_INSIDE_shape].startPos_y1GreaterThanY2 !== currentPos_Y1GreaterThanY2) {
        // console.log("CROSSED")
        flipFlag = true

        parPathObj.newARCFLAG_stuff[parPathObj.counter_INSIDE_shape].startPos_x1GreaterThanX2 = !parPathObj.newARCFLAG_stuff[parPathObj.counter_INSIDE_shape].startPos_x1GreaterThanX2
        parPathObj.newARCFLAG_stuff[parPathObj.counter_INSIDE_shape].startPos_y1GreaterThanY2 = !parPathObj.newARCFLAG_stuff[parPathObj.counter_INSIDE_shape].startPos_y1GreaterThanY2

        return flipFlag
    } else {
        // console.log("NO_CROSS")
    }

    return flipFlag
}

function isGreaterThan(num1, num2) {
    let greaterThan
    num1 > num2 ? greaterThan = true : greaterThan = false;
    return greaterThan
}

// RIGHTHERE
// RIGHTHERE