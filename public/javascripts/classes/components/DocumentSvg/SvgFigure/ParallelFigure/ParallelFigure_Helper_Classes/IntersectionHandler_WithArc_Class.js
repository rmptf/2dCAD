import {LargeArcFlagSetter} from './LargeArcFlagSetter_Class.js'
import {Intersection_Contact} from './Intersection_Helper_Classes/intersection_Contact_Class.js'
import {getDistance} from '../../../../../../functions/math/mathFunctions.js' // OLD LOC
import {findPointAlongSlopeAtDistance} from '../../../../../../functions/drafting/parallelPath/drawParallelPath_functions/parallelPathFunctions.js' // OLD LOC
import {handleArcToArcIntersectionNoContact, handleArcToPathIntersectionNoContact, handlePathToArcIntersectionNoContact} from './Intersection_Helper_Classes/Intersection_NoContact_Class.js'

function IntersectionHandler_WithArc(parallelFigure) {
    this.ParFigure = parallelFigure
    this.ArcFlagSetter = new LargeArcFlagSetter(this.ParFigure)
    this.Intersection_Contact = new Intersection_Contact(this.ParFigure)

    this.intersectionHandlerObject = {
        isIntersectionConnected: true,
    }
}

IntersectionHandler_WithArc.prototype.handleIntersection = function() {
    console.log("HANDLE_INTERSECTION")
}
// let thisConnection = []
// thisConnection.connected = true


export {
    IntersectionHandler_WithArc
}



// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_allArcSegments_everyIndex_firstAction = function() {
    // 1
    console.log("1_all")
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST = this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST + 1
    setArcRadius(this.ParFigure, 0, "arcRad_1") // TODO: (Set_arcRad)
// function arcIntersection_allArcSegments_everyIndex_firstAction(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self) {
    // // 1
    // console.log("1_all")
    // parPathObj.parallelPathSegmentCounter_FIRST = parPathObj.parallelPathSegmentCounter_FIRST + 1
    // setArcRadius(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, "arcRad_1") // TODO: (Set_arcRad)
}


// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_allArcSegments_everyIndex_lastAction = function() {
        // Final
        console.log("FINAL_all")
        handleLargeArcFlag(this.ParFigure, "arcFlag_finalAll") // TODO: (Set_largeArcFag)
// function arcIntersection_allArcSegments_everyIndex_lastAction(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self) {
    // // Final
    // console.log("FINAL_all")
    // handleLargeArcFlag(parPathObj, targetEndPoints, index, self, thisConnection, "arcFlag_finalAll") // TODO: (Set_largeArcFag)
}


// WORKING / needschecking
//new
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_everyIndex_firstAction = function() {
    // 2
    console.log("2_seg1_first_all")
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST = this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST + 1
//old
// function arcIntersection_firstArcSegment_everyIndex_firstAction(parPathObj) {
    // // 2
    // console.log("2_seg1_first_all")
    // parPathObj.parallelPathSegmentCounter_FIRST = parPathObj.parallelPathSegmentCounter_FIRST + 1
}


// WORKING / needschecking
//new
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc = function() {
    // 3
    console.log("3_seg1")
    handleArcIntersectionArcToArc(this.ParFigure, this)
//old
// function arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
    // // 3
    // console.log("3_seg1")
    // handleArcIntersectionArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, thisConnection)
}


// WORKING / needschecking
//new
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc = function() {
    // 4
    console.log("4_seg1")
    handleArcIntersectionPathToArc(this.ParFigure, this)
}
//old
// function arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
//     // 4
//     console.log("4_seg1")
//     handleArcIntersectionPathToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, thisConnection)
// }


// WORKING / needschecking
//new
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_fistIndex = function() {
    // // 5
    console.log("5_seg1")
    setPerpendicularPoints(this.ParFigure, [0, 0, 1, 0], false)
}
//old
// function arcIntersection_firstArcSegment_fistIndex(targetEndPoints, refEndPointsBase, index, arcRadiusObject) {
//     // 5
//     console.log("5_seg1")
//     setPerpendicularPoints(targetEndPoints, refEndPointsBase, index, index, index + 1, arcRadiusObject, 0, false)
// }


// WORKING / needschecking
//new
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc = function() {
    // 6_A
    console.log("6_A_seg1: joineronly")
    setThisPathDataAsPreviousPathData(this.ParFigure)
}
//old
// function arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc(targetEndPoints, parPathObj, index, self) {
//     // 6_A
//     console.log("6_A_seg1: joineronly")
//     setThisPathDataAsPreviousPathData(targetEndPoints, index)
// }


// WORKING / FIXME: finish NO_CONTACT (done i think)
//new
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc = function() {
    // 6_B
    console.log("6_B_seg1")
    // skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, 1)
    // handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
    skipFillersAndSetParallelProjections(this.ParFigure, 1)
    handleIntersectionArcToPath(this.ParFigure, this)
}
// //old
// function arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
//     // 6_B
//     console.log("6_B_seg1")
//     skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, 1)
//     handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
// }


// WORKING / needschecking
//new
IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_everyIndex_firstAction = function() {
    // 7
    console.log("7_seg2_first_all")
    setPerpendicularPoints(this.ParFigure, [0, 0, 1, 0], true)
}
//old
// function arcIntersection_secondArcSegment_everyIndex_firstAction(targetEndPoints, refEndPointsBase, index, arcRadiusObject, parPathObj, self) {
//     // 7
//     console.log("7_seg2_first_all")
//     setPerpendicularPoints(targetEndPoints, refEndPointsBase, index, index, index + 1, arcRadiusObject, 0, true)
// }


// WORKING / needschecking
//new
IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected = function() {
    // 8_A
    console.log("8_seg2_connected")
    // empty
}
//old
// function arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
//     // 8_A
//     console.log("8_seg2_connected")
//     // empty
// }

// WORKING / needschecking
//new
IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected = function() {
    // 8_B
    console.log("8_seg2_not_connected")
    // empty
}
//old
// function arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
//     // 8_B
//     console.log("8_seg2_not_connected")
//     // empty
// }


// WORKING / FIXME: finish NO_CONTACT (done i think)
//new
IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc = function() {
    // 9
    console.log("9_seg2")
    // skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, 1)
    // handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, thisConnection)
    skipFillersAndSetParallelProjections(this.ParFigure, 1)
    handleIntersectionArcToPath(this.ParFigure, this)
}
//old
// function arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
//     // 9
//     console.log("9_seg2")
//     skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, 1)
//     handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, thisConnection)
// }


// WORKING / needschecking
//new
IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_lastIndex = function() {
    console.log("10_seg2")
    setPerpendicularPoints(this.ParFigure, [0, 1, 1, 1], false)
}
//old
// function arcIntersection_secondArcSegment_lastIndex(targetEndPoints, refEndPointsBase, index, arcRadiusObject) {
//     // 10
//     console.log("10_seg2")
//     setPerpendicularPoints(targetEndPoints, refEndPointsBase, index, index + 1, index + 1, arcRadiusObject, 1, false)
// }


// WORKING / needschecking
//new
IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_everyIndex_lastAction = function() {
    console.log("11_seg2_last_all")
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST = -1
}
//old
// function arcIntersection_secondArcSegment_everyIndex_lastAction(targetEndPoints, parPathObj, index, self) {
//     // 11
//     console.log("11_seg2_last_all")
//     parPathObj.parallelPathSegmentCounter_FIRST = -1
// }


// WORKING / FIXME: finish NO_CONTACT (done i think)
//new
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_thisIndexIsPathToArc = function() {
    // 1_Joiner
    console.log("1_Joiner_ooo")
    this.ParFigure.parallelFigureObject.pathToArcCounter += 1
    handlePathToArcIntersectionNoContact(this.ParFigure, 0)
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST = 0
    this.ParFigure.parallelFigureObject.setThisArcFlag_at2Joiner_from1Joiner = true // TODO: (Set_largeArcFag)
    this.ParFigure.parallelFigureObject.setThisArcFlag_atFinal_from1Joiner = true // TODO: (Set_largeArcFag)
}
//old
// // function disconnectedArcIntersection_thisIndexIsPathToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
//     // 1_Joiner
//     console.log("1_Joiner_ooo")
//     parPathObj.pathToArcCounter += 1
//     handlePathToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index)
//     parPathObj.parallelPathSegmentCounter_FIRST = 0
//     parPathObj.setThisArcFlag_at2Joiner_from1Joiner = true // TODO: (Set_largeArcFag)
//     parPathObj.setThisArcFlag_atFinal_from1Joiner = true // TODO: (Set_largeArcFag)
// }


// WORKING / needschecking
//new
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc = function() {
    // 2_A_Joiner
    console.log("2_A_Joiner_ooo")
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST = 0
    setArcRadius(this.ParFigure, 0, "arcRad_2AJ") // TODO: (Set_arcRad)
    handleLargeArcFlag(this.ParFigure, "arcFlag_2AJ") // TODO: (Set_largeArcFag)

//old
// function disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, self) {
    // // 2_A_Joiner
    // console.log("2_A_Joiner_ooo")
    // parPathObj.parallelPathSegmentCounter_FIRST = 0
    // setArcRadius(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, "arcRad_2AJ") // TODO: (Set_arcRad)
    // handleLargeArcFlag(parPathObj, targetEndPoints, index, self, thisConnection, "arcFlag_2AJ") // TODO: (Set_largeArcFag)
}


// WORKING / FIXME: finish NO_CONTACT (done i think)
//new
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc = function() {
    // 2_B_Joiner
    console.log("2_B_Joiner_ooo")
    // skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, 1)
    // handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
    skipFillersAndSetParallelProjections(this.ParFigure, 1)
    handleIntersectionArcToPath(this.ParFigure, this)
}
// //old
// function disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
//     // 2_B_Joiner
//     console.log("2_B_Joiner_ooo")
//     skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, 1)
//     handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj)
// }


// WORKING / FIXME: finish NO_CONTACT (done i think)
//new
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_thisIndexIsArcToArc = function() {
    // 3_Joiner
    console.log("3_Joiner_ooo")
    this.ParFigure.parallelFigureObject.arcToArcCounter += 1
    setArcRadius(this.ParFigure, 1, "arcRad_4J") // TODO: (Set_arcRad)
    handleArcToArcIntersectionNoContact(this.ParFigure, -1)
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST = 0
    this.ParFigure.parallelFigureObject.setThisArcFlag_at4Joiner_from3Joiner = true
    this.ParFigure.parallelFigureObject.setThisArcFlag_at4Joiner_from3Joiner = true
}
//old
// function disconnectedArcIntersection_thisIndexIsArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, arcRadiusObject) {
    // // 3_Joiner
    // console.log("3_Joiner_ooo")
    // parPathObj.arcToArcCounter += 1
    // setArcRadius(targetEndPoints, refEndPointsBase, index + 1, parPathObj, arcRadiusObject, "arcRad_4J") // TODO: (Set_arcRad)
    // handleArcToArcIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index-1)
    // parPathObj.parallelPathSegmentCounter_FIRST = 0
    // parPathObj.setThisArcFlag_at4Joiner_from3Joiner = true // TODO: (Set_largeArcFag)
    // parPathObj.setPrevArcFlag_atFinal_from3Joiner = true // TODO: (Set_largeArcFag)
// }




// WORKING / needschecking
//new
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsArcToArc = function() {
    // 4_Joiner
    console.log("4_Joiner_ooo")
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST = 0
    handleLargeArcFlag(this.ParFigure, "arcFlag_4J") // TODO: (Set_largeArcFag)
    
//old
// function disconnectedArcIntersection_prevIndexIsArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, arcRadiusObject) {
    // // 4_Joiner
    // console.log("4_Joiner_ooo")
    // parPathObj.parallelPathSegmentCounter_FIRST = 0
    // handleLargeArcFlag(parPathObj, targetEndPoints, index, self, thisConnection, "arcFlag_4J") // TODO: (Set_largeArcFag)

}


// WORKING / FIXME: finish NO_CONTACT (done i think)
//new
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsArcToPath = function() {
    // 5_Joiner
    console.log("5_Joiner_ooo")
    // skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, 0)
    skipFillersAndSetParallelProjections(this.ParFigure, 0)

    //other
    // handlePathToArcIntersectionNoContact(this.ParFigure, 0)
    //this
    // handleNOIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index) // FIXME: didnt do this yet
    handleNOIntersection(this.ParFigure)

    // parPathObj.parallelPathSegmentCounter_SECOND = 1
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_SECOND = 1
}
//old
// function disconnectedArcIntersection_prevIndexIsArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj) {
//     // 5_Joiner
//     console.log("5_Joiner_ooo")
//     skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, 0)
//     handleNOIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index)
//     parPathObj.parallelPathSegmentCounter_SECOND = 1
// }


// WORKING / needschecking
//new
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_skipThisIndex = function() {
    // 6_Joiner
    console.log("6_Joiner_ooo")
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST = 0
}
//old
// function disconnectedArcIntersection_skipThisIndex(parPathObj) {
//     // 6_Joiner
//     console.log("6_Joiner_ooo")
//     parPathObj.parallelPathSegmentCounter_FIRST = 0
// }










// PASSED
// parallelFigurePathDatas,
// parallelFigurePathDatas_transformed,
// originalFigurePathDatas_copy,
// originalFigure_counter_groupCount_GLOBAL,
// self,
// i,
// parallelFigureObject,
// skipperCheckers

// RECIEVED
// targetEndPoints,
// refEndPointsPerp,
// refEndPointsBase,
// documentFigureCount,
// self,
// index,
// parPathObj,
// skipperCheckers



// WORKING / needs checking
//old
// function handleLargeArcFlag(parPathObj, targetEndPoints, index, self, thisConnection, flag) {
//     if(flag === "arcFlag_finalAll") {
//         if(parPathObj.setThisArcFlag_atFinal_from1Joiner === true) {
//             // console.log("running_skip_arcFlagSet_from_1j_in_finalAll")
//             setLargeArcFlag(targetEndPoints, parPathObj, index, self, false)
//             parPathObj.setThisArcFlag_at2Joiner_from1Joiner = false
//             parPathObj.setThisArcFlag_atFinal_from1Joiner = false
//         }

//         if(parPathObj.setPrevArcFlag_atFinal_from3Joiner === true) {
//             // console.log("running_skip_arcFlagSet_from_3j_in_finalAll")
//             setLargeArcFlag(targetEndPoints, parPathObj, index - 1, self, false)
//             parPathObj.setThisArcFlag_at4Joiner_from3Joiner = false
//             parPathObj.setPrevArcFlag_atFinal_from3Joiner = false
//         }

//         if(thisConnection.connected === true) {
//             // console.log("CONNECTED")
//             setLargeArcFlag(targetEndPoints, parPathObj, index, self, true)
//         } else {
//             // console.log("NOT_CONNECTED")
//             setLargeArcFlag(targetEndPoints, parPathObj, index, self, false)
//             thisConnection.connected = true
//         }
//     }

//     if(flag === "arcFlag_2AJ") {
//         if(parPathObj.setThisArcFlag_at2Joiner_from1Joiner === true) {
//             // console.log("running_skip_arcFlagSet_from_1j_in_2j")
//             setLargeArcFlag(targetEndPoints, parPathObj, index, self, true)
//             parPathObj.setThisArcFlag_at2Joiner_from1Joiner = false
//             parPathObj.setThisArcFlag_atFinal_from1Joiner = false
//         }
//     }

//     if(flag === "arcFlag_4J") {
//         if(parPathObj.setThisArcFlag_at4Joiner_from3Joiner === true) {
//             // console.log("running_skip_arcFlagSet_from_3j_in_4j")
//             setLargeArcFlag(targetEndPoints, parPathObj, index, self, true)
//             parPathObj.setThisArcFlag_at4Joiner_from3Joiner = false
//             parPathObj.setPrevArcFlag_atFinal_from3Joiner = false
//         }
//     }
// }
//new
function handleLargeArcFlag(parFigure, flag) {
    let parFigObj = parFigure.parallelFigureObject
    let ArcFlagSetter = parFigure.IntersectionsSorter_WithArc.IntersectionHandler.ArcFlagSetter
    if(flag === "arcFlag_finalAll") {
        // if(parFigObj.setThisArcFlag_atFinal_from1Joiner === true) {
        if(parFigure.parallelFigureObject.setThisArcFlag_atFinal_from1Joiner === true) {
            console.log("running_skip_arcFlagSet_from_1j_in_finalAll")
            // ArcFlagSetter.setLargeArcFlag(parFigure, 0, false)
            parFigure.IntersectionsSorter_WithArc.IntersectionHandler.ArcFlagSetter.setLargeArcFlag(parFigure, 0, false)
            // parFigObj.setThisArcFlag_at2Joiner_from1Joiner = false
            // parFigObj.setThisArcFlag_atFinal_from1Joiner = false
            parFigure.parallelFigureObject.setThisArcFlag_at2Joiner_from1Joiner = false
            parFigure.parallelFigureObject.setThisArcFlag_atFinal_from1Joiner = false
        }

        // if(parFigObj.setPrevArcFlag_atFinal_from3Joiner === true) {
        if(parFigure.parallelFigureObject.setPrevArcFlag_atFinal_from3Joiner === true) {
            console.log("running_skip_arcFlagSet_from_3j_in_finalAll")
            // ArcFlagSetter.setLargeArcFlag(parFigure, -1, false)
            parFigure.IntersectionsSorter_WithArc.IntersectionHandler.ArcFlagSetter.setLargeArcFlag(parFigure, -1, false)
            // parFigObj.setThisArcFlag_at4Joiner_from3Joiner = false
            // parFigObj.setPrevArcFlag_atFinal_from3Joiner = false
            parFigure.parallelFigureObject.setThisArcFlag_at4Joiner_from3Joiner = false
            parFigure.parallelFigureObject.setPrevArcFlag_atFinal_from3Joiner = false
        }

        if(parFigure.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject.isIntersectionConnected === true) {
            console.log("CONNECTED")
            // ArcFlagSetter.setLargeArcFlag(parFigure, 0, true)
            parFigure.IntersectionsSorter_WithArc.IntersectionHandler.ArcFlagSetter.setLargeArcFlag(parFigure, 0, true)
        } else {
            console.log("NOT_CONNECTED")
            // ArcFlagSetter.setLargeArcFlag(parFigure, 0, false)
            parFigure.IntersectionsSorter_WithArc.IntersectionHandler.ArcFlagSetter.setLargeArcFlag(parFigure, 0, false)
            parFigure.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject.isIntersectionConnected = true
        }
    }

    if(flag === "arcFlag_2AJ") {
        // if(parFigObj.setThisArcFlag_at2Joiner_from1Joiner === true) {
        if(parFigure.parallelFigureObject.setThisArcFlag_at2Joiner_from1Joiner === true) {
            console.log("running_skip_arcFlagSet_from_1j_in_2j")
            // ArcFlagSetter.setLargeArcFlag(parFigure, 0, true)
            parFigure.IntersectionsSorter_WithArc.IntersectionHandler.ArcFlagSetter.setLargeArcFlag(parFigure, 0, true)
            // parFigObj.setThisArcFlag_at2Joiner_from1Joiner = false
            // parFigObj.setThisArcFlag_atFinal_from1Joiner = false
            parFigure.parallelFigureObject.setThisArcFlag_at2Joiner_from1Joiner = false
            parFigure.parallelFigureObject.setThisArcFlag_atFinal_from1Joiner = false
        }
    }

    if(flag === "arcFlag_4J") {
        // if(parFigObj.setThisArcFlag_at4Joiner_from3Joiner === true) {
        if(parFigure.parallelFigureObject.setThisArcFlag_at4Joiner_from3Joiner === true) {
            console.log("running_skip_arcFlagSet_from_3j_in_4j")
            // ArcFlagSetter.setLargeArcFlag(parFigure, 0, true)
            parFigure.IntersectionsSorter_WithArc.IntersectionHandler.ArcFlagSetter.setLargeArcFlag(parFigure, 0, true)
            // parFigObj.setThisArcFlag_at4Joiner_from3Joiner = false
            // parFigObj.setPrevArcFlag_atFinal_from3Joiner = false
            parFigure.parallelFigureObject.setThisArcFlag_at4Joiner_from3Joiner = false
            parFigure.parallelFigureObject.setPrevArcFlag_atFinal_from3Joiner = false
        }
    }
}


// [[{"coords":{"x":51.00000762939453,"y":276.2480239868164},"arc":{"exist":false,"radius":null,"rotation":null,"arcFlag":null,"sweepFlag":null,"center":{"x":null,"y":null},"startAngle":null,"joiner":null}},{"coords":{"x":199.75,"y":39.75000762939453},"arc":{"exist":true,"radius":201.0372976484869,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"east","center":{"x":247.75435800744887,"y":234.97187284458758},"startAngle":1.5364700287506718,"joiner":false}},{"coords":{"x":432.25,"y":182.50001525878906},"arc":{"exist":true,"radius":191.70357298599427,"rotation":0,"arcFlag":0,"sweepFlag":1,"side":"west","center":{"x":245.5256200295604,"y":225.90814606686857},"startAngle":1.583494467859758,"joiner":false}},{"coords":{"x":188.5,"y":243.5},"arc":{"exist":true,"radius":139.42339620693753,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"east","center":{"x":325.0522651948479,"y":271.6489303532587},"startAngle":2.244567418116927,"joiner":false}},{"coords":{"x":373.5,"y":467.5000305175781},"arc":{"exist":true,"radius":186.38575540194665,"rotation":0,"arcFlag":0,"sweepFlag":0,"side":"west","center":{"x":371.047533574729,"y":281.1304106081433},"startAngle":1.7872474215382959,"joiner":false}}]]



// WORKING / needs checking
//old
// function setArcRadius(targetEndPoints, refEndPointsBase, index, parPathObj, arcRadiusObject, logId) {
    // // console.log(logId)
    // targetEndPoints[index][1].arc.radius = calcArcParDistance(arcRadiusObject, refEndPointsBase[index + 1], parPathObj.parallelDistance)
//new
function setArcRadius(parFigure, indexModifier, logId) {
    // console.log(logId)
    let targetArray = parFigure.parallelFigurePathDatas
    let index = (parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index + indexModifier)
    let parallelDistance = calcArcParDistance(parFigure, index)

    targetArray[index][1].arc.radius = parallelDistance
}


// WORKING / needschecking
//old
// function setPerpendicularPoints(targetEndPoints, refEndPointsBase, targetIndex, refIndex, arcRefIndex, arcRadiusObject, target, setPrevious) {
//     let targetPathData = targetEndPoints[targetIndex][target]
//     let refPathData = refEndPointsBase[refIndex]
//     let refArcCenter = refEndPointsBase[arcRefIndex]

//     let newParallelPosition = findPointAlongSlopeAtDistance([refPathData.coords.x, refPathData.coords.y], [refArcCenter.arc.center.x, refArcCenter.arc.center.y], arcRadiusObject.parDistAndDir)
//     targetPathData.coords.x = newParallelPosition[0]
//     targetPathData.coords.y = newParallelPosition[1]

//     if (setPrevious) {
//         let prevParallelPathData = targetEndPoints[targetIndex - 1][1]
//         prevParallelPathData.coords.x = newParallelPosition[0]
//         prevParallelPathData.coords.y = newParallelPosition[1]
//     }
// }
//new
// function setPerpendicularPoints(parFigure, targetIndex, refIndex, arcRefIndex, target, setPrevious) { // change names and org
function setPerpendicularPoints(parFigure, indicators, setPrevious) { // change names and org
    // grab data from classes
    let intersectionSorter = parFigure.IntersectionsSorter_WithArc
    let parallelPathDatas = parFigure.parallelFigurePathDatas
    let originalFigurePathDatas = parFigure.originalFigurePathDatas_copy
    let index = intersectionSorter.intersectionSorterObject.index
    let arcRadiusData = intersectionSorter.intersectionSorterObject.arcRadiusParDistAndDir

    // set targets with indicators
    let targetIndex = index + indicators[0]
    let refIndex = index + indicators[1]
    let arcRefIndex = index + indicators[2]
    let target = indicators[3]

    // set target datas
    let targetPathData = parallelPathDatas[targetIndex][target]
    let refPathData = originalFigurePathDatas[refIndex]
    let refArcCenter = originalFigurePathDatas[arcRefIndex]

    // calculate positions and set data
    let newParallelPosition = findPointAlongSlopeAtDistance([refPathData.coords.x, refPathData.coords.y], [refArcCenter.arc.center.x, refArcCenter.arc.center.y], arcRadiusData)
    targetPathData.coords.x = newParallelPosition[0]
    targetPathData.coords.y = newParallelPosition[1]

    if (setPrevious) {
        let prevParallelPathData = parallelPathDatas[targetIndex - 1][1]
        prevParallelPathData.coords.x = newParallelPosition[0]
        prevParallelPathData.coords.y = newParallelPosition[1]
    }
}


// WORKING / needschecking
// //old
// // skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, 1)
// function skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, offset) {
//     let fillerAdder = 0
//     let nextFillerAdder = 0

//     if (refEndPointsBase[index + 2] === "filler") {
//         fillerAdder = fillerAdder + 0
//         nextFillerAdder = nextFillerAdder + 1
//     }

//     let thisPathDataOutside = refEndPointsBase[index + offset + fillerAdder]
//     let nextPathDataOutside = refEndPointsBase[index + 2 + nextFillerAdder]

//     let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parPathObj.parallelDistance)

//     targetEndPoints[index + 1][0].coords.x = parallelProjections.thisPointX
//     targetEndPoints[index + 1][0].coords.y = parallelProjections.thisPointY
//     targetEndPoints[index + 1][1].coords.x = parallelProjections.nextPointX
//     targetEndPoints[index + 1][1].coords.y = parallelProjections.nextPointY

//     // console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

//     parPathObj.arcToPathCounter += 1
// }
//new
// function skipFillersAndSetParallelProjections(targetEndPoints, refEndPointsBase, index, parPathObj, offset) {
function skipFillersAndSetParallelProjections(parFigure, offset) {
    let parallelPathDatas = parFigure.parallelFigurePathDatas
    let originalFigurePathDatas = parFigure.originalFigurePathDatas_copy
    let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index
    let parFigObj = parFigure.parallelFigureObject

    let fillerAdder = 0
    let nextFillerAdder = 0

    if (originalFigurePathDatas[index + 2] === "filler") {
        fillerAdder = fillerAdder + 0
        nextFillerAdder = nextFillerAdder + 1
    }

    let thisPathDataOutside = originalFigurePathDatas[index + offset + fillerAdder]
    let nextPathDataOutside = originalFigurePathDatas[index + 2 + nextFillerAdder]

    let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parFigObj.parallelDistance)

    parallelPathDatas[index + 1][0].coords.x = parallelProjections.thisPointX
    parallelPathDatas[index + 1][0].coords.y = parallelProjections.thisPointY
    parallelPathDatas[index + 1][1].coords.x = parallelProjections.nextPointX
    parallelPathDatas[index + 1][1].coords.y = parallelProjections.nextPointY

    // console.log("run function: handleArcToPathIntersection() (Shape 2: Part 2)")

    // parPathObj.arcToPathCounter += 1
    parFigObj.arcToPathCounter += 1
}


// WORKING / FIXME: finish NO_CONTACT  (done i think)
// //old
// // TODO: can these three be one?
// function handleIntersectionArcToPath(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount1, self, index, parPathObj, thisConnection3) {
//     if (parPathObj.collectIndicesOfIntersections === true) {
//         parPathObj.arcToPathIndexArray.push(index + 1)
//     }

//     // handleArcToPathIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount1, self, index, parPathObj.arcToPathIndexArray, parPathObj.arcToPathCounter, parPathObj)
//     handleArcToPathIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount1, self, index, parPathObj, thisConnection3)

//     if (targetEndPoints[index + 1][1].arc.joiner) {
//         parPathObj.arcToPathCounter -= 1
//     }
// }
//new
// TODO: can these three be one?
function handleIntersectionArcToPath(parFigure, intHandler) {
    let targetEndPoints = parFigure.parallelFigurePathDatas
    let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index

    let parFigObj = parFigure.parallelFigureObject

    if (parFigObj.collectIndicesOfIntersections === true) {
        parFigObj.arcToPathIndexArray.push(index + 1)
    }

    intHandler.Intersection_Contact.handleArcToPathIntersection()

    if (targetEndPoints[index + 1][1].arc.joiner) {
        parFigObj.arcToPathCounter -= 1
    }
}


// WORKING / FIXME: finish NO_CONTACT (done i think)
//old
// function handleArcIntersectionPathToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, thisConnection2) {
//     parPathObj.pathToArcCounter += 1

//     if (parPathObj.collectIndicesOfIntersections === true) {
//         parPathObj.pathToArchIndexArray.push(index);
//     }

//     // handlePathToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj.pathToArchIndexArray, parPathObj.pathToArcCounter)
//     handlePathToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, thisConnection2)
// }
//new
function handleArcIntersectionPathToArc(parFigure, intHandler) {
    let parFigObj = parFigure.parallelFigureObject
    let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index
    parFigObj.pathToArcCounter += 1

    if (parFigObj.collectIndicesOfIntersections === true) {
        parFigObj.pathToArchIndexArray.push(index);
    }

    intHandler.Intersection_Contact.handlePathToArcIntersection()
}


// WORKING / FIXME: finish NO_CONTACT (done i think)
// //old
// function handleArcIntersectionArcToArc(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, thisConnection) {
//     parPathObj.arcToArcCounter += 1

//     if (parPathObj.collectIndicesOfIntersections === true) {
//         parPathObj.arcToArcIndexArray.push(index);
//     }

//     // handleArcToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj.arcToArcIndexArray, parPathObj.arcToArcCounter)
//     handleArcToArcIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index, parPathObj, thisConnection)
// }
//new
function handleArcIntersectionArcToArc(parFigure, intHandler) {
    let parFigObj = parFigure.parallelFigureObject
    let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index
    parFigObj.arcToArcCounter += 1

    if (parFigObj.collectIndicesOfIntersections === true) {
        parFigObj.arcToArcIndexArray.push(index);
    }

    intHandler.Intersection_Contact.handleArcToArcIntersection()
}


// FIXME: finish NO_CONTACT (done i think)
// function handleNOIntersection(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index) {
function handleNOIntersection(parFigure) {
    // handleArcToPathIntersectionNoContact(targetEndPoints, refEndPointsPerp, refEndPointsBase, documentFigureCount, self, index - 1)
    handleArcToPathIntersectionNoContact(parFigure, -1)
}


// WORKING / needs checking
// //old
// function setThisPathDataAsPreviousPathData(targetEndPoints, index) {
//     let prevParallelPathData = targetEndPoints[index - 1][1]
//     let thisParallelPathData = targetEndPoints[index][1]
//     if(thisParallelPathData.arc.joiner) {
//         thisParallelPathData.coords.x = prevParallelPathData.coords.x
//         thisParallelPathData.coords.y = prevParallelPathData.coords.y
//     }
// }
//new
function setThisPathDataAsPreviousPathData(parFigure) {
    let parallelFigurePathDatas = parFigure.parallelFigurePathDatas
    let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index

    let prevParallelPathData = parallelFigurePathDatas[index - 1][1]
    let thisParallelPathData = parallelFigurePathDatas[index][1]
    if(thisParallelPathData.arc.joiner) {
        thisParallelPathData.coords.x = prevParallelPathData.coords.x
        thisParallelPathData.coords.y = prevParallelPathData.coords.y
    }
}

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



// WORKING / needs checking
//old
// TODO: (in two places at once rn, find a place for it)
// function calcArcParDistance(arcRadiusObject, nextRefEndPointBase, distance) {
//     arcRadiusObject.parDistAndDir = (nextRefEndPointBase.arc.sweepFlag === 0) ? distance : distance * -1
//     let nextArcToCenterTotalDistance = getDistance(nextRefEndPointBase.coords.x, nextRefEndPointBase.coords.y, nextRefEndPointBase.arc.center.x, nextRefEndPointBase.arc.center.y)
//     let nextArcToCenterMinusPointerToArcFromArc1 = nextArcToCenterTotalDistance - arcRadiusObject.parDistAndDir
//     return nextArcToCenterMinusPointerToArcFromArc1
//new
function calcArcParDistance(parFigure, modifiedIdex) {
    let index = modifiedIdex + 1
    let nextRefEndPointBase = parFigure.originalFigurePathDatas_copy[index]
    let distance = parFigure.parallelFigureObject.parallelDistance

    parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.arcRadiusParDistAndDir = (nextRefEndPointBase.arc.sweepFlag === 0) ? distance : distance * -1

    let arcRadiusParDistAndDir = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.arcRadiusParDistAndDir
    let nextArcToCenterTotalDistance = getDistance(nextRefEndPointBase.coords.x, nextRefEndPointBase.coords.y, nextRefEndPointBase.arc.center.x, nextRefEndPointBase.arc.center.y)
    let nextArcToCenterMinusPointerToArcFromArc1 = nextArcToCenterTotalDistance - arcRadiusParDistAndDir
    return nextArcToCenterMinusPointerToArcFromArc1
}
