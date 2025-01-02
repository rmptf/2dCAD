import {ReferenceFigure} from '../../ReferenceFigure/ReferenceFigure_Class.js'
import {findIntersectingPointTwoFormats} from '../parallelFigure_functions/parallelPathFunctions_NEW.js'

function IntersectionHandler_NoArc(parallelFigure) {
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.originalPathDatasPlusFillers = parallelFigure.originalFigurePathDatas_plusFillers
    this.parallelPathDatas = parallelFigure.parallelFigurePathDatas
    this.parallelPathDatas_perpendicular = parallelFigure.parallelFigurePathDatas_perpendicularProjections
    this.parallelFigureObj = parallelFigure.parallelFigureObject
    // this.origPathDataRefPointsForParPerpProj = null
    this.index = null



    // let svgFigure = parallelFigure.svgFigure
    // this.referenceFigure_01 = new ReferenceFigure(svgFigure, false)
    // this.referenceFigure_01.addCircle({palette: 1, circRad: 10, fillClr: 2}, 1)
    // this.referenceFigure_02 = new ReferenceFigure(svgFigure, false)
    // this.referenceFigure_02.addCircle({palette: 2, circRad: 10, fillClr: 2}, 1)
    // this.referenceFigure_03 = new ReferenceFigure(svgFigure, false)
    // this.referenceFigure_03.addCircle({palette: 3, circRad: 10, fillClr: 2}, 1)
    // this.referenceFigure_04 = new ReferenceFigure(svgFigure, false)
    // this.referenceFigure_04.addCircle({palette: 4, circRad: 10, fillClr: 2}, 1)
}

IntersectionHandler_NoArc.prototype.noArcIntersection_setPerpRefEndPointsToParallelProjections = function() {
    // AA_First_All
    console.log("AA_All")
    this.calcParallelProjections(this.getRefPointAtIndexIfNotFiller()) //TODO: this is where parallelprojections are created
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
    // this.calculateAndSetIntersectionPoints([this.parallelPathDatas[this.index-1], false], [this.parallelPathDatas[this.index], false])
}

IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isSecondSegment = function() {
    // D
    console.log("D_ooo")
    // this.calculateAndSetIntersectionPoints([this.parallelPathDatas[this.index-1], true], [this.parallelPathDatas_perpendicular[this.index], false]) //TODO: is this never used?
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
    // this.calculateAndSetIntersectionPoints([this.parallelPathDatas[this.index-1], false], [this.parallelPathDatas[this.index], false])
}

IntersectionHandler_NoArc.prototype.noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isSecondSegment = function() {
    // J
    console.log("J_ooo")
    // this.calculateAndSetIntersectionPoints([this.parallelPathDatas[this.index-1], true], [this.parallelPathDatas_perpendicular[this.index], false]) //TODO: is this never used?
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
// This function sorts through all the originalPathDatasPlusFillers and weeds out the fillers, then sets which
// originalPathDatasPlusFillers should be used as a reference point to set the new Parallel Perpendicular Projected Points
// FIXME: START HERE
IntersectionHandler_NoArc.prototype.getRefPointAtIndexIfNotFiller = function() {
    // let origPathDatasPlusFillers = this.originalPathDatasPlusFillers
    // let parPathObj = this.parallelFigureObj
    // let thisOrigPathDataRefPtForParPerpProj
    // let nextOrigPathDataRefPtForParPerpProj
    // let fillerAdder = 0
    // let nextFillerAdder = 0
    // const isFiller = (index) => origPathDatasPlusFillers[index] === "filler"

    // const isFiller = (index) => this.originalPathDatasPlusFillers[index] === "filler"

    // if (isFiller(this.index) && !isFiller(this.index + 1)){
    //     fillerAdder = 1
    // }
    // if (isFiller(this.index) && isFiller(this.index + 1)){
    //     fillerAdder = -1
    // }
    // if (isFiller(this.index + 1)){
    //     nextFillerAdder = 1
    // }

    // if (parPathObj.removeornot_allParData === true) {
    //     thisOrigPathDataRefPtForParPerpProj = origPathDatasPlusFillers[this.index + fillerAdder]
    //     nextOrigPathDataRefPtForParPerpProj = origPathDatasPlusFillers[this.index + 1 + nextFillerAdder]
    // } else {
    //     console.log("ISDJFIODSJFOSDIJFOSIDJOFSIJFISJ")
    //     let thisRemoveIndex = parPathObj.removeStartIndex
    //     let nextRemoveIndex = thisRemoveIndex + 1
    //     if(this.index <= thisRemoveIndex) {
    //         thisOrigPathDataRefPtForParPerpProj = origPathDatasPlusFillers[this.index + fillerAdder]
    //         nextOrigPathDataRefPtForParPerpProj = origPathDatasPlusFillers[this.index + 1 + nextFillerAdder]
    //     }
    //     else if(this.index >= nextRemoveIndex) {
    //         thisOrigPathDataRefPtForParPerpProj = origPathDatasPlusFillers[this.index + 1 + fillerAdder]
    //         nextOrigPathDataRefPtForParPerpProj = origPathDatasPlusFillers[this.index + 2 + nextFillerAdder]
    //     }
    //     else {
    //         console.log("Not_Handled_RemoveIndex")
    //     }
    // }

    // this.origPathDataRefPointsForParPerpProj = [thisOrigPathDataRefPtForParPerpProj, nextOrigPathDataRefPtForParPerpProj]


    let thisOrigPathDataRefPtForParPerpProj
    let nextOrigPathDataRefPtForParPerpProj
    let fillerAdder = 0
    let nextFillerAdder = 0
    const isFiller = (index) => this.originalPathDatasPlusFillers[index] === "filler"

    if (isFiller(this.index) && !isFiller(this.index + 1)){
        // console.log("do_I_run_111")
        fillerAdder = 1
    }
    if (isFiller(this.index) && isFiller(this.index + 1)){  // FIXME: I dont think this ever runs (was built for removeParPaths)
        // console.log("do_I_run_222")
        fillerAdder = -1
    }
    if (isFiller(this.index + 1)){  // FIXME: I dont think this ever runs (was built for removeParPaths)
        // console.log("do_I_run_333")
        nextFillerAdder = 1
    }

    //old
    // thisOrigPathDataRefPtForParPerpProj = this.originalPathDatasPlusFillers[this.index + fillerAdder]
    // nextOrigPathDataRefPtForParPerpProj = this.originalPathDatasPlusFillers[this.index + 1 + nextFillerAdder]
    //new
    thisOrigPathDataRefPtForParPerpProj = this.originalFigurePathDatas[this.index + 0]
    nextOrigPathDataRefPtForParPerpProj = this.originalFigurePathDatas[this.index + 1]

    // if(this.index === 1) {
    //     this.referenceFigure_01.runFunctions([[thisOrigPathDataRefPtForParPerpProj.coords.x, thisOrigPathDataRefPtForParPerpProj.coords.y]])
    //     this.referenceFigure_02.runFunctions([[this.originalFigurePathDatas[this.index + 1].coords.x, this.originalFigurePathDatas[this.index + 1].coords.y]])
    //     this.referenceFigure_03.runFunctions([[this.originalFigurePathDatas[this.index + 2].coords.x, this.originalFigurePathDatas[this.index + 2].coords.y]])
    // }

    return [thisOrigPathDataRefPtForParPerpProj, nextOrigPathDataRefPtForParPerpProj]
}

// AA_FIRST_ALL
// This takes the originalPathDataReferencePointsForParallelPerpendicularProjectionPoints and uses trig to set them AT the parallel perpendicular projection points
// (in two places at once rn, find a place for it) (i think does the same job differently and for diferent purposes)
IntersectionHandler_NoArc.prototype.calcParallelProjections = function(origPathDataRefPointsForParPerpProj) {
    let thisPathDataCoords = origPathDataRefPointsForParPerpProj[0].coords
    let nextPathDataCoords = origPathDataRefPointsForParPerpProj[1].coords
    let parallelDistance = this.parallelFigureObj.parallelDistance

    // Calculate the angle and sine/cosine values
    const angle = Math.atan2(thisPathDataCoords.y - nextPathDataCoords.y, thisPathDataCoords.x - nextPathDataCoords.x)
    const sinValue = Math.sin(angle)
    const cosValue = Math.cos(angle)

    // Function to calculate projected anchor points based on input coordinates and parallel distance
    let calcProjection = (coordVal, trigRatio, distance, subtract) => subtract ? coordVal - (distance * trigRatio) : coordVal + (distance * trigRatio)

    let thisPointX = calcProjection(thisPathDataCoords.x, sinValue, parallelDistance, true)
    let thisPointY = calcProjection(thisPathDataCoords.y, cosValue, parallelDistance, false)
    let nextPointX = calcProjection(nextPathDataCoords.x, sinValue, parallelDistance, true)
    let nextPointY = calcProjection(nextPathDataCoords.y, cosValue, parallelDistance, false)
    
    this.parallelPathDatas_perpendicular[this.index][0].x = thisPointX
    this.parallelPathDatas_perpendicular[this.index][0].y = thisPointY
    this.parallelPathDatas_perpendicular[this.index][1].x = nextPointX
    this.parallelPathDatas_perpendicular[this.index][1].y = nextPointY

    // this.parallelPathDatas[this.index][0].coords.x = thisPointX
    // this.parallelPathDatas[this.index][0].coords.y = thisPointY
    // this.parallelPathDatas[this.index][1].coords.x = nextPointX
    // this.parallelPathDatas[this.index][1].coords.y = nextPointY
}

// C, D, H, J
IntersectionHandler_NoArc.prototype.calculateAndSetIntersectionPoints = function(data1, data2) {
    let intersectionPoint =  findIntersectingPointTwoFormats([data1[0], data1[1]], [data2[0], data2[1]])
    //old
    // this.parallelPathDatas[this.index - 1][1].coords.x = intersectionPoint.x
    // this.parallelPathDatas[this.index - 1][1].coords.y = intersectionPoint.y
    // this.parallelPathDatas[this.index][0].coords.x = intersectionPoint.x
    // this.parallelPathDatas[this.index][0].coords.y = intersectionPoint.y
    //new
    this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_east.coords.x = intersectionPoint.x
    this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_east.coords.y = intersectionPoint.y
    this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west.coords.x = intersectionPoint.x
    this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west.coords.y = intersectionPoint.y

    // // Testing to make sure old and new match
    // // Log the new, draw the old: make sure they match
    // // log the new PathDatas
    // console.log("jshdfojsdofijsoijwerwerwrwrwerwerwerw")
    // console.log(this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west)
    // console.log(this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_east)
    // // draw the old PathDatas
    // if(this.index === 1) {
    //     this.referenceFigure_01.runFunctions([[this.parallelPathDatas[this.index - 1][1].coords.x, this.parallelPathDatas[this.index - 1][1].coords.y]])
    //     this.referenceFigure_02.runFunctions([[this.parallelPathDatas[this.index][0].coords.x, this.parallelPathDatas[this.index][0].coords.y]])
    // }
    // if(this.index === 2) {
    //     this.referenceFigure_03.runFunctions([[this.parallelPathDatas[this.index - 1][1].coords.x, this.parallelPathDatas[this.index - 1][1].coords.y]])
    //     this.referenceFigure_04.runFunctions([[this.parallelPathDatas[this.index][0].coords.x, this.parallelPathDatas[this.index][0].coords.y]])
    // }
}

// A, B, G, M
IntersectionHandler_NoArc.prototype.setTargetEndPoints = function(pdPos) { //TODO: rename this function once u figure out wht parallelProjections are (rename to smthng like: setParallelPathDatasToProjectedPathDatas())
    let referenceCoords = {
        x: (pdPos === 0) ? this.parallelPathDatas_perpendicular[this.index][0].x : this.parallelPathDatas_perpendicular[this.index][1].x,
        y: (pdPos === 0) ? this.parallelPathDatas_perpendicular[this.index][0].y : this.parallelPathDatas_perpendicular[this.index][1].y
    }
    // // //old
    // this.parallelPathDatas[this.index][pdPos].coords.x = referenceCoords.x
    // this.parallelPathDatas[this.index][pdPos].coords.y = referenceCoords.y
    //new
    if(pdPos === 0) {
        this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west.coords.x = referenceCoords.x
        this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west.coords.y = referenceCoords.y
    }
    if(pdPos === 1) {
        this.originalFigurePathDatas[this.index + 1].children.parallel_pathDatas.pathData_east.coords.x = referenceCoords.x
        this.originalFigurePathDatas[this.index + 1].children.parallel_pathDatas.pathData_east.coords.y = referenceCoords.y
    }

    // // Test to make sure it works: log the new, draw the old, and make sure they match.
    // // log the new
    // console.log("foijsdfoisjdfisjfidfdfdfdfsdfdsfdsfsfssdjf")
    // console.log(this.index)
    // console.log(pdPos)
    // console.log(this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west)
    // console.log(this.originalFigurePathDatas[this.index + 1].children.parallel_pathDatas.pathData_east)
    // // draw the old
    // if(this.index === 0) {
    //     this.referenceFigure_01.runFunctions([[this.parallelPathDatas[this.index][0].coords.x, this.parallelPathDatas[this.index][0].coords.y]])
    //     this.referenceFigure_02.runFunctions([[this.parallelPathDatas[this.index][1].coords.x, this.parallelPathDatas[this.index][1].coords.y]])
    // }
    // if(this.index === 2) {
    //     this.referenceFigure_03.runFunctions([[this.parallelPathDatas[this.index][0].coords.x, this.parallelPathDatas[this.index][0].coords.y]])
    //     this.referenceFigure_04.runFunctions([[this.parallelPathDatas[this.index][1].coords.x, this.parallelPathDatas[this.index][1].coords.y]])
    // }
}

// // E, K
// this.parallelFigureObj.parallelPathSegmentCounter_SECOND = 0

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

