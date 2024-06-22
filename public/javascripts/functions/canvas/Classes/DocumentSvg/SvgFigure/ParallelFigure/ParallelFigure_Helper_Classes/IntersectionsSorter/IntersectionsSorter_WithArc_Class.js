import {IntersectionHandler_WithArc} from './IntersectionsSorter_Helper_Classes/HandleIntersections/IntersectionHandler_WithArc_Class.js'

function IntersectionsSorter_WithArc(parallelFigure) {
    this.ParFigure = parallelFigure
    this.IntersectionHandler = new IntersectionHandler_WithArc(this.ParFigure)

    this.parallelPathDatas = this.ParFigure.parallelFigurePathDatas
    this.isJoiner = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.joiner === true
    this.joinerType = (targetIndex, code) => this.parallelPathDatas[targetIndex][1].arc.joiner === true && this.parallelPathDatas[targetIndex][1].arc.joinerSide === code
    this.arcExist = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.exist === true
    this.firstPosition = (targetIndex) => (targetIndex) === 0
    this.lastPosition = (targetIndex) => targetIndex === this.parallelPathDatas.length - 1
    this.includes = (list, targetIndex) => list.includes(this.parallelPathDatas[targetIndex][1].arc.joinerSide)

    this.intersectionObject = {
        index: null,
    }
    this.arcRadiusObject = {
        parDistAndDir: null
    }
}

// targetEndPoints,
// refEndPointsPerp,
// refEndPointsBase,
// documentFigureCount,
// self,
// index,
// parPathObj,
// skipperCheckers

IntersectionsSorter_WithArc.prototype.sortIntersections = function() {
    // TODO: Orgnazine Better
    let index = this.intersectionObject.index
    if(!this.firstPosition(index)) {
        switch(true) {
            case this.isJoiner(index):
            case this.isJoiner(index - 1):
                // handleDisconnectedArcIntersection(this.ParFigure)
                console.log(1)
                break
            default:
                handleDefaultArcIntersection(this.ParFigure)
                console.log(2)
        }
    } else if (this.firstPosition(index)) {
        switch(true) {
            case this.isJoiner(index):
            // case this.isJoiner(index - 1):
                // handleDisconnectedArcIntersection(this.ParFigure)
                console.log(3)
                break
            default:
                handleDefaultArcIntersection(this.ParFigure)
                console.log(4)
        }
    }
}

function handleDefaultArcIntersection(parFigure) {
    // 1
    // arcIntersection_allArcSegments_everyIndex_firstAction(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self) // TODO: (Set_arcRad)
    parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction() // TODO: (Set_arcRad)
    switch(true) {
        case parPathObj.parallelPathSegmentCounter_FIRST === 0:
            handleFirctArcSegment(parFigure)
            break
        default:
            handleSecondArcSegment(parFigure)
    }
    // Final
    // arcIntersection_allArcSegments_everyIndex_lastAction(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self)
    parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()
}

function handleFirctArcSegment(thisSorter) {
    let index = thisSorter.intersectionObject.index
    // 2
    thisSorter.intersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction(parPathObj)
    switch(true) {
        case !this.firstPosition(index):
            this.arcExist(index - 1) ?
                // 3
                thisSorter.intersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) :
                // 4
                thisSorter.intersectionHandler.arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj);
            break
        // 5
        default: thisSorter.intersectionHandler.arcIntersection_firstArcSegment_fistIndex(targetEndPoints, refEndPointsBase, index, arcRadiusObject)
    }
    if(!this.firstPosition(index)) {
        switch(true) {
            // 6_A
            case this.arcExist(index + 1): thisSorter.intersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(targetEndPoints, parPathObj, index, self); break
            // 6_B
            default: thisSorter.intersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
        }
    }
}

function handleSecondArcSegment(thisSorter) {
    let index = thisSorter.intersectionObject.index
    // 7
    thisSorter.intersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction(targetEndPoints, refEndPointsBase, index, arcRadiusObject, parPathObj, self)
    switch(true) {
        case !this.lastPosition(index):
            if(this.arcExist(index + 1)) {
                if(!this.includes(["AAA", "BBB", "CCC"], index + 1)) {
                    // 8_A
                    thisSorter.intersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
                } else {
                    // 8_B
                    thisSorter.intersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
                }
            } else {
                // 9
                thisSorter.intersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
            }
            break
            // 10
        default: thisSorter.intersectionHandler.arcIntersection_secondArcSegment_lastIndex(targetEndPoints, refEndPointsBase, index, arcRadiusObject, self)
    }
    // 11
    thisSorter.intersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction(targetEndPoints, parPathObj, index, self)
}

function handleDisconnectedArcIntersection(thisSorter) {
    let index = thisSorter.intersectionObject.index
    switch(true) {
        // 1_Joiner
        case this.joinerType(index, "AAA"): thisSorter.intersectionHandler.disconnectedArcIntersection_thisIndexIsPathToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj); break
        case this.joinerType(index - 1, "AAA"): 
            this.arcExist(index + 1) ?
                // 2_A_Joiner
                thisSorter.intersectionHandler.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self) // TODO: (Set_arcRad)
                :
                // 2_B_Joiner
                thisSorter.intersectionHandler.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
            break
        // 3_Joiner
        case this.joinerType(index, "CCC"): thisSorter.intersectionHandler.disconnectedArcIntersection_thisIndexIsArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, arcRadiusObject); break
        // 4_Joiner
        case this.joinerType(index - 1, "CCC"):
            thisSorter.intersectionHandler.disconnectedArcIntersection_prevIndexIsArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, arcRadiusObject); // TODO: (Set_arcRad)
            break
        // 5_Joiner
        case this.joinerType(index, "BBB"): thisSorter.intersectionHandler.disconnectedArcIntersection_prevIndexIsArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj); break
        // 6_Joiner
        case skipperCheckers.skipperChecker_Arc: thisSorter.intersectionHandler.disconnectedArcIntersection_skipThisIndex(parPathObj)
    }
}


export {
    IntersectionsSorter_WithArc
}