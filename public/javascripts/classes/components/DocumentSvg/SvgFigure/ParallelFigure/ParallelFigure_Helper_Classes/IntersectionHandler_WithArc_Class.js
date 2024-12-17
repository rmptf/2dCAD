import {LargeArcFlagSetter} from './LargeArcFlagSetter_Class.js'
import {Intersection_Contact} from './Intersection_Helper_Classes/Intersection_Contact_Class.js'
import {Intersection_NoContact} from './Intersection_Helper_Classes/Intersection_NoContact_Class.js'
import {getDistance} from '../../../../../../functions/math/mathFunctions.js' // OLD LOC
import {findPointAlongSlopeAtDistance} from '../../../../../../functions/drafting/parallelPath/drawParallelPath_functions/parallelPathFunctions.js' // OLD LOC
import { ReferenceFigure } from '../../ReferenceFigure/ReferenceFigure_Class.js'
// import {handleArcToArcIntersectionNoContact, handleArcToPathIntersectionNoContact, handlePathToArcIntersectionNoContact} from './Intersection_Helper_Classes/Intersection_NoContact_Class.js'

function IntersectionHandler_WithArc(parallelFigure) {
    // this.PARFIGURE = parallelFigure
    
    this.intersectionHandlerObject = {
        isIntersectionConnected: true,
    }

    this.ArcFlagSetter = new LargeArcFlagSetter(parallelFigure)
    this.Intersection_Contact = new Intersection_Contact(parallelFigure)
    this.Intersection_NoContact = new Intersection_NoContact(parallelFigure)

    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.originalFigurePathDatas_plusFillers = parallelFigure.originalFigurePathDatas_plusFillers
    this.parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    this.parallelFigureObj = parallelFigure.parallelFigureObject

    this.index = null
    this.arcRadiusParDistAndDir = null

    let svgFigure = parallelFigure.svgFigure
    this.referenceFigure_01 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_01.addCircle({palette: 1, circRad: 10, fillClr: 2}, 1)
    this.referenceFigure_02 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_02.addCircle({palette: 2, circRad: 10, fillClr: 2}, 1)
    this.referenceFigure_03 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_03.addCircle({palette: 3, circRad: 10, fillClr: 2}, 1)
    this.referenceFigure_04 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_04.addCircle({palette: 4, circRad: 10, fillClr: 2}, 1)
}

export {
    IntersectionHandler_WithArc
}

IntersectionHandler_WithArc.prototype.arcIntersection_allArcSegments_everyIndex_firstAction = function() {
    // 1
    console.log("1_all")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1
    this.setArcRadius(0, "arcRad_1") //TODO: can we just set automatically using parDistance?
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
    this.Intersection_NoContact.handlePathToArcIntersectionNoContact(0)
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
    //old
    // this.Intersection_NoContact.handleArcToArcIntersectionNoContact(-1)
    //new
    this.Intersection_NoContact.handleArcToArcIntersectionNoContact(0)
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
            // console.log("running_skip_arcFlagSet_from_1j_in_finalAll")
            this.ArcFlagSetter.setLargeArcFlag(0, false)
            this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner = false
            this.parallelFigureObj.setThisArcFlag_atFinal_from1Joiner = false
        }
        if(this.parallelFigureObj.setPrevArcFlag_atFinal_from3Joiner === true) {
            // console.log("running_skip_arcFlagSet_from_3j_in_finalAll")
            this.ArcFlagSetter.setLargeArcFlag(-1, false)
            this.parallelFigureObj.setThisArcFlag_at4Joiner_from3Joiner = false
            this.parallelFigureObj.setPrevArcFlag_atFinal_from3Joiner = false
        }
        if(this.intersectionHandlerObject.isIntersectionConnected === true) {
            // console.log("CONNECTED")
            this.ArcFlagSetter.setLargeArcFlag(0, true)
        } else {
            // console.log("NOT_CONNECTED")
            this.ArcFlagSetter.setLargeArcFlag(0, false)
            this.intersectionHandlerObject.isIntersectionConnected = true
        }
    }

    if(flag === "arcFlag_2AJ") {
        if(this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner === true) {
            // console.log("running_skip_arcFlagSet_from_1j_in_2j")
            this.ArcFlagSetter.setLargeArcFlag(0, true)
            this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner = false
            this.parallelFigureObj.setThisArcFlag_atFinal_from1Joiner = false
        }
    }

    if(flag === "arcFlag_4J") {
        if(this.parallelFigureObj.setThisArcFlag_at4Joiner_from3Joiner === true) {
            // console.log("running_skip_arcFlagSet_from_3j_in_4j")
            this.ArcFlagSetter.setLargeArcFlag(0, true)
            this.parallelFigureObj.setThisArcFlag_at4Joiner_from3Joiner = false
            this.parallelFigureObj.setPrevArcFlag_atFinal_from3Joiner = false
        }
    }
}

IntersectionHandler_WithArc.prototype.setArcRadius = function(indexModifier, logId) {
    let modifiedIndex = this.index + indexModifier
    let parallelDistance = this.calcArcParDistance(modifiedIndex)
    //old
    // this.parallelFigurePathDatas[modifiedIndex][1].arc.radius = parallelDistance
    //new
    this.originalFigurePathDatas[modifiedIndex + 1].children.parallel_pathDatas.pathData_east.arc.radius = parallelDistance
}

IntersectionHandler_WithArc.prototype.setPerpendicularPoints = function(indicators, setPrevious) {
    let arcRadiusData = this.arcRadiusParDistAndDir
    // set targets with indicators
    let targetIndex = this.index + indicators[0]
    let refIndex = this.index + indicators[1]
    let arcRefIndex = this.index + indicators[2]
    let target = indicators[3]

    // this.setPerpendicularPoints([0, 0, 1, 0], false)
    // this.setPerpendicularPoints([0, 0, 1, 0], true)
    // this.setPerpendicularPoints([0, 1, 1, 1], false)



    // set target datas
    //old
    // let targetPathData = this.parallelFigurePathDatas[targetIndex][target]
    //new
    let prevGuy = this.originalFigurePathDatas[targetIndex].children.parallel_pathDatas.pathData_west
    let thisGuy = this.originalFigurePathDatas[targetIndex + 1].children.parallel_pathDatas.pathData_east
    let targetPathData = (target == 0) ? prevGuy : thisGuy;
    
    //old
    // let refPathData = this.originalFigurePathDatas_plusFillers[refIndex] //TODO: can we make this from orginalPathData
    // let refArcCenter = this.originalFigurePathDatas_plusFillers[arcRefIndex]
    //new
    let refPathData01 = this.originalFigurePathDatas[targetIndex + indicators[1]] //TODO: can we make this from orginalPathData
    let refArcCenter01 = this.originalFigurePathDatas[targetIndex + indicators[2]]

    // console.log("CURRENT: OKOKOK")
    // console.log(this.originalFigurePathDatas_plusFillers)
    // console.log(this.originalFigurePathDatas_plusFillers[refIndex])
    // console.log(this.originalFigurePathDatas_plusFillers[arcRefIndex])
    // console.log(refIndex)
    // console.log(arcRefIndex)
    // console.log(targetIndex + indicators[1])
    // console.log(targetIndex + indicators[2])
    // console.log(refPathData)
    // console.log(refArcCenter)
    // console.log(refPathData01)
    // console.log(refArcCenter01)
    // console.log("CURRENT: OPD+ fillers length: " + this.originalFigurePathDatas_plusFillers.length)

    
    // calculate positions and set data
    //old
    // let newParallelPosition = findPointAlongSlopeAtDistance([refPathData.coords.x, refPathData.coords.y], [refArcCenter.arc.center.x, refArcCenter.arc.center.y], arcRadiusData)
    //new
    let newParallelPosition = findPointAlongSlopeAtDistance([refPathData01.coords.x, refPathData01.coords.y], [refArcCenter01.arc.center.x, refArcCenter01.arc.center.y], arcRadiusData)
    targetPathData.coords.x = newParallelPosition[0]
    targetPathData.coords.y = newParallelPosition[1]

    if (setPrevious) {
        //old
        // let prevParallelPathData = this.parallelFigurePathDatas[targetIndex - 1][1]
        //new
        let prevParallelPathData = this.originalFigurePathDatas[targetIndex].children.parallel_pathDatas.pathData_east
        prevParallelPathData.coords.x = newParallelPosition[0]
        prevParallelPathData.coords.y = newParallelPosition[1]
    }
}

IntersectionHandler_WithArc.prototype.skipFillersAndSetParallelProjections = function(offset) {
    // //old
    // let fillerAdder = 0
    // let nextFillerAdder = 0
    // if (this.originalFigurePathDatas_plusFillers[this.index + 2] === "filler") {
    //     fillerAdder = fillerAdder + 0
    //     nextFillerAdder = nextFillerAdder + 1
    // }
    //new (kinda working)
    // (not needed)

    // //old
    // let thisPathDataOutside = this.originalFigurePathDatas_plusFillers[this.index + offset + fillerAdder]
    // let nextPathDataOutside = this.originalFigurePathDatas_plusFillers[this.index + 2 + nextFillerAdder]
    // let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, this.parallelFigureObj.parallelDistance)//use orig
    //new (kinda working)
    let thisPathDataOutside = this.originalFigurePathDatas[this.index + 1]
    let nextPathDataOutside = this.originalFigurePathDatas[this.index + 2]
    let parallelProjections = calcParallelProjections(thisPathDataOutside.coords, nextPathDataOutside.coords, this.parallelFigureObj.parallelDistance)//use orig

    // //old
    // this.parallelFigurePathDatas[this.index + 1][0].coords.x = parallelProjections.thisPointX //use orig
    // this.parallelFigurePathDatas[this.index + 1][0].coords.y = parallelProjections.thisPointY
    // this.parallelFigurePathDatas[this.index + 1][1].coords.x = parallelProjections.nextPointX
    // this.parallelFigurePathDatas[this.index + 1][1].coords.y = parallelProjections.nextPointY
    // this.parallelFigureObj.arcToPathCounter += 1 //use orig
    //new (kinda working)
    this.originalFigurePathDatas[this.index + 1].children.parallel_pathDatas.pathData_west.coords.x = parallelProjections.thisPointX //use orig
    this.originalFigurePathDatas[this.index + 1].children.parallel_pathDatas.pathData_west.coords.y = parallelProjections.thisPointY
    this.originalFigurePathDatas[this.index + 2].children.parallel_pathDatas.pathData_east.coords.x = parallelProjections.nextPointX
    this.originalFigurePathDatas[this.index + 2].children.parallel_pathDatas.pathData_east.coords.y = parallelProjections.nextPointY
    this.parallelFigureObj.arcToPathCounter += 1 //use orig








    // DATA VIS
    // // reference coords old way
    // // if(this.index === 1) {
    //     this.referenceFigure_01.runFunctions([[this.originalFigurePathDatas_plusFillers[this.index + offset + fillerAdder].coords.x, this.originalFigurePathDatas_plusFillers[this.index + offset + fillerAdder].coords.y]])
    //     this.referenceFigure_02.runFunctions([[this.originalFigurePathDatas_plusFillers[this.index + 2 + nextFillerAdder].coords.x, this.originalFigurePathDatas_plusFillers[this.index + 2 + nextFillerAdder].coords.y]])
    // // }

    // // reference coords new way
    // // if(this.index === 1) {
    //     this.referenceFigure_03.runFunctions([[this.originalFigurePathDatas[this.index + 1].coords.x, this.originalFigurePathDatas[this.index + 1].coords.y]])
    //     this.referenceFigure_04.runFunctions([[this.originalFigurePathDatas[this.index + 2].coords.x, this.originalFigurePathDatas[this.index + 2].coords.y]])
    // // }



    // // finished coords: oldway
    // // if(this.index === 1) {
    //     this.referenceFigure_01.runFunctions([[this.parallelFigurePathDatas[this.index + 1][0].coords.x, this.parallelFigurePathDatas[this.index + 1][0].coords.y]])
    //     this.referenceFigure_02.runFunctions([[this.parallelFigurePathDatas[this.index + 1][1].coords.x, this.parallelFigurePathDatas[this.index + 1][1].coords.y]])
    // // }

    // // finished coords: oldway
    // // if(this.index === 1) {
    //     this.referenceFigure_01.runFunctions([[parallelProjections.thisPointX, parallelProjections.thisPointY]])
    //     this.referenceFigure_02.runFunctions([[parallelProjections.nextPointX, parallelProjections.nextPointY]])
    // // }

    // // finished coords new way
    // // if(this.index === 1) {
    //     this.referenceFigure_01.runFunctions([[this.originalFigurePathDatas[this.index + 1].children.parallel_pathDatas.pathData_west.coords.x, this.originalFigurePathDatas[this.index + 1].children.parallel_pathDatas.pathData_west.coords.y]])
    //     this.referenceFigure_02.runFunctions([[this.originalFigurePathDatas[this.index + 2].children.parallel_pathDatas.pathData_east.coords.x, this.originalFigurePathDatas[this.index + 2].children.parallel_pathDatas.pathData_east.coords.y]])
    // // }
}

//FIXME: Can these all be one?
IntersectionHandler_WithArc.prototype.handleIntersectionArcToPath = function() {
    if (this.parallelFigureObj.collectIndicesOfIntersections === true) {
        this.parallelFigureObj.arcToPathIndexArray.push(this.index + 1)
    }
    // this.Intersection_Contact.handleArcToPathIntersection()


    // // if(this.index === 1) {
        // this.referenceFigure_01.runFunctions([[this.parallelFigurePathDatas[this.index + 1][1].coords.x, this.parallelFigurePathDatas[this.index + 1][1].coords.y]])
        // this.referenceFigure_02.runFunctions([[this.originalFigurePathDatas_plusFillers[this.index + 2 + nextFillerAdder].coords.x, this.originalFigurePathDatas_plusFillers[this.index + 2 + nextFillerAdder].coords.y]])
    // // }

    // // if(this.index === 1) {
    //     // this.referenceFigure_01.runFunctions([[this.originalFigurePathDatas[this.index + 1].children.parallel_pathDatas.coords.x, this.originalFigurePathDatas[this.index + 1].children.parallel_pathDatas.coords.y]])
    //     this.referenceFigure_02.runFunctions([[this.originalFigurePathDatas[this.index + 1].coords.x, this.originalFigurePathDatas[this.index + 1].coords.y]])
    //     console.log("oisjiowejoirwjeoriejwoirjw")
    //     console.log(this.originalFigurePathDatas[this.index + 1].children.parallel_pathDatas.pathData_west)
    //     // this.referenceFigure_02.runFunctions([[100, 100]])
    //     // console.log("osijfodisjfoisdjfosdjfosdijfosdjfoisdjfosdjf")
    //     // console.log(this.originalFigurePathDatas[this.index + 1].coords.x)
    // // }


    this.Intersection_Contact.handleAllIntersections('a2p')
    // // old
    // if (this.parallelFigurePathDatas[this.index + 1][1].arc.joiner) {
    //new
    if (this.originalFigurePathDatas[this.index + 1].children.parallel_pathDatas.pathData_west.children.childCount > 0) {
        console.log("eirweoiruewoiruewoinvcmxnvxcnvmxn")
        this.parallelFigureObj.arcToPathCounter -= 1
    }
}

IntersectionHandler_WithArc.prototype.handleArcIntersectionPathToArc = function() {
    this.parallelFigureObj.pathToArcCounter += 1
    if (this.parallelFigureObj.collectIndicesOfIntersections === true) {
        this.parallelFigureObj.pathToArchIndexArray.push(this.index);
    }
    // this.Intersection_Contact.handlePathToArcIntersection()
    this.Intersection_Contact.handleAllIntersections('p2a')
}

IntersectionHandler_WithArc.prototype.handleArcIntersectionArcToArc = function() {
    console.log("A2Aaaaaaaaa")
    this.parallelFigureObj.arcToArcCounter += 1
    if (this.parallelFigureObj.collectIndicesOfIntersections === true) {
        this.parallelFigureObj.arcToArcIndexArray.push(this.index);
    }
    // this.Intersection_Contact.handleArcToArcIntersection()
    this.Intersection_Contact.handleAllIntersections('a2a')
}

IntersectionHandler_WithArc.prototype.handleNOIntersection = function() {
    console.log("ASDOFJDSFSAASSSSSSSSS")
    // //old
    // this.Intersection_NoContact.handleArcToPathIntersectionNoContact(-1)
    //new
    this.Intersection_NoContact.handleArcToPathIntersectionNoContact(0)
}

IntersectionHandler_WithArc.prototype.setThisPathDataAsPreviousPathData = function() {
    //old
    // let prevParallelPathData = this.parallelFigurePathDatas[this.index - 1][1]
    // let thisParallelPathData = this.parallelFigurePathDatas[this.index][1]
    //new
    let prevParallelPathData = this.originalFigurePathDatas[this.index].children.parallel_pathDatas.pathData_east
    let thisParallelPathData = this.originalFigurePathDatas[this.index + 1].children.parallel_pathDatas.pathData_east
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
    // let modIndex = index + 1
    //old
    // let nextRefEndPointBase = this.originalFigurePathDatas_plusFillers[index + 1]
    //new
    let nextRefEndPointBase = this.originalFigurePathDatas[index + 1]
    let distance = this.parallelFigureObj.parallelDistance
    this.arcRadiusParDistAndDir = (nextRefEndPointBase.arc.sweepFlag === 0) ? distance : distance * -1
    let arcRadiusParDistAndDir = this.arcRadiusParDistAndDir
    let nextArcToCenterTotalDistance = getDistance(nextRefEndPointBase.coords.x, nextRefEndPointBase.coords.y, nextRefEndPointBase.arc.center.x, nextRefEndPointBase.arc.center.y)
    let nextArcToCenterMinusPointerToArcFromArc1 = nextArcToCenterTotalDistance - arcRadiusParDistAndDir

    return nextArcToCenterMinusPointerToArcFromArc1
}

// morngin
// 75

// 71.5

// test
// 75

// 73