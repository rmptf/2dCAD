import {findIntersectingPointTwoFormats, findIntersectingPointSIMPLER} from '../../../drawParallelPath_functions/parallelPathFunctions.js'

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