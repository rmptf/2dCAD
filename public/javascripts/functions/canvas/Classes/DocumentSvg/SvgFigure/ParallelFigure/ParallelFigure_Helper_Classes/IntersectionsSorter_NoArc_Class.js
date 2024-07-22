import {IntersectionHandler_NoArc} from './IntersectionHandler_NoArc_Class.js'

function IntersectionsSorter_NoArc(parallelFigure) {
    this.ParFigure = parallelFigure
    this.IntersectionHandler = new IntersectionHandler_NoArc(this.ParFigure)
    this.parallelPathDatas = this.ParFigure.parallelFigurePathDatas
    
    this.isJoiner = (newIndex) => this.parallelPathDatas[newIndex][1].arc.joiner === true
    this.joinerType = (newIndex, code) => this.parallelPathDatas[newIndex][1].arc.joiner === true && this.parallelPathDatas[newIndex][1].arc.joinerSide === code
    this.thisIsArcToPath = false
    this.arcExist = (newIndex) => this.parallelPathDatas[newIndex][1].arc.exist === true
    this.firstPosition = (newIndex) => (newIndex) === 0
    this.lastPosition = (newIndex) => newIndex === this.parallelPathDatas.length - 1


    this.intersectionSorterObject = {
        index: null,
        pathDatasOutside: null,
        parallelProjections: null,
    }
}

IntersectionsSorter_NoArc.prototype.sortIntersections = function() {
    console.log('SORTENDPOINTS_NOARC')
}

export {
    IntersectionsSorter_NoArc
}





// targetEndPoints,
// refEndPointsPerp,
// refEndPointsBase,
// self,
// index,
// parPathObj

IntersectionsSorter_NoArc.prototype.sortIntersections = function() {
// function sort_endPoint_noArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, self, index, parPathObj) {
    // const isJoiner = (newIndex) => targetEndPoints[newIndex][1].arc.joiner === true
    // const joinerType = (newIndex, code) => targetEndPoints[newIndex][1].arc.joiner === true && targetEndPoints[newIndex][1].arc.joinerSide === code
    // let thisIsArcToPath = false

    let index = this.intersectionSorterObject.index
    // let pathData = this. //FIXME: add this
    // console.log("sort_noArc")
    // console.log(index)
    // this.ParFigure

    if(index > 1) {
        if(this.isJoiner(index - 1) && this.joinerType(index, "BBB")) {
            this.thisIsArcToPath = true
        } else {
            this.thisIsArcToPath = false
        }
    } 
    
    if(this.thisIsArcToPath === false) {
        // const arcExist = (newIndex) => targetEndPoints[newIndex][1].arc.exist === true
        // const firstPosition = (newIndex) => (newIndex) === 0
        // const lastPosition = (newIndex) => newIndex === targetEndPoints.length - 1


        //FIXME:
        // let pathDatasOutside = getRefPointAtIndexIfNotFiller(refEndPointsBase, index, parPathObj) // TODO: Fix like fixed in addSvgElement.js
        this.pathDatasOutside = getRefPointAtIndexIfNotFiller(this.ParFigure) // TODO: Fix like fixed in addSvgElement.js
        // let parallelProjections = calcParallelProjections(pathDatasOutside[0].coords, pathDatasOutside[1].coords, parPathObj.parallelDistance)
        this.parallelProjections = calcParallelProjections(this.ParFigure)


        // AA_FIRST_ALL
        // noArcIntersection_setPerpRefEndPointsToParallelProjections(refEndPointsPerp, parallelProjections, index)
        // this.IntersectionHandler.noArcIntersection_setPerpRefEndPointsToParallelProjections()

        // if (this.firstPosition(index)) {
        //     // A
        //     // noArcIntersection_firstPos(targetEndPoints, index, {x: parallelProjections.thisPointX, y: parallelProjections.thisPointY})
        //     // this.IntersectionHandler.noArcIntersection_firstPos(targetEndPoints, index, {x: parallelProjections.thisPointX, y: parallelProjections.thisPointY})
        //     // if(targetEndPoints.length !== 1) {
        //     if(parallelPathDatas.length !== 1) {
        //         if(this.arcExist(index + 1)) {
        //             // B
        //             // noArcIntersection_firstPos_nextIndexIsArc(targetEndPoints, index, {x: parallelProjections.nextPointX, y: parallelProjections.nextPointY})
        //             this.IntersectionHandler.noArcIntersection_firstPos_nextIndexIsArc(targetEndPoints, index, {x: parallelProjections.nextPointX, y: parallelProjections.nextPointY})
        //         }
        //     }
        // }

        // if (!this.firstPosition(index) && !this.lastPosition(index)) {
        //     if(!this.arcExist(index - 1)) {
        //         if( parPathObj.parallelPathSegmentCounter_SECOND === 0) {
        //             // C (DC)
        //             noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isFirstSegment(targetEndPoints, index, refEndPointsPerp)
        //         } else {
        //             // D (C+)
        //             noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_isSecondSegment(targetEndPoints, index, refEndPointsPerp)
        //         }
        //         // E (DC After)
        //         noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArc_bothSegments(parPathObj)
        //     } else {
        //         // F (E)
        //         noArcIntersection_notFirstPos_notLastPos_prevIndexIsArc()
        //         // empty
        //     }
        //     if(this.arcExist(index + 1) && !this.arcExist(index - 1)) {
        //         // G (F)
        //         noArcIntersection_notFirstPos_notLastPos_prevIndexIsNotArv_nextIndexIsArc(targetEndPoints, index, {x: parallelProjections.nextPointX, y: parallelProjections.nextPointY})
        //     }
        // }
    
        // // TODO: Orgnazine Better
        // checkForAndRunLastPosition()
        // function checkForAndRunLastPosition() {
        //     if (this.lastPosition(index)) {
        //         if(!this.firstPosition(index)) {
        //             if(!this.arcExist(index - 1)) {
        //                 if( parPathObj.parallelPathSegmentCounter_SECOND === 0) {
        //                     // H (Ga)
        //                     noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isFirstSegment(targetEndPoints, index, refEndPointsPerp)
        //                 } else {
        //                     // J (G+)
        //                     noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_isSecondSegment(targetEndPoints, index, refEndPointsPerp)
        //                 }
        //                 // K (G After)
        //                 noArcIntersection_notFirstPos_lastPos_prevIndexIsNotArc_bothSegments(parPathObj)
        //             } else {
        //                 // L (H)
        //                 // TODO: fix this
        //                 let prevJoiner = false
        //                 if(this.isJoiner(index - 1)) {
        //                     prevJoiner = true
        //                 }
        //                 noArcIntersection_notFirstPos_lastPos_prevIndexIsArc(targetEndPoints, parPathObj, index, self, prevJoiner) // empty
        //                 return;
        //             }
        //         }
        //         // M (Ia)
        //         noArcIntersection_notFirstPos_lastPos_everyIndex_lastAction(targetEndPoints, index, {x: parallelProjections.nextPointX, y: parallelProjections.nextPointY})
        //     }
        // }
    }
}



// function getRefPointAtIndexIfNotFiller(refEndPointsBase, index, parPathObj) {
function getRefPointAtIndexIfNotFiller(parFigure) {
    let refEndPointsBase = null
    let index = null
    let parPathObj = null

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
// function calcParallelProjections(thisPathDataCoords, nextPathDataCoords, parallelDistance) {
function calcParallelProjections(parFigure) {
    let thisPathDataCoords = null
    let nextPathDataCoords = null
    let parallelDistance = null

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
