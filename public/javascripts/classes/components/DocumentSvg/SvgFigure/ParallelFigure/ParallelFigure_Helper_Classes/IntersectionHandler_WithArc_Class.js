import {LargeArcFlagSetter} from './LargeArcFlagSetter_Class.js'
import {Intersection_Contact} from './Intersection_Helper_Classes/Intersection_Contact_Class.js'
import {Intersection_NoContact} from './Intersection_Helper_Classes/Intersection_NoContact_Class.js'
import {getDistance} from '../../../../../../functions/math/mathFunctions.js' // OLD LOC
import {findPointAlongSlopeAtDistance} from '../../../../../../functions/drafting/parallelPath/drawParallelPath_functions/parallelPathFunctions.js' // OLD LOC
import {ReferenceFigure} from '../../ReferenceFigure/ReferenceFigure_Class.js'
import { areTwoLinesIntersecting } from '../ParallelFigureUtils/GeometryUtils/geometryUtils.js'
import { ClosedArcChecker } from './ClosedArcChecker_Class.js'
// import {handleArcToArcIntersectionNoContact, handleArcToPathIntersectionNoContact, handlePathToArcIntersectionNoContact} from './Intersection_Helper_Classes/Intersection_NoContact_Class.js'

function IntersectionHandler_WithArc(parallelFigure, index, subFigureSkipperIndexModifiers) {
    this.PARFIGURE = parallelFigure
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.parallelFigureObj = parallelFigure.parallelFigureObject
    this.index = index
    this.arcRadiusParDistAndDir = null

    this.intersectionHandlerObject = {
        isIntersectionConnected: true,
    }

    this.skipperIndexMods = subFigureSkipperIndexModifiers
    this.previousIndex = this.index + 0 + this.skipperIndexMods.previousIndexModifier
    this.thisIndex = this.index + 1 + this.skipperIndexMods.currentIndexModifier 
    this.nextIndex = this.index + 2 + this.skipperIndexMods.nextIndexModifier

    this.previousOriginalFigurePathData = (modifierFromFunction = 0) => this.originalFigurePathDatas[this.previousIndex + modifierFromFunction]
    this.thisOriginalFigurePathData = (modifierFromFunction = 0) => this.originalFigurePathDatas[this.thisIndex + modifierFromFunction]
    this.nextOriginalFigurePathData = (modifierFromFunction = 0) => this.originalFigurePathDatas[this.nextIndex + modifierFromFunction]

    this.Intersection_Contact = new Intersection_Contact(parallelFigure, index, this.intersectionHandlerObject, this.skipperIndexMods)
    this.Intersection_NoContact = new Intersection_NoContact(parallelFigure, index)
    this.ClosedArcChecker = new ClosedArcChecker(parallelFigure, index, subFigureSkipperIndexModifiers)


    //MOVED TO OWN CLASS
    // // CLOSED ARC STUFF
    // this.FIRSTCHECKER = true
    // this.FIRSTCHECKER_02 = true
    // this.FIRSTCHECKER_03 = false
    // this.ORIGPOS_START = null
    // this.ORIGPOS_END = null
    //MOVED TO OWN CLASS
    

    // // REFERENCE FIGURE STUFF
    // if(this.index === 0) {
    //     let svgFigure = parallelFigure.svgFigure
    //     this.referenceFigure_01_A = new ReferenceFigure(svgFigure, true)
    //     this.referenceFigure_01_A.addEmptyCircle({palette: 8, circRad: 15, fillClr: 'transparent', strokeClr: 1, strokeWidth: 3}, 1)
    // }
    // if(this.index === 1) {
    //     let svgFigure = parallelFigure.svgFigure
    //     this.referenceFigure_02_A = new ReferenceFigure(svgFigure, true)
    //     this.referenceFigure_02_A.addEmptyCircle({palette: 8, circRad: 15, fillClr: 'transparent', strokeClr: 2, strokeWidth: 3}, 1)
    // }
    // if(this.index === 2) {
    //     let svgFigure = parallelFigure.svgFigure
    //     this.referenceFigure_03_A = new ReferenceFigure(svgFigure, true)
    //     this.referenceFigure_03_A.addEmptyCircle({palette: 8, circRad: 15, fillClr: 'transparent', strokeClr: 3, strokeWidth: 3}, 1)
    // }
    // if(this.index === 3) {
    //     let svgFigure = parallelFigure.svgFigure
    //     this.referenceFigure_04_A = new ReferenceFigure(svgFigure, true)
    //     this.referenceFigure_04_A.addEmptyCircle({palette: 8, circRad: 15, fillClr: 'transparent', strokeClr: 4, strokeWidth: 3}, 1)
    // }
    // if(this.index === 4) {
    //     let svgFigure = parallelFigure.svgFigure
    //     this.referenceFigure_05_A = new ReferenceFigure(svgFigure, true)
    //     this.referenceFigure_05_A.addEmptyCircle({palette: 8, circRad: 15, fillClr: 'transparent', strokeClr: 5, strokeWidth: 3}, 1)
    // }
    // // REFERENCE FIGURE STUFF

}

export {
    IntersectionHandler_WithArc
}


//FIXME: Get rid of this way, set dynamically
IntersectionHandler_WithArc.prototype.setIndex = function(index, subFigureSkipperIndexModifiers) {
    // FIXME: THIS is what causes ONE closed arc second (after) arc closed not to work
    // FIXME: THIS is what causes ONE closed arc second (after) arc closed not to work
    this.index = index
    this.skipperIndexMods = subFigureSkipperIndexModifiers
    this.previousIndex = this.index + 0 + subFigureSkipperIndexModifiers.previousIndexModifier //FIXME: specifically this one
    this.thisIndex = this.index + 1 + subFigureSkipperIndexModifiers.currentIndexModifier 
    this.nextIndex = this.index + 2 + subFigureSkipperIndexModifiers.nextIndexModifier
    // FIXME: THIS is what causes ONE closed arc second (after) arc closed not to work
    // FIXME: THIS is what causes ONE closed arc second (after) arc closed not to work

    // this.Intersection_Contact.setIndex(subFigureSkipperIndexModifiers)
    this.Intersection_Contact.setIndex(index, subFigureSkipperIndexModifiers)
    this.ClosedArcChecker.setIndex(index, subFigureSkipperIndexModifiers)
}



// //MOVED TO OWN CLASS
// IntersectionHandler_WithArc.prototype.checkIfArcIsClosed = function() {
//     let parallelEndPoint_start = this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west
//     let parallelEndPoint_end = this.thisOriginalFigurePathData().children.parallel_pathDatas.pathData_east
//     let parallelEndPoint_end_next = this.thisOriginalFigurePathData().children.parallel_pathDatas.pathData_west
//     // let parallelEndPoint_next = this.nextOriginalFigurePathData().children.parallel_pathDatas.pathData_east
//     let referencFigureIndex = 1 // REFERENCE FIGURE STUFF

//     if(this.FIRSTCHECKER === true) {
//         this.ORIGPOS_START = [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y]
//         this.ORIGPOS_END = [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y]
//         // REFERENCE FIGURE STUFF
//         if(this.index === referencFigureIndex) {

//             let svgFigure = this.PARFIGURE.svgFigure
//             this.referenceFigure_largeDot_01_fig01 = new ReferenceFigure(svgFigure, true)
//             this.referenceFigure_largeDot_01_fig01.addCircle({palette: 1, circRad: 15, fillClr: 1}, 1)
//             this.referenceFigure_largeDot_02_fig01 = new ReferenceFigure(svgFigure, true)
//             this.referenceFigure_largeDot_02_fig01.addCircle({palette: 1, circRad: 15, fillClr: 1}, 1)
//             this.referenceFigure_dottedLine_01_fig01 = new ReferenceFigure(svgFigure, true)
//             this.referenceFigure_dottedLine_01_fig01.addLine({palette: 1, strkWdth: 1, strkClr: 1, dshArray: 2})

//             this.referenceFigure_largeDot_01_fig02 = new ReferenceFigure(svgFigure, true)
//             this.referenceFigure_largeDot_01_fig02.addCircle({palette: 1, circRad: 15, fillClr: 3}, 1)
//             this.referenceFigure_largeDot_02_fig02 = new ReferenceFigure(svgFigure, true)
//             this.referenceFigure_largeDot_02_fig02.addCircle({palette: 1, circRad: 15, fillClr: 3}, 1)
//             this.referenceFigure_dottedLine_01_fig02 = new ReferenceFigure(svgFigure, true)
//             this.referenceFigure_dottedLine_01_fig02.addLine({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 2})
//         }
//         // REFERENCE FIGURE STUFF
//         this.FIRSTCHECKER = false
//     }

//     // REFERENCE FIGURE STUFF
//     let figures = [
//         this.referenceFigure_largeDot_01_fig01,
//         this.referenceFigure_largeDot_02_fig01,
//         this.referenceFigure_dottedLine_01_fig01,
//         this.referenceFigure_largeDot_01_fig02,
//         this.referenceFigure_largeDot_02_fig02,
//         this.referenceFigure_dottedLine_01_fig02
//     ]
//     let checkForFigureAndRunAFunction = (pos1, pos2, figure) => figures.length > 0 ? figures[figure].changeCircleColor(pos1, pos2) : null
//     if(this.index === referencFigureIndex) {
//         figures[0].runFunctions([this.ORIGPOS_START])
//         figures[1].runFunctions([[parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y]])
//         figures[2].runFunctions([this.ORIGPOS_START, [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y]])
//         figures[3].runFunctions([this.ORIGPOS_END])
//         figures[4].runFunctions([[parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y]])
//         figures[5].runFunctions([this.ORIGPOS_END, [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y]])
//     }
//     // REFERENCE FIGURE STUFF

//     let hasArcClosed = areTwoLinesIntersecting(this.ORIGPOS_START, [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y], this.ORIGPOS_END, [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y])

//     if(hasArcClosed === true) {
//         if(this.FIRSTCHECKER_02 === true) {
//             // REFERENCE FIGURE STUFF
//             if(this.index === referencFigureIndex) {
//                 checkForFigureAndRunAFunction(1, 2, 0)
//                 checkForFigureAndRunAFunction(1, 2, 1)
//                 checkForFigureAndRunAFunction(3, 4, 3)
//                 checkForFigureAndRunAFunction(3, 4, 4)
//             }
//             // REFERENCE FIGURE STUFF
//             this.FIRSTCHECKER_02 = false
//             this.FIRSTCHECKER_03 = true

//             this.PARFIGURE.skipped_indecies_NOT_ORDERED.push(this.index + 1)
//             this.PARFIGURE.skipped_indecies.push(this.index + 1)
//             this.PARFIGURE.skipped_indecies.sort((a, b) => a - b)  // Sorts in ascending order // FIXME: try to eliminate this
//             this.PARFIGURE.currentSkippedIndex = this.index + 1

//             console.log(parallelEndPoint_end)
//             console.log(parallelEndPoint_end_next)

//             parallelEndPoint_end.arc.hidden = true
//             if(parallelEndPoint_end_next !== null) {
//                 parallelEndPoint_end_next.arc.hidden = true //FIXME: issue here
//             }

//             console.log("CLOSED_ARC")
//             //FIXME:
//         }
//     }
//     if(hasArcClosed === false) {
//         if(this.FIRSTCHECKER_03 === true) {
//             // REFERENCE FIGURE STUFF
//             if(this.index === referencFigureIndex) {
//                 checkForFigureAndRunAFunction(2, 1, 0)
//                 checkForFigureAndRunAFunction(2, 1, 1)
//                 checkForFigureAndRunAFunction(4, 3, 3)
//                 checkForFigureAndRunAFunction(4, 3, 4)
//             }
//             // REFERENCE FIGURE STUFF
//             this.FIRSTCHECKER_03 = false
//             this.FIRSTCHECKER_02 = true
//         }
//     }
// }
// //MOVED TO OWN CLASS

IntersectionHandler_WithArc.prototype.arcIntersection_allArcSegments_everyIndex_firstAction = function() {
    // 1
    console.log("1_all")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1
    console.log("parPath_SEG_COUNTER")
    console.log(this.parallelFigureObj.parallelPathSegmentCounter_FIRST)
    this.setArcRadius(0)
}

IntersectionHandler_WithArc.prototype.arcIntersection_allArcSegments_everyIndex_lastAction = function() {
    // Final
    console.log("FINAL_all")
    this.handleLargeArcFlag("arcFlag_finalAll") // (Set_largeArcFag)
    // this.checkIfArcIsClosed() // MOVED TO OWN CLASS
    this.ClosedArcChecker.checkIfArcIsClosed()
}

// //new FIXME: 
// IntersectionHandler_WithArc.prototype.arcIntersection_allArcSegments_everyIndex_lastAction_NEW = function() {
//     // Final
//     console.log("FINAL_all_NEW")
//     this.handleLargeArcFlag("arcFlag_finalAll") // (Set_largeArcFag)
//     this.checkIfArcIsClosed()
// }

IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_everyIndex_firstAction = function() {
    // 2
    console.log("2_seg1_first_all")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1
    console.log("parPath_SEG_COUNTER")
    console.log(this.parallelFigureObj.parallelPathSegmentCounter_FIRST)
}

IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc = function() {
    // 3
    console.log("3_seg1")
    this.handleIntersectionWithArc('a2a')
}

IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc = function() {
    // 4
    console.log("4_seg1")
    this.handleIntersectionWithArc('p2a')
}

IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_fistIndex = function() {
    // 5
    console.log("5_seg1")
    this.setPerpendicularPoints([0, 0], false)
}

// //NEW FIXME:
// IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_fistIndex_NEW = function() {
//     // 5
//     console.log("5_seg1")
//     this.setPerpendicularPoints([1, 0], false)
// }

IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc = function() {
    // 6_A
    console.log("6_A_seg1: joineronly")
    this.setThisPathDataAsPreviousPathData()
}

// IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc_OPPOSITE = function() {
//     // 6_A
//     console.log("6_A_seg1: joineronly_OPPOSITE")
//     this.setThisPathDataAsPreviousPathData_OPPOSITE()
// }

IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc = function() {
    // 6_B
    console.log("6_B_seg1")
    this.setParallelProjections()
    this.handleIntersectionWithArc('a2p')
}

IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_everyIndex_firstAction = function() {
    // 7
    console.log("7_seg2_first_all")
    this.setPerpendicularPoints([0, 0], true)
}

// //NEW FIXME:
// IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_everyIndex_firstAction_NEW = function() {
//     // 7
//     console.log("7_seg2_first_all_NEW")
//     console.log("Passed_orig_ref")
//     console.log(3)
//     this.setPerpendicularPoints([3, 0], false)
// }

IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected = function() {
    // 8_A
    console.log("8_seg2_connected")
}

IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected = function() {
    // 8_B
    console.log("8_seg2_not_connected")
}

IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc = function() {
    // 9
    console.log("9_seg2")
    this.setParallelProjections()
    this.handleIntersectionWithArc('a2p')
}

IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_lastIndex = function() {
    console.log("10_seg2")
    this.setPerpendicularPoints([1, 1], false)
}
// //NEW FIXME:
// IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_lastIndex_NEW = function() {
//     console.log("10_seg2_NEW")
//     // this.setPerpendicularPoints([3, 1], false) // this used to be necesary but not any more
//     this.setPerpendicularPoints([1, 1], false)
// }

IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_everyIndex_lastAction = function() {
// IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_everyIndex_lastAction = function(closedArcAction) { // With passed var for REFERENCE FIGURE
    console.log("11_seg2_last_all")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1
    console.log("parPath_SEG_COUNTER")
    console.log(this.parallelFigureObj.parallelPathSegmentCounter_FIRST)



    // // REFERENCE FIGURE STUFF
    // // if(closedArcAction) {
    // //     this.referenceFigure_01_A.runFunctions([[this.thisOriginalFigurePathData().coords.x, this.thisOriginalFigurePathData().coords.y]])
    // // } else {
    // //     this.referenceFigure_01_A.runFunctions([[100, 10]])
    // // }

    // if(closedArcAction) {
    //     if(this.index === 0) {
    //         this.referenceFigure_01_A.runFunctions([[this.thisOriginalFigurePathData().coords.x, this.thisOriginalFigurePathData().coords.y]])
    //     }
    //     if(this.index === 1) {
    //         this.referenceFigure_02_A.runFunctions([[this.thisOriginalFigurePathData().coords.x, this.thisOriginalFigurePathData().coords.y]])
    //     }
    //     if(this.index === 2) {
    //         this.referenceFigure_03_A.runFunctions([[this.thisOriginalFigurePathData().coords.x, this.thisOriginalFigurePathData().coords.y]])
    //     }
    //     if(this.index === 3) {
    //         this.referenceFigure_04_A.runFunctions([[this.thisOriginalFigurePathData().coords.x, this.thisOriginalFigurePathData().coords.y]])
    //     }
    //     if(this.index === 4) {
    //         this.referenceFigure_05_A.runFunctions([[this.thisOriginalFigurePathData().coords.x, this.thisOriginalFigurePathData().coords.y]])
    //     }
    // }
    // // REFERENCE FIGURE STUFF

}









IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_thisIndexIsPathToArc = function() {
    // 1_Joiner
    console.log("1_Joiner_ooo")

    //old
    // this.Intersection_NoContact.handlePathToArcIntersectionNoContact(0)
    //new
    this.Intersection_NoContact.handlePathToArcIntersectionNoContact(0)

    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
    console.log("parPath_SEG_COUNTER")
    console.log(this.parallelFigureObj.parallelPathSegmentCounter_FIRST)

    this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner = true // (Set_largeArcFag)
    this.parallelFigureObj.setThisArcFlag_atFinal_from1Joiner = true // (Set_largeArcFag)
}

IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc = function() {
    // 2_A_Joiner
    console.log("2_A_Joiner_ooo")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
    console.log("parPath_SEG_COUNTER")
    console.log(this.parallelFigureObj.parallelPathSegmentCounter_FIRST)

    //old
    // this.setArcRadius(0)
    //new
    this.setArcRadius(0)

    this.handleLargeArcFlag("arcFlag_2AJ") // (Set_largeArcFag)
}

IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc = function() {
    // 2_B_Joiner
    console.log("2_B_Joiner_ooo")
    this.setParallelProjections()
    this.handleIntersectionWithArc('a2p')
}

IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_thisIndexIsArcToArc = function(checker) {
    // 3_Joiner
    console.log("3_Joiner_ooo")
    //old
    // this.setArcRadius(1)
    //new
    this.setArcRadius(0)
    //old
    // this.Intersection_NoContact.handleArcToArcIntersectionNoContact(0)
    // new //old
    this.Intersection_NoContact.handleArcToArcIntersectionNoContact(-1)
    //newnew
    // this.Intersection_NoContact.handleArcToArcIntersectionNoContact(checker)

    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1
    console.log("parPath_SEG_COUNTER")
    console.log(this.parallelFigureObj.parallelPathSegmentCounter_FIRST)

    this.parallelFigureObj.setThisArcFlag_at4Joiner_from3Joiner = true
    this.parallelFigureObj.setPrevArcFlag_atFinal_from3Joiner = true
}

IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsArcToArc = function() {
    // 4_Joiner
    console.log("4_Joiner_ooo")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
    console.log("parPath_SEG_COUNTER")
    console.log(this.parallelFigureObj.parallelPathSegmentCounter_FIRST)

    this.handleLargeArcFlag("arcFlag_4J") // (Set_largeArcFag)
}

IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsArcToPath = function() {
    // 5_Joiner
    console.log("5_Joiner_ooo")
    this.setParallelProjections()
    this.handleNOIntersection()
    this.parallelFigureObj.parallelPathSegmentCounter_SECOND = 1
}

// IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_skipThisIndex = function() {
//     // 6_Joiner
//     console.log("6_Joiner_ooo")
//     this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
// }




//FIXME: This new way of handling arcFlagSetter works great but need to handle popping points in original blob.
// make sure largeArcFlagSetter is being placed in correct OFPD child PPD
IntersectionHandler_WithArc.prototype.handleLargeArcFlag = function(flag) {
    console.log("HANDLE_LARGE_ARCFLAG")
    if(flag === "arcFlag_finalAll") {
        if(this.parallelFigureObj.setThisArcFlag_atFinal_from1Joiner === true) {
            console.log("running_skip_arcFlagSet_from_1j_in_finalAll")
            //old
            // this.ArcFlagSetter.setLargeArcFlag(0, false)
            //new
            // console.log("HANDLE_ARCFLAG_01")
            // console.log(this.index)
            if(this.parallelFigureObj.iterationCounter === 1) {
                let arcFlagSetter = new LargeArcFlagSetter(this.PARFIGURE)
                // this.ArcFlagSetters.push(arcFlagSetter)
                // console.log("NEW_ARCFLAG_SETTER")
                // console.log(this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west)
                this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter = arcFlagSetter
            }
            // this.ArcFlagSetters[this.index].setLargeArcFlag(0, false, this.index)
            // this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(false, this.index)
            this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(false, this.previousIndex)

            // LargeArcFlagSetter.prototype.setLargeArcFlag = function(indexModifier, runOrNot, index) {


            this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner = false
            this.parallelFigureObj.setThisArcFlag_atFinal_from1Joiner = false
        }
        if(this.parallelFigureObj.setPrevArcFlag_atFinal_from3Joiner === true) {
            console.log("running_skip_arcFlagSet_from_3j_in_finalAll")


            // this was the old, but turned off previously while handling new way of doing OOP (double check if ever needed)
            // this.ArcFlagSetter.setLargeArcFlag(-1, false)
            //new way if ever needed (not finished)
            console.log("HANDLE_ARCFLAG_02")
            console.log(this.index)


            this.parallelFigureObj.setThisArcFlag_at4Joiner_from3Joiner = false
            this.parallelFigureObj.setPrevArcFlag_atFinal_from3Joiner = false
        }
        //new - but not ok?
        // if(this.parallelFigureObj.isIntersectionConnected === true) {
        // //old - but maybe ok
        // console.log("foskfosdkfosk")
        // console.log(this.intersectionHandlerObject.isIntersectionConnected)
        if(this.intersectionHandlerObject.isIntersectionConnected === true) {
            console.log("CONNECTED")
            // console.log(this.parallelFigureObj.iterationCounter)


            //old
            // this.ArcFlagSetter.setLargeArcFlag(0, true)
            //new
            // console.log("HANDLE_ARCFLAG_03")
            // console.log(this.index)
            if(this.parallelFigureObj.iterationCounter === 1) {
                let arcFlagSetter = new LargeArcFlagSetter(this.PARFIGURE)
                // this.ArcFlagSetters.push(arcFlagSetter)
                // console.log("NEW_ARCFLAG_SETTER")
                // console.log(this.previousOriginalFigurePathData())
                this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter = arcFlagSetter
            }
            // this.ArcFlagSetters[this.index].setLargeArcFlag(0, true, this.index)
            // this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(true, this.index)
            this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(true, this.previousIndex)


        } else {
            console.log("NOT_CONNECTED")


            //old
            // this.ArcFlagSetter.setLargeArcFlag(0, false)
            //new
            // console.log("HANDLE_ARCFLAG_04")
            // console.log(this.index)
            if(this.parallelFigureObj.iterationCounter === 1) {
                let arcFlagSetter = new LargeArcFlagSetter(this.PARFIGURE)
                // this.ArcFlagSetters.push(arcFlagSetter)
                // console.log("NEW_ARCFLAG_SETTER")
                // console.log(this.previousOriginalFigurePathData())
                this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter = arcFlagSetter
            }
            // this.ArcFlagSetters[this.index].setLargeArcFlag(0, false, this.index)
            // this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(false, this.index)
            this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(false, this.previousIndex)

            //new - but not ok?
            // this.parallelFigureObj.isIntersectionConnected = true
            //old - but ok?
            // console.log("foskfosdkfosk")
            // console.log(this.intersectionHandlerObject.isIntersectionConnected)
            this.intersectionHandlerObject.isIntersectionConnected = true
        }
    }

    if(flag === "arcFlag_2AJ") {
        if(this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner === true) {
            console.log("running_skip_arcFlagSet_from_1j_in_2j")


            //old
            // this.ArcFlagSetter.setLargeArcFlag(0, true)
            //new
            // console.log("HANDLE_ARCFLAG_05")
            // console.log(this.index)
            if(this.parallelFigureObj.iterationCounter === 1) {
                let arcFlagSetter = new LargeArcFlagSetter(this.PARFIGURE)
                // this.ArcFlagSetters.push(arcFlagSetter)
                // console.log("NEW_ARCFLAG_SETTER")
                // console.log(this.previousOriginalFigurePathData())
                this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter = arcFlagSetter
            }
            // this.ArcFlagSetters[this.index].setLargeArcFlag(0, true, this.index)
            // this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(true, this.index)
            this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(true, this.previousIndex)


            this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner = false
            this.parallelFigureObj.setThisArcFlag_atFinal_from1Joiner = false
        }
    }

    if(flag === "arcFlag_4J") {
        if(this.parallelFigureObj.setThisArcFlag_at4Joiner_from3Joiner === true) {
            console.log("running_skip_arcFlagSet_from_3j_in_4j")


            //old
            // this.ArcFlagSetter.setLargeArcFlag(0, true)
            //new
            // console.log("HANDLE_ARCFLAG_06")
            // console.log(this.index)
            if(this.parallelFigureObj.iterationCounter === 1) {
                let arcFlagSetter = new LargeArcFlagSetter(this.PARFIGURE)
                // this.ArcFlagSetters.push(arcFlagSetter)
                // console.log("NEW_ARCFLAG_SETTER")
                // console.log(this.previousOriginalFigurePathData())
                this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter = arcFlagSetter
            }
            // this.ArcFlagSetters[this.index].setLargeArcFlag(0, true, this.index)
            // this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(true, this.index)
            this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(true, this.previousIndex)


            this.parallelFigureObj.setThisArcFlag_at4Joiner_from3Joiner = false
            this.parallelFigureObj.setPrevArcFlag_atFinal_from3Joiner = false
        }
    }
}

IntersectionHandler_WithArc.prototype.setArcRadius = function(indexModifier) {
    let parallelDistance = this.calcArcParDistance(this.thisOriginalFigurePathData(indexModifier))
    this.thisOriginalFigurePathData(indexModifier).children.parallel_pathDatas.pathData_east.arc.radius = parallelDistance
}




//TODO: havnet set to new wa of finding pathdata yet (too hard with all the indicators)
//TODO: havnet set to new wa of finding pathdata yet (too hard with all the indicators)
//TODO: havnet set to new wa of finding pathdata yet (too hard with all the indicators)
// IntersectionHandler_WithArc.prototype.setPerpendicularPoints = function(indicators, setPrevious) {
//     let arcRadiusData = this.arcRadiusParDistAndDir
//     // set targets with indicators
//     // let targetIndex = this.index + indicators[0]
//     // let refIndex = this.index + indicators[1]
//     // let arcRefIndex = this.index + indicators[2]
//     let target = indicators[1]

//     // set target datas
//     // let prevGuy = this.originalFigurePathDatas[targetIndex].children.parallel_pathDatas.pathData_west
//     let prevGuy = this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west

//     // let thisGuy = this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_east
//     let thisGuy = this.originalFigurePathDatas[this.index + 0 + 1].children.parallel_pathDatas.pathData_east
//     let targetPathData = (target == 0) ? prevGuy : thisGuy;
    


//     // let refPathData01 = this.originalFigurePathDatas[targetIndex + indicators[1]] //TODO: can we make this from orginalPathData
//     let refPathData01 = this.originalFigurePathDatas[this.index + 0 + indicators[0]] //TODO: can we make this from orginalPathData

//     // let refArcCenter01 = this.originalFigurePathDatas[targetIndex + indicators[2]]
//     let refArcCenter01 = this.originalFigurePathDatas[this.index + 0 + 1]



//     // calculate positions and set data
//     let newParallelPosition = findPointAlongSlopeAtDistance([refPathData01.coords.x, refPathData01.coords.y], [refArcCenter01.arc.center.x, refArcCenter01.arc.center.y], arcRadiusData)
//     targetPathData.coords.x = newParallelPosition[0]
//     targetPathData.coords.y = newParallelPosition[1]

//     if (setPrevious) {
//         // let prevParallelPathData = this.originalFigurePathDatas[targetIndex].children.parallel_pathDatas.pathData_east
//         let prevParallelPathData = this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_east
//         prevParallelPathData.coords.x = newParallelPosition[0]
//         prevParallelPathData.coords.y = newParallelPosition[1]
//     }
// }


//old
// this.setPerpendicularPoints([0, 0, 1, 0], false)
// this.setPerpendicularPoints([0, 0, 1, 0], true)
// this.setPerpendicularPoints([0, 1, 1, 1], false)
//new
// this.setPerpendicularPoints([0, 0], false)
// this.setPerpendicularPoints([0, 0], true)
// this.setPerpendicularPoints([1, 1], false)
IntersectionHandler_WithArc.prototype.setPerpendicularPoints = function(indicators, setPrevious) {
    let arcRadiusData = this.arcRadiusParDistAndDir
    let OpdRefFlag = indicators[0]
    let targetFlag = indicators[1]

    // set target datas
    // let previousParallelPathDataTarget = this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west
    let previousParallelPathDataTarget = this.thisOriginalFigurePathData(-1).children.parallel_pathDatas.pathData_west // changed from prevOFPD to thisOFPD(-1) to account for the change that happens when a skipper is set
    let thisParallelPathDataTarget = this.thisOriginalFigurePathData().children.parallel_pathDatas.pathData_east
    let targetPathData = (targetFlag == 0) ? previousParallelPathDataTarget : thisParallelPathDataTarget;
    
    // let referencePathData = this.previousOriginalFigurePathData(OpdRefFlag)
    let referencePathData = this.thisOriginalFigurePathData(OpdRefFlag - 1) // changed from prevOFPD to thisOFPD(-1) to account for the change that happens when a skipper is set
    let referenceArcCenter = this.thisOriginalFigurePathData()

    // console.log(this.index)
    // console.log("SET_PERP: 01")
    // console.log("target")
    // console.log(targetPathData)
    // console.log("options")
    // console.log("prev")
    // console.log(previousParallelPathDataTarget)
    // console.log("this")
    // console.log(thisParallelPathDataTarget)

    // console.log("REFERENCES")
    // console.log("refPthDta")
    // console.log(referencePathData)
    // console.log(OpdRefFlag)
    // console.log("refArcCent")
    // console.log(referenceArcCenter)

    // calculate positions and set data
    let newParallelPosition = findPointAlongSlopeAtDistance([referencePathData.coords.x, referencePathData.coords.y], [referenceArcCenter.arc.center.x, referenceArcCenter.arc.center.y], arcRadiusData)
    targetPathData.coords.x = newParallelPosition[0]
    targetPathData.coords.y = newParallelPosition[1]

    if (setPrevious) {
        // let prevParallelPathData = this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_east
        let prevParallelPathData = this.thisOriginalFigurePathData(-1).children.parallel_pathDatas.pathData_east // changed from prevOFPD to thisOFPD(-1) to account for the change that happens when a skipper is set
        prevParallelPathData.coords.x = newParallelPosition[0]
        prevParallelPathData.coords.y = newParallelPosition[1]

        // console.log("SET_PERP: 02")
        // console.log("new_target")
        // console.log(prevParallelPathData)
    }
}
//TODO: havnet set to new wa of finding pathdata yet (too hard with all the indicators)
//TODO: havnet set to new wa of finding pathdata yet (too hard with all the indicators)
//TODO: havnet set to new wa of finding pathdata yet (too hard with all the indicators)







IntersectionHandler_WithArc.prototype.setParallelProjections = function() {
    let thisPathDataOutside = this.thisOriginalFigurePathData()
    let nextPathDataOutside = this.nextOriginalFigurePathData()
    let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, this.parallelFigureObj.parallelDistance)//use orig

    thisPathDataOutside.children.parallel_pathDatas.pathData_west.coords.x = parallelProjections.thisPointX //use orig
    thisPathDataOutside.children.parallel_pathDatas.pathData_west.coords.y = parallelProjections.thisPointY
    nextPathDataOutside.children.parallel_pathDatas.pathData_east.coords.x = parallelProjections.nextPointX
    nextPathDataOutside.children.parallel_pathDatas.pathData_east.coords.y = parallelProjections.nextPointY
}

IntersectionHandler_WithArc.prototype.handleIntersectionWithArc = function(shape) {
    this.Intersection_Contact.handleAllIntersections(shape)
}

IntersectionHandler_WithArc.prototype.handleNOIntersection = function() {
    this.Intersection_NoContact.handleArcToPathIntersectionNoContact(0)
}

IntersectionHandler_WithArc.prototype.setThisPathDataAsPreviousPathData = function() {
    let prevParallelPathData = this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_east
    let thisParallelPathData = this.thisOriginalFigurePathData().children.parallel_pathDatas.pathData_east
    if(thisParallelPathData.arc.joiner) {
        Object.assign(thisParallelPathData.coords, prevParallelPathData.coords)
    }

    //FIXME: RIGHT HERE (fixed but keep for other shapes)
    // console.log("poopoppopop")
    // console.log(prevParallelPathData)
    // console.log(thisParallelPathData)
}


// //FIXME: NEWNEW
// IntersectionHandler_WithArc.prototype.setThisPathDataAsPreviousPathData_OPPOSITE = function() {
//     let prevParallelPathData = this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west
//     let prevOrigPathData = this.previousOriginalFigurePathData()
//     let thisParallelPathData = this.thisOriginalFigurePathData()
//     let thisOrigPathData = this.thisOriginalFigurePathData()

//     let pooperPREV = this.originalFigurePathDatas[0].children.parallel_pathDatas.pathData_west
//     let pooperTHIS = this.originalFigurePathDatas[1].children.parallel_pathDatas.pathData_west

//         Object.assign(pooperPREV.coords, pooperTHIS.coords)




//     // if(thisParallelPathData.arc.joiner) {
//     //     // Object.assign(thisParallelPathData.coords, prevParallelPathData.coords)
//     //     Object.assign(prevParallelPathData.coords, thisParallelPathData.coords)
//     // }

//     //FIXME: RIGHT HERE (fixed but keep for other shapes)
//     console.log("FIGUREITOUT__________________")

//     console.log("prev_ppd")
//     console.log(prevParallelPathData)
//     console.log("this_ppd")
//     console.log(thisParallelPathData)

//     console.log("prev_opd")
//     console.log(prevOrigPathData)
//     console.log("this_opd")
//     console.log(thisOrigPathData)


//     console.log("SKIPPER_INDEX")
//     console.log(this.skipperIndexMods)
//     console.log("ORIGINALPATHDATAS")
//     console.log(this.originalFigurePathDatas)
//     console.log(this.originalFigurePathDatas)

//     console.log("prev_ppd")
//     console.log(pooperPREV)
//     console.log("this_ppd")
//     console.log(pooperTHIS)
// }




// TODO: (in two places at once rn, find a place for it)
// Write a good comment to describe this function
function calcParallelProjections(thisPathDataCoords, nextPathDataCoords, parallelDistance) {
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

IntersectionHandler_WithArc.prototype.calcArcParDistance = function(referencePathData) {
    const distance = this.parallelFigureObj.parallelDistance
    const sweepFlag = referencePathData.arc.sweepFlag
    
    // Determine arc radius parallel distance and direction
    this.arcRadiusParDistAndDir = sweepFlag === 0 ? distance : -distance

    // Calculate distance from reference point to arc center
    const refToCenterDist = getDistance(referencePathData.coords.x, referencePathData.coords.y, referencePathData.arc.center.x, referencePathData.arc.center.y)

    return refToCenterDist - this.arcRadiusParDistAndDir
}














// OLD #1
// FIRST ARC
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 2_seg1_first_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1                                          // no PD                                                                                // arcIntersection_firstArcSegment_everyIndex_firstAction
// 5_seg1                   // this.setPerpendicularPoints([0, 0], false)                                                           // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_firstArcSegment_fistIndex
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll") // this.checkIfArcIsClosed()                             // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction

// OLD #1
// FIRST ARC (not first pd in shape)
// 1_all
// 2_seg1_first_all
// 3_seg1
// 6_A_seg1: joineronly
// FINAL_all


// 1_all
// 2_seg1_first_all
// 3_seg1
// 6_A_seg1: joineronly
// 11_seg2_last_all
// FINAL_all

// OLD #2
// SECOND ARC
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)
// 7_seg2_first_all         // this.setPerpendicularPoints([0, 0], true)                                                            // (prevPD.child_east & thisPD.child_west)
// 8_seg2_connected         // nothing                                                                                              // nothing
// 11_seg2_last_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1                                         // no PD
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll")      // this.checkIfArcIsClosed()                        // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)

// OLD #3
// FIRST ARC
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)
// 2_seg1_first_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1                                          // no PD
// 3_seg1                   // this.handleIntersectionWithArc('a2a')                                                                // (prevPD.child_east #2 & thisPD.child_west #3)
// 6_A_seg1: joineronly     // this.setThisPathDataAsPreviousPathData()                                                             // (prevPD.child_east & thisPD.child_west)
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll")      // this.checkIfArcIsClosed()                        // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)

//OLD #4
// SECOND ARC
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)
// 7_seg2_first_all         // this.setPerpendicularPoints([0, 0], true)                                                            // (prevPD.child_east & thisPD.child_west)
// 10_seg2                  // this.setPerpendicularPoints([1, 1], false)
// 11_seg2_last_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1                                         // no PD
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll")      // this.checkIfArcIsClosed()                        // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)


//SHAPE ONE
//SHAPE ONE
// ARC TO ARC - PREVIOUS ARC CLOSED
//NEW #1
// FIRST ARC
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)
// 2_seg1_first_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1                                          // no PD
// 5_seg1                   // this.setPerpendicularPoints([0, 0], false)                                                           // (prevPD.child_east & thisPD.child_west)
// 11_seg2_last_all (NEW)   // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1                                         // no PD
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll") // this.checkIfArcIsClosed()                             // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)
//SHAPE ONE
//SHAPE ONE


//SHAPE TWO
//SHAPE TWO
// ARC TO ARC - NEXT ARC CLOSED
// NEW #2
// SECOND ARC
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 7_seg2_first_all         // this.setPerpendicularPoints([0, 0], true)                                                            // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_secondArcSegment_everyIndex_firstAction
// 8_seg2_connected         // nothing                                                                                              // nothing                                                                              // arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected
// 11_seg2_last_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1                                         // no PD                                                                                // arcIntersection_secondArcSegment_everyIndex_lastAction
// 1_all (NEW) (SKIP?)      // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 2_seg1_first_all (NEW)   // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1                                          // no PD                                                                                // arcIntersection_firstArcSegment_everyIndex_firstAction
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll")      // this.checkIfArcIsClosed()                        // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction

//SKIP #3

//NEW #4
// SECOND ARC
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 3_seg1 (NEW)             // this.handleIntersectionWithArc('a2a')                                                                // (prevPD.child_east #2 & thisPD.child_west #3)                                        // arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc
// 6_A_seg1: (NEW)          // this.setThisPathDataAsPreviousPathData()                                                             // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc
// 7_seg2_first_all         // this.setPerpendicularPoints([0, 0], true)                                                            // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_secondArcSegment_everyIndex_firstAction
// 10_seg2                  // this.setPerpendicularPoints([1, 1], false)                                                                                                                                                   // arcIntersection_secondArcSegment_lastIndex
// 11_seg2_last_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1                                         // no PD                                                                                // arcIntersection_secondArcSegment_everyIndex_lastAction
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll")      // this.checkIfArcIsClosed()                        // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction
//SHAPE TWO
//SHAPE TWO



//1
// 1_all
// 2_seg1_first_all
// 5_seg1
// FINAL_all
//1

//4
// 1_all
// 3_seg1
// 6_A_seg1: joineronly
// 7_seg2_first_all
// 10_seg2
// 11_seg2_last_all
// FINAL_all
//4


// OLD #1
// FIRST ARC
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 2_seg1_first_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1                                          // no PD                                                                                // arcIntersection_firstArcSegment_everyIndex_firstAction
// 5_seg1                   // this.setPerpendicularPoints([0, 0], false)                                                           // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_firstArcSegment_fistIndex

// OLD #2
// SECOND ARC
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)
// 7_seg2_first_all         // this.setPerpendicularPoints([0, 0], true)                                                            // (prevPD.child_east & thisPD.child_west)
// 11_seg2_last_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1                                         // no PD

// OLD #3
// FIRST ARC
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)
// 2_seg1_first_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1                                          // no PD
// 3_seg1                   // this.handleIntersectionWithArc('a2a')                                                                // (prevPD.child_east #2 & thisPD.child_west #3)
// 6_A_seg1: joineronly     // this.setThisPathDataAsPreviousPathData()                                                             // (prevPD.child_east & thisPD.child_west)

//OLD #4
// SECOND ARC
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east
// 7_seg2_first_all         // this.setPerpendicularPoints([0, 0], true)                                                            // (prevPD.child_east & thisPD.child_west
// 10_seg2                  // this.setPerpendicularPoints([1, 1], false
// 11_seg2_last_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1                                         // no 








//SHAPE THREE
//SHAPE THREE
//NEW #4
// SECOND ARC
// 1_all                    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1 // this.setArcRadius(0)                  // no PD // (thisPD.child_east)                                                         // arcIntersection_allArcSegments_everyIndex_firstAction
// 3_seg1 (NEW)             // this.handleIntersectionWithArc('a2a')                                                                // (prevPD.child_east #2 & thisPD.child_west #3)                                        // arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc
// 6_A_seg1: (NEW)          // this.setThisPathDataAsPreviousPathData()                                                             // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc
// 7_seg2_first_all         // this.setPerpendicularPoints([0, 0], true)                                                            // (prevPD.child_east & thisPD.child_west)                                              // arcIntersection_secondArcSegment_everyIndex_firstAction
// 10_seg2                  // this.setPerpendicularPoints([1, 1], false)                                                                                                                                                   // arcIntersection_secondArcSegment_lastIndex
// 11_seg2_last_all         // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1                                         // no PD                                                                                // arcIntersection_secondArcSegment_everyIndex_lastAction
// FINAL_all                // this.handleLargeArcFlag("arcFlag_finalAll")      // this.checkIfArcIsClosed()                        // (prevPD.child_east) // (prevPD.child_east & thisPD.child_west)                       // arcIntersection_allArcSegments_everyIndex_lastAction
//SHAPE THREE
//SHAPE THREE



// i: 1
// SKIP_PREVIOUS__NEWSHIT
// 1_all
// 2_seg1_first_all
// 5_seg1
// 11_seg2_last_all
// FINAL_all

// i: 2
// DONT_RUN_NETHING__NEWSHIT

// i: 3
// DONT_RUN_NETHING__NEWSHIT


// i: 4
// SKIP_FOLLOWING__NEWSHIT
// 1_all
// 3_seg1
// 6_A_seg1: joineronly
// 7_seg2_first_all
// 10_seg2
// 11_seg2_last_all
// FINAL_all

