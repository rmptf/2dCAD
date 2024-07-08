import {IntersectionHandler_WithArc} from './IntersectionHandler_WithArc_Class.js'

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

    this.intersectionSorterObject = {
        index: null,
        // parDistAndDir: null,
        arcRadiusParDistAndDir: null
    }
    // this.arcRadiusObject = {
    //     parDistAndDir: null
    // }
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
    let index = this.intersectionSorterObject.index
    if(!this.firstPosition(index)) {
        switch(true) {
            case this.isJoiner(index):
            case this.isJoiner(index - 1):
                console.log('1___')
                // handleDisconnectedArcIntersection(this.ParFigure, this)  // FIXME: right here
                break
            default:
                console.log('2___')
                handleDefaultArcIntersection(this.ParFigure, this)
        }
    } else if (this.firstPosition(index)) {
        switch(true) {
            case this.isJoiner(index):
            // case this.isJoiner(index - 1):
                console.log('3___')
                // handleDisconnectedArcIntersection(this.ParFigure, this)  // FIXME: right here
                break
            default:
                console.log('4___')
                handleDefaultArcIntersection(this.ParFigure, this)
        }
    }
}

function handleDefaultArcIntersection(parFigure, intXSorter) {
    // 1
    console.log("A___1")
    // arcIntersection_allArcSegments_everyIndex_firstAction(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self) // TODO: (Set_arcRad)
    parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction() // TODO: (Set_arcRad)
    switch(true) {
        // case parPathObj.parallelPathSegmentCounter_FIRST === 0:
        case parFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST === 0:
            console.log("A___2")
            handleFirctArcSegment(parFigure, intXSorter)
            break
        default:
            console.log("A___3")
            handleSecondArcSegment(parFigure, intXSorter)
    }
    // Final
    console.log("A___4")
    // arcIntersection_allArcSegments_everyIndex_lastAction(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self)
    parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()
}

function handleFirctArcSegment(parFigure, intXSorter) {
    // let index = thisSorter.intersectionSorterObject.index
    let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index
    // 2
    // thisSorter.intersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction(parPathObj)
    parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction(parFigure)
    switch(true) {
        case !intXSorter.firstPosition(index):
            intXSorter.arcExist(index - 1) ?
                // 3
                // thisSorter.intersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) :
                parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc() :
                // 4
                // thisSorter.intersectionHandler.arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj);
                parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc();
            break
        // 5
        // default: thisSorter.intersectionHandler.arcIntersection_firstArcSegment_fistIndex(targetEndPoints, refEndPointsBase, index, arcRadiusObject)
        default: parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_firstArcSegment_fistIndex()
    }
    if(!intXSorter.firstPosition(index)) {
        switch(true) {
            // 6_A
            // case this.arcExist(index + 1): thisSorter.intersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(targetEndPoints, parPathObj, index, self); break
            case intXSorter.arcExist(index + 1): parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(); break
            // 6_B
            // default: thisSorter.intersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
            default: parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc()
        }
    }
}

function handleSecondArcSegment(parFigure, intXSorter) {
    // let index = thisSorter.intersectionSorterObject.index
    let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index
    // 7
    // thisSorter.intersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction(targetEndPoints, refEndPointsBase, index, arcRadiusObject, parPathObj, self)
    parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction()
    switch(true) {
        case !intXSorter.lastPosition(index):
            if(intXSorter.arcExist(index + 1)) {
                if(!intXSorter.includes(["AAA", "BBB", "CCC"], index + 1)) {
                    // 8_A
                    // thisSorter.intersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
                    parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected()
                } else {
                    // 8_B
                    // thisSorter.intersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
                    parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected()
                }
            } else {
                // 9
                // thisSorter.intersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
                parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc()
            }
            break
            // 10
        // default: thisSorter.intersectionHandler.arcIntersection_secondArcSegment_lastIndex(targetEndPoints, refEndPointsBase, index, arcRadiusObject, self)
        default: parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_secondArcSegment_lastIndex()
    }
    // 11
    // thisSorter.intersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction(targetEndPoints, parPathObj, index, self)
    parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction()
}

//FIXME: right here
function handleDisconnectedArcIntersection(parFigure, intXSorter) {
    let index = thisSorter.intersectionSorterObject.index
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