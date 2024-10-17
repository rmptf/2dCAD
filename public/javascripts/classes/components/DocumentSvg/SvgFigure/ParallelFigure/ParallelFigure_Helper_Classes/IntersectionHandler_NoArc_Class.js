import {findIntersectingPointTwoFormats} from '../parallelFigure_functions/parallelPathFunctions_NEW.js'

function IntersectionHandler_NoArc(parallelFigure) {
    this.originalPathDatasPlusFillers = parallelFigure.originalFigurePathDatas_plusFillers
    this.parallelPathDatas = parallelFigure.parallelFigurePathDatas
    this.parallelPathDatas_perpendicular = parallelFigure.parallelFigurePathDatas_transformed
    this.parallelFigureObj = parallelFigure.parallelFigureObject
    this.pathDatasOutside = null
    this.index = null
}

IntersectionHandler_NoArc.prototype.noArcIntersection_setPerpRefEndPointsToParallelProjections = function() {
    // AA_First_All
    console.log("AA_All")
    this.getRefPointAtIndexIfNotFiller()
    this.calcParallelProjections()
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
// Write a good comment to describe what this does: might need some refactoring (very old function)
IntersectionHandler_NoArc.prototype.getRefPointAtIndexIfNotFiller = function() {
    let refEndPointsBase = this.originalPathDatasPlusFillers
    let parPathObj = this.parallelFigureObj
    let thisPathDataOutside
    let nextPathDataOutside
    let fillerAdder = 0
    let nextFillerAdder = 0
    const isFiller = (newIndex) => refEndPointsBase[newIndex] === "filler"

    if (isFiller(this.index) && !isFiller(this.index + 1)){
        fillerAdder = 1
    }
    if (isFiller(this.index) && isFiller(this.index + 1)){
        fillerAdder = -1
    }
    if (isFiller(this.index + 1)){
        nextFillerAdder = 1
    }
    if (parPathObj.removeornot_allParData === true) {
        thisPathDataOutside = refEndPointsBase[this.index + fillerAdder]
        nextPathDataOutside = refEndPointsBase[this.index + 1 + nextFillerAdder]
    } else {
        let thisRemoveIndex = parPathObj.removeStartIndex
        let nextRemoveIndex = thisRemoveIndex + 1
        if(this.index <= thisRemoveIndex) {
            thisPathDataOutside = refEndPointsBase[this.index + fillerAdder]
            nextPathDataOutside = refEndPointsBase[this.index + 1 + nextFillerAdder]
        }
        else if(this.index >= nextRemoveIndex) {
            thisPathDataOutside = refEndPointsBase[this.index + 1 + fillerAdder]
            nextPathDataOutside = refEndPointsBase[this.index + 2 + nextFillerAdder]
        }
        else {
            console.log("Not_Handled_RemoveIndex")
        }
    }

    this.pathDatasOutside = [thisPathDataOutside, nextPathDataOutside]
}

// Write a good comment to describe what this does: might need some refactoring (very old function)
// (in two places at once rn, find a place for it) (i think does the same job differently and for diferent purposes)
IntersectionHandler_NoArc.prototype.calcParallelProjections = function() {
    let thisPathDataCoords = this.pathDatasOutside[0].coords
    let nextPathDataCoords = this.pathDatasOutside[1].coords
    let parallelDistance = this.parallelFigureObj.parallelDistance

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

    let thisPointX = calcProjection(thisPathDataCoordsX, sinValue, parallelDistance, true)
    let thisPointY = calcProjection(thisPathDataCoordsY, cosValue, parallelDistance, false)
    let nextPointX = calcProjection(nextPathDataCoordsX, sinValue, parallelDistance, true)
    let nextPointY = calcProjection(nextPathDataCoordsY, cosValue, parallelDistance, false)
    
    this.parallelPathDatas_perpendicular[this.index][0].x = thisPointX
    this.parallelPathDatas_perpendicular[this.index][0].y = thisPointY
    this.parallelPathDatas_perpendicular[this.index][1].x = nextPointX
    this.parallelPathDatas_perpendicular[this.index][1].y = nextPointY
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
        x: (side === 0) ? this.parallelPathDatas_perpendicular[this.index][0].x : this.parallelPathDatas_perpendicular[this.index][1].x,
        y: (side === 0) ? this.parallelPathDatas_perpendicular[this.index][0].y : this.parallelPathDatas_perpendicular[this.index][1].y
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

