import {IntersectionHandler_WithArc} from './IntersectionHandler_WithArc_Class.js'

function IntersectionsSorter_WithArc(parallelFigure) {
    this.PARFIGURE = parallelFigure
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.parallelFigureObj = parallelFigure.parallelFigureObject
    this.IntersectionHandler = new IntersectionHandler_WithArc(parallelFigure)
    this.parallelPathDatas = parallelFigure.parallelFigurePathDatas // TODO: I think you can pass this child PathData and Prev Chid PathData as one array (they are only used in the following if checks)
    this.index = null

    //old
    // this.isWest123 = (targetIndex) => console.log("poopopopopoper", this.parallelPathDatas[targetIndex][1].arc.side)
    // this.isWest = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.side === 'west'
    // this.isJoiner = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.joiner === true
    // this.joinerType = (targetIndex, code) => this.parallelPathDatas[targetIndex][1].arc.joiner === true && this.parallelPathDatas[targetIndex][1].arc.joinerSide === code
    // this.arcExist = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.exist === true
    // this.firstPosition = (targetIndex) => (targetIndex) === 0
    // this.lastPosition = (targetIndex) => targetIndex === this.parallelPathDatas.length - 1
    // this.includes = (list, targetIndex) => list.includes(this.parallelPathDatas[targetIndex][1].arc.joinerSide)

    //new
    this.joinerType = (targetIndex, code) => {
        if(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.childCount > 0) {
            return this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joiner === true && this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joinerSide === code
        } else {
            return false
        }
    }
    this.isJoiner = (targetIndex) => {
        return this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.childCount > 0;
    }
    this.firstPosition = (targetIndex) => (targetIndex + 1) === 1

    this.arcExist = (targetIndex) => {
        return this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_east.arc.exist === true
    }
    this.joinerExist = (targetIndex) => {
        return this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.childCount > 1
    }
    this.lastPosition = (targetIndex) => {
        return targetIndex + 1 >= this.originalFigurePathDatas.length - 1
    }
    this.includes = (list, targetIndex) => {
        return list.includes(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.arc.joinerSide) //FIXME: Prob need to handle differently // here
    }

    // not in use
    // this.intersectionSorterObject = {
    //     index: null
    // }
}

IntersectionsSorter_WithArc.prototype.setIndices = function (index) {
    this.index = index
    this.IntersectionHandler.index = index
    //old
    // this.IntersectionHandler.ArcFlagSetter.index = index // TODO: Turned off while handling setLargeArcFlag in new way (new clas for each arc)
    //new
    // nothing, just turned of above
    this.IntersectionHandler.Intersection_Contact.index = index
    this.IntersectionHandler.Intersection_NoContact.index = index
}

IntersectionsSorter_WithArc.prototype.sortIntersections_NEW = function(joiner) {
    if (!this.firstPosition(this.index)) {
        switch(true) {
            case !this.lastPosition(this.index) && this.isJoiner(this.index) && joiner === true:
                console.log("INT_SORTER_ARC: SORTING: HANDLE_DISCONNECTED: YES_JOINER_THIS_INDEX_OTHER_POS")
                this.handleDisconnectedArcIntersection()
                // console.log("INT_SORTER_ARC: SORTING: RUNNING_CONNECTED_AFTER_DISCONNECTED")
                break
            case this.isJoiner(this.index - 1):
                console.log("INT_SORTER_ARC: SORTING:  HANDLE_DISCONNECTED: YES_JOINER_PREV_INDEX_OTHER_POS")
                this.handleDisconnectedArcIntersection(joiner)
                break
            default:
                console.log("INT_SORTER_ARC: SORTING: HANDLE_CONNECTED: NO_JOINER_OTHER_POS")
                this.handleConnectedArcIntersection()
            }
    } else if (this.firstPosition(this.index)) {
        switch (true) {
            case this.isJoiner(this.index):
                console.log("INT_SORTER_ARC: SORTING: HANDLE_DISCONNECTED: YES_JOINER_FIRST_POS")
                this.handleDisconnectedArcIntersection()
                break
            default:
                console.log("INT_SORTER_ARC: SORTING: HANDLE_CONNECTED: NO_JOINER_FIRST_POS")
                this.handleConnectedArcIntersection()
        }
    }
}

IntersectionsSorter_WithArc.prototype.handleConnectedArcIntersection = function() { //TODO: Is there a way to just know which segments we r on rather than setting a flag?
    // 1
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction() // TODO: (Set_arcRad)
    switch(true) {
        case this.parallelFigureObj.parallelPathSegmentCounter_FIRST === 0:
            // console.log("INT_SORTER_ARC: FIRST_OR_SECOND: HANDE_FIRST_SEG")
            this.handleFirctArcSegment()
            break
        default:
            // console.log("INT_SORTER_ARC: FIRST_OR_SECOND: HANDE_SECOND_SEG")
            this.handleSecondArcSegment()
    }
    // Final
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()
    // console.log()
}

IntersectionsSorter_WithArc.prototype.handleFirctArcSegment = function() {
    // 2
    // console.log("INT_SORTER_ARC: FIRST_ARC_SEG: EVERY_INDEX")
    this.IntersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction()
    switch(true) {
        case !this.firstPosition(this.index):
            this.arcExist(this.index - 1) ?
                // 3
                // (console.log("INT_SORTER_ARC: FIRST_ARC_SEG: PREV_INDEX_IS_ARC"), this.IntersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc()):
                this.IntersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc() :
                // 4
                // (console.log("INT_SORTER_ARC: FIRST_ARC_SEG: PREV_INDEX_IS_NOT_ARC"), this.IntersectionHandler.arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc());
                this.IntersectionHandler.arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc();
            break
        // 5
        // default: (console.log("INT_SORTER_ARC: FIRST_ARC_SEG: FIRST_INDEX"), this.IntersectionHandler.arcIntersection_firstArcSegment_fistIndex())
        default: this.IntersectionHandler.arcIntersection_firstArcSegment_fistIndex()
    }
    if(!this.firstPosition(this.index)) {
        switch(true) {
            // 6_A
            // case this.arcExist(this.index + 1): (console.log("INT_SORTER_ARC: FIRST_ARC_SEG: NEXT_INDEX_IS_ARC"), this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc()); break
            case this.arcExist(this.index + 1): this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(); break
            // 6_B
            // default: (console.log("INT_SORTER_ARC: FIRST_ARC_SEG: NEXT_INDEX_IS_NOT_ARC"), this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc())
            default: this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc()
        }
    }
}

IntersectionsSorter_WithArc.prototype.handleSecondArcSegment = function() {
    // 7
    // console.log("INT_SORTER_ARC: SECOND_ARC_SEG: EVERY_INDEX_FIRST_ACTION")
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction()
    switch(true) {
        case !this.lastPosition(this.index):
            if(this.joinerExist(this.index + 0)) {
                // console.log("INT_SORTER_ARC: SECOND_ARC_SEG: NEXT_INDEX_IS_NOT_CONNECTED")
                this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected()
            } else {
                if(this.arcExist(this.index + 1)) {
                    // console.log("INT_SORTER_ARC: SECOND_ARC_SEG: NEXT_INDEX_IS_CONNECTED")
                    this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected()
                } else {
                    // console.log("INT_SORTER_ARC: SECOND_ARC_SEG: NEXT_INDEX_IS_NOT_ARC")
                    this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc()
                }
            }
            break
        default: {
            // 10
            // console.log("INT_SORTER_ARC: SECOND_ARC_SEG: LAST_INDEX")
            this.IntersectionHandler.arcIntersection_secondArcSegment_lastIndex()
        }
    }
    // 11
    // console.log("INT_SORTER_ARC: SECOND_ARC_SEG: EVERY_INDEX_LAST_ACTION")
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction()
}

IntersectionsSorter_WithArc.prototype.handleDisconnectedArcIntersection = function(joiner) {
    // console.log("INT_SORTER_ARC: DISCONNECTED_INTERSECTION")
    switch(true) {
        // 1_Joiner
        case this.joinerType(this.index - 1, "AAA") && joiner === false: this.IntersectionHandler.disconnectedArcIntersection_thisIndexIsPathToArc(); break
        // 2_Joiner
        case this.joinerType(this.index - 1, "AAA") && joiner === true: 
            this.arcExist(this.index + 1) ?
                // 2_A_Joiner
                this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc() // TODO: (Set_arcRad)
                :
                // 2_B_Joiner
                this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc()
            break
        // 3_Joiner
        case this.joinerType(this.index, "CCC"): this.IntersectionHandler.disconnectedArcIntersection_thisIndexIsArcToArc(); break
        // 4_Joiner
        case this.joinerType(this.index - 1, "CCC"): this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsArcToArc(); break // TODO: (Set_arcRad)
        // 5_Joiner
        case this.joinerType(this.index, "BBB"): this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsArcToPath(); break
        // 6_Joiner
        case this.parallelFigureObj.skipperCheckers.skipperChecker_Arc: this.IntersectionHandler.disconnectedArcIntersection_skipThisIndex(parPathObj) // TODO: check that it works
    }
}


export {
    IntersectionsSorter_WithArc
}






// new todo:
// pickup:
//     downstairs storage:
//     -   bring crib?
//     -   golf clubs
//     -   suit cases

//     outside storage:
//     -   bring crib?
//     -   sweaters


// outside chores:
// -   wash car interior
// -   



// pack car:
// -   pack and play
// -   golf clubs
// -   baewon scritty samples
// -   poker chips and cards
// -   board games

// DAY OF:
// -   mine and sunghiun suitcase
// -   mark stuff