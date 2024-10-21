import {LargeArcFlagSetter} from './LargeArcFlagSetter_Class.js'
import {Intersection_Contact} from './Intersection_Helper_Classes/Intersection_Contact_Class.js'
import {getDistance} from '../../../../../../functions/math/mathFunctions.js' // OLD LOC
import {findPointAlongSlopeAtDistance} from '../../../../../../functions/drafting/parallelPath/drawParallelPath_functions/parallelPathFunctions.js' // OLD LOC
import {handleArcToArcIntersectionNoContact, handleArcToPathIntersectionNoContact, handlePathToArcIntersectionNoContact} from './Intersection_Helper_Classes/Intersection_NoContact_Class.js'

function IntersectionHandler_WithArc(parallelFigure) {
    this.PARFIGURE = parallelFigure
    
    this.intersectionHandlerObject = {
        isIntersectionConnected: true,
    }
    
    this.ArcFlagSetter = new LargeArcFlagSetter(parallelFigure)
    this.Intersection_Contact = new Intersection_Contact(parallelFigure)

    this.originalFigurePathDatas_plusFillers = parallelFigure.originalFigurePathDatas_plusFillers
    this.parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    this.parallelFigureObj = parallelFigure.parallelFigureObject

    this.index = null
    this.arcRadiusParDistAndDir = null
}

export {
    IntersectionHandler_WithArc
}

IntersectionHandler_WithArc.prototype.arcIntersection_allArcSegments_everyIndex_firstAction = function() {
    // 1
    console.log("1_all")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1
    this.setArcRadius(0, "arcRad_1")
}

IntersectionHandler_WithArc.prototype.arcIntersection_allArcSegments_everyIndex_lastAction = function() {
    // Final
    console.log("FINAL_all")
    this.handleLargeArcFlag("arcFlag_finalAll") // (Set_largeArcFag)
}

IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_everyIndex_firstAction = function() {
    // 2
    console.log("2_seg1_first_all")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1
}

IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_notFistIndex_prevIndexIsArc = function() {
    // 3
    console.log("3_seg1")
    this.handleArcIntersectionArcToArc()
}

IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_notFirstIndex_prevIndexIsNoArc = function() {
    // 4
    console.log("4_seg1")
    this.handleArcIntersectionPathToArc()
}

IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_fistIndex = function() {
    // 5
    console.log("5_seg1")
    this.setPerpendicularPoints([0, 0, 1, 0], false)
}

IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc = function() {
    // 6_A
    console.log("6_A_seg1: joineronly")
    this.setThisPathDataAsPreviousPathData()
}

IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_anyIndex_nextIndexIsNoArc = function() {
    // 6_B
    console.log("6_B_seg1")
    this.skipFillersAndSetParallelProjections(1)
    this.handleIntersectionArcToPath()
}

IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_everyIndex_firstAction = function() {
    // 7
    console.log("7_seg2_first_all")
    this.setPerpendicularPoints([0, 0, 1, 0], true)
}

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
    this.skipFillersAndSetParallelProjections(1)
    this.handleIntersectionArcToPath()
}

IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_lastIndex = function() {
    console.log("10_seg2")
    this.setPerpendicularPoints([0, 1, 1, 1], false)
}

IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_everyIndex_lastAction = function() {
    console.log("11_seg2_last_all")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1
}

IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_thisIndexIsPathToArc = function() {
    // 1_Joiner
    console.log("1_Joiner_ooo")
    this.parallelFigureObj.pathToArcCounter += 1
    handlePathToArcIntersectionNoContact(this.PARFIGURE, 0) //FIXME: another file fix later
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
    this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner = true // (Set_largeArcFag)
    this.parallelFigureObj.setThisArcFlag_atFinal_from1Joiner = true // (Set_largeArcFag)
}

IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc = function() {
    // 2_A_Joiner
    console.log("2_A_Joiner_ooo")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
    this.setArcRadius(0, "arcRad_2AJ")
    this.handleLargeArcFlag("arcFlag_2AJ") // (Set_largeArcFag)
}

IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc = function() {
    // 2_B_Joiner
    console.log("2_B_Joiner_ooo")
    this.skipFillersAndSetParallelProjections(1)
    this.handleIntersectionArcToPath()
}

IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_thisIndexIsArcToArc = function() {
    // 3_Joiner
    console.log("3_Joiner_ooo")
    this.parallelFigureObj.arcToArcCounter += 1
    this.setArcRadius(1, "arcRad_4J")
    handleArcToArcIntersectionNoContact(this.PARFIGURE, -1)  //FIXME: another file fix later
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
    this.parallelFigureObj.setThisArcFlag_at4Joiner_from3Joiner = true
    this.parallelFigureObj.setPrevArcFlag_atFinal_from3Joiner = true
}

IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsArcToArc = function() {
    // 4_Joiner
    console.log("4_Joiner_ooo")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
    this.handleLargeArcFlag("arcFlag_4J") // (Set_largeArcFag)
}

IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsArcToPath = function() {
    // 5_Joiner
    console.log("5_Joiner_ooo")
    this.skipFillersAndSetParallelProjections(0)
    this.handleNOIntersection()
    this.parallelFigureObj.parallelPathSegmentCounter_SECOND = 1
}

IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_skipThisIndex = function() {
    // 6_Joiner
    console.log("6_Joiner_ooo")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
}




IntersectionHandler_WithArc.prototype.handleLargeArcFlag = function(flag) {
    if(flag === "arcFlag_finalAll") {
        if(this.parallelFigureObj.setThisArcFlag_atFinal_from1Joiner === true) {
            console.log("running_skip_arcFlagSet_from_1j_in_finalAll")
            this.ArcFlagSetter.setLargeArcFlag(0, false)
            this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner = false
            this.parallelFigureObj.setThisArcFlag_atFinal_from1Joiner = false
        }
        if(this.parallelFigureObj.setPrevArcFlag_atFinal_from3Joiner === true) {
            console.log("running_skip_arcFlagSet_from_3j_in_finalAll")
            this.ArcFlagSetter.setLargeArcFlag(-1, false)
            this.parallelFigureObj.setThisArcFlag_at4Joiner_from3Joiner = false
            this.parallelFigureObj.setPrevArcFlag_atFinal_from3Joiner = false
        }
        if(this.intersectionHandlerObject.isIntersectionConnected === true) {
            console.log("CONNECTED")
            this.ArcFlagSetter.setLargeArcFlag(0, true)
        } else {
            console.log("NOT_CONNECTED")
            this.ArcFlagSetter.setLargeArcFlag(0, false)
            this.intersectionHandlerObject.isIntersectionConnected = true
        }
    }

    if(flag === "arcFlag_2AJ") {
        if(this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner === true) {
            console.log("running_skip_arcFlagSet_from_1j_in_2j")
            this.ArcFlagSetter.setLargeArcFlag(0, true)
            this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner = false
            this.parallelFigureObj.setThisArcFlag_atFinal_from1Joiner = false
        }
    }

    if(flag === "arcFlag_4J") {
        if(this.parallelFigureObj.setThisArcFlag_at4Joiner_from3Joiner === true) {
            console.log("running_skip_arcFlagSet_from_3j_in_4j")
            this.ArcFlagSetter.setLargeArcFlag(0, true)
            this.parallelFigureObj.setThisArcFlag_at4Joiner_from3Joiner = false
            this.parallelFigureObj.setPrevArcFlag_atFinal_from3Joiner = false
        }
    }
}

IntersectionHandler_WithArc.prototype.setArcRadius = function(indexModifier, logId) {
    let modifiedIndex = this.index + indexModifier
    let parallelDistance = this.calcArcParDistance(modifiedIndex)
    this.parallelFigurePathDatas[modifiedIndex][1].arc.radius = parallelDistance
}

IntersectionHandler_WithArc.prototype.setPerpendicularPoints = function(indicators, setPrevious) {
    let arcRadiusData = this.arcRadiusParDistAndDir
    // set targets with indicators
    let targetIndex = this.index + indicators[0]
    let refIndex = this.index + indicators[1]
    let arcRefIndex = this.index + indicators[2]
    let target = indicators[3]

    // set target datas
    let targetPathData = this.parallelFigurePathDatas[targetIndex][target]
    let refPathData = this.originalFigurePathDatas_plusFillers[refIndex]
    let refArcCenter = this.originalFigurePathDatas_plusFillers[arcRefIndex]

    // calculate positions and set data
    let newParallelPosition = findPointAlongSlopeAtDistance([refPathData.coords.x, refPathData.coords.y], [refArcCenter.arc.center.x, refArcCenter.arc.center.y], arcRadiusData)
    targetPathData.coords.x = newParallelPosition[0]
    targetPathData.coords.y = newParallelPosition[1]

    if (setPrevious) {
        let prevParallelPathData = this.parallelFigurePathDatas[targetIndex - 1][1]
        prevParallelPathData.coords.x = newParallelPosition[0]
        prevParallelPathData.coords.y = newParallelPosition[1]
    }
}

IntersectionHandler_WithArc.prototype.skipFillersAndSetParallelProjections = function(offset) {
    let fillerAdder = 0
    let nextFillerAdder = 0

    if (this.originalFigurePathDatas_plusFillers[this.index + 2] === "filler") {
        fillerAdder = fillerAdder + 0
        nextFillerAdder = nextFillerAdder + 1
    }

    let thisPathDataOutside = this.originalFigurePathDatas_plusFillers[this.index + offset + fillerAdder]
    let nextPathDataOutside = this.originalFigurePathDatas_plusFillers[this.index + 2 + nextFillerAdder]
    let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, this.parallelFigureObj.parallelDistance)//use orig

    this.parallelFigurePathDatas[this.index + 1][0].coords.x = parallelProjections.thisPointX //use orig
    this.parallelFigurePathDatas[this.index + 1][0].coords.y = parallelProjections.thisPointY
    this.parallelFigurePathDatas[this.index + 1][1].coords.x = parallelProjections.nextPointX
    this.parallelFigurePathDatas[this.index + 1][1].coords.y = parallelProjections.nextPointY
    this.parallelFigureObj.arcToPathCounter += 1 //use orig
}

//FIXME: Can these all be one?
IntersectionHandler_WithArc.prototype.handleIntersectionArcToPath = function() {
    if (this.parallelFigureObj.collectIndicesOfIntersections === true) {
        this.parallelFigureObj.arcToPathIndexArray.push(this.index + 1)
    }
    this.Intersection_Contact.handleArcToPathIntersection()
    if (this.parallelFigurePathDatas[this.index + 1][1].arc.joiner) {
        this.parallelFigureObj.arcToPathCounter -= 1
    }
}

IntersectionHandler_WithArc.prototype.handleArcIntersectionPathToArc = function() {
    this.parallelFigureObj.pathToArcCounter += 1
    if (this.parallelFigureObj.collectIndicesOfIntersections === true) {
        this.parallelFigureObj.pathToArchIndexArray.push(this.index);
    }
    this.Intersection_Contact.handlePathToArcIntersection()
}

IntersectionHandler_WithArc.prototype.handleArcIntersectionArcToArc = function() {
    this.parallelFigureObj.arcToArcCounter += 1
    if (this.parallelFigureObj.collectIndicesOfIntersections === true) {
        this.parallelFigureObj.arcToArcIndexArray.push(this.index);
    }
    this.Intersection_Contact.handleArcToArcIntersection()
}

IntersectionHandler_WithArc.prototype.handleNOIntersection = function() {
    handleArcToPathIntersectionNoContact(this.PARFIGURE, -1) //FIXME: fix later, separate file
}

IntersectionHandler_WithArc.prototype.setThisPathDataAsPreviousPathData = function() {
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

IntersectionHandler_WithArc.prototype.calcArcParDistance = function(index) {
    let modIndex = index + 1
    let nextRefEndPointBase = this.originalFigurePathDatas_plusFillers[modIndex]
    let distance = this.parallelFigureObj.parallelDistance
    this.arcRadiusParDistAndDir = (nextRefEndPointBase.arc.sweepFlag === 0) ? distance : distance * -1
    let arcRadiusParDistAndDir = this.arcRadiusParDistAndDir
    let nextArcToCenterTotalDistance = getDistance(nextRefEndPointBase.coords.x, nextRefEndPointBase.coords.y, nextRefEndPointBase.arc.center.x, nextRefEndPointBase.arc.center.y)
    let nextArcToCenterMinusPointerToArcFromArc1 = nextArcToCenterTotalDistance - arcRadiusParDistAndDir

    return nextArcToCenterMinusPointerToArcFromArc1
}