import {LargeArcFlagSetter} from './LargeArcFlagSetter_Class.js'
import {Intersection_Contact} from './Intersection_Helper_Classes/Intersection_Contact_Class.js'
import {getDistance} from '../../../../../../functions/math/mathFunctions.js' // OLD LOC
import {findPointAlongSlopeAtDistance} from '../../../../../../functions/drafting/parallelPath/drawParallelPath_functions/parallelPathFunctions.js' // OLD LOC
import {handleArcToArcIntersectionNoContact, handleArcToPathIntersectionNoContact, handlePathToArcIntersectionNoContact} from './Intersection_Helper_Classes/Intersection_NoContact_Class.js'

function IntersectionHandler_WithArc(parallelFigure) {
    this.PARFIGURE = parallelFigure
    this.ArcFlagSetter = new LargeArcFlagSetter(this.PARFIGURE)
    this.Intersection_Contact = new Intersection_Contact(this.PARFIGURE)

    this.intersectionHandlerObject = {
        isIntersectionConnected: true,
    }

    this.index = null
    this.arcRadiusParDistAndDir = null // moved from intersectionSorter
    this.originalFigurePathDatas_plusFillers = parallelFigure.originalFigurePathDatas_plusFillers
    this.parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    this.parallelFigureObj = parallelFigure.parallelFigureObject
}

IntersectionHandler_WithArc.prototype.handleIntersection = function() {
    console.log("HANDLE_INTERSECTION")
}

export {
    IntersectionHandler_WithArc
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_allArcSegments_everyIndex_firstAction = function() {
    // 1
    console.log("1_all")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1
    // setArcRadius(this.PARFIGURE, 0, "arcRad_1") // TODO: (Set_arcRad)
    this.setArcRadius(0, "arcRad_1") // TODO: (Set_arcRad)
}


// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_allArcSegments_everyIndex_lastAction = function() {
    // Final
    console.log("FINAL_all")
    // handleLargeArcFlag(this.PARFIGURE, "arcFlag_finalAll") // TODO: (Set_largeArcFag)
    this.handleLargeArcFlag("arcFlag_finalAll") // TODO: (Set_largeArcFag)
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_everyIndex_firstAction = function() {
    // 2
    console.log("2_seg1_first_all")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc = function() {
    // 3
    console.log("3_seg1")
    // handleArcIntersectionArcToArc(this.PARFIGURE, this)
    this.handleArcIntersectionArcToArc()
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc = function() {
    // 4
    console.log("4_seg1")
    // handleArcIntersectionPathToArc(this.PARFIGURE, this)
    this.handleArcIntersectionPathToArc()
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_fistIndex = function() {
    // 5
    console.log("5_seg1")
    // setPerpendicularPoints(this.PARFIGURE, [0, 0, 1, 0], false)
    this.setPerpendicularPoints([0, 0, 1, 0], false)
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc = function() {
    // 6_A
    console.log("6_A_seg1: joineronly")
    // setThisPathDataAsPreviousPathData(this.PARFIGURE)
    this.setThisPathDataAsPreviousPathData()
}

// WORKING / FIXME: finish NO_CONTACT (done i think)
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc = function() {
    // 6_B
    console.log("6_B_seg1")
    // skipFillersAndSetParallelProjections(this.PARFIGURE, 1)
    this.skipFillersAndSetParallelProjections(1)
    // handleIntersectionArcToPath(this.PARFIGURE, this)
    this.handleIntersectionArcToPath()
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_everyIndex_firstAction = function() {
    // 7
    console.log("7_seg2_first_all")
    // setPerpendicularPoints(this.PARFIGURE, [0, 0, 1, 0], true)
    this.setPerpendicularPoints([0, 0, 1, 0], true)
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsConnected = function() {
    // 8_A
    console.log("8_seg2_connected")
    // empty
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsArc_nextIndexIntersectionIsNotConnected = function() {
    // 8_B
    console.log("8_seg2_not_connected")
    // empty
}

// WORKING / FIXME: finish NO_CONTACT (done i think)
IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_notLastIndex_nextIndexIsNoArc = function() {
    // 9
    console.log("9_seg2")
    // skipFillersAndSetParallelProjections(this.PARFIGURE, 1)
    this.skipFillersAndSetParallelProjections(1)
    // handleIntersectionArcToPath(this.PARFIGURE, this)
    this.handleIntersectionArcToPath()
}

// WORKING / needschecking
//new
IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_lastIndex = function() {
    console.log("10_seg2")
    // setPerpendicularPoints(this.PARFIGURE, [0, 1, 1, 1], false)
    this.setPerpendicularPoints([0, 1, 1, 1], false)
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_everyIndex_lastAction = function() {
    console.log("11_seg2_last_all")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1
}

// WORKING / FIXME: finish NO_CONTACT (done i think)
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_thisIndexIsPathToArc = function() {
    // 1_Joiner
    console.log("1_Joiner_ooo")
    this.parallelFigureObj.pathToArcCounter += 1
    handlePathToArcIntersectionNoContact(this.PARFIGURE, 0) //FIXME: another file fix later
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
    this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner = true // TODO: (Set_largeArcFag)
    this.parallelFigureObj.setThisArcFlag_atFinal_from1Joiner = true // TODO: (Set_largeArcFag)
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc = function() {
    // 2_A_Joiner
    console.log("2_A_Joiner_ooo")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
    // setArcRadius(this.PARFIGURE, 0, "arcRad_2AJ") // TODO: (Set_arcRad)
    this.setArcRadius(0, "arcRad_2AJ") // TODO: (Set_arcRad)
    // handleLargeArcFlag(this.PARFIGURE, "arcFlag_2AJ") // TODO: (Set_largeArcFag)
    this.handleLargeArcFlag("arcFlag_2AJ") // TODO: (Set_largeArcFag)
}


// WORKING / FIXME: finish NO_CONTACT (done i think)
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc = function() {
    // 2_B_Joiner
    console.log("2_B_Joiner_ooo")
    // skipFillersAndSetParallelProjections(this.PARFIGURE, 1)
    this.skipFillersAndSetParallelProjections(1)
    // handleIntersectionArcToPath(this.PARFIGURE, this)
    this.handleIntersectionArcToPath()
}

// WORKING / FIXME: finish NO_CONTACT (done i think)
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_thisIndexIsArcToArc = function() {
    // 3_Joiner
    console.log("3_Joiner_ooo")
    this.parallelFigureObj.arcToArcCounter += 1
    // setArcRadius(this.PARFIGURE, 1, "arcRad_4J") // TODO: (Set_arcRad)
    this.setArcRadius(1, "arcRad_4J") // TODO: (Set_arcRad)
    handleArcToArcIntersectionNoContact(this.PARFIGURE, -1)
    console.log(this.parallelFigureObj.parallelPathSegmentCounter_FIRST)
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
    console.log(this.parallelFigureObj.parallelPathSegmentCounter_FIRST)
    this.parallelFigureObj.setThisArcFlag_at4Joiner_from3Joiner = true
    this.parallelFigureObj.setPrevArcFlag_atFinal_from3Joiner = true
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsArcToArc = function() {
    // 4_Joiner
    console.log("4_Joiner_ooo")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
    // handleLargeArcFlag(this.PARFIGURE, "arcFlag_4J") // TODO: (Set_largeArcFag)
    this.handleLargeArcFlag("arcFlag_4J") // TODO: (Set_largeArcFag)
}

// WORKING / FIXME: finish NO_CONTACT (done i think)
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsArcToPath = function() {
    // 5_Joiner
    console.log("5_Joiner_ooo")
    // skipFillersAndSetParallelProjections(this.PARFIGURE, 0)
    this.skipFillersAndSetParallelProjections(0)
    // handleNOIntersection(this.PARFIGURE)
    this.handleNOIntersection()
    this.parallelFigureObj.parallelPathSegmentCounter_SECOND = 1
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_skipThisIndex = function() {
    // 6_Joiner
    console.log("6_Joiner_ooo")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
}













// function handleLargeArcFlag(parFigure, flag) {
IntersectionHandler_WithArc.prototype.handleLargeArcFlag = function(flag) {
    // let parFigObj = parFigure.parallelFigureObject
    // let ArcFlagSetter = parFigure.IntersectionsSorter_WithArc.IntersectionHandler.ArcFlagSetter
    // if(flag === "arcFlag_finalAll") {
    //     if(parFigure.parallelFigureObject.setThisArcFlag_atFinal_from1Joiner === true) {
    //         console.log("running_skip_arcFlagSet_from_1j_in_finalAll")
    //         parFigure.IntersectionsSorter_WithArc.IntersectionHandler.ArcFlagSetter.setLargeArcFlag(parFigure, 0, false)
    //         parFigure.parallelFigureObject.setThisArcFlag_at2Joiner_from1Joiner = false
    //         parFigure.parallelFigureObject.setThisArcFlag_atFinal_from1Joiner = false
    //     }

    //     if(parFigure.parallelFigureObject.setPrevArcFlag_atFinal_from3Joiner === true) {
    //         console.log("running_skip_arcFlagSet_from_3j_in_finalAll")
    //         parFigure.IntersectionsSorter_WithArc.IntersectionHandler.ArcFlagSetter.setLargeArcFlag(parFigure, -1, false)
    //         parFigure.parallelFigureObject.setThisArcFlag_at4Joiner_from3Joiner = false
    //         parFigure.parallelFigureObject.setPrevArcFlag_atFinal_from3Joiner = false
    //     }

    //     if(parFigure.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject.isIntersectionConnected === true) {
    //         console.log("CONNECTED")
    //         parFigure.IntersectionsSorter_WithArc.IntersectionHandler.ArcFlagSetter.setLargeArcFlag(parFigure, 0, true)
    //     } else {
    //         console.log("NOT_CONNECTED")
    //         parFigure.IntersectionsSorter_WithArc.IntersectionHandler.ArcFlagSetter.setLargeArcFlag(parFigure, 0, false)
    //         parFigure.IntersectionsSorter_WithArc.IntersectionHandler.intersectionHandlerObject.isIntersectionConnected = true
    //     }
    // }

    // if(flag === "arcFlag_2AJ") {
    //     if(parFigure.parallelFigureObject.setThisArcFlag_at2Joiner_from1Joiner === true) {
    //         console.log("running_skip_arcFlagSet_from_1j_in_2j")
    //         parFigure.IntersectionsSorter_WithArc.IntersectionHandler.ArcFlagSetter.setLargeArcFlag(parFigure, 0, true)
    //         parFigure.parallelFigureObject.setThisArcFlag_at2Joiner_from1Joiner = false
    //         parFigure.parallelFigureObject.setThisArcFlag_atFinal_from1Joiner = false
    //     }
    // }

    // if(flag === "arcFlag_4J") {
    //     if(parFigure.parallelFigureObject.setThisArcFlag_at4Joiner_from3Joiner === true) {
    //         console.log("running_skip_arcFlagSet_from_3j_in_4j")
    //         parFigure.IntersectionsSorter_WithArc.IntersectionHandler.ArcFlagSetter.setLargeArcFlag(parFigure, 0, true)
    //         parFigure.parallelFigureObject.setThisArcFlag_at4Joiner_from3Joiner = false
    //         parFigure.parallelFigureObject.setPrevArcFlag_atFinal_from3Joiner = false
    //     }
    // }
    if(flag === "arcFlag_finalAll") {
        if(this.parallelFigureObj.setThisArcFlag_atFinal_from1Joiner === true) {
            console.log("running_skip_arcFlagSet_from_1j_in_finalAll")
            this.ArcFlagSetter.setLargeArcFlag(this.PARFIGURE, 0, false) //FIXME: sep file fix later (all)
            this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner = false
            this.parallelFigureObj.setThisArcFlag_atFinal_from1Joiner = false
        }

        if(this.parallelFigureObj.setPrevArcFlag_atFinal_from3Joiner === true) {
            console.log("running_skip_arcFlagSet_from_3j_in_finalAll")
            this.ArcFlagSetter.setLargeArcFlag(this.PARFIGURE, -1, false)
            this.parallelFigureObj.setThisArcFlag_at4Joiner_from3Joiner = false
            this.parallelFigureObj.setPrevArcFlag_atFinal_from3Joiner = false
        }

        if(this.intersectionHandlerObject.isIntersectionConnected === true) {
            console.log("CONNECTED")
            this.ArcFlagSetter.setLargeArcFlag(this.PARFIGURE, 0, true)
        } else {
            console.log("NOT_CONNECTED")
            this.ArcFlagSetter.setLargeArcFlag(this.PARFIGURE, 0, false)
            this.intersectionHandlerObject.isIntersectionConnected = true
        }
    }

    if(flag === "arcFlag_2AJ") {
        if(this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner === true) {
            console.log("running_skip_arcFlagSet_from_1j_in_2j")
            this.ArcFlagSetter.setLargeArcFlag(this.PARFIGURE, 0, true)
            this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner = false
            this.parallelFigureObj.setThisArcFlag_atFinal_from1Joiner = false
        }
    }

    if(flag === "arcFlag_4J") {
        if(this.parallelFigureObj.setThisArcFlag_at4Joiner_from3Joiner === true) {
            console.log("running_skip_arcFlagSet_from_3j_in_4j")
            this.ArcFlagSetter.setLargeArcFlag(this.PARFIGURE, 0, true)
            this.parallelFigureObj.setThisArcFlag_at4Joiner_from3Joiner = false
            this.parallelFigureObj.setPrevArcFlag_atFinal_from3Joiner = false
        }
    }
}

// function setArcRadius(parFigure, indexModifier, logId) {
IntersectionHandler_WithArc.prototype.setArcRadius = function(indexModifier, logId) {
    // let targetArray = parFigure.parallelFigurePathDatas
    // let index = (parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index + indexModifier) //TODO: (NEW) OLDWAY
    let modifiedIndex = (this.index + indexModifier) //TODO: (NEW) OLDWAY
    // console.log(logId)
    // let parallelDistance = calcArcParDistance(parFigure, index)
    let parallelDistance = this.calcArcParDistance(modifiedIndex)
    // targetArray[index][1].arc.radius = parallelDistance
    this.parallelFigurePathDatas[modifiedIndex][1].arc.radius = parallelDistance
}

// function setPerpendicularPoints(parFigure, indicators, setPrevious) { // change names and org
IntersectionHandler_WithArc.prototype.setPerpendicularPoints = function(indicators, setPrevious) {
    // let intersectionSorter = parFigure.IntersectionsSorter_WithArc
    // let parallelPathDatas = parFigure.parallelFigurePathDatas
    // let originalFigurePathDatas = parFigure.originalFigurePathDatas_plusFillers
    // let index = intersectionSorter.intersectionSorterObject.index

    // let arcRadiusData = intersectionSorter.intersectionSorterObject.arcRadiusParDistAndDir
    // let arcRadiusData = parFigure.IntersectionsSorter_WithArc.IntersectionHandler.arcRadiusParDistAndDir //FIXME: this is TEMP: use below when made a prototype
    let arcRadiusData = this.arcRadiusParDistAndDir // FIXME: cant access THIS yet.

    // set targets with indicators
    // let targetIndex = index + indicators[0]
    // let refIndex = index + indicators[1]
    // let arcRefIndex = index + indicators[2]
    // let target = indicators[3]
    let targetIndex = this.index + indicators[0]
    let refIndex = this.index + indicators[1]
    let arcRefIndex = this.index + indicators[2]
    let target = indicators[3]

    // set target datas
    // let targetPathData = parallelPathDatas[targetIndex][target]
    let targetPathData = this.parallelFigurePathDatas[targetIndex][target]
    // let refPathData = originalFigurePathDatas[refIndex]
    // let refArcCenter = originalFigurePathDatas[arcRefIndex]
    let refPathData = this.originalFigurePathDatas_plusFillers[refIndex]
    let refArcCenter = this.originalFigurePathDatas_plusFillers[arcRefIndex]

    // calculate positions and set data
    let newParallelPosition = findPointAlongSlopeAtDistance([refPathData.coords.x, refPathData.coords.y], [refArcCenter.arc.center.x, refArcCenter.arc.center.y], arcRadiusData)
    targetPathData.coords.x = newParallelPosition[0]
    targetPathData.coords.y = newParallelPosition[1]

    if (setPrevious) {
        // let prevParallelPathData = parallelPathDatas[targetIndex - 1][1]
        let prevParallelPathData = this.parallelFigurePathDatas[targetIndex - 1][1]
        prevParallelPathData.coords.x = newParallelPosition[0]
        prevParallelPathData.coords.y = newParallelPosition[1]
    }
}

// function skipFillersAndSetParallelProjections(parFigure, offset) {
IntersectionHandler_WithArc.prototype.skipFillersAndSetParallelProjections = function(offset) {
    // let originalFigurePathDatas = parFigure.originalFigurePathDatas_plusFillers
    // let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index

    let fillerAdder = 0
    let nextFillerAdder = 0

    // if (originalFigurePathDatas[index + 2] === "filler") {
    //     fillerAdder = fillerAdder + 0
    //     nextFillerAdder = nextFillerAdder + 1
    // }
    if (this.originalFigurePathDatas_plusFillers[this.index + 2] === "filler") {
        fillerAdder = fillerAdder + 0
        nextFillerAdder = nextFillerAdder + 1
    }

    // let thisPathDataOutside = originalFigurePathDatas[index + offset + fillerAdder]
    // let nextPathDataOutside = originalFigurePathDatas[index + 2 + nextFillerAdder]
    let thisPathDataOutside = this.originalFigurePathDatas_plusFillers[this.index + offset + fillerAdder]
    let nextPathDataOutside = this.originalFigurePathDatas_plusFillers[this.index + 2 + nextFillerAdder]

    let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, this.parallelFigureObj.parallelDistance)//use orig

    // parFigure.parallelFigurePathDatas[index + 1][0].coords.x = parallelProjections.thisPointX //use orig
    // parFigure.parallelFigurePathDatas[index + 1][0].coords.y = parallelProjections.thisPointY
    // parFigure.parallelFigurePathDatas[index + 1][1].coords.x = parallelProjections.nextPointX
    // parFigure.parallelFigurePathDatas[index + 1][1].coords.y = parallelProjections.nextPointY
    // parFigure.parallelFigureObject.arcToPathCounter += 1 //use orig
    this.parallelFigurePathDatas[this.index + 1][0].coords.x = parallelProjections.thisPointX //use orig
    this.parallelFigurePathDatas[this.index + 1][0].coords.y = parallelProjections.thisPointY
    this.parallelFigurePathDatas[this.index + 1][1].coords.x = parallelProjections.nextPointX
    this.parallelFigurePathDatas[this.index + 1][1].coords.y = parallelProjections.nextPointY
    this.parallelFigureObj.arcToPathCounter += 1 //use orig
}

// TODO: can these three be one?
// function handleIntersectionArcToPath(parFigure, intHandler) {
IntersectionHandler_WithArc.prototype.handleIntersectionArcToPath = function() {
    // let targetEndPoints = parFigure.parallelFigurePathDatas
    // let parFigObj = parFigure.parallelFigureObject
    // let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index

    // if (parFigObj.collectIndicesOfIntersections === true) {
    //     parFigObj.arcToPathIndexArray.push(index + 1)
    // }
    if (this.parallelFigureObj.collectIndicesOfIntersections === true) {
        this.parallelFigureObj.arcToPathIndexArray.push(this.index + 1)
    }

    // intHandler.Intersection_Contact.handleArcToPathIntersection()
    this.Intersection_Contact.handleArcToPathIntersection()

    // if (targetEndPoints[index + 1][1].arc.joiner) {
    //     parFigObj.arcToPathCounter -= 1
    // }
    if (this.parallelFigurePathDatas[this.index + 1][1].arc.joiner) {
        this.parallelFigureObj.arcToPathCounter -= 1
    }
}

// function handleArcIntersectionPathToArc(parFigure, intHandler) {
IntersectionHandler_WithArc.prototype.handleArcIntersectionPathToArc = function() {
    // let parFigObj = parFigure.parallelFigureObject
    // let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index
    // parFigObj.pathToArcCounter += 1
    this.parallelFigureObj.pathToArcCounter += 1

    // if (parFigObj.collectIndicesOfIntersections === true) {
    //     parFigObj.pathToArchIndexArray.push(index);
    // }
    if (this.parallelFigureObj.collectIndicesOfIntersections === true) {
        this.parallelFigureObj.pathToArchIndexArray.push(this.index);
    }

    // intHandler.Intersection_Contact.handlePathToArcIntersection()
    this.Intersection_Contact.handlePathToArcIntersection()
}

// function handleArcIntersectionArcToArc(parFigure, intHandler) {
IntersectionHandler_WithArc.prototype.handleArcIntersectionArcToArc = function() {
    // let parFigObj = parFigure.parallelFigureObject
    // let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index
    // parFigObj.arcToArcCounter += 1
    this.parallelFigureObj.arcToArcCounter += 1

    // if (parFigObj.collectIndicesOfIntersections === true) {
    //     parFigObj.arcToArcIndexArray.push(index);
    // }
    if (this.parallelFigureObj.collectIndicesOfIntersections === true) {
        this.parallelFigureObj.arcToArcIndexArray.push(this.index);
    }

    // intHandler.Intersection_Contact.handleArcToArcIntersection()
    this.Intersection_Contact.handleArcToArcIntersection()
}

// function handleNOIntersection(parFigure) {
IntersectionHandler_WithArc.prototype.handleNOIntersection = function() {
    handleArcToPathIntersectionNoContact(this.PARFIGURE, -1) //FIXME: fix later, separate file
}

// function setThisPathDataAsPreviousPathData(parFigure) {
IntersectionHandler_WithArc.prototype.setThisPathDataAsPreviousPathData = function() {
    // let parallelFigurePathDatas = parFigure.parallelFigurePathDatas
    // let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index

    // let prevParallelPathData = parallelFigurePathDatas[index - 1][1]
    // let thisParallelPathData = parallelFigurePathDatas[index][1]
    // let prevParallelPathData = this.parallelFigurePathDatas[index - 1][1]
    // let thisParallelPathData = this.parallelFigurePathDatas[index][1]
    let prevParallelPathData = this.parallelFigurePathDatas[this.index - 1][1]
    let thisParallelPathData = this.parallelFigurePathDatas[this.index][1]
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

// function calcArcParDistance(parFigure, index) {
IntersectionHandler_WithArc.prototype.calcArcParDistance = function(index) {
    
    // let modIndex = index + 1
    // let nextRefEndPointBase = parFigure.originalFigurePathDatas_plusFillers[modIndex]
    // let distance = parFigure.parallelFigureObject.parallelDistance

    let modIndex = index + 1
    let nextRefEndPointBase = this.originalFigurePathDatas_plusFillers[modIndex]
    let distance = this.parallelFigureObj.parallelDistance
    // console.log('CALC_ACR_PAR_DIST_nextrefendptbase')
    // console.log(nextRefEndPointBase)
    // console.log(distance)

    // parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.arcRadiusParDistAndDir = (nextRefEndPointBase.arc.sweepFlag === 0) ? distance : distance * -1
    // this.PARFIGURE.IntersectionsSorter_WithArc.intersectionSorterObject.arcRadiusParDistAndDir = (nextRefEndPointBase.arc.sweepFlag === 0) ? distance : distance * -1
    this.arcRadiusParDistAndDir = (nextRefEndPointBase.arc.sweepFlag === 0) ? distance : distance * -1

    // let arcRadiusParDistAndDir = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.arcRadiusParDistAndDir
    // let arcRadiusParDistAndDir = this.PARFIGURE.IntersectionsSorter_WithArc.intersectionSorterObject.arcRadiusParDistAndDir
    let arcRadiusParDistAndDir = this.arcRadiusParDistAndDir
    let nextArcToCenterTotalDistance = getDistance(nextRefEndPointBase.coords.x, nextRefEndPointBase.coords.y, nextRefEndPointBase.arc.center.x, nextRefEndPointBase.arc.center.y)
    let nextArcToCenterMinusPointerToArcFromArc1 = nextArcToCenterTotalDistance - arcRadiusParDistAndDir

    return nextArcToCenterMinusPointerToArcFromArc1
}












// targetEndPoints          ===         parallelPathDatas_globalRef                     ===         parallelFigurePathDatas
// refEndPointsPerp         ===         parallelPathDatasCopyForPerpendicular           ===         parallelFigurePathDatas_transformed
// refEndPointsBase         ===         basePathDatasCopy                               ===         originalFigurePathDatas_plusFillers

    // OLD NAMES ORDER PASSED
    // parallelPathDatas_globalRef,
    // parallelPathDatasCopyForPerpendicular,
    // basePathDatasCopy,
    // originalFigure_counter_groupCount_GLOBAL,
    // self,
    // i,
    // parallelPathObject,
    // skipperCheckers

    // OLD NAMES with new anmes ORDER RECIEVED
    // targetEndPoints,
    // refEndPointsPerp,
    // refEndPointsBase,
    // documentFigureCount,
    // self,
    // index,
    // parallelPathObject,
    // skipperCheckers

    // OLD NAMES
    // this.originalFigurePathDatas
    // this.basePathDatasCopy
    // this.parallelPathDatas_globalRef
    // this.parallelPathDatasCopyForPerpendicular

    //NEW NAMES
    // // Figure Data
    // this.originalFigurePathDatas = this.SvgFigure.svgPathDatas
    // this.originalFigurePathDatas_plusFillers = copyPathDatas(this.originalFigurePathDatas) // maybe change the name to indicate that this is where "fillers" are placed.
    // this.parallelFigurePathDatas = createParallelPathDatas(this.originalFigurePathDatas)
    // this.parallelFigurePathDatas_transformed = transformData(this.parallelFigurePathDatas)


// PASSED
// parallelFigurePathDatas,
// parallelFigurePathDatas_transformed,
// originalFigurePathDatas_plusFillers,
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
