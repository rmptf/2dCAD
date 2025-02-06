import {LargeArcFlagSetter} from './LargeArcFlagSetter_Class.js'
import {Intersection_Contact} from './Intersection_Helper_Classes/Intersection_Contact_Class.js'
import {Intersection_NoContact} from './Intersection_Helper_Classes/Intersection_NoContact_Class.js'
import {getDistance} from '../../../../../../functions/math/mathFunctions.js' // OLD LOC
import {findPointAlongSlopeAtDistance} from '../../../../../../functions/drafting/parallelPath/drawParallelPath_functions/parallelPathFunctions.js' // OLD LOC
import {ReferenceFigure} from '../../ReferenceFigure/ReferenceFigure_Class.js'
import { pointCrossedAxis, pointCrossedAxis_02, translateLinePreservingDirection, translatePerpendicularLinePreservingDirection, translatePerpendicularLinePreservingDirection000 } from '../ParallelFigureUtils/GeometryUtils/geometryUtils.js'
// import {handleArcToArcIntersectionNoContact, handleArcToPathIntersectionNoContact, handlePathToArcIntersectionNoContact} from './Intersection_Helper_Classes/Intersection_NoContact_Class.js'

function IntersectionHandler_WithArc(parallelFigure) {
    // this.PARFIGURE = parallelFigure
    this.intersectionHandlerObject = {
        isIntersectionConnected: true,
    }
    this.parallelFigure = parallelFigure
    //old
    // this.ArcFlagSetter = new LargeArcFlagSetter(parallelFigure)
    //new
    // this.ArcFlagSetters = [] //TODO: these are currently being stored in order then gettign called from index pos. these two dont alway align, have to place arcflagsetter within ParPathData
    this.Intersection_Contact = new Intersection_Contact(parallelFigure)
    this.Intersection_NoContact = new Intersection_NoContact(parallelFigure)
    this.originalFigurePathDatas = parallelFigure.originalFigurePathDatas
    this.originalFigurePathDatas_plusFillers = parallelFigure.originalFigurePathDatas_plusFillers
    this.parallelFigurePathDatas = parallelFigure.parallelFigurePathDatas
    this.parallelFigureObj = parallelFigure.parallelFigureObject
    this.index = null
    this.arcRadiusParDistAndDir = null

    this.FIRSTCHECKER = true
    this.ORIGPOS = null
    this.ORIGPOS_START = null
    this.ORIGPOS_END = null

    let svgFigure = parallelFigure.svgFigure
    // NEW FLIP FLAP SHIT
    // this.referenceFigure_01_A = new ReferenceFigure(svgFigure, false)
    // this.referenceFigure_01_A.addCircle({palette: 1, circRad: 3, fillClr: 4}, 1)

    // this.referenceFigure_02_A = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_02_A.addCircle({palette: 1, circRad: 15, fillClr: 2}, 1)

    // this.referenceFigure_02_B = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_02_B.addCircle({palette: 1, circRad: 15, fillClr: 3}, 1)

    // this.referenceFigure_02_C = new ReferenceFigure(svgFigure, false)
    // this.referenceFigure_02_C.addCircle({palette: 1, circRad: 15, fillClr: 3}, 1)

    // this.referenceFigure_03_A = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_03_A.addLine({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 2})
    // this.referenceFigure_03_B = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_03_B.addLine({palette: 4, strkWdth: 1, strkClr: 3, dshArray: 2})

    // this.referenceFigure_04_A = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_04_A.addCircle({palette: 1, circRad: 15, fillClr: 4}, 1)




    // NEW FLIP FLAP SHIT
    // this.referenceFigure_smallDot_01 = new ReferenceFigure(svgFigure, false)
    // this.referenceFigure_smallDot_01.addCircle({palette: 1, circRad: 3, fillClr: 1}, 1)

    // this.referenceFigure_medDot_01 = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_medDot_01.addCircle({palette: 1, circRad: 7, fillClr: 1}, 1)

    // this.referenceFigure_largeDot_01 = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_largeDot_01.addCircle({palette: 1, circRad: 15, fillClr: 1}, 1)

    // this.referenceFigure_dottedLine_01 = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_03_A.addLine({palette: 1, strkWdth: 1, strkClr: 1, dshArray: 2})

    // this.referenceFigure_solidLine_01 = new ReferenceFigure(svgFigure, true)
    // this.referenceFigure_03_A.addLine({palette: 1, strkWdth: 1, strkClr: 1, dshArray: 0})


    this.referenceFigure_2xMedDots_1xDottedLine_01 = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_2xMedDots_1xDottedLine_01.addCircle({palette: 1, circRad: 15, fillClr: 1}, 1)
    this.referenceFigure_2xMedDots_1xDottedLine_01.addCircle({palette: 1, circRad: 15, fillClr: 1}, 2)
    this.referenceFigure_2xMedDots_1xDottedLine_01.addLine({palette: 1, strkWdth: 1, strkClr: 1, dshArray: 2})

    this.referenceFigure_2xMedDots_1xDottedLine_02 = new ReferenceFigure(svgFigure, true)
    this.referenceFigure_2xMedDots_1xDottedLine_02.addCircle({palette: 1, circRad: 15, fillClr: 3}, 1)
    this.referenceFigure_2xMedDots_1xDottedLine_02.addCircle({palette: 1, circRad: 15, fillClr: 3}, 2)
    this.referenceFigure_2xMedDots_1xDottedLine_02.addLine({palette: 1, strkWdth: 1, strkClr: 3, dshArray: 2})


}

export {
    IntersectionHandler_WithArc
}







IntersectionHandler_WithArc.prototype.checkIfArcIsClosed = function() {
    // these are not lind up correctely yet
    if(this.index === 1) {
        let parallelEndPoint_start = this.originalFigurePathDatas[this.index].children.parallel_pathDatas.pathData_west
        let parallelEndPoint_end = this.originalFigurePathDatas[this.index + 1].children.parallel_pathDatas.pathData_east

        if(this.FIRSTCHECKER === true) {
            this.ORIGPOS_START = [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y]
            this.ORIGPOS_END = [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y]
            this.FIRSTCHECKER = false
        }

        // let translatedAxis = translatePerpendicularLinePreservingDirection(parallelEndPoint_start, parallelEndPoint_end, [parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y], [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y])
        let translatedAxis = translatePerpendicularLinePreservingDirection000(parallelEndPoint_start, parallelEndPoint_end, [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y], this.ORIGPOS_START, this.ORIGPOS_END, [this.referenceFigure_2xMedDots_1xDottedLine_01, this.referenceFigure_2xMedDots_1xDottedLine_02]) //FIXME: here
        // let hasTargetCrossedAxis =  pointCrossedAxis_02(translatedAxis[0], translatedAxis[1], [parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y], [this.referenceFigure_04_A])


        // this.referenceFigure_02_A.runFunctions()
        // this.referenceFigure_02_A.runFunctions([[parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y]])
        // this.referenceFigure_02_B.runFunctions([[parallelEndPoint_end.coords.x, parallelEndPoint_end.coords.y]])
        // this.referenceFigure_03_A.runFunctions([translatedAxis[0][0], translatedAxis[0][1]])
        // this.referenceFigure_03_B.runFunctions([translatedAxis[1][0], translatedAxis[1][1]])
        // this.referenceFigure_04_A.runFunctions([[parallelEndPoint_start.coords.x, parallelEndPoint_start.coords.y]])
    }
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
    //old
    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
    //new (not 100% tested)
    // FIXME:
    // FIXME: This is where the current problem is (it sets the segCounter to -1 and it should be 0)
    // FIXME:
    // this.parallelFigureObj.parallelPathSegmentCounter_FIRST = 0
    this.parallelFigureObj.parallelPathSegmentCounter_FIRST = -1
    // FIXME:
    // FIXME:
    // FIXME:
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




//FIXME: This new way of handling arcFlagSetter works great but need to handle popping points in original blob.
    // make sure largeArcFlagSetter is being placed in correct OFPD child PPD
IntersectionHandler_WithArc.prototype.handleLargeArcFlag = function(flag) {
    if(flag === "arcFlag_finalAll") {
        if(this.parallelFigureObj.setThisArcFlag_atFinal_from1Joiner === true) {
            console.log("running_skip_arcFlagSet_from_1j_in_finalAll")
            //old
            // this.ArcFlagSetter.setLargeArcFlag(0, false)
            //new
            console.log("HANDLE_ARCFLAG_01")
            console.log(this.index)
            if(this.parallelFigure.parallelFigureObject.iterationCounter === 1) {
                let arcFlagSetter = new LargeArcFlagSetter(this.parallelFigure)
                // this.ArcFlagSetters.push(arcFlagSetter)
                console.log("NEW_ARCFLAG_SETTER")
                console.log(this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west)
                this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west.largeArcFlagSetter = arcFlagSetter
            }
            // this.ArcFlagSetters[this.index].setLargeArcFlag(0, false, this.index)
            this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(0, false, this.index)


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
        if(this.intersectionHandlerObject.isIntersectionConnected === true) {
            console.log("CONNECTED")
            console.log(this.parallelFigure.parallelFigureObject.iterationCounter)


            //old
            // this.ArcFlagSetter.setLargeArcFlag(0, true)
            //new
            console.log("HANDLE_ARCFLAG_03")
            console.log(this.index)
            if(this.parallelFigure.parallelFigureObject.iterationCounter === 1) {
                let arcFlagSetter = new LargeArcFlagSetter(this.parallelFigure)
                // this.ArcFlagSetters.push(arcFlagSetter)
                console.log("NEW_ARCFLAG_SETTER")
                console.log(this.originalFigurePathDatas[this.index + 0])
                this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west.largeArcFlagSetter = arcFlagSetter
            }
            // this.ArcFlagSetters[this.index].setLargeArcFlag(0, true, this.index)
            this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(0, true, this.index)


        } else {
            console.log("NOT_CONNECTED")


            //old
            // this.ArcFlagSetter.setLargeArcFlag(0, false)
            //new
            console.log("HANDLE_ARCFLAG_04")
            console.log(this.index)
            if(this.parallelFigure.parallelFigureObject.iterationCounter === 1) {
                let arcFlagSetter = new LargeArcFlagSetter(this.parallelFigure)
                // this.ArcFlagSetters.push(arcFlagSetter)
                console.log("NEW_ARCFLAG_SETTER")
                console.log(this.originalFigurePathDatas[this.index + 0])
                this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west.largeArcFlagSetter = arcFlagSetter
            }
            // this.ArcFlagSetters[this.index].setLargeArcFlag(0, false, this.index)
            this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(0, false, this.index)


            this.intersectionHandlerObject.isIntersectionConnected = true
        }
    }

    if(flag === "arcFlag_2AJ") {
        if(this.parallelFigureObj.setThisArcFlag_at2Joiner_from1Joiner === true) {
            console.log("running_skip_arcFlagSet_from_1j_in_2j")


            //old
            // this.ArcFlagSetter.setLargeArcFlag(0, true)
            //new
            console.log("HANDLE_ARCFLAG_05")
            console.log(this.index)
            if(this.parallelFigure.parallelFigureObject.iterationCounter === 1) {
                let arcFlagSetter = new LargeArcFlagSetter(this.parallelFigure)
                // this.ArcFlagSetters.push(arcFlagSetter)
                console.log("NEW_ARCFLAG_SETTER")
                console.log(this.originalFigurePathDatas[this.index + 0])
                this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west.largeArcFlagSetter = arcFlagSetter
            }
            // this.ArcFlagSetters[this.index].setLargeArcFlag(0, true, this.index)
            this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(0, true, this.index)


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
            console.log("HANDLE_ARCFLAG_06")
            console.log(this.index)
            if(this.parallelFigure.parallelFigureObject.iterationCounter === 1) {
                let arcFlagSetter = new LargeArcFlagSetter(this.parallelFigure)
                // this.ArcFlagSetters.push(arcFlagSetter)
                console.log("NEW_ARCFLAG_SETTER")
                console.log(this.originalFigurePathDatas[this.index + 0])
                this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west.largeArcFlagSetter = arcFlagSetter
            }
            // this.ArcFlagSetters[this.index].setLargeArcFlag(0, true, this.index)
            this.originalFigurePathDatas[this.index + 0].children.parallel_pathDatas.pathData_west.largeArcFlagSetter.setLargeArcFlag(0, true, this.index)


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
        // console.log("handling_arc_to_path")
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
    this.parallelFigureObj.arcToArcCounter += 1
    if (this.parallelFigureObj.collectIndicesOfIntersections === true) {
        this.parallelFigureObj.arcToArcIndexArray.push(this.index);
    }
    // this.Intersection_Contact.handleArcToArcIntersection()
    this.Intersection_Contact.handleAllIntersections('a2a')
}

IntersectionHandler_WithArc.prototype.handleNOIntersection = function() {
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