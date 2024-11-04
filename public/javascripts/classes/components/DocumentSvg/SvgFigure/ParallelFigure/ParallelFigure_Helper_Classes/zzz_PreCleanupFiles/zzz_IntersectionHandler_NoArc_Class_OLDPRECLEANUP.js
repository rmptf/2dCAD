import {findIntersectingPointTwoFormats} from '../parallelFigure_functions/parallelPathFunctions_NEW.js'

function IntersectionHandler_NoArc(parallelFigure) {
    this.parFigure_Class = parallelFigure

    this.parallelPathDatas = parallelFigure.parallelFigurePathDatas
    this.parallelPathDatas_perpendicular = parallelFigure.parallelFigurePathDatas_perpendicularProjections
    this.index = null
    this.parallelProjections = null

    // this.intersectionHandlerObject = {
    //     index: null,
    // }

    // this.parFigure_Class.parallelFigurePathDatas
    // this.parFigure_Class.parallelFigurePathDatas_perpendicularProjections
}

//new
IntersectionHandler_NoArc.prototype.noArcIntersection_setPerpRefEndPointsToParallelProjections = function() {
    // // AA_First_All
    console.log("AA_All")
    // calculateAndSetParallelProjectionPoints(this.parFigure_Class)
    this.calculateAndSetParallelProjectionPoints()
}
//old
// function noArcIntersection_setPerpRefEndPointsToParallelProjections(refEndPointsPerp, parallelProjections, index) {
//     // AA_First_All
//     calculateAndSetParallelProjectionPoints(refEndPointsPerp, parallelProjections, index)
// }

//new
IntersectionHandler_NoArc.prototype.noArcIntersection_firstPos = function() {
    // // A
    console.log("A_ooo")
    // setTargetEndPoints(this.parFigure_Class, 0)
    this.setTargetEndPoints(0)
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
    // setTargetEndPoints(this.parFigure_Class, 1)
    this.setTargetEndPoints(1)
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
    // calculateAndSetIntersectionPoints(this.parFigure_Class, [-1, false], [0, false])

    // let index = this.parFigure_Class.IntersectionsSorter_NoArc.intersectionSorterObject.index
    // calculateAndSetIntersectionPoints(this.parFigure_Class, index, [this.parFigure_Class.parallelFigurePathDatas_perpendicularProjections[index-1], false], [this.parFigure_Class.parallelFigurePathDatas_perpendicularProjections[index], false])

    this.calculateAndSetIntersectionPoints([this.parallelPathDatas_perpendicular[this.index-1], false], [this.parallelPathDatas_perpendicular[this.index], false])
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
    // calculateAndSetIntersectionPoints(targetEndPoints, index, [targetEndPoints[index - 1], true], [refEndPointsPerp[index], false])
    // calculateAndSetIntersectionPoints(this.parFigure_Class, [-1, true], [0, false])

    // let index = this.parFigure_Class.IntersectionsSorter_NoArc.intersectionSorterObject.index
    // calculateAndSetIntersectionPoints(this.parFigure_Class, index, [this.parFigure_Class.parallelFigurePathDatas[index-1], true], [this.parFigure_Class.parallelFigurePathDatas_perpendicularProjections[index], false])

    this.calculateAndSetIntersectionPoints([this.parallelPathDatas[this.index-1], true], [this.parallelPathDatas_perpendicular[this.index], false])
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
    this.parFigure_Class.parallelFigureObject.parallelPathSegmentCounter_SECOND = 0
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
    // setTargetEndPoints(this.parFigure_Class, 1)
    this.setTargetEndPoints(1)
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
    // calculateAndSetIntersectionPoints(targetEndPoints, index, [refEndPointsPerp[index - 1], false], [refEndPointsPerp[index], false])
    // calculateAndSetIntersectionPoints(this.parFigure_Class, [-1, false], [0, false])

    // let index = this.parFigure_Class.IntersectionsSorter_NoArc.intersectionSorterObject.index
    // calculateAndSetIntersectionPoints(this.parFigure_Class, index, [this.parFigure_Class.parallelFigurePathDatas_perpendicularProjections[index-1], false], [this.parFigure_Class.parallelFigurePathDatas_perpendicularProjections[index], false])

    this.calculateAndSetIntersectionPoints([this.parallelPathDatas_perpendicular[this.index-1], false], [this.parallelPathDatas_perpendicular[this.index], false])
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
    // calculateAndSetIntersectionPoints(targetEndPoints, index, [targetEndPoints[index - 1], true], [refEndPointsPerp[index], false])
    // calculateAndSetIntersectionPoints(this.parFigure_Class, [-1, true], [0, false])

    // let index = this.parFigure_Class.IntersectionsSorter_NoArc.intersectionSorterObject.index
    // calculateAndSetIntersectionPoints(this.parFigure_Class, index, [this.parFigure_Class.parallelFigurePathDatas[index-1], true], [this.parFigure_Class.parallelFigurePathDatas_perpendicularProjections[index], false])

    this.calculateAndSetIntersectionPoints([this.parallelPathDatas[this.index-1], true], [this.parallelPathDatas_perpendicular[this.index], false])
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
    this.parFigure_Class.parallelFigureObject.parallelPathSegmentCounter_SECOND = 0
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
    // setTargetEndPoints(this.parFigure_Class, 1)
    this.setTargetEndPoints(1)
}
//old
// function noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction(targetEndPoints, index, parallelProjections) {
//     // M
//     console.log("M_ooo")
//     setTargetEndPoints(targetEndPoints, index, parallelProjections, 1)
// }

// AA_FIRST_ALL
//new
// function calculateAndSetParallelProjectionPoints(parFigure) {
IntersectionHandler_NoArc.prototype.calculateAndSetParallelProjectionPoints = function () {
    this.parallelPathDatas_perpendicular[this.index][0].x = this.parallelProjections.thisPointX
    this.parallelPathDatas_perpendicular[this.index][0].y = this.parallelProjections.thisPointY
    this.parallelPathDatas_perpendicular[this.index][1].x = this.parallelProjections.nextPointX
    this.parallelPathDatas_perpendicular[this.index][1].y = this.parallelProjections.nextPointY

    // let refEndPointsPerp = parFigure.parallelFigurePathDatas_perpendicularProjections
    // let parallelProjections = parFigure.IntersectionsSorter_NoArc.intersectionSorterObject.parallelProjections
    // let index = parFigure.IntersectionsSorter_NoArc.intersectionSorterObject.index
    // refEndPointsPerp[index][0].x = parallelProjections.thisPointX
    // refEndPointsPerp[index][0].y = parallelProjections.thisPointY
    // refEndPointsPerp[index][1].x = parallelProjections.nextPointX
    // refEndPointsPerp[index][1].y = parallelProjections.nextPointY
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
// function calculateAndSetIntersectionPoints(parFigure, index, data1, data2) {
// function calculateAndSetIntersectionPoints(thisClass, data1, data2) {
IntersectionHandler_NoArc.prototype.calculateAndSetIntersectionPoints = function(data1, data2) {
    let intersectionPoint =  findIntersectingPointTwoFormats([data1[0], data1[1]], [data2[0], data2[1]])
    this.parallelPathDatas[this.index - 1][1].coords.x = intersectionPoint.x
    this.parallelPathDatas[this.index - 1][1].coords.y = intersectionPoint.y
    this.parallelPathDatas[this.index][0].coords.x = intersectionPoint.x
    this.parallelPathDatas[this.index][0].coords.y = intersectionPoint.y

    // let targetData = parFigure.parallelFigurePathDatas
    // findIntersectingPointTwoFormats
    // targetData[index - 1][1].coords.x = intersectionPoint.x
    // targetData[index - 1][1].coords.y = intersectionPoint.y
    // targetData[index][0].coords.x = intersectionPoint.x
    // targetData[index][0].coords.y = intersectionPoint.y

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
// function setTargetEndPoints(parFigure, side1) {
IntersectionHandler_NoArc.prototype.setTargetEndPoints = function(side) {
    let referenceCoords = {
        x: (side === 0) ? this.parallelProjections.thisPointX : this.parallelProjections.nextPointX,
        y: (side === 0) ? this.parallelProjections.thisPointY : this.parallelProjections.nextPointY
    }
    this.parallelPathDatas[this.index][side].coords.x = referenceCoords.x
    this.parallelPathDatas[this.index][side].coords.y = referenceCoords.y

    // let targetData = parFigure.parallelFigurePathDatas
    // let index = parFigure.IntersectionsSorter_NoArc.intersectionSorterObject.index
    // let parallelProjections = parFigure.IntersectionsSorter_NoArc.intersectionSorterObject.parallelProjections
    // let side = side
    // let referenceCoords = {
    //     x: (side === 0) ? parallelProjections.thisPointX : parallelProjections.nextPointX,
    //     y: (side === 0) ? parallelProjections.thisPointY : parallelProjections.nextPointY
    // }
    // targetData[index][side].coords.x = referenceCoords.x
    // targetData[index][side].coords.y = referenceCoords.y
}
//old
// // A, B, G, M
// function setTargetEndPoints(targetData, index, referenceCoords, side) {
//     targetData[index][side].coords.x = referenceCoords.x
//     targetData[index][side].coords.y = referenceCoords.y
// }


// E, K
// parPathObj.parallelPathSegmentCounter_SECOND = 0

export {
    IntersectionHandler_NoArc
}












// targetEndPoints          ===         parallelPathDatas_globalRef                     ===         parallelFigurePathDatas
// refEndPointsPerp         ===         parallelPathDatasCopyForPerpendicular           ===         parallelFigurePathDatas_perpendicularProjections

// OLD NAMES ORDER PASSED
// parallelPathDatas_globalRef,
// parallelPathDatasCopyForPerpendicular,
// basePathDatasCopy,
// originalFigure_counter_groupCount_GLOBAL,
// self,
// i,
// parallelPathObject,
// skipperCheckers

// OLD NAMES with new anmes ORDER RECIEVED
// targetEndPoints,
// refEndPointsPerp,
// refEndPointsBase,
// documentFigureCount,
// self,
// index,
// parallelPathObject,
// skipperCheckers

// OLD NAMES
// this.originalFigurePathDatas
// this.basePathDatasCopy
// this.parallelPathDatas_globalRef
// this.parallelPathDatasCopyForPerpendicular

//NEW NAMES
// // Figure Data
// this.originalFigurePathDatas = this.SvgFigure.svgPathDatas
// this.originalFigurePathDatas_plusFillers = copyPathDatas(this.originalFigurePathDatas) // maybe change the name to indicate that this is where "fillers" are placed.
// this.parallelFigurePathDatas = createParallelPathDatas(this.originalFigurePathDatas)
// this.parallelFigurePathDatas_perpendicularProjections = transformData(this.parallelFigurePathDatas)

