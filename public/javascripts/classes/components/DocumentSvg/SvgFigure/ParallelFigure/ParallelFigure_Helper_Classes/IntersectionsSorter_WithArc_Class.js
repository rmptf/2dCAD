import { ReferenceLayer } from '../../../../ReferenceLayer/ReferenceLayer_Class.js'
import { ReferenceFigure } from '../../ReferenceFigure/ReferenceFigure_Class.js'
import {IntersectionHandler_WithArc} from './IntersectionHandler_WithArc_Class.js'

function IntersectionsSorter_WithArc(parallelFigure, index, subFigureSkipperIndexModifiers) {
    // this.PARFIGURE = parallelFigure
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.parallelFigureObj = parallelFigure.parallelFigureObject
    this.index = index

    this.previousIndex = this.index + 0 + subFigureSkipperIndexModifiers.previousIndexModifier
    this.thisIndex = this.index + 1 + subFigureSkipperIndexModifiers.currentIndexModifier 
    this.nextIndex = this.index + 2 + subFigureSkipperIndexModifiers.nextIndexModifier
    this.originalFigurePathData = (modifierFromFunction) => this.originalFigurePathDatas[modifierFromFunction]

    this.previousIndexHARDCOUNT = this.index + 0
    this.thisIndexHARDCOUNT = this.index + 1
    this.nextIndexHARDCOUNT = this.index + 2


    this.IntersectionHandler = new IntersectionHandler_WithArc(parallelFigure, index, subFigureSkipperIndexModifiers)

    this.joinerType = (targetIndex, code) => {
        if(this.originalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west.children.childCount > 0) {
            return this.originalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joiner === true && this.originalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west.children.corner_pathDatas[0].arc.joinerSide === code
        } else {
            return false
        }
    }
    this.isJoiner = (targetIndex) => {
        return this.originalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west.children.childCount > 0;
    }
    this.firstPosition = (targetIndex) => (targetIndex) === 1

    this.arcExist = (targetIndex) => {
        console.log(targetIndex)
        console.log(this.originalFigurePathData(targetIndex))
        return this.originalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_east.arc.exist === true
    }
    this.joinerExist = (targetIndex) => {
        return this.originalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west.children.childCount > 1
    }
    this.lastPosition = (targetIndex) => {
        return targetIndex >= this.originalFigurePathDatas.length - 1
    }
    this.includes = (list, targetIndex) => {
        return list.includes(this.originalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west.arc.joinerSide) //FIXME: Prob need to handle differently // here
    }
    //FIXME: // new used for handling closed arcs
    this.isHidden = (targetIndex) => {
        return this.originalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west?.arc.hidden === true || false
    }
    this.isOdd = (targetIndex) => {
        return targetIndex % 2 !== 0
    }
    //FIXME:

    // new but not used currently
    // this.ifFirstArcSegement = (targetIndex) => {
    //     console.log("ARC_SIDE_CHECK")
    //     if(this.thisOriginalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west === null) {
    //         return false
    //     } else {
    //         console.log("hurrr")
    //     }
    // }
    // this.logThisParPathData = (targetIndex) => {
    //     console.log(this.thisOriginalFigurePathData(targetIndex).children.parallel_pathDatas)
    //     console.log(this.thisOriginalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_west)
    //     console.log(this.thisOriginalFigurePathData(targetIndex).children.parallel_pathDatas.pathData_east)
    // }
    // new but not used currently
}

//FIXME: Is there a way to set this dynamically?
IntersectionsSorter_WithArc.prototype.setIndex = function(index, subFigureSkipperIndexModifiers) {
    this.index = index

    this.previousIndex = this.index + 0 + subFigureSkipperIndexModifiers.previousIndexModifier
    this.thisIndex = this.index + 1 + subFigureSkipperIndexModifiers.currentIndexModifier 
    this.nextIndex = this.index + 2 + subFigureSkipperIndexModifiers.nextIndexModifier

    //FIXME: Get rid of this way, set dynamically
    this.IntersectionHandler.setIndex(index, subFigureSkipperIndexModifiers)
}













// SHAPE 01
// SHAPE 01
// SHAPE 01
//NOTES:
//NOTES:
// not working when there is a arc before this
//NOTES:
//NOTES:
// (CLOSED ARC BEFORE INTERSECTON (PART 1 of 1): runs on index BEFORE clsoed arc)
//FIXME: RIGHT HERE (this is a temporary method that HARDCODES these actions) Will have to build dynamic alt. that works for all cases
IntersectionsSorter_WithArc.prototype.customIntersection_A2A_previousArcClosedPREVIOUS = function() {
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_firstArcSegment_fistIndex()
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction() //NEW TODO: might just need to add a porject perpendicular before or around this.
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()
}
// SHAPE 01
// SHAPE 01
// SHAPE 01



// SHAPE 02
// SHAPE 02
// SHAPE 02
// (CLOSED ARC AFTER INTERSECTON (PART 1 of 2): runs on index BEFORE clsoed arc)
//FIXME: RIGHT HERE (this is a temporary method that HARDCODES these actions) Will have to build dynamic alt. that works for all cases
IntersectionsSorter_WithArc.prototype.customIntersection_A2A_afterArcClosedPREVIOUS = function() {
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected()
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction()
    // this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction() //NEW
    this.IntersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction() //NEW
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()
}
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 7_seg2_first_all         // this.setPerpendicularPoints([0, 0], true)                                                            // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_secondArcSegment_everyIndex_firstAction
// 8_seg2_connected         // nothing                                                                                              // nothing                                                                              // arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected
// 11_seg2_last_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1                                         // no PD                                                                                // arcIntersection_secondArcSegment_everyIndex_lastAction
// 1_all (NEW) (SKIP?)      // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 2_seg1_first_all (NEW)   // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1                                          // no PD                                                                                // arcIntersection_firstArcSegment_everyIndex_firstAction
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll")      // this.checkIfArcIsClosed()                        // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction

// (CLOSED ARC AFTER INTERSECTON (PART 2 of 2): runs on index AFTER clsoed arc)
//FIXME: RIGHT HERE (this is a temporary method that HARDCODES these actions) Will have to build dynamic alt. that works for all cases
IntersectionsSorter_WithArc.prototype.customIntersection_A2A_afterArcClosedNEXT = function() {
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc() //NEW
    this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc() //NEW
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction() // TRY TO STOP FROM RUNNING BUT HARDER TO DO WHEN BREAKOUT (WORKS WITH IT, JUST ADDS UNNECISSARY ANIMATION)
    this.IntersectionHandler.arcIntersection_secondArcSegment_lastIndex()
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction()
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()

}
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 3_seg1 (NEW)             // this.handleIntersectionWithArc('a2a')                                                                // (prevPD.child_east #2 & thisPD.child_west #3)                                        // arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc
// 6_A_seg1: (NEW)          // this.setThisPathDataAsPreviousPathData()                                                             // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc
// 7_seg2_first_all         // this.setPerpendicularPoints([0, 0], true)                                                            // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_secondArcSegment_everyIndex_firstAction
// 10_seg2                  // this.setPerpendicularPoints([1, 1], false)                                                                                                                                                   // arcIntersection_secondArcSegment_lastIndex
// 11_seg2_last_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1                                         // no PD                                                                                // arcIntersection_secondArcSegment_everyIndex_lastAction
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll")      // this.checkIfArcIsClosed()                        // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction
// SHAPE 02
// SHAPE 02
// SHAPE 02


// SHAPE 03
// SHAPE 03
// SHAPE 03
// (2 ARCS CLSOED (PART 1 of 2): runs on index BEFORE clsoed arc)
//FIXME: RIGHT HERE (this is a temporary method that HARDCODES these actions) Will have to build dynamic alt. that works for all cases
IntersectionsSorter_WithArc.prototype.customIntersection_A2A_twoArcsClosedPREVIOUS = function() {
    console.log("RUNNING_TWOARCS_CLOSED_PREVIOUS")
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_firstArcSegment_fistIndex()
    // this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction() //NEW
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()
}
// OLD #1
// FIRST ARC
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 2_seg1_first_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1                                          // no PD                                                                                // arcIntersection_firstArcSegment_everyIndex_firstAction
// 5_seg1                   // this.setPerpendicularPoints([0, 0], false)                                                           // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_firstArcSegment_fistIndex
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll") // this.checkIfArcIsClosed()                             // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction

//old
// (2 ARCS CLSOED (PART 2 of 2): runs on index AFTER clsoed arc)
// //FIXME: RIGHT HERE (this is a temporary method that HARDCODES these actions) Will have to build dynamic alt. that works for all cases
// IntersectionsSorter_WithArc.prototype.customIntersection_A2A_twoArcsClosedNEXT = function() {
//     console.log("RUNNING_TWOARCS_CLOSED_FOLLOWING")

//     this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction()
//     this.IntersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc() //NEW
//     // this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc() //NEW
//     // this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction() // TRY TO STOP FROM RUNNING BUT HARDER TO DO WHEN BREAKOUT (WORKS WITH IT, JUST ADDS UNNECISSARY ANIMATION)
//     // this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction_NEW() // TRY TO STOP FROM RUNNING BUT HARDER TO DO WHEN BREAKOUT (WORKS WITH IT, JUST ADDS UNNECISSARY ANIMATION)
//     this.IntersectionHandler.arcIntersection_secondArcSegment_lastIndex()
//     // this.IntersectionHandler.arcIntersection_secondArcSegment_lastIndex_NEW()
//     this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction()
//     this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()
//     // this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction_NEW()
// }
//NEW #4
// SECOND ARC
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 3_seg1 (NEW)             // this.handleIntersectionWithArc('a2a')                                                                // (prevPD.child_east #2 & thisPD.child_west #3)                                        // arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc
// 6_A_seg1: (NEW)          // this.setThisPathDataAsPreviousPathData()                                                             // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc
// 7_seg2_first_all         // this.setPerpendicularPoints([0, 0], true)                                                            // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_secondArcSegment_everyIndex_firstAction
// 10_seg2                  // this.setPerpendicularPoints([1, 1], false)                                                                                                                                                   // arcIntersection_secondArcSegment_lastIndex
// 11_seg2_last_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1                                         // no PD                                                                                // arcIntersection_secondArcSegment_everyIndex_lastAction
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll")      // this.checkIfArcIsClosed()                        // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction

//new
// (2 ARCS CLSOED (PART 2 of 2): runs on index AFTER clsoed arc)
//FIXME: RIGHT HERE (this is a temporary method that HARDCODES these actions) Will have to build dynamic alt. that works for all cases
IntersectionsSorter_WithArc.prototype.customIntersection_A2A_twoArcsClosedNEXT = function() {
    console.log("RUNNING_TWOARCS_CLOSED_FOLLOWING")
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc() //NEW
    // this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction() // REMOVED (but on the surface it looks like it works fine if turned on)
    this.IntersectionHandler.arcIntersection_secondArcSegment_lastIndex()
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction()
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()
}
// SHAPE 03
// SHAPE 03
// SHAPE 03








// SHAPE 04_A_firstArcClosed
// SHAPE 04_A_firstArcClosed
// SHAPE 04_A_firstArcClosed
IntersectionsSorter_WithArc.prototype.allPreviousPathsSkipped_setFirstEndPointAtCurrentFirstPathStart = function() {
    console.log("NEWNEW_01_PART_01_________________________________")

    //worki g for index 0 start
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_firstArcSegment_fistIndex()
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()


    // this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction() //2
    // this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction() //2
    // this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected() //2
    // this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction() //2
    // this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction() //2
}
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 2_seg1_first_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1                                          // no PD                                                                                // arcIntersection_firstArcSegment_everyIndex_firstAction
// 5_seg1                   // this.setPerpendicularPoints([0, 0], false)                                                           // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_firstArcSegment_fistIndex
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll") // this.checkIfArcIsClosed()                             // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction


IntersectionsSorter_WithArc.prototype.customIntersection_A2A_firstArcSegmentClosed_i_IsInTheFourthPos = function() {
console.log("NEWNEW_01_PART_02_A_________________________________")
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc()
    // this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction() //in originalbut does nothing here (does control some prev points)
    this.IntersectionHandler.arcIntersection_secondArcSegment_lastIndex()
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction()
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()
}
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 3_seg1                   // this.handleIntersectionWithArc('a2a')                                                                // (prevPD.child_east #2 & thisPD.child_west #3)                                        // arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc
// 7_seg2_first_all         // this.setPerpendicularPoints([0, 0], true)                                                            // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_secondArcSegment_everyIndex_firstAction
// 10_seg2                  // this.setPerpendicularPoints([1, 1], false)                                                                                                                                                   // arcIntersection_secondArcSegment_lastIndex
// 11_seg2_last_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1                                         // no PD                                                                                // arcIntersection_secondArcSegment_everyIndex_lastAction
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll")      // this.checkIfArcIsClosed()                        // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction
// SHAPE 04_A_firstArcClosed
// SHAPE 04_A_firstArcClosed
// SHAPE 04_A_firstArcClosed

// SHAPE 04_B_firstArcClosed
// SHAPE 04_B_firstArcClosed
// SHAPE 04_B_firstArcClosed
IntersectionsSorter_WithArc.prototype.customIntersection_A2A_firstArcSegmentClosed_i_IsInTheThirdPos = function() {
console.log("NEWNEW_01_PART_02_B_________________________________")
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc() //new?
    // this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc()
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()
}
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 2_seg1_first_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1                                          // no PD                                                                                // arcIntersection_firstArcSegment_everyIndex_firstAction
// 3_seg1                   // this.handleIntersectionWithArc('a2a')                                                                // (prevPD.child_east #2 & thisPD.child_west #3)                                        // arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc
// 6_A_seg1                 // this.setThisPathDataAsPreviousPathData()                                                             // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll")      // this.checkIfArcIsClosed()                        // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction
// SHAPE 04_B_firstArcClosed
// SHAPE 04_B_firstArcClosed
// SHAPE 04_B_firstArcClosed

// TODO: WORKING HERE
// SHAPE 04_C_firstArcClosed
// SHAPE 04_C_firstArcClosed
// SHAPE 04_C_firstArcClosed
IntersectionsSorter_WithArc.prototype.customIntersection_A2A_firstArcSegmentClosed_i_IsInTheSecondPos = function() {
    console.log("NEWNEW_01_PART_02_C_________________________________")

    //TODO: Add new stuff here!!
    //TODO: Add new stuff here!!
    //TODO: Add new stuff here!!
    //FIXME: i dont remember how to make these things work, have to remember and should be easy to get going


    // woring for index 0 end and index 1 start
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction() //2

    this.IntersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction()

    
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction() //2
    this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected() //2
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction() //2
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction() //2

}
// SHAPE 04_C_firstArcClosed
// SHAPE 04_C_firstArcClosed
// SHAPE 04_C_firstArcClosed
// TODO: WORKING HERE



// NEW SHAPE 01
// first arc closes
// 132-4

//...

// i: 1
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 2_seg1_first_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1                                          // no PD                                                                                // arcIntersection_firstArcSegment_everyIndex_firstAction
// 5_seg1                   // this.setPerpendicularPoints([0, 0], false)                                                           // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_firstArcSegment_fistIndex
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll")      // this.checkIfArcIsClosed()                        // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)   

// i: 2
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 7_seg2_first_all         // this.setPerpendicularPoints([0, 0], true)                                                            // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_secondArcSegment_everyIndex_firstAction
// 8_seg2_connected         // nothing                                                                                              // nothing                                                                              // arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected
// 11_seg2_last_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1                                         // no PD                                                                                // arcIntersection_secondArcSegment_everyIndex_lastAction
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll") // this.checkIfArcIsClosed()                             // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction

// i: 3
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 2_seg1_first_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1                                          // no PD                                                                                // arcIntersection_firstArcSegment_everyIndex_firstAction
// 3_seg1                   // this.handleIntersectionWithArc('a2a')                                                                // (prevPD.child_east #2 & thisPD.child_west #3)                                        // arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc
// 6_A_seg1                 // this.setThisPathDataAsPreviousPathData()                                                             // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll")      // this.checkIfArcIsClosed()                        // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction


// i: 4
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 7_seg2_first_all         // this.setPerpendicularPoints([0, 0], true)                                                            // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_secondArcSegment_everyIndex_firstAction
// 10_seg2                  // this.setPerpendicularPoints([1, 1], false)                                                                                                                                                   // arcIntersection_secondArcSegment_lastIndex
// 11_seg2_last_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1                                         // no PD                                                                                // arcIntersection_secondArcSegment_everyIndex_lastAction
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll")      // this.checkIfArcIsClosed()                        // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction










// SHAPE 05_A_lastArcClosed
// SHAPE 05_A_lastArcClosed
// SHAPE 05_A_lastArcClosed
IntersectionsSorter_WithArc.prototype.customIntersection_A2A_firstArcSegmentClosed_THRIDS = function() {
    console.log("NEWNEW_04_________________________________")
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_firstArcSegment_fistIndex()
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()
}
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 2_seg1_first_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1                                          // no PD                                                                                // arcIntersection_firstArcSegment_everyIndex_firstAction
// 5_seg1                   // this.setPerpendicularPoints([0, 0], false)                                                           // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_firstArcSegment_fistIndex
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll")      // this.checkIfArcIsClosed()                        // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction

IntersectionsSorter_WithArc.prototype.customIntersection_A2A_firstArcSegmentClosed_popoppopopoDODODODOD = function() { //FIXME: For shape F4
    console.log("NEWNEW_05_________________________________")
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc() //new?
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_secondArcSegment_lastIndex()
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction()
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction() //FIXME: need this but turned off for now, for conveneince //FIXME: maybe done need? FIXME: DONT NEED, already closed
}
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 3_seg1 (NEW?)            // this.handleIntersectionWithArc('a2a')                                                                // (prevPD.child_east #2 & thisPD.child_west #3)                                        // arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc
// 7_seg2_first_all         // this.setPerpendicularPoints([0, 0], true)                                                            // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_secondArcSegment_everyIndex_firstAction
// 10_seg2                  // this.setPerpendicularPoints([1, 1], false)                                                                                                                                                   // arcIntersection_secondArcSegment_lastIndex
// 11_seg2_last_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1                                         // no PD                                                                                // arcIntersection_secondArcSegment_everyIndex_lastAction
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll") // this.checkIfArcIsClosed()                             // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction
// SHAPE 05_A_lastArcClosed
// SHAPE 05_A_lastArcClosed
// SHAPE 05_A_lastArcClosed

// SHAPE 05_B_lastArcClosed
// SHAPE 05_B_lastArcClosed
// SHAPE 05_B_lastArcClosed
IntersectionsSorter_WithArc.prototype.customIntersection_A2A_firstArcSegmentClosed_THRIDS_plplplplplplplp = function() {
    console.log("NEWNEW_06_________________________________")
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected()
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction()
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction() //FIXME: need this but turned off for now, for conveneince //FIXME: maybe done need? FIXME: DONT NEED, already closed
}
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 7_seg2_first_all         // this.setPerpendicularPoints([0, 0], true)                                                            // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_secondArcSegment_everyIndex_firstAction
// 8_seg2_connected         // nothing                                                                                              // nothing                                                                              // arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected
// 11_seg2_last_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1                                         // no PD                                                                                // arcIntersection_secondArcSegment_everyIndex_lastAction
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll") // this.checkIfArcIsClosed()                             // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction
// SHAPE 05_B_lastArcClosed
// SHAPE 05_B_lastArcClosed
// SHAPE 05_B_lastArcClosed


// SHAPE ??_
IntersectionsSorter_WithArc.prototype.customIntersection_A2A_firstArcSegmentClosed_popoppopopoDODODODOD_PSDFPSDFSDFSDFSDFS = function() { //FIXME: For shape F5
    console.log("NEWNEW_05_B_________________________________")
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_firstAction()
    // this.IntersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc() //new?
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_firstAction()
    this.IntersectionHandler.arcIntersection_secondArcSegment_lastIndex()
    this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction()
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction() //FIXME: need this but turned off for now, for conveneince //FIXME: maybe done need? FIXME: DONT NEED, already closed
}
// SHAPE ??_






















IntersectionsSorter_WithArc.prototype.sortIntersections_NEW = function(joiner) {
    //old
    // if (!this.firstPosition(this.index)) {
    //new
    if (!this.firstPosition(this.thisIndex)) {
        switch(true) {
            //old
            // case !this.lastPosition(this.index) && this.isJoiner(this.index) && joiner === true:
            //new
            case !this.lastPosition(this.thisIndex) && this.isJoiner(this.thisIndex) && joiner === true:
                console.log("INT_SORTER_ARC: SORTING: HANDLE DISCONNECTED: YES_JOINER_THIS_INDEX_OTHER_POS")
                // console.log("DISCONNECTED_01")
                this.handleDisconnectedArcIntersection()
                // console.log("INT_SORTER_ARC: SORTING: RUNNING_CONNECTED_AFTER_DISCONNECTED")
                break
            //old
            // case this.isJoiner(this.index - 1):
            case this.isJoiner(this.previousIndex): 
                console.log("INT_SORTER_ARC: SORTING: HANDLE DISCONNECTED: YES_JOINER_PREV_INDEX_OTHER_POS")
                // console.log("DISCONNECTED_02")
                this.handleDisconnectedArcIntersection(joiner)
                break
            default:
                console.log("INT_SORTER_ARC: SORTING: HANDLE CONNECTED: NO_JOINER_OTHER_POS")
                // console.log("CONNECTED_01")
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
                console.log("INT_SORTER_ARC: SORTING: HANDLE DISCONNECTED: YES_JOINER_FIRST_POS")
                // console.log("DISCONNECTED_03")
                this.handleDisconnectedArcIntersection()
                break
            default:
                console.log("INT_SORTER_ARC: SORTING: HANDLE CONNECTED: NO_JOINER_FIRST_POS")
                // console.log("CONNECTED_02")
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
    console.log("CHECKING_ARCSIDE")
    // this.logThisParPathData(this.thisIndex)
    switch(true) {
        case this.parallelFigureObj.parallelPathSegmentCounter_FIRST === 0:
            console.log("INT_SORTER_ARC: FIRST_OR_SECOND: HANDLE_FIRST_SEG")
            this.handleFirstArcSegment()
            break
        default:
            console.log("INT_SORTER_ARC: FIRST_OR_SECOND: HANDLE_SECOND_SEG")
            this.handleSecondArcSegment()
    }
    // Final
    this.IntersectionHandler.arcIntersection_allArcSegments_everyIndex_lastAction()
}

IntersectionsSorter_WithArc.prototype.handleFirstArcSegment = function() {
    // 2
    console.log("INT_SORTER_ARC: FIRST_ARC_SEG: EVERY_INDEX")
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
            case this.arcExist(this.nextIndex): this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(); break
            // 6_B
            // default: (console.log("INT_SORTER_ARC: FIRST_ARC_SEG: NEXT_INDEX_IS_NOT_ARC"), this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc())
            default: this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc()
        }
    }

    // ***NOTES FOR DOUBLE CLOSED ARC: Previous arc to intersection closed first***
    // This should run when first arc closes but NOT at all when both arcs close
        // currently runs when both arcs close (FIXED?: yes)
    // ***NOTES FOR DOUBLE CLOSED ARC: Previous arc to intersection closed first***
    //FIXME:
    // PREVIOUS TO INTERSECTION CLOSED ARC
    // this runs at i: 1 (previous to closed arc)
    if(this.isHidden(this.nextIndexHARDCOUNT + 0) && !this.isHidden(this.nextIndexHARDCOUNT + 1)) {  //TODO: not quite right but quick fix "- 1" // switching to hardcounts: seems to working. adding second arc check
        console.log('__________________________________INDEX____________________________________')
        console.log("CLOSSED_ARC_INJECTION: 01")
        this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction() //NEW
        // REFERENCE FIGURE STUFF
        // this.IntersectionHandler.arcIntersection_secondArcSegment_everyIndex_lastAction(true) //With passed variable for REFERENCE FIGURE
        // REFERENCE FIGURE STUFF

        // // REFERENCE LAYER STUFF
        // this.referenceLayer.toggleCheckBox(this.optSel08, {palette: 8, fillClr: 1, strokeClr: 1})
        // // REFERENCE LAYER STUFF
    }
    //FIXME:
}

// this.previousIndexHARDCOUNT
// this.thisIndexHARDCOUNT
// this.nextIndexHARDCOUNT
// console.log(this.originalFigurePathData(this.nextIndexHARDCOUNT - 0))

IntersectionsSorter_WithArc.prototype.handleSecondArcSegment = function() {

    // ***NOTES FOR DOUBLE CLOSED ARC: Previous arc to intersection closed first***
    // This should NOT run at any time (when first arc closes or when second arc closes)
        // currently runs when second arc closes (FIXED?: yes)
    // ***NOTES FOR DOUBLE CLOSED ARC: Previous arc to intersection closed first***
    //FIXME:
    // AFTER INTERSECTION CLOSED ARC - first or second arc hasnt closed
    // this runs at i: 4 (after closed arc)
    // if(this.isHidden(this.previousIndex + 1)) { //TODO: not quite right but quick fix "+ 1"
    if(this.isHidden(this.previousIndexHARDCOUNT - 0) && !this.isHidden(this.previousIndexHARDCOUNT - 1)) { //TODO: not quite right but quick fix "+ 1"
        console.log('__________________________________INDEX____________________________________')
        // console.log(this.originalFigurePathData(this.nextIndexHARDCOUNT - 0))
        // console.log(this.originalFigurePathData(this.nextIndexHARDCOUNT - 0))
        console.log("CLOSSED_ARC_INJECTION: 02_AAA")
        this.IntersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc() //NEW
        this.IntersectionHandler.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc() //
        
        // // REFERENCE LAYER STUFF
        // this.referenceLayer.toggleCheckBox(this.optSel09, {palette: 8, fillClr: 1, strokeClr: 1})
        // // REFERENCE LAYER STUFF
    }
    //FIXME:

    // ***NOTES FOR DOUBLE CLOSED ARC: Previous arc to intersection closed first***
    // This should run once after the second arc has closed
        // currently never runs (FIXED?: yes)
    // ***NOTES FOR DOUBLE CLOSED ARC: Previous arc to intersection closed first***
    //FIXME:
    // AFTER INTERSECTION CLOSED ARC - second arc has closed
    // this runs at i: 4 (after second closed arc)
    if(this.isHidden(this.previousIndexHARDCOUNT - 0) && this.isHidden(this.previousIndexHARDCOUNT - 1)) { //TODO: not quite right but quick fix "+ 1"
        console.log('__________________________________INDEX____________________________________')
        console.log("CLOSSED_ARC_INJECTION: 02_BBB")
        this.IntersectionHandler.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc() //NEW

        // // REFERENCE LAYER STUFF
        // this.referenceLayer.toggleCheckBox(this.optSel10, {palette: 8, fillClr: 1, strokeClr: 1})
        // // REFERENCE LAYER STUFF
    }
    //FIXME:



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

    // ***NOTES FOR DOUBLE CLOSED ARC: Previous arc to intersection closed first***
    // this should NOT run at any point
    // ***NOTES FOR DOUBLE CLOSED ARC: Previous arc to intersection closed first***
    //FIXME:
    // AFTER INTERSECTION CLOSED ARC
    // this runs at i: 2 (previous to closed arc)
    if(!this.lastPosition(this.thisIndex)) {
        console.log("")
        console.log("BIG_CHECK")
        console.log("BIG_CHECK")
        console.log("")
        if(this.isHidden(this.nextIndex - 1) && this.isOdd(this.nextIndex - 1)) {
            console.log('__________________________________INDEX____________________________________')
            console.log("CLOSSED_ARC_INJECTION: 03")
            // console.log(this.nextIndexHARDCOUNT + 0)
            // console.log(this.nextIndexHARDCOUNT + 1)
            // console.log(this.originalFigurePathData(this.nextIndexHARDCOUNT + 0))
            // console.log(this.originalFigurePathData(this.nextIndexHARDCOUNT + 1))
            // console.log(this.originalFigurePathData(this.nextIndex - 1))
            // console.log(this.originalFigurePathData(this.nextIndex - 1))
            this.IntersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction() //NEW
        }

        // // REFERENCE LAYER STUFF
        // this.referenceLayer.toggleCheckBox(this.optSel11, {palette: 8, fillClr: 1, strokeClr: 1})
        // // REFERENCE LAYER STUFF

        // // if(this.isHidden(this.nextIndexHARDCOUNT + 0) && !this.isHidden(this.nextIndexHARDCOUNT + 1)) {  //TODO: not quite right but quick fix "- 1"
        // if(this.isHidden(this.nextIndex - 1) && !this.isHidden(this.nextIndex - 0)) {  //TODO: not quite right but quick fix "- 1" //FIXME: these should actually stay nextIndex (not hardcount) should probably fix above too but maybe use thisIndex because it doesnt change???
        // // if(this.isHidden(this.nextIndex - 1)) {  //TODO: not quite right but quick fix "- 1"
        //     if(!this.isHidden(this.nextIndex - 2)) {
        //         console.log('__________________________________INDEX____________________________________')
        //         console.log("CLOSSED_ARC_INJECTION: 03")
        //         // console.log(this.nextIndexHARDCOUNT + 0)
        //         // console.log(this.nextIndexHARDCOUNT + 1)
        //         // console.log(this.originalFigurePathData(this.nextIndexHARDCOUNT + 0))
        //         // console.log(this.originalFigurePathData(this.nextIndexHARDCOUNT + 1))
        //         // console.log(this.originalFigurePathData(this.nextIndex - 1))
        //         // console.log(this.originalFigurePathData(this.nextIndex - 1))

        //         this.IntersectionHandler.arcIntersection_firstArcSegment_everyIndex_firstAction() //NEW
        //     } else {
        //         console.log('poop')
        //     }
        // }
    }
    //FIXME:
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

//new //old
IntersectionsSorter_WithArc.prototype.handleDisconnectedArcIntersection = function(joiner) {
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