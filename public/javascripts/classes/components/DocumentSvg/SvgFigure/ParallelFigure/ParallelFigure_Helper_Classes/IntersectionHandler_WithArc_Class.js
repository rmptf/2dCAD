import {LargeArcFlagSetter} from './LargeArcFlagSetter_Class.js'
import {Intersection_Contact} from './Intersection_Helper_Classes/Intersection_Contact_Class.js'
import {Intersection_NoContact} from './Intersection_Helper_Classes/Intersection_NoContact_Class.js'
import {getDistance} from '../../../../../../functions/math/mathFunctions.js' // OLD LOC
import {findPointAlongSlopeAtDistance} from '../../../../../../functions/drafting/parallelPath/drawParallelPath_functions/parallelPathFunctions.js' // OLD LOC
import {ReferenceFigure} from '../../ReferenceFigure/ReferenceFigure_Class.js'
import { pointCrossedAxis, pointCrossedAxis_02, translateLinePreservingDirection, translatePerpendicularLinePreservingDirection, translatePerpendicularLinePreservingDirection000, areTwoLinesIntersecting, removePathAndPoints_TEST_WILLHANDLERDIFFERENTLY_LATER } from '../ParallelFigureUtils/GeometryUtils/geometryUtils.js'
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

    this.Intersection_Contact = new Intersection_Contact(parallelFigure, index, this.intersectionHandlerObject)
    this.Intersection_NoContact = new Intersection_NoContact(parallelFigure, index)

    let previousIndex = this.index + 0 + subFigureSkipperIndexModifiers.previousIndexModifier
    let thisIndex = this.index + 1 + subFigureSkipperIndexModifiers.currentIndexModifier 
    let nextIndex = this.index + 2 + subFigureSkipperIndexModifiers.nextIndexModifier

    this.previousOriginalFigurePathData = (modifierFromFunction = 0) => this.originalFigurePathDatas[previousIndex + modifierFromFunction]
    this.thisOriginalFigurePathData = (modifierFromFunction = 0) => this.originalFigurePathDatas[thisIndex + modifierFromFunction]
    this.nextOriginalFigurePathData = (modifierFromFunction = 0) => this.originalFigurePathDatas[nextIndex + modifierFromFunction]




    // REFERENCE FIGURE STUFF
    let svgFigure = parallelFigure.svgFigure
    this.referenceFigure_largeDot_01_fig01 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_largeDot_01_fig01.addCircle({palette: 1, circRad: 15, fillClr: 1}, 1)
    this.referenceFigure_largeDot_02_fig01 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_largeDot_02_fig01.addCircle({palette: 1, circRad: 15, fillClr: 1}, 1)
    this.referenceFigure_dottedLine_01_fig01 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_dottedLine_01_fig01.addLine({palette: 1, strkWdth: 1, strkClr: 1, dshArray: 2})

    this.referenceFigure_largeDot_01_fig02 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_largeDot_01_fig02.addCircle({palette: 1, circRad: 15, fillClr: 3}, 1)
    this.referenceFigure_largeDot_02_fig02 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_largeDot_02_fig02.addCircle({palette: 1, circRad: 15, fillClr: 3}, 1)
    this.referenceFigure_dottedLine_01_fig02 = new ReferenceFigure(svgFigure, false)
    this.referenceFigure_dottedLine_01_fig02.addLine({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 2})


    // CLOSED ARC STUFF
    this.FIRSTCHECKER = true
    this.FIRSTCHECKER_02 = true
    this.ORIGPOS_START = null
    this.ORIGPOS_END = null
}

export {
    IntersectionHandler_WithArc
}


IntersectionHandler_WithArc.prototype.checkIfArcIsClosed = function() {
    if(this.index === 1) {
        let parallelEndPoint_start = this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west
        let parallelEndPoint_end = this.thisOriginalFigurePathData().children.parallel_pathDatas.pathData_east

        if(this.FIRSTCHECKER === true) {
            this.ORIGPOS_START = [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y]
            this.ORIGPOS_END = [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y]
            this.FIRSTCHECKER = false
        }

        // let translatedAxis = translatePerpendicularLinePreservingDirection(parallelEndPoint_start, parallelEndPoint_end, [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y], [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y])
        // let translatedAxis = translatePerpendicularLinePreservingDirection000(parallelEndPoint_start, parallelEndPoint_end, [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y], this.ORIGPOS_START, this.ORIGPOS_END, [this.referenceFigure_2xMedDots_1xDottedLine_01, this.referenceFigure_2xMedDots_1xDottedLine_02]) //FIXME: here
        // let hasTargetCrossedAxis =  pointCrossedAxis_02(translatedAxis[0], translatedAxis[1], [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y], [this.referenceFigure_04_A])

        let hasArcClosed = areTwoLinesIntersecting(
            this.ORIGPOS_START,
            [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y],
            this.ORIGPOS_END,
            [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y],
            [this.referenceFigure_largeDot_01_fig01, this.referenceFigure_largeDot_02_fig01, this.referenceFigure_dottedLine_01_fig01, this.referenceFigure_largeDot_01_fig02, this.referenceFigure_largeDot_02_fig02, this.referenceFigure_dottedLine_01_fig02],
        )


        if(hasArcClosed === true) {
            if(this.FIRSTCHECKER_02 === true) {
                removePathAndPoints_TEST_WILLHANDLERDIFFERENTLY_LATER(this.PARFIGURE, this.index - 1, this.index)
                this.FIRSTCHECKER_02 = false
            }
        }

    }
}










IntersectionHandler_WithArc.prototype.arcIntersection_allArcSegments_everyIndex_firstAction = function() {
    // 1
    console.log("1_all")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1
    this.setArcRadius(0)
}

IntersectionHandler_WithArc.prototype.arcIntersection_allArcSegments_everyIndex_lastAction = function() {
    // Final
    console.log("FINAL_all")
    this.handleLargeArcFlag("arcFlag_finalAll") // (Set_largeArcFag)
    this.checkIfArcIsClosed()
}

IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_everyIndex_firstAction = function() {
    // 2
    console.log("2_seg1_first_all")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = this.parallelFigureObj.parallelPathSegmentCounter_FIRST + 1
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

IntersectionHandler_WithArc.prototype.arcIntersection_firstArcSegment_anyIndex_nextIndexIsArc = function() {
    // 6_A
    console.log("6_A_seg1: joineronly")
    this.setThisPathDataAsPreviousPathData()
}

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

IntersectionHandler_WithArc.prototype.arcIntersection_secondArcSegment_everyIndex_lastAction = function() {
    console.log("11_seg2_last_all")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1
}










IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_thisIndexIsPathToArc = function() {
    // 1_Joiner
    console.log("1_Joiner_ooo")
    this.Intersection_NoContact.handlePathToArcIntersectionNoContact(0)
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
    this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner = true // (Set_largeArcFag)
    this.parallelFigureObj.setThisArcFlag_atFinal_from1Joiner = true // (Set_largeArcFag)
}

IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsArc = function() {
    // 2_A_Joiner
    console.log("2_A_Joiner_ooo")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
    this.setArcRadius(0)
    this.handleLargeArcFlag("arcFlag_2AJ") // (Set_largeArcFag)
}

IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_prevIndexIsPathToArc_nextIndexIsNoArc = function() {
    // 2_B_Joiner
    console.log("2_B_Joiner_ooo")
    this.setParallelProjections()
    this.handleIntersectionWithArc('a2p')
}

IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_thisIndexIsArcToArc = function() {
    // 3_Joiner
    console.log("3_Joiner_ooo")
    this.setArcRadius(1)
    //old
    // this.Intersection_NoContact.handleArcToArcIntersectionNoContact(0)
    //new
    this.Intersection_NoContact.handleArcToArcIntersectionNoContact(-1)
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1
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
    this.setParallelProjections()
    this.handleNOIntersection()
    this.parallelFigureObj.parallelPathSegmentCounter_SECOND = 1
}

IntersectionHandler_WithArc.prototype.disconnectedArcIntersection_skipThisIndex = function() {
    // 6_Joiner
    console.log("6_Joiner_ooo")
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
}




//FIXME: This new way of handling arcFlagSetter works great but need to handle popping points in original blob.
// make sure largeArcFlagSetter is being placed in correct OFPD child PPD
IntersectionHandler_WithArc.prototype.handleLargeArcFlag = function(flag) {
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
            this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(false, this.index)

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
            this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(true, this.index)


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
            this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(false, this.index)

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
            this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(true, this.index)


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
            this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(true, this.index)


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
    let previousParallelPathDataTarget = this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_west
    let thisParallelPathDataTarget = this.thisOriginalFigurePathData().children.parallel_pathDatas.pathData_east
    let targetPathData = (targetFlag == 0) ? previousParallelPathDataTarget : thisParallelPathDataTarget;
    
    let referencePathData = this.previousOriginalFigurePathData(OpdRefFlag)
    let referenceArcCenter = this.thisOriginalFigurePathData()

    // calculate positions and set data
    let newParallelPosition = findPointAlongSlopeAtDistance([referencePathData.coords.x, referencePathData.coords.y], [referenceArcCenter.arc.center.x, referenceArcCenter.arc.center.y], arcRadiusData)
    targetPathData.coords.x = newParallelPosition[0]
    targetPathData.coords.y = newParallelPosition[1]

    if (setPrevious) {
        let prevParallelPathData = this.previousOriginalFigurePathData().children.parallel_pathDatas.pathData_east
        prevParallelPathData.coords.x = newParallelPosition[0]
        prevParallelPathData.coords.y = newParallelPosition[1]
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

IntersectionHandler_WithArc.prototype.calcArcParDistance = function(referencePathData) {
    const distance = this.parallelFigureObj.parallelDistance
    const sweepFlag = referencePathData.arc.sweepFlag
    
    // Determine arc radius parallel distance and direction
    this.arcRadiusParDistAndDir = sweepFlag === 0 ? distance : -distance

    // Calculate distance from reference point to arc center
    const refToCenterDist = getDistance(referencePathData.coords.x, referencePathData.coords.y, referencePathData.arc.center.x, referencePathData.arc.center.y)

    return refToCenterDist - this.arcRadiusParDistAndDir
};