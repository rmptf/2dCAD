// import {findIntersectingPointTwoFormats, findIntersectingPointSIMPLER} from '../../../drawParallelPath_functions/parallelPathFunctions.js'
import {findIntersectingPointTwoFormats} from '../parallelFigure_functions/parallelPathFunctions_NEW.js'

function IntersectionHandler_NoArc(parallelFigure) {
    this.ParFigure = parallelFigure

    this.intersectionHandlerObject = {
        fakeVar: null
    }

    // this.ParFigure = parallelFigure
    // this.ArcFlagSetter = new LargeArcFlagSetter(this.ParFigure)
    // this.Intersection_Contact = new Intersection_Contact(this.ParFigure)

    // this.intersectionHandlerObject = {
    //     isIntersectionConnected: true,
    // }
}

IntersectionHandler_NoArc.prototype.handleIntersection = function() {
    console.log("HANDLE_INTERSECTION")
}

export {
    IntersectionHandler_NoArc
}




//new
IntersectionHandler_NoArc.prototype.noArcIntersection_setPerpRefEndPointsToParallelProjections = function() {
    // // AA_First_All
    console.log("AA_All")
    calculateAndSetParallelProjectionPoints(this.ParFigure)
}
//old
// function noArcIntersection_setPerpRefEndPointsToParallelProjections(refEndPointsPerp, parallelProjections, index) {
//     // AA_First_All
//     calculateAndSetParallelProjectionPoints(refEndPointsPerp, parallelProjections, index)
// }


// noArcIntersection_firstPos(targetEndPoints, index, {x: parallelProjections.thisPointX, y: parallelProjections.thisPointY})

//new
IntersectionHandler_NoArc.prototype.noArcIntersection_firstPos = function() {
    // // A
    console.log("A_ooo")
    setTargetEndPoints(this.ParFigure, 0)
}
//old
// function noArcIntersection_firstPos(targetEndPoints, index, parallelProjections) {
//     // A
//     console.log("A_ooo")
//     setTargetEndPoints(targetEndPoints, index, parallelProjections, 0)
// }

//new
IntersectionHandler_NoArc.prototype.noArcIntersection_firstPos_nextIndexIsArc = function() {
    // // B
    console.log("B_ooo")
    setTargetEndPoints(this.ParFigure, 1)
}
//old
// function noArcIntersection_firstPos_nextIndexIsArc(targetEndPoints, index, parallelProjections) {
//     // B
//     console.log("B_ooo")
//     setTargetEndPoints(targetEndPoints, index, parallelProjections, 1)
// }

//new
IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isFirstSegment = function() {
    // C
    console.log("C_ooo")
    // calculateAndSetIntersectionPoints(targetEndPoints, index, [refEndPointsPerp[index - 1], false], [refEndPointsPerp[index], false])
    calculateAndSetIntersectionPoints(this.ParFigure, [-1, false], [0, false])
}
//old
// function noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isFirstSegment(targetEndPoints, index, refEndPointsPerp) {
//     // C
//     console.log("C_ooo")
//     calculateAndSetIntersectionPoints(targetEndPoints, index, [refEndPointsPerp[index - 1], false], [refEndPointsPerp[index], false])
// }

//new
IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isSecondSegment = function() {
    // D
    console.log("D_ooo")
    calculateAndSetIntersectionPoints(this.ParFigure, [-1, true], [0, false])
}
//old
// function noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isSecondSegment(targetEndPoints, index, refEndPointsPerp) {
//     // D
//     console.log("D_ooo")
//     calculateAndSetIntersectionPoints(targetEndPoints, index, [targetEndPoints[index - 1], true], [refEndPointsPerp[index], false])
// }

//new
IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_bothSegments = function() {
    // E
    console.log("E_ooo")
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_SECOND = 0
}
//old
// function noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_bothSegments(parPathObj) {
//     // E
//     console.log("E_ooo")
//     parPathObj.parallelPathSegmentCounter_SECOND = 0
// }

//new
IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_notLastPos_prevIndexIsArc = function() {
    // F
    console.log("F_ooo")
    // Empry
}
//old
// function noArcIntersection_notFirstPos_notLastPos_prevIndexIsArc() {
//     // F
//     console.log("F_ooo")
//     // Empry
// }

//new
IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArv_nextIndexIsArc = function() {
    // G
    console.log("G_ooo")
    setTargetEndPoints(this.ParFigure, 1)
}
//old
// function noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArv_nextIndexIsArc(targetEndPoints, index, parallelProjections) {
//     // G
//     console.log("G_ooo")
//     setTargetEndPoints(targetEndPoints, index, parallelProjections, 1)
// }

//new
IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isFirstSegment = function() {
    // H
    console.log("H_ooo")
    calculateAndSetIntersectionPoints(this.ParFigure, [-1, false], [0, false])
}
//old
// function noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isFirstSegment(targetEndPoints, index, refEndPointsPerp) {
//     // H
//     console.log("H_ooo")
//     calculateAndSetIntersectionPoints(targetEndPoints, index, [refEndPointsPerp[index - 1], false], [refEndPointsPerp[index], false])
// }

//new
IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isSecondSegment = function() {
    // J
    console.log("J_ooo")
    calculateAndSetIntersectionPoints(this.ParFigure, [-1, true], [0, false])
}
//old
// function noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isSecondSegment(targetEndPoints, index, refEndPointsPerp) {
//     // J
//     console.log("J_ooo")
//     calculateAndSetIntersectionPoints(targetEndPoints, index, [targetEndPoints[index - 1], true], [refEndPointsPerp[index], false])
// }

//new
IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_bothSegments = function() {
    // K
    console.log("K_ooo")
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_SECOND = 0
}
//old
// function noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_bothSegments(parPathObj) {
//     // K
//     console.log("K_ooo")
//     parPathObj.parallelPathSegmentCounter_SECOND = 0
// }

//new
IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_lastPos_prevIndexIsArc = function() {
    // L
    console.log("L_ooo")
    // Empty
}
//old
// function noArcIntersection_notFirstPos_lastPos_prevIndexIsArc(targetEndPoints, parPathObj, index, self, prevJoiner) {
//     // L
//     console.log("L_ooo")
//     // Empty
// }

//new
IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction = function() {
    // // M
    console.log("M_ooo")
    setTargetEndPoints(this.ParFigure, 1)
}
//old
// function noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction(targetEndPoints, index, parallelProjections) {
//     // M
//     console.log("M_ooo")
//     setTargetEndPoints(targetEndPoints, index, parallelProjections, 1)
// }








// AA_FIRST_ALL
//new
function calculateAndSetParallelProjectionPoints(parFigure) {
    let refEndPointsPerp = parFigure.parallelFigurePathDatas_transformed
    let parallelProjections = parFigure.IntersectionsSorter_NoArc.intersectionSorterObject.parallelProjections
    let index = parFigure.IntersectionsSorter_NoArc.intersectionSorterObject.index

    refEndPointsPerp[index][0].x = parallelProjections.thisPointX
    refEndPointsPerp[index][0].y = parallelProjections.thisPointY
    refEndPointsPerp[index][1].x = parallelProjections.nextPointX
    refEndPointsPerp[index][1].y = parallelProjections.nextPointY
}
//old
// function calculateAndSetParallelProjectionPoints(refEndPointsPerp, parallelProjections, index) {
//     refEndPointsPerp[index][0].x = parallelProjections.thisPointX
//     refEndPointsPerp[index][0].y = parallelProjections.thisPointY
//     refEndPointsPerp[index][1].x = parallelProjections.nextPointX
//     refEndPointsPerp[index][1].y = parallelProjections.nextPointY
// }

// C, D, H, J
//new
function calculateAndSetIntersectionPoints(parFigure, flag1, flag2) {

    // calculateAndSetIntersectionPoints(targetEndPoints, index, [refEndPointsPerp[index - 1], false], [refEndPointsPerp[index], false])

    let targetData = parFigure.parallelFigurePathDatas
    let index = parFigure.IntersectionsSorter_NoArc.intersectionSorterObject.index
    let parallelEndPointsI = [parFigure.parallelFigurePathDatas_transformed[index + flag1[0]], flag1[1]]
    let parallelEndPointsII = [parFigure.parallelFigurePathDatas_transformed[index + flag2[0]], flag2[1]]

    let intersectionPoint =  findIntersectingPointTwoFormats(parallelEndPointsI, parallelEndPointsII)
    // findIntersectingPointTwoFormats
    targetData[index - 1][1].coords.x = intersectionPoint.x
    targetData[index - 1][1].coords.y = intersectionPoint.y
    targetData[index][0].coords.x = intersectionPoint.x
    targetData[index][0].coords.y = intersectionPoint.y
}
//old
// // C, D, H, J
// function calculateAndSetIntersectionPoints(targetData, index, parallelEndPointsI, parallelEndPointsII) {
//     let intersectionPoint =  findIntersectingPointTwoFormats(parallelEndPointsI, parallelEndPointsII)
//     targetData[index - 1][1].coords.x = intersectionPoint.x
//     targetData[index - 1][1].coords.y = intersectionPoint.y
//     targetData[index][0].coords.x = intersectionPoint.x
//     targetData[index][0].coords.y = intersectionPoint.y
// }

//new
// A, B, G, M
function setTargetEndPoints(parFigure, side1) {
    let targetData = parFigure.parallelFigurePathDatas
    let index = parFigure.IntersectionsSorter_NoArc.intersectionSorterObject.index
    let parallelProjections = parFigure.IntersectionsSorter_NoArc.intersectionSorterObject.parallelProjections
    let side = side1
    let referenceCoords = {
        x: (side === 0) ? parallelProjections.thisPointX : parallelProjections.nextPointX,
        y: (side === 0) ? parallelProjections.thisPointY : parallelProjections.nextPointY
    }

    console.log("REF_COORDS")
    console.log(referenceCoords)

    targetData[index][side].coords.x = referenceCoords.x
    targetData[index][side].coords.y = referenceCoords.y
}
//old
// // A, B, G, M
// function setTargetEndPoints(targetData, index, referenceCoords, side) {
//     targetData[index][side].coords.x = referenceCoords.x
//     targetData[index][side].coords.y = referenceCoords.y
// }


// E, K
// parPathObj.parallelPathSegmentCounter_SECOND = 0