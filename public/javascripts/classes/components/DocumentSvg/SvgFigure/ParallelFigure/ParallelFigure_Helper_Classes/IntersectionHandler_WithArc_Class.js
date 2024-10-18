import {LargeArcFlagSetter} from './LargeArcFlagSetter_Class.js'
import {Intersection_Contact} from './Intersection_Helper_Classes/Intersection_Contact_Class.js'
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

export {
    IntersectionHandler_WithArc
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_allArcSegments_everyIndex_firstAction = function() {
    // 1
    console.log("1_all")
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST = this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST + 1
    setArcRadius(this.ParFigure, 0, "arcRad_1") // TODO: (Set_arcRad)
}


// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_allArcSegments_everyIndex_lastAction = function() {
    // Final
    console.log("FINAL_all")
    handleLargeArcFlag(this.ParFigure, "arcFlag_finalAll") // TODO: (Set_largeArcFag)
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_everyIndex_firstAction = function() {
    // 2
    console.log("2_seg1_first_all")
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST = this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST + 1
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc = function() {
    // 3
    console.log("3_seg1")
    handleArcIntersectionArcToArc(this.ParFigure, this)
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc = function() {
    // 4
    console.log("4_seg1")
    handleArcIntersectionPathToArc(this.ParFigure, this)
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_fistIndex = function() {
    // 5
    console.log("5_seg1")
    setPerpendicularPoints(this.ParFigure, [0, 0, 1, 0], false)
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc = function() {
    // 6_A
    console.log("6_A_seg1: joineronly")
    setThisPathDataAsPreviousPathData(this.ParFigure)
}

// WORKING / FIXME: finish NO_CONTACT (done i think)
IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc = function() {
    // 6_B
    console.log("6_B_seg1")
    skipFillersAndSetParallelProjections(this.ParFigure, 1)
    handleIntersectionArcToPath(this.ParFigure, this)
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_everyIndex_firstAction = function() {
    // 7
    console.log("7_seg2_first_all")
    setPerpendicularPoints(this.ParFigure, [0, 0, 1, 0], true)
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
    skipFillersAndSetParallelProjections(this.ParFigure, 1)
    handleIntersectionArcToPath(this.ParFigure, this)
}

// WORKING / needschecking
//new
IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_lastIndex = function() {
    console.log("10_seg2")
    setPerpendicularPoints(this.ParFigure, [0, 1, 1, 1], false)
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_everyIndex_lastAction = function() {
    console.log("11_seg2_last_all")
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST = -1
}

// WORKING / FIXME: finish NO_CONTACT (done i think)
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_thisIndexIsPathToArc = function() {
    // 1_Joiner
    console.log("1_Joiner_ooo")
    this.ParFigure.parallelFigureObject.pathToArcCounter += 1
    handlePathToArcIntersectionNoContact(this.ParFigure, 0)
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST = 0
    this.ParFigure.parallelFigureObject.setThisArcFlag_at2Joiner_from1Joiner = true // TODO: (Set_largeArcFag)
    this.ParFigure.parallelFigureObject.setThisArcFlag_atFinal_from1Joiner = true // TODO: (Set_largeArcFag)
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc = function() {
    // 2_A_Joiner
    console.log("2_A_Joiner_ooo")
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST = 0
    setArcRadius(this.ParFigure, 0, "arcRad_2AJ") // TODO: (Set_arcRad)
    handleLargeArcFlag(this.ParFigure, "arcFlag_2AJ") // TODO: (Set_largeArcFag)
}


// WORKING / FIXME: finish NO_CONTACT (done i think)
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc = function() {
    // 2_B_Joiner
    console.log("2_B_Joiner_ooo")
    skipFillersAndSetParallelProjections(this.ParFigure, 1)
    handleIntersectionArcToPath(this.ParFigure, this)
}

// WORKING / FIXME: finish NO_CONTACT (done i think)
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_thisIndexIsArcToArc = function() {
    // 3_Joiner
    console.log("3_Joiner_ooo")
    this.ParFigure.parallelFigureObject.arcToArcCounter += 1
    setArcRadius(this.ParFigure, 1, "arcRad_4J") // TODO: (Set_arcRad)
    handleArcToArcIntersectionNoContact(this.ParFigure, -1)
    console.log(this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST)
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST = 0
    console.log(this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST)
    this.ParFigure.parallelFigureObject.setThisArcFlag_at4Joiner_from3Joiner = true
    this.ParFigure.parallelFigureObject.setPrevArcFlag_atFinal_from3Joiner = true
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsArcToArc = function() {
    // 4_Joiner
    console.log("4_Joiner_ooo")
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST = 0
    handleLargeArcFlag(this.ParFigure, "arcFlag_4J") // TODO: (Set_largeArcFag)
}

// WORKING / FIXME: finish NO_CONTACT (done i think)
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsArcToPath = function() {
    // 5_Joiner
    console.log("5_Joiner_ooo")
    skipFillersAndSetParallelProjections(this.ParFigure, 0)
    handleNOIntersection(this.ParFigure)
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_SECOND = 1
}

// WORKING / needschecking
IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_skipThisIndex = function() {
    // 6_Joiner
    console.log("6_Joiner_ooo")
    this.ParFigure.parallelFigureObject.parallelPathSegmentCounter_FIRST = 0
}






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

function setArcRadius(parFigure, indexModifier, logId) {
    let targetArray = parFigure.parallelFigurePathDatas
    let index = (parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index + indexModifier) //TODO: (NEW) OLDWAY

    //TODO: (NEW) THESE CONSOLE LOGS SHOULD BE THE SAME CONSOLE LOGS AS OLD WAY BUT WRITTEN DIFF: Double check
    // console.log(logId)
    console.log('SET_ARC_RADIUS')
    console.log(index)
    console.log(parFigure.originalFigurePathDatas_plusFillers)
    console.log(parFigure.originalFigurePathDatas)
    console.log(parFigure.parallelFigurePathDatas)
    console.log(parFigure.parallelFigurePathDatas_transformed)


    let parallelDistance = calcArcParDistance(parFigure, index)

    targetArray[index][1].arc.radius = parallelDistance
}

function setPerpendicularPoints(parFigure, indicators, setPrevious) { // change names and org
    // grab data from classes
    let intersectionSorter = parFigure.IntersectionsSorter_WithArc
    let parallelPathDatas = parFigure.parallelFigurePathDatas
    let originalFigurePathDatas = parFigure.originalFigurePathDatas_plusFillers
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

function skipFillersAndSetParallelProjections(parFigure, offset) {
    let originalFigurePathDatas = parFigure.originalFigurePathDatas_plusFillers
    let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index

    let fillerAdder = 0
    let nextFillerAdder = 0

    if (originalFigurePathDatas[index + 2] === "filler") {
        fillerAdder = fillerAdder + 0
        nextFillerAdder = nextFillerAdder + 1
    }

    let thisPathDataOutside = originalFigurePathDatas[index + offset + fillerAdder]
    let nextPathDataOutside = originalFigurePathDatas[index + 2 + nextFillerAdder]

    let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, parFigure.parallelFigureObject.parallelDistance)//use orig

    parFigure.parallelFigurePathDatas[index + 1][0].coords.x = parallelProjections.thisPointX //use orig
    parFigure.parallelFigurePathDatas[index + 1][0].coords.y = parallelProjections.thisPointY
    parFigure.parallelFigurePathDatas[index + 1][1].coords.x = parallelProjections.nextPointX
    parFigure.parallelFigurePathDatas[index + 1][1].coords.y = parallelProjections.nextPointY
    parFigure.parallelFigureObject.arcToPathCounter += 1 //use orig
}

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

function handleArcIntersectionPathToArc(parFigure, intHandler) {
    let parFigObj = parFigure.parallelFigureObject
    let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index
    parFigObj.pathToArcCounter += 1

    if (parFigObj.collectIndicesOfIntersections === true) {
        parFigObj.pathToArchIndexArray.push(index);
    }

    intHandler.Intersection_Contact.handlePathToArcIntersection()
}

function handleArcIntersectionArcToArc(parFigure, intHandler) {
    let parFigObj = parFigure.parallelFigureObject
    let index = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.index
    parFigObj.arcToArcCounter += 1

    if (parFigObj.collectIndicesOfIntersections === true) {
        parFigObj.arcToArcIndexArray.push(index);
    }

    intHandler.Intersection_Contact.handleArcToArcIntersection()
}

function handleNOIntersection(parFigure) {
    handleArcToPathIntersectionNoContact(parFigure, -1)
}

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

function calcArcParDistance(parFigure, modifiedIdex) {
    let index = modifiedIdex + 1
    let nextRefEndPointBase = parFigure.originalFigurePathDatas_plusFillers[index]
    let distance = parFigure.parallelFigureObject.parallelDistance

    parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.arcRadiusParDistAndDir = (nextRefEndPointBase.arc.sweepFlag === 0) ? distance : distance * -1

    console.log('CALC_ACR_PAR_DIST_nextrefendptbase')
    console.log(nextRefEndPointBase)

    let arcRadiusParDistAndDir = parFigure.IntersectionsSorter_WithArc.intersectionSorterObject.arcRadiusParDistAndDir
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
