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
        arcRadiusParDistAndDir: null
    }
}

IntersectionsSorter_WithArc.prototype.sortIntersections = function() {
    let index = this.intersectionSorterObject.index
    if(!this.firstPosition(index)) {
        switch(true) {
            case this.isJoiner(index):
            case this.isJoiner(index - 1):
                handleDisconnectedArcIntersection(this.ParFigure, this)
                break
            default:
                handleDefaultArcIntersection(this.ParFigure, this)
        }
    } else if (this.firstPosition(index)) {
        switch(true) {
            case this.isJoiner(index):
                handleDisconnectedArcIntersection(this.ParFigure, this)
                break
            default:
                handleDefaultArcIntersection(this.ParFigure, this)
        }
    }
}

function handleDefaultArcIntersection(parFigure, intXSorter) {
    // 1
    parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction() // TODO: (Set_arcRad)
    switch(true) {
        case parFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST === 0:
            handleFirctArcSegment(parFigure, intXSorter)
            break
        default:
            handleSecondArcSegment(parFigure, intXSorter)
    }
    // Final
    parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()
}

function handleFirctArcSegment(parFigure, intXSorter) {
    let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index
    // 2
    parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction(parFigure)
    switch(true) {
        case !intXSorter.firstPosition(index):
            intXSorter.arcExist(index - 1) ?
                // 3
                parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc() :
                // 4
                parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc();
            break
        // 5
        default: parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_firstArcSegment_fistIndex()
    }
    if(!intXSorter.firstPosition(index)) {
        switch(true) {
            // 6_A
            case intXSorter.arcExist(index + 1): parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(); break
            // 6_B
            default: parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc()
        }
    }
}

function handleSecondArcSegment(parFigure, intXSorter) {
    let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index
    // 7
    parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction()
    switch(true) {
        case !intXSorter.lastPosition(index):
            if(intXSorter.arcExist(index + 1)) {
                if(!intXSorter.includes(["AAA", "BBB", "CCC"], index + 1)) {
                    // 8_A
                    parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected()
                } else {
                    // 8_B
                    parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected()
                }
            } else {
                // 9
                parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc()
            }
            break
            // 10
        default: parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_secondArcSegment_lastIndex()
    }
    // 11
    parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction()
}

function handleDisconnectedArcIntersection(parFigure, intXSorter) {
    let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index
    switch(true) {
        // 1_Joiner
        case intXSorter.joinerType(index, "AAA"): parFigure.IntersectionsSorter_WithArc.IntersectionHandler.disconnectedArcIntersection_thisIndexIsPathToArc(); break
        case intXSorter.joinerType(index - 1, "AAA"): 
        intXSorter.arcExist(index + 1) ?
                // 2_A_Joiner
                parFigure.IntersectionsSorter_WithArc.IntersectionHandler.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc() // TODO: (Set_arcRad)
                :
                // 2_B_Joiner
                parFigure.IntersectionsSorter_WithArc.IntersectionHandler.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc()
            break
        // 3_Joiner
        case intXSorter.joinerType(index, "CCC"): parFigure.IntersectionsSorter_WithArc.IntersectionHandler.disconnectedArcIntersection_thisIndexIsArcToArc(); break
        // 4_Joiner
        case intXSorter.joinerType(index - 1, "CCC"):
            parFigure.IntersectionsSorter_WithArc.IntersectionHandler.disconnectedArcIntersection_prevIndexIsArcToArc(); // TODO: (Set_arcRad)
            break
        // 5_Joiner
        case intXSorter.joinerType(index, "BBB"): parFigure.IntersectionsSorter_WithArc.IntersectionHandler.disconnectedArcIntersection_prevIndexIsArcToPath(); break
        // 6_Joiner
        case parFigure.parallelFigureObject.skipperCheckers.skipperChecker_Arc: parFigure.IntersectionsSorter_WithArc.IntersectionHandler.disconnectedArcIntersection_skipThisIndex(parPathObj) // TODO: check that it works
    }
}


export {
    IntersectionsSorter_WithArc
}