import {findIntersectingPointTwoFormats} from '../parallelFigure_functions/parallelPathFunctions_NEW.js'

function IntersectionHandler_NoArc(parallelFigure) {
    this.parallelPathDatas = parallelFigure.parallelFigurePathDatas
    this.parallelPathDatas_perpendicular = parallelFigure.parallelFigurePathDatas_transformed
    this.parallelFigureObj = parallelFigure.parallelFigureObject
    this.index = null
    this.parallelProjections = null //TODO: rename this but figure out what it does
    // this.intersectionHandlerObject = {
    //     index: null,
    // }
}

//new
IntersectionHandler_NoArc.prototype.noArcIntersection_setPerpRefEndPointsToParallelProjections = function() {
    // AA_First_All
    console.log("AA_All")
    this.calculateAndSetParallelProjectionPoints()
}

IntersectionHandler_NoArc.prototype.noArcIntersection_firstPos = function() {
    // A
    console.log("A_ooo")
    this.setTargetEndPoints(0)
}

IntersectionHandler_NoArc.prototype.noArcIntersection_firstPos_nextIndexIsArc = function() {
    // B
    console.log("B_ooo")
    this.setTargetEndPoints(1)
}

IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isFirstSegment = function() {
    // C
    console.log("C_ooo")
    this.calculateAndSetIntersectionPoints([this.parallelPathDatas_perpendicular[this.index-1], false], [this.parallelPathDatas_perpendicular[this.index], false])
}

IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isSecondSegment = function() {
    // D
    console.log("D_ooo")
    this.calculateAndSetIntersectionPoints([this.parallelPathDatas[this.index-1], true], [this.parallelPathDatas_perpendicular[this.index], false])
}

IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_bothSegments = function() {
    // E
    console.log("E_ooo")
    this.parallelFigureObj.parallelPathSegmentCounter_SECOND = 0
}

IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_notLastPos_prevIndexIsArc = function() {
    // F
    console.log("F_ooo")
    // Empty
}

IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArv_nextIndexIsArc = function() {
    // G
    console.log("G_ooo")
    this.setTargetEndPoints(1)
}

IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isFirstSegment = function() {
    // H
    console.log("H_ooo")
    this.calculateAndSetIntersectionPoints([this.parallelPathDatas_perpendicular[this.index-1], false], [this.parallelPathDatas_perpendicular[this.index], false])
}

IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isSecondSegment = function() {
    // J
    console.log("J_ooo")
    this.calculateAndSetIntersectionPoints([this.parallelPathDatas[this.index-1], true], [this.parallelPathDatas_perpendicular[this.index], false])
}

IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_bothSegments = function() {
    // K
    console.log("K_ooo")
    this.parallelFigureObj.parallelPathSegmentCounter_SECOND = 0
}

IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_lastPos_prevIndexIsArc = function() {
    // L
    console.log("L_ooo")
    // Empty
}

IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction = function() {
    // // M
    console.log("M_ooo")
    this.setTargetEndPoints(1)
}

// AA_FIRST_ALL
IntersectionHandler_NoArc.prototype.calculateAndSetParallelProjectionPoints = function () { //TODO: why do i have this and calcParallelProjections() in sorter?
    this.parallelPathDatas_perpendicular[this.index][0].x = this.parallelProjections.thisPointX
    this.parallelPathDatas_perpendicular[this.index][0].y = this.parallelProjections.thisPointY
    this.parallelPathDatas_perpendicular[this.index][1].x = this.parallelProjections.nextPointX
    this.parallelPathDatas_perpendicular[this.index][1].y = this.parallelProjections.nextPointY

}

// C, D, H, J
IntersectionHandler_NoArc.prototype.calculateAndSetIntersectionPoints = function(data1, data2) {
    let intersectionPoint =  findIntersectingPointTwoFormats([data1[0], data1[1]], [data2[0], data2[1]])
    this.parallelPathDatas[this.index - 1][1].coords.x = intersectionPoint.x
    this.parallelPathDatas[this.index - 1][1].coords.y = intersectionPoint.y
    this.parallelPathDatas[this.index][0].coords.x = intersectionPoint.x
    this.parallelPathDatas[this.index][0].coords.y = intersectionPoint.y
}

// A, B, G, M
IntersectionHandler_NoArc.prototype.setTargetEndPoints = function(side) { //TODO: rename this function once u figure out wht parallelProjections are (rename to smthng like: setParallelPathDatasToProjectedPathDatas())
    let referenceCoords = {
        x: (side === 0) ? this.parallelProjections.thisPointX : this.parallelProjections.nextPointX,
        y: (side === 0) ? this.parallelProjections.thisPointY : this.parallelProjections.nextPointY
    }
    this.parallelPathDatas[this.index][side].coords.x = referenceCoords.x
    this.parallelPathDatas[this.index][side].coords.y = referenceCoords.y
}

// // E, K
// this.parallelFigureObj.parallelPathSegmentCounter_SECOND = 0

export {
    IntersectionHandler_NoArc
}












// targetEndPoints          ===         parallelPathDatas_globalRef                     ===         parallelFigurePathDatas
// refEndPointsPerp         ===         parallelPathDatasCopyForPerpendicular           ===         parallelFigurePathDatas_transformed

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
// this.parallelFigurePathDatas_transformed = transformData(this.parallelFigurePathDatas)

