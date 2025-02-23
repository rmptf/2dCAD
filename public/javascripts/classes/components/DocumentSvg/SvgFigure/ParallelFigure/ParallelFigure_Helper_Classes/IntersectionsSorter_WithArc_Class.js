import {IntersectionHandler_WithArc} from './IntersectionHandler_WithArc_Class.js'

function IntersectionsSorter_WithArc(parallelFigure, index, subFigureSkipperIndexModifiers) {
    // this.PARFIGURE = parallelFigure
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.parallelFigureObj = parallelFigure.parallelFigureObject

    this.index = index
 
    this.previousIndex = this.index + 0 + subFigureSkipperIndexModifiers.previousIndexModifier
    this.thisIndex = this.index + 1 + subFigureSkipperIndexModifiers.currentIndexModifier 
    this.nextIndex = this.index + 2 + subFigureSkipperIndexModifiers.nextIndexModifier

    this.previousOriginalFigurePathData = (modifierFromFunction) => this.originalFigurePathDatas[modifierFromFunction]
    this.thisOriginalFigurePathData = (modifierFromFunction) => this.originalFigurePathDatas[modifierFromFunction]
    this.nextOriginalFigurePathData = (modifierFromFunction) => this.originalFigurePathDatas[modifierFromFunction]


    this.IntersectionHandler = new IntersectionHandler_WithArc(parallelFigure, index, subFigureSkipperIndexModifiers)

    //old
    // this.isWest123 = (targetIndex) => console.log(this.parallelPathDatas[targetIndex][1].arc.side)
    // this.isWest = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.side === 'west'
    // this.isJoiner = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.joiner === true
    // this.joinerType = (targetIndex, code) => this.parallelPathDatas[targetIndex][1].arc.joiner === true && this.parallelPathDatas[targetIndex][1].arc.joinerSide === code
    // this.arcExist = (targetIndex) => this.parallelPathDatas[targetIndex][1].arc.exist === true
    // this.firstPosition = (targetIndex) => (targetIndex) === 0
    // this.lastPosition = (targetIndex) => targetIndex === this.parallelPathDatas.length - 1
    // this.includes = (list, targetIndex) => list.includes(this.parallelPathDatas[targetIndex][1].arc.joinerSide)

    // //new //old
    // this.joinerType = (targetIndex, code) => {
    //     if(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.childCount > 0) {
    //         return this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joiner === true && this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joinerSide === code
    //     } else {
    //         return false
    //     }
    // }
    // this.isJoiner = (targetIndex) => {
    //     return this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.childCount > 0;
    // }
    // this.firstPosition = (targetIndex) => (targetIndex + 1) === 1

    // this.arcExist = (targetIndex) => {
    //     return this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_east.arc.exist === true
    // }
    // this.joinerExist = (targetIndex) => {
    //     return this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.children.childCount > 1
    // }
    // this.lastPosition = (targetIndex) => {
    //     return targetIndex + 1 >= this.originalFigurePathDatas.length - 1
    // }
    // this.includes = (list, targetIndex) => {
    //     return list.includes(this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_west.arc.joinerSide) //FIXME: Prob need to handle differently // here
    // }


    //new
    this.joinerType = (targetIndex, code) => {
        // console.log('running_joiner_outside')
        // console.log(targetIndex)
        // console.log(code)
        // console.log(this.previousOriginalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west)
        // console.log(this.index)
        if(this.previousOriginalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west.children.childCount > 0) {
            // console.log("inside_joinerType")
            // console.log(this.previousOriginalFigurePathData(targetIndex))
            // console.log(this.previousOriginalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0])
            // console.log(this.previousOriginalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joiner === true)
            // console.log(this.previousOriginalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joinerSide === code)
            return this.previousOriginalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joiner === true && this.previousOriginalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joinerSide === code
        } else {
            return false
        }
    }
    this.isJoiner = (targetIndex) => {
        return this.previousOriginalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west.children.childCount > 0;
    }
    this.firstPosition = (targetIndex) => (targetIndex) === 1

    this.arcExist = (targetIndex) => {
        return this.previousOriginalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_east.arc.exist === true
    }
    this.joinerExist = (targetIndex) => {
        return this.previousOriginalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west.children.childCount > 1
    }
    this.lastPosition = (targetIndex) => {
        return targetIndex >= this.originalFigurePathDatas.length - 1
    }
    this.includes = (list, targetIndex) => {
        return list.includes(this.previousOriginalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west.arc.joinerSide) //FIXME: Prob need to handle differently // here
    }
}


IntersectionsSorter_WithArc.prototype.setIndex = function(index) {
    this.index = index

    this.previousIndex = this.index + 0// + subFigureSkipperIndexModifiers.previousIndexModifier
    this.thisIndex = this.index + 1// + subFigureSkipperIndexModifiers.currentIndexModifier 
    this.nextIndex = this.index + 2// + subFigureSkipperIndexModifiers.nextIndexModifier
}


// IntersectionsSorter_WithArc.prototype.setIndices = function (index) {
//     this.index = index
//     this.IntersectionHandler.index = index
//     //old
//     // this.IntersectionHandler.ArcFlagSetter.index = index // TODO: Turned off while handling setLargeArcFlag in new way (new clas for each arc)
//     //new
//     // nothing, just turned of above
//     this.IntersectionHandler.Intersection_Contact.index = index
//     this.IntersectionHandler.Intersection_NoContact.index = index
// }

//FIXME: right here
IntersectionsSorter_WithArc.prototype.sortIntersections_NEW = function(joiner) {
    if (!this.firstPosition(this.index)) {
        switch(true) {
            //old
            // case !this.lastPosition(this.index) && this.isJoiner(this.index) && joiner === true:
            //new
            case !this.lastPosition(this.thisIndex) && this.isJoiner(this.thisIndex) && joiner === true:
                // console.log("INT_SORTER_ARC: SORTING: YES_JOINER_THIS_INDEX_OTHER_POS")
                console.log("DISCONNECTED_1111111111")
                this.handleDisconnectedArcIntersection()
                // console.log("INT_SORTER_ARC: SORTING: RUNNING_CONNECTED_AFTER_DISCONNECTED")
                break
            //old
            // case this.isJoiner(this.index - 1):
            case this.isJoiner(this.previousIndex): 
                // console.log("INT_SORTER_ARC: SORTING: YES_JOINER_PREV_INDEX_OTHER_POS")
                console.log("DISCONNECTED_1111111111")
                this.handleDisconnectedArcIntersection(joiner)
                break
            default:
                // console.log("INT_SORTER_ARC: SORTING: NO_JOINER_OTHER_POS")
                console.log("CONNECTED_0000000000")
                this.handleConnectedArcIntersection()
            }
    //old
    // } else if (this.firstPosition(this.index)) {
    //new
    } else if (this.firstPosition(this.thisIndex)) {
        switch (true) {
            //old
            // case this.isJoiner(this.index):
            //old
            case this.isJoiner(this.thisIndex):
                // console.log("INT_SORTER_ARC: SORTING: YES_JOINER_FIRST_POS")
                console.log("DISCONNECTED_1111111111")
                this.handleDisconnectedArcIntersection()
                break
            default:
                // console.log("INT_SORTER_ARC: SORTING: NO_JOINER_FIRST_POS")
                console.log("CONNECTED_0000000000")
                this.handleConnectedArcIntersection()
        }
    }
}

IntersectionsSorter_WithArc.prototype.handleConnectedArcIntersection = function() { //TODO: Is there a way to just know which segments we r on rather than setting a flag?
    // 1
    //old
    // this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction() // TODO: (Set_arcRad)
    //new
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction()

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
        // case !this.firstPosition(this.index):
        case !this.firstPosition(this.thisIndex):
            // this.arcExist(this.index - 1) ?
            this.arcExist(this.previousIndex) ?
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
    // if(!this.firstPosition(this.index)) {
    if(!this.firstPosition(this.thisIndex)) {
        switch(true) {
            // 6_A
            // case this.arcExist(this.index + 1): (console.log("INT_SORTER_ARC: FIRST_ARC_SEG: NEXT_INDEX_IS_ARC"), this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc()); break
            // case this.arcExist(this.index + 1): this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(); break
            // case this.arcExist(this.index + 1): this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(); break
            case this.arcExist(this.nextIndex): this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(); break
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
        // case !this.lastPosition(this.index):
        case !this.lastPosition(this.thisIndex):
            // if(this.joinerExist(this.index)) {
            if(this.joinerExist(this.thisIndex)) {
                // console.log("INT_SORTER_ARC: SECOND_ARC_SEG: NEXT_INDEX_IS_NOT_CONNECTED")
                this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected()
            } else {
                // if(this.arcExist(this.index + 1)) {
                if(this.arcExist(this.nextIndex)) {
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

// old
// IntersectionsSorter_WithArc.prototype.handleDisconnectedArcIntersection = function(joiner) {
//     // console.log("INT_SORTER_ARC: DISCONNECTED_INTERSECTION")
//     switch(true) {
//         // 1_Joiner
//         case this.joinerType(this.index - 1, "AAA") && joiner === false: this.IntersectionHandler.disconnectedArcIntersection_thisIndexIsPathToArc(); break
//         // 2_Joiner
//         case this.joinerType(this.index - 1, "AAA") && joiner === true: 
//             this.arcExist(this.index + 1) ?
//                 // 2_A_Joiner
//                 this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc() // TODO: (Set_arcRad)
//                 :
//                 // 2_B_Joiner
//                 this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc()
//             break
//         // 3_Joiner
//         case this.joinerType(this.index, "CCC"): this.IntersectionHandler.disconnectedArcIntersection_thisIndexIsArcToArc(); break
//         // 4_Joiner
//         case this.joinerType(this.index - 1, "CCC"): this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsArcToArc(); break // TODO: (Set_arcRad)
//         // 5_Joiner
//         case this.joinerType(this.index, "BBB"): this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsArcToPath(); break
//         // 6_Joiner
//         case this.parallelFigureObj.skipperCheckers.skipperChecker_Arc: this.IntersectionHandler.disconnectedArcIntersection_skipThisIndex(parPathObj) // TODO: check that it works
//     }
// }













//new
function IntersectionsSorter_WithArc_Disconnected_cornerShape_01(parallelFigure, index, subFigureSkipperIndexModifiers) {
    // Call the constructor of the parent class
    IntersectionsSorter_WithArc.call(this, parallelFigure, index, subFigureSkipperIndexModifiers)
    // console.log(this)
}

// Inherit methods from the parent class
IntersectionsSorter_WithArc_Disconnected_cornerShape_01.prototype = Object.create(IntersectionsSorter_WithArc.prototype)
IntersectionsSorter_WithArc_Disconnected_cornerShape_01.prototype.constructor = IntersectionsSorter_WithArc_Disconnected_cornerShape_01

IntersectionsSorter_WithArc_Disconnected_cornerShape_01.prototype.handleDisconnectedArcIntersection = function(joiner) {
    // console.log("INT_SORTER_ARC: DISCONNECTED_INTERSECTION")
    switch(true) {
        // 1_Joiner
        // case this.joinerType(this.index - 1, "AAA") && joiner === false: this.IntersectionHandler.disconnectedArcIntersection_thisIndexIsPathToArc(); break
        case this.joinerType(this.previousIndex, "AAA") && joiner === false: this.IntersectionHandler.disconnectedArcIntersection_thisIndexIsPathToArc(); break
        // 2_Joiner
        // case this.joinerType(this.index - 1, "AAA") && joiner === true: 
        case this.joinerType(this.previousIndex, "AAA") && joiner === true: 
            // this.arcExist(this.index + 1) ?
            this.arcExist(this.nextIndex) ?
                // 2_A_Joiner
                this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc() // TODO: (Set_arcRad)
                :
                // 2_B_Joiner
                this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc()
            break
        // 3_Joiner
        // case this.joinerType(this.index, "CCC"): this.IntersectionHandler.disconnectedArcIntersection_thisIndexIsArcToArc(); break
        case this.joinerType(this.thisIndex, "CCC"): this.IntersectionHandler.disconnectedArcIntersection_thisIndexIsArcToArc(); break  //3_ooo
        // 4_Joiner
        // case this.joinerType(this.index - 1, "CCC"): this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsArcToArc(); break // TODO: (Set_arcRad)
        case this.joinerType(this.previousIndex, "CCC"): this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsArcToArc(); break // TODO: (Set_arcRad)    //4_ooo
        // 5_Joiner
        // case this.joinerType(this.index, "BBB"): this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsArcToPath(); break
        case this.joinerType(this.thisIndex, "BBB"): this.IntersectionHandler.disconnectedArcIntersection_prevIndexIsArcToPath(); break
        // 6_Joiner
        // case this.parallelFigureObj.skipperCheckers.skipperChecker_Arc: this.IntersectionHandler.disconnectedArcIntersection_skipThisIndex(parPathObj) // TODO: check that it works
    }
}


export {
    IntersectionsSorter_WithArc,
    IntersectionsSorter_WithArc_Disconnected_cornerShape_01
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