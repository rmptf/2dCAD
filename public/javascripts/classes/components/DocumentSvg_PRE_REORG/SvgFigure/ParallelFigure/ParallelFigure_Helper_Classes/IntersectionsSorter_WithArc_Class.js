import {IntersectionHandler_WithArc} from './IntersectionHandler_WithArc_Class.js'

function IntersectionsSorter_WithArc(parallelFigure) {
    // this.PARFIGURE = parallelFigure
    this.parallelFigureObj = parallelFigure.parallelFigureObject
    this.IntersectionHandler = new IntersectionHandler_WithArc(parallelFigure)
    this.parallelPathDatas = parallelFigure.parallelFigurePathDatas
    this.index = null

    this.isJoiner = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.joiner === true
    this.joinerType = (targetIndex, code) => this.parallelPathDatas[targetIndex][1].arc.joiner === true && this.parallelPathDatas[targetIndex][1].arc.joinerSide === code
    this.firstPosition = (targetIndex) => (targetIndex) === 0
    this.arcExist = (targetIndex) => {
        console.log("ARCEXIST_?")
        console.log(this.parallelPathDatas[targetIndex][1].arc.exist)
        console.log(this.parallelPathDatas[targetIndex][1])
        return this.parallelPathDatas[targetIndex][1].arc.exist === true
    }
    this.lastPosition = (targetIndex) => {
        console.log("LASTPOSITION_?")
        console.log(targetIndex === this.parallelPathDatas.length - 1)
        console.log(targetIndex)
        console.log(this.parallelPathDatas.length - 1)
        console.log(this.parallelPathDatas[targetIndex])
        return targetIndex === this.parallelPathDatas.length - 1
    }
    this.includes = (list, targetIndex) => {
        console.log("INCLUDES_?")
        console.log(list.includes(this.parallelPathDatas[targetIndex][1].arc.joinerSide))
        console.log(this.parallelPathDatas[targetIndex][1])
        return list.includes(this.parallelPathDatas[targetIndex][1].arc.joinerSide)
    }
    
    this.intersectionSorterObject = {
        index: null,
        // arcRadiusParDistAndDir: null // maybe can go into handler? // MOVED
    }
}

IntersectionsSorter_WithArc.prototype.setIndices = function (index) {
    this.index = index
    this.IntersectionHandler.index = index
    this.IntersectionHandler.ArcFlagSetter.index = index
    this.IntersectionHandler.Intersection_Contact.index = index
    this.IntersectionHandler.Intersection_NoContact.index = index

    // other things that might need updating:
    // Contact:
    // this.intersectionHandlerObject = parallelFigure.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject
    // NoContact:
    // this.parFigureSvgEndPoints = parallelFigure.svgEndPoints
    // this.parFigureSvgPaths = parallelFigure.svgPaths
}

IntersectionsSorter_WithArc.prototype.sortIntersections = function() {
    if(!this.firstPosition(this.index)) {
        switch(true) {
            case this.isJoiner(this.index):
                console.log("INT_SORTER_ARC: SORTING: YES_JOINER_THIS_INDEX_OTHER_POS")
                console.log(this.parallelPathDatas[this.index])
                this.handleDisconnectedArcIntersection()
                break
            case this.isJoiner(this.index - 1):
                console.log("INT_SORTER_ARC: SORTING: YES_JOINER_PREV_INDEX_OTHER_POS")
                console.log(this.parallelPathDatas[this.index])
                this.handleDisconnectedArcIntersection()
                break
            default:
                console.log("INT_SORTER_ARC: SORTING: NO_JOINER_OTHER_POS")
                console.log(this.parallelPathDatas[this.index])
                this.handleDefaultArcIntersection()
        }
    } else if (this.firstPosition(this.index)) {
        switch(true) {
            case this.isJoiner(this.index):
                console.log("INT_SORTER_ARC: SORTING: YES_JOINER_FIRST_POS")
                console.log(this.parallelPathDatas[this.index])
                this.handleDisconnectedArcIntersection()
                break
            default:
                console.log("INT_SORTER_ARC: SORTING: NO_JOINER_FIRST_POS")
                console.log(this.parallelPathDatas[this.index])
                this.handleDefaultArcIntersection()
        }
    }
}

IntersectionsSorter_WithArc.prototype.handleDefaultArcIntersection = function() {
    // 1
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction() // TODO: (Set_arcRad)
    switch(true) {
        case this.parallelFigureObj.parallelPathSegmentCounter_FIRST === 0:
            console.log("INT_SORTER_ARC: FIRST_OR_SECOND: HANDE_FIRST_SEG")
            this.handleFirctArcSegment()
            break
        default:
            console.log("INT_SORTER_ARC: FIRST_OR_SECOND: HANDE_SECOND_SEG")
            this.handleSecondArcSegment()
    }
    // Final
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()
}

IntersectionsSorter_WithArc.prototype.handleFirctArcSegment = function() {
    // 2
    console.log("INT_SORTER_ARC: FIRST_ARC_SEG: EVERY_INDEX")
    this.IntersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction()
    switch(true) {
        case !this.firstPosition(this.index):
            this.arcExist(this.index - 1) ?
                // 3
                (console.log("INT_SORTER_ARC: FIRST_ARC_SEG: PREV_INDEX_IS_ARC"),
                this.IntersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc()) :
                // 4
                (console.log("INT_SORTER_ARC: FIRST_ARC_SEG: PREV_INDEX_IS_NOT_ARC"),
                this.IntersectionHandler.arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc()) ;
            break
        // 5
        default: (console.log("INT_SORTER_ARC: FIRST_ARC_SEG: FIRST_INDEX"), this.IntersectionHandler.arcIntersection_firstArcSegment_fistIndex())
    }
    if(!this.firstPosition(this.index)) {
        switch(true) {
            // 6_A
            case this.arcExist(this.index + 1): (console.log("INT_SORTER_ARC: FIRST_ARC_SEG: NEXT_INDEX_IS_ARC"), this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc()); break
            // 6_B
            default: (console.log("INT_SORTER_ARC: FIRST_ARC_SEG: NEXT_INDEX_IS_NOT_ARC"), this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc())
        }
    }
}

//FIXME: WORKING RIGHT HERE
//FIXME: WORKING RIGHT HERE
//FIXME: WORKING RIGHT HERE
//FIXME: WORKING RIGHT HERE
IntersectionsSorter_WithArc.prototype.handleSecondArcSegment = function() {
    // 7
    console.log("INT_SORTER_ARC: SECOND_ARC_SEG: EVERY_INDEX_FIRST_ACTION")
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction()
    console.log("NEW_CHECKER_000")
    switch(true) {
        case !this.lastPosition(this.index):
            if(this.arcExist(this.index + 1)) {
                if(!this.includes(["AAA", "BBB", "CCC"], this.index + 1)) {
                    // 8_A
                    console.log("INT_SORTER_ARC: SECOND_ARC_SEG: NEXT_INDEX_IS_CONNECTED")
                    this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected()
                } else {
                    // 8_B
                    console.log("INT_SORTER_ARC: SECOND_ARC_SEG: NEXT_INDEX_IS_NOT_CONNECTED")
                    this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected()
                }
            } else {
                // 9
                console.log("INT_SORTER_ARC: SECOND_ARC_SEG: NEXT_INDEX_IS_NOT_ARC")
                this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc()
            }
            break
        default: {
            // 10
            console.log("INT_SORTER_ARC: SECOND_ARC_SEG: LAST_INDEX")
            this.IntersectionHandler.arcIntersection_secondArcSegment_lastIndex()
        }
    }
    // 11
    console.log("INT_SORTER_ARC: SECOND_ARC_SEG: EVERY_INDEX_LAST_ACTION")
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction()
}
//FIXME: WORKING RIGHT HERE
//FIXME: WORKING RIGHT HERE
//FIXME: WORKING RIGHT HERE
//FIXME: WORKING RIGHT HERE

IntersectionsSorter_WithArc.prototype.handleDisconnectedArcIntersection = function() {
    console.log("INT_SORTER_ARC: DISCONNECTED_INTERSECTION")
    switch(true) {
        // 1_Joiner
        case this.joinerType(this.index, "AAA"): (console.log("INT_SORTER_ARC: DISCONNECTED_INTERSECTION THIS_INDEX_IS_P2A"), this.IntersectionHandler.disconnectedArcIntersection_thisIndexIsPathToArc()); break
        case this.joinerType(this.index - 1, "AAA"): 
        this.arcExist(this.index + 1) ?
                // 2_A_Joiner
                (console.log("INT_SORTER_ARC: DISCONNECTED_INTERSECTION PREV_INDEX_IS_P2A NEXT_INDEX_IS_ARC"), this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc()) // TODO: (Set_arcRad)
                :
                // 2_B_Joiner
                (console.log("INT_SORTER_ARC: DISCONNECTED_INTERSECTION PREV_INDEX_IS_P2A NEXT_INDEX_IS_NO_ARC"), this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc())
            break
        // 3_Joiner
        case this.joinerType(this.index, "CCC"): (console.log("INT_SORTER_ARC: DISCONNECTED_INTERSECTION THIS_INDEX_IS_A2A"), this.IntersectionHandler.disconnectedArcIntersection_thisIndexIsArcToArc()); break
        // 4_Joiner
        case this.joinerType(this.index - 1, "CCC"):
            (console.log("INT_SORTER_ARC: DISCONNECTED_INTERSECTION PREV_INDEX_IS_A2A"),
            this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsArcToArc()); // TODO: (Set_arcRad)
            break
        // 5_Joiner
        case this.joinerType(this.index, "BBB"): (console.log("INT_SORTER_ARC: DISCONNECTED_INTERSECTION PREV_INDEX_IS_A2P"), this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsArcToPath()); break
        // 6_Joiner
        case this.parallelFigureObj.skipperCheckers.skipperChecker_Arc: (console.log("INT_SORTER_ARC: DISCONNECTED_INTERSECTION SKIP_THIS_INDEX"), this.IntersectionHandler.disconnectedArcIntersection_skipThisIndex(parPathObj)) // TODO: check that it works
    }
}


export {
    IntersectionsSorter_WithArc
}