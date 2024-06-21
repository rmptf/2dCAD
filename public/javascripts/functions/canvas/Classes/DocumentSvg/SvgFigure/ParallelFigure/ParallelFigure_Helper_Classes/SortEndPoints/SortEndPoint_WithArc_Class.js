import {HandleIntersection_WithArc} from './SortEndPoint_Helper_Classes/HandleIntersections/HandleIntersections_WithArc_Class.js'

function SortEndPoint_WithArc(thisFigure) {
    this.thisFigure = thisFigure
    this.HandleIntersection = new HandleIntersection_WithArc(this.thisFigure)



    // targetEndPoints,
    // refEndPointsPerp,
    // refEndPointsBase,
    // documentFigureCount,
    // self,
    // index,
    // parPathObj,
    // skipperCheckers


    let thisIndex = this.thisFigure.parallelPathObject.index
    let parallelPathDatas = this.thisFigure.parallelPathDatas_globalRef
}


const isJoiner = (targetIndex) => parallelPathDatas[targetIndex][1].arc.joiner === true
const joinerType = (targetIndex, code) => parallelPathDatas[targetIndex][1].arc.joiner === true && parallelPathDatas[targetIndex][1].arc.joinerSide === code
const arcExist = (targetIndex) => parallelPathDatas[targetIndex][1].arc.exist === true
const firstPosition = (targetIndex) => (targetIndex) === 0
const lastPosition = (targetIndex) => targetIndex === parallelPathDatas.length - 1
const includes = (list, targetIndex) => list.includes(parallelPathDatas[targetIndex][1].arc.joinerSide)
let arcRadiusObject = [] //FIXME: will have to place this somewhere
arcRadiusObject.parDistAndDir //FIXME: will have to place this somewhere

SortEndPoint_WithArc.prototype.sortEndPoints_withArc = function() {
    // TODO: Orgnazine Better
    if(!firstPosition(thisIndex)) {
        switch(true) {
            case isJoiner(thisIndex):
            case isJoiner(thisIndex - 1):
                handleDisconnectedArcIntersection()
                break
            default:
                handleDefaultArcIntersection()
        }
    } else if (firstPosition(thisIndex)) {
        switch(true) {
            case isJoiner(thisIndex):
            // case isJoiner(thisIndex - 1):
                handleDisconnectedArcIntersection()
                break
            default:
                handleDefaultArcIntersection()
        }
    }
}

function handleDefaultArcIntersection() {
    // 1
    // arcIntersection_allArcSegments_everyIndex_firstAction(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self) // TODO: (Set_arcRad)
    this.HandleIntersections.arcIntersection_allArcSegments_everyIndex_firstAction() // TODO: (Set_arcRad)
    switch(true) {
        case parPathObj.parallelPathSegmentCounter_FIRST === 0:
            handleFirctArcSegment()
            break
        default:
            handleSecondArcSegment()
    }
    // Final
    // arcIntersection_allArcSegments_everyIndex_lastAction(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self)
    this.HandleIntersections.arcIntersection_allArcSegments_everyIndex_lastAction()
}

function handleFirctArcSegment() {
    // 2
    arcIntersection_firstArcSegment_everyIndex_firstAction(parPathObj)
    switch(true) {
        case !firstPosition(index):
            arcExist(index - 1) ?
                // 3
                arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) :
                // 4
                arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj);
            break
        // 5
        default: arcIntersection_firstArcSegment_fistIndex(targetEndPoints, refEndPointsBase, index, arcRadiusObject)
    }
    if(!firstPosition(index)) {
        switch(true) {
            // 6_A
            case arcExist(index + 1): arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(targetEndPoints, parPathObj, index, self); break
            // 6_B
            default: arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
        }
    }
}

function handleSecondArcSegment() {
    // 7
    arcIntersection_secondArcSegment_everyIndex_firstAction(targetEndPoints, refEndPointsBase, index, arcRadiusObject, parPathObj, self)
    switch(true) {
        case !lastPosition(index):
            if(arcExist(index + 1)) {
                if(!includes(["AAA", "BBB", "CCC"], index + 1)) {
                    // 8_A
                    arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
                } else {
                    // 8_B
                    arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
                }
            } else {
                // 9
                arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
            }
            break
            // 10
        default: arcIntersection_secondArcSegment_lastIndex(targetEndPoints, refEndPointsBase, index, arcRadiusObject, self)
    }
    // 11
    arcIntersection_secondArcSegment_everyIndex_lastAction(targetEndPoints, parPathObj, index, self)
}

function handleDisconnectedArcIntersection() {
    switch(true) {
        // 1_Joiner
        case joinerType(index, "AAA"): disconnectedArcIntersection_thisIndexIsPathToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj); break
        case joinerType(index - 1, "AAA"): 
            arcExist(index + 1) ?
                // 2_A_Joiner
                disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self) // TODO: (Set_arcRad)
                :
                // 2_B_Joiner
                disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
            break
        // 3_Joiner
        case joinerType(index, "CCC"): disconnectedArcIntersection_thisIndexIsArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, arcRadiusObject); break
        // 4_Joiner
        case joinerType(index - 1, "CCC"):
            disconnectedArcIntersection_prevIndexIsArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, arcRadiusObject); // TODO: (Set_arcRad)
            break
        // 5_Joiner
        case joinerType(index, "BBB"): disconnectedArcIntersection_prevIndexIsArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj); break
        // 6_Joiner
        case skipperCheckers.skipperChecker_Arc: disconnectedArcIntersection_skipThisIndex(parPathObj)
    }
}


export {
    SortEndPoint_WithArc
}